Website kurmis.com
==================

My personal website using [GitHub Pages][ghp] and [Cloudflare CDN][cf].

[ghp]: https://pages.github.com/
[cf]: https://www.cloudflare.com/

Build status
------------

![GitHub Actions Status](https://github.com/oliworx/oliworx.github.com/workflows/Website/badge.svg) GitHub Actions 

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

Generate tag pages
------------------
Run `python3 generate-tags.py` or just `npm run tags`.  
Credit for the awesome python script goes to [qian256](https://github.com/qian256/qian256.github.io/blob/master/tag_generator.py) .

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
