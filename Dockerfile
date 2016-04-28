FROM nginx:alpine
MAINTAINER oliver@kurmis.com
COPY index.html /usr/share/nginx/html
COPY files /usr/share/nginx/html/files
COPY img /usr/share/nginx/html/img
