Website kurmis.com
==================

I run my personal website using [GitHub Pages][ghp] and [Cloudflare CDN][cf].

[ghp]: https://pages.github.com/
[cf]: https://www.cloudflare.com/

Build status
------------

[![Circle CI](https://circleci.com/gh/oliworx/oliworx.github.com.svg?style=svg)](https://circleci.com/gh/oliworx/oliworx.github.com) Circle CI  
[![Build Status](https://semaphoreci.com/api/v1/oliworx/oliworx-github-com/branches/master/badge.svg)](https://semaphoreci.com/oliworx/oliworx-github-com)  Semaphore CI

Docker images
-------------

There is a Dockerfile to build an image with a http-server, the default image is build from ```gists/lighttpd```

To run the container: 
```
docker run -d -p 80:80 --name homepage oliworx/homepage
```

License
-------

MIT License: https://kurmis.mit-license.org
