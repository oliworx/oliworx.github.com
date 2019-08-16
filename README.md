Website kurmis.com
==================

I run my personal website using [GitHub Pages][ghp] and [Cloudflare CDN][cf].

[ghp]: https://pages.github.com/
[cf]: https://www.cloudflare.com/

Build status
------------

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

Syntax highlighting
-------------------

install the rouge gem

    gem install kramdown rouge

list the available styles:

    rougify help style
    
generate the css file for the monokay style

    rougify style monokai > styles/syntax.css

License
-------

MIT License: https://kurmis.mit-license.org
