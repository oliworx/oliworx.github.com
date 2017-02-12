FROM gists/lighttpd:latest
MAINTAINER oliver@kurmis.com
COPY index.html robots.txt favicon.ico 404.html /var/www/
COPY files /var/www/files
COPY img /var/www/img
