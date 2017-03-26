Website kurmis.com
==================

I run my personal website using [github pages][ghp].

[ghp]: https://pages.github.com/

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

MIT License: https://kurmis.mit-license.org
