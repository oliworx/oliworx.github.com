---
layout: post
title: "How to drastically increase Docker performance on Mac and Windows"
tags: docker performance mac windows
---
On Windows and Mac you will probably see a poor performance for your
thoroughly dockerized application. This is due to very slow storage
I/O operations on your mounted volumes from the local filesystem.
On Mac and Windows Docker file has to route file system operations
through more layers compared to running Docker on Linux.

If using docker-compose there is a very easy way to speed up the
file access and the whole application. Just use the mount options 
`delegated` or `cached` in your `docker-compose.yml` file like this:

```yaml
version: '2'
services:
  app:
    container_name: app
    image: php:7.3.8-fpm-stretch
    user: www-data
    working_dir: /var/www
    volumes:
      - ./:/var/www:delegated

  web:
    container_name: web
    image: nginx:1.13-alpine
    working_dir: /var/www/html
    ports:
      - "80:80"
    volumes:
      - ./:/var/www/html:ro,delegated
      - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

On my Mac I use the option `delegated` and the speedup of the
application is about 140%, the runtime of PHPUnit dropped from about
4.0 minutes to 1.7!

Please [read the docs](https://docs.docker.com/docker-for-mac/osxfs-caching/)
for more information and consequences.
