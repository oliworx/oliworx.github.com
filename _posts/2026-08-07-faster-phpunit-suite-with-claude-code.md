---
layout: post
title: "From 43 to 20 seconds: making a PHPUnit suite faster with Claude Code"
tags: php testing performance ai laravel benchmark
---
Our main Laravel application has 2423 tests, getting more and more every day.
And they run as a pre-commit hook on my laptop — every single commit
waits for the full suite to go green. The runtime is therefore not an abstract number on a dashboard,
it is a tax I pay several times a day.

Every test runs against a local MySQL database,
in a separate test schema, with each test wrapped in a transaction that is rolled back afterwards.
That is deliberate — the application leans on MySQL behaviour we would otherwise not be testing.

Running everything sequentially with plain `phpunit` would take 136 seconds, so we moved to
[ParaTest](https://github.com/paratestphp/paratest) some months ago. With 20 parallel processes a
full run took about 43 seconds. That is livable, but it is exactly the kind of number you keep
noticing.

So I asked [Claude Code](https://claude.com/claude-code) a narrow question: _with how many parallel
processes does my suite run fastest?_ The answer was not the one I expected — 20 was already optimal,
and the process count was not my problem at all.

### The process count is not the lever

Every configuration below was measured twice on the full suite:

| Processes    | Wall time |
|-------------:|----------:|
|            8 |    49.5 s |
|           12 |    44.5 s |
|           16 |      43 s |
| 20 (current) |      43 s |
|           24 |      45 s |
|           32 |    46.5 s |

The curve is flat from 16 onwards and gets worse from 24. Partly that is the hardware: the machine is
an i7-13700H with 14 physical cores presenting 20 threads — 6 performance cores at up to 5.0 GHz,
hyper-threaded into 12, plus 8 efficiency cores at 3.7 GHz. Worker number 18 is simply not worth as
much as worker number 3.

The more useful number is the speedup itself. Going from one process to twenty took the suite from
136 to 43 seconds — a factor of **3.1**, not 14 and certainly not 20. A suite that parallelises that
poorly is not purely CPU-bound, and no amount of extra workers will fix it: every worker boots the
framework for itself, and all twenty of them queue up against the same MySQL server. Adding processes
past 16 buys contention, not throughput.

So the question was never "how many processes" but "what is every process doing that it should not be
doing".

### OPcache is off for the CLI

`opcache.enable_cli` defaults to `Off`, which means each of my 20 workers parsed and compiled the
entire Laravel framework from scratch, every run. Enabling OPcache for the CLI **plus** a file cache —
so the workers share compiled opcodes on disk instead of each building their own — took the suite
from 43.5 to 37.6 seconds.

Two gotchas with the file cache. OPcache does not create the `file_cache` directory: if it does not
exist you get no error and no cache, just the old runtime back. And if you put it under `/tmp`, as I
did, a reboot wipes it — I lost three seconds to that and briefly believed I had a regression.

### The big one: PCOV

Claude Code mentioned that this machine has [PCOV](https://github.com/krakjoe/pcov) installed, loaded
globally via `20-pcov.ini`. I wrote about
[installing it for 40 times faster code coverage](/2020/01/15/pcov-for-faster-code-coverage.html)
back in 2020, and it is still the right tool for that job.

But PCOV hooks into `zend_execute_ex()`, which means it sits in **every single function call** —
whether or not you are collecting coverage. Our suite is dominated by product-attribute mapper tests
that do a lot of small function calls, and that is exactly the shape of workload where this hurts:

| Configuration                       | Median of 3 runs |
|-------------------------------------|-----------------:|
| Status quo                          |           43.5 s |
| + OPcache for CLI, with file cache  |           37.6 s |
| + `pcov.enabled=0`                  |           27.0 s |
| + JIT (tracing)                     |           27.0 s |

Switching PCOV off for normal test runs was worth more than 10 seconds — far more than the
parallelism tuning I originally asked about. The funny part is that the last paragraph of my own 2020
post explains how to set `pcov.enabled=0`. I only ever thought of it as something you do to use
Xdebug, never as something you do to make tests fast.

There is a second-order effect worth knowing: because PCOV overrides `zend_execute_ex()`, **the JIT
cannot run at all** while PCOV is loaded. PHP tells you so if you look:

```text
PHP Warning:  JIT is incompatible with third party extensions that override zend_execute_ex(). JIT disabled.
```

Which means my first JIT measurements were meaningless — I was measuring OPcache with the JIT
silently switched off. With PCOV disabled the JIT does become active, and then it turns out to make
no measurable difference at all for this workload. So it stays off, and there is one fewer variable
in the setup.

The result, in `composer.json`, deliberately without a `-p` so it works the same locally and in CI:

```json
"test": [
    "@php -r \"@mkdir('/tmp/php-opcache-cli', 0777, true);\"",
    "@php vendor/bin/paratest --exclude-group=serial --passthru-php=\"'-d' 'opcache.enable_cli=1' '-d' 'opcache.file_cache=/tmp/php-opcache-cli' '-d' 'pcov.enabled=0'\"",
    "@php -d opcache.enable_cli=1 -d opcache.file_cache=/tmp/php-opcache-cli -d pcov.enabled=0 vendor/bin/phpunit --group=serial"
],
"coverage": [
    "@php -d pcov.enabled=1 vendor/bin/phpunit --coverage-text=tests/Reports/code_coverage_report.txt"
],
```

Note the separate `coverage` script. With PCOV disabled by default, a coverage run needs to switch it
back on explicitly — otherwise PHPUnit only prints a `No code coverage driver available` warning,
still exits green, and writes no report file. That is an easy failure to miss, so it is worth
encoding as its own command.

### Bonus: stale test-database fixtures

The last seven seconds came from somewhere else entirely. Our test database is seeded from SQL dumps,
and those dumps had not been refreshed for some weeks. In the meantime a scheduled command in production
had cleaned up 592 misspelled product properties — but they were still sitting in the test fixtures. Every
test that exercised that command deleted all 592 of them again, one `DELETE` per row, inside its own
transaction.

Refreshing the seeders from current production data took that test class from 10.3 to 2.0 seconds on
its own, and the whole suite from 27 to 20. Fixture drift is a slow leak: nothing fails, the tests
just quietly do more work every month.

### Proper measuring is not easy

Halfway through, an A/B comparison came back showing 45–54 seconds for both variants and no
difference at all. The cause was embarrassing and instructive: editing `composer.json` had triggered
a Composer sync and re-index in PhpStorm, which was competing for the same cores as the benchmark.

Every number in this post is therefore measured with the load average below 2, with the variants
interleaved (A, B, A, B, A, B) rather than run in blocks, and the before/after figures were taken in
one sitting — old commit checked out, test database re-seeded from the old dumps, then back to
`master` and re-seeded again — so that nothing but the change under test differs between them. That
discipline was Claude Code's contribution more than mine; my instinct was to run each variant a
couple of times and believe the numbers.

| Full suite                | Before | After  |
|---------------------------|-------:|-------:|
| Sequential (`phpunit`)    |  136 s |   76 s |
| Parallel (`paratest`)     |   43 s |   20 s |

Two `php -d` flags and a refreshed set of fixtures. No test was rewritten, no parallelism was tuned —
and every commit now waits a good 20 seconds less than it did.

With the help of Claude Code this optimization session took me just half of a Friday afternoon, wow.
