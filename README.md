Website kurmis.com
==================

I run my personal website using [github pages][ghp].

The layout is based on layout examples using [Pure CSS][pure] compiled from the [pure-site][] project.

[ghp]: https://pages.github.com/
[pure]: http://purecss.io/
[pure-site]: https://github.com/yahoo/pure-site

Build status
------------

Circle CI [![Circle CI](https://circleci.com/gh/oliworx/oliworx.github.com.svg?style=svg)](https://circleci.com/gh/oliworx/oliworx.github.com)

Docker images
-------------

There are Dockerfiles to build images with a http-server, the default image is build from ```gists/lighttpd```

To run the container: 
```
docker run -d -p 80:80 --name homepage oliworx/homepage
```

License
-------

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/pure-site/blob/master/LICENSE.md
