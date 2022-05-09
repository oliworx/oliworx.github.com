---
published: true
layout: post
tags: backup shell terminal rsync
title: Storage efficient backup with rsync on Linux
---
## How I backup my home directory on Linux with rsync

### My requirements
- fast & efficient
- keep Linux file permissions
- incremental backups
- don't backup unimportant files like browser cache
- only standard tools should be required
- backup content should be easy to access and restore


### The backup script

This is my `backup-home.sh` shell script:

```bash
#!/bin/sh

source=/home/oli/
target=/media/oli/Seagate_4TB/Backup/vostro/rsync-tool/
today=$(date +%Y-%m-%d)

rsync -av --delete --exclude-from=/home/oli/rsync-homedir-excludes/rsync-homedir-excludes.txt \
        "${source}"  "${target}${today}/" --link-dest="${target}last/"

ln -nsf "${target}${today}" "${target}last"

exit 0
```


### How to use
- make the script executable: `chmod +x backup-home.sh`
- copy it to a folder of our PATH : `cp backup-home.sh ~/.local/bin`
- grap a copy of [rsync-homedir-excludes/rsync-homedir-excludes.txt](https://github.com/rubo77/rsync-homedir-excludes) and modify it to your needs
- create a linux partition on an external drive, like Ext4 or XFS
- plug in the external drive to store the backup
- open a terminal an run `backup-home.sh` to start a new backup

### Result

The backup will create a new folder for the current date in the target directory:

```text
drwxr-xr-x 52 oli oli 4096 Mai  1 13:23 2021-05-01
drwxr-xr-x 52 oli oli 4096 Mai  2 08:14 2021-05-02
drwxr-xr-x 52 oli oli 4096 Mai 13 09:26 2021-05-13
drwxr-xr-x 52 oli oli 4096 Mai 16 09:27 2021-05-16
drwxr-xr-x 52 oli oli 4096 Mai 23 08:27 2021-05-23
drwxr-xr-x 52 oli oli 4096 Jul 25 08:52 2021-07-25
drwxr-xr-x 52 oli oli 4096 Aug  8 09:19 2021-08-08
lrwxrwxrwx  1 oli oli   58 Aug  8 09:39 last -> /media/oli/Seagate_4TB/Backup/vostro/rsync-tool/2021-08-08
```

Every folder will contain a full copy of the source directory at the respective date, but will require just the storage space of the new and changed files. All unchanged files will be hard-linked, so they will just use an inode.

Even on my 10 years old Laptop with USB 2.0 the backup of the home partition takes just some minutes, due to the efficiency of rsync
```text
Projects/html/oliworx.github.com/.git/refs/remotes/origin/master
Projects/html/oliworx.github.com/.github/workflows/
Projects/html/oliworx.github.com/.github/workflows/website.yml

sent 142,744,045 bytes  received 44,245 bytes  574,600.76 bytes/sec
total size is 266,349,471,150  speedup is 1,865.35
oli@mx:~$ 
```
