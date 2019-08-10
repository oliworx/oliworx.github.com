Website kurmis.com
==================

I run my personal website using [GitHub Pages][ghp] and [Cloudflare CDN][cf].

[ghp]: https://pages.github.com/
[cf]: https://www.cloudflare.com/

Build status
------------

[![Circle CI](https://circleci.com/gh/oliworx/oliworx.github.com.svg?style=svg)](https://circleci.com/gh/oliworx/oliworx.github.com) Circle CI  
[![Build Status](https://semaphoreci.com/api/v1/oliworx/oliworx-github-com/branches/master/shields_badge.svg)](https://semaphoreci.com/oliworx/oliworx-github-com) Semaphore CI

Local development with Jekyll
-----------------------------
Install required packages:
```
sudo apt install ruby-bundler ruby-dev make gcc g++ zlib1g-dev
```

Install Jekyll and other dependencies:
```
sudo bundle install
```

To compile and run the Jekyll powered site: 
```
bundle exec jekyll serve
```

License
-------

MIT License: https://kurmis.mit-license.org
