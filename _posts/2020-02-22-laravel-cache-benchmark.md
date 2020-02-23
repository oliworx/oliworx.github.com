---
layout: post
title: "Performance comparison of Laravel cache stores"
tags: php testing performance docker laravel
---

When running a high traffic website with Laravel,
caching becomes a critical aspect for performance.

Using the [Laravel](https://laravel.com/) framework it is
possible to use different [cache stores](https://laravel.com/docs/cache),
e.g. file cache for development and [Redis](https://redis.io/)
or [Memcached](https://memcached.org/) for production servers.

So the question is, what is the best cache store for my use case?
To answer this question, I wrote a
[small PHP script](https://github.com/oliworx/laravel-cache-benchmark/blob/master/cache-benchmark.php)
to be run with [Laravel Tinker](https://laravel.com/docs/artisan#tinker).

By default it will create 100 cache items and perform 20 times more
reads than writes to all configured and available cache stores.

To run the Laravel cache benchmark, clone or download it from
[github.com/oliworx/laravel-cache-benchmark](https://github.com/oliworx/laravel-cache-benchmark)
and copy the file `cache-benchmark.php` to the directory of your
Laravel project. You may want to edit some settings in the top section
of the file. e.g. disable memcache tests if this cache store
is not available in your specific setup.

Open a terminal and in your project directory run:

    php artisan tinker cache-benchmark.php

The tests will run for some seconds only, and no caches will be flushed,
so it is safe to run on a production system too.

The results from my local Mac/Docker setup (PHP 7.4, Redis, Memcached, MariaDB) are:
```
array: 0.133 seconds, 15815 queries/sec
memcached: 0.517 seconds, 4061 queries/sec
redis: 0.736 seconds, 2853 queries/sec
database: 2.122 seconds, 990 queries/sec
file: 2.461 seconds, 853 queries/sec
```

Results from a small VPS (1 Xeon core, 1 GB RAM) are quite different:
```
array: 0.052 seconds, 40243 queries/sec
memcached: 0.13 seconds, 16175 queries/sec
redis: 0.159 seconds, 13209 queries/sec
database: 4.007 seconds, 524 queries/sec
file: 0.16 seconds, 13164 queries/sec
```

Surprisingly the file cache store is as fast as local Redis!

**Conclusion: it is a good idea to benchmark the cache performance on
a real system, instead of guessing and making assumptions.**
