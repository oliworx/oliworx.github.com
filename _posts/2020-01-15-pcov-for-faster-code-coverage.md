---
layout: post
title: "40 times faster PHP Code Coverage Reporting with PCOV"
tags: php testing performance docker
---
For a PHP project with over 100 000 lines of code
I want to create Code Coverage Reports on an regular basis, usually every 1 or 2 months.

With the Xdebug enabled such a run of ```phpunit --coverage-text=report.txt``` takes ages:

```text
Time: 2.2 hours, Memory: 269.00 MB

OK, but incomplete, skipped, or risky tests!
Tests: 775, Assertions: 2825, Skipped: 1.
```

It takes more than **2 hours** to create the Code Coverage Report!

By using the awesome [PCOV PHP extension](https://github.com/krakjoe/pcov)
it was possible to accelerate the process by **factor 40**!

```text
Time: 3.32 minutes, Memory: 259.00 MB

OK, but incomplete, skipped, or risky tests!
Tests: 775, Assertions: 2825, Skipped: 1.
```

With PCOV the Code Coverage Report was created in about **3 minutes** only!

### How to install PCOV in a PHP Docker image

In your PHP Dockerfile add these lines to a RUN directive

```text
pecl install pcov && \
docker-php-ext-enable pcov
```

and then build your PHP Docker image as usual.

### PCOV and Xdebug

Please keep in mind:  
It is not possible to have Xdebug and PCOV both active at the same time!
Xdebug must not be enabled, when PCOV is active.

If you want to debug your code with Xdebug, you first have do disable PCOV.
Just set ```pcov.enabled=0``` in a PHP ini file and don't forget to restart
your PHP-FPM or your Docker containers to apply the changes.
