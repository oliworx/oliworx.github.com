Website kurmis.com
==================

My personal website using [GitHub Pages][ghp] and [Cloudflare CDN][cf].

[ghp]: https://pages.github.com/
[cf]: https://www.cloudflare.com/

Build status
------------

GitHub Actions: ![GitHub Actions Status](https://github.com/oliworx/oliworx.github.com/workflows/Website/badge.svg) 

Local development
-----------------
Install required packages:

    sudo apt install ruby-bundler ruby-dev make gcc g++ zlib1g-dev


Install _Jekyll_ and other dependencies:

    sudo bundle install


Upgrade _Jekyll_:

    bundle update github-pages

To compile and run the Jekyll powered site: 

    bundle exec jekyll serve


Generate tag pages
------------------
    python3 generate-tags.py

Credit for the awesome python script goes to [qian256](https://github.com/qian256/qian256.github.io/blob/master/tag_generator.py) .

Syntax highlighting
-------------------

Install the _rouge_ gem:

    gem install kramdown rouge

List the available styles:

    rougify help style
    
Generate the css file for the _monokay_ style

    rougify style monokai > styles/syntax.css

License
-------

MIT License: https://kurmis.mit-license.org
