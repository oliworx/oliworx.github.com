---
layout: post
title:  "How to create a MySQL/MariaDB database and user"
tags: mysql mariadb sql
---

When you want to create a new Database for MySQL or MariaDB and an extra DB user for it:

```sql
CREATE DATABASE MYNEWDB;
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON MYNEWDB.* TO 'newuser'@'localhost';
FLUSH PRIVILEGES;
```

This will create a general purpose database user, that can not only read and write data,
but also modify the structure of the database, like `ALTER` or `DROP` tables.
