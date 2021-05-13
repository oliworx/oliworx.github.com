---
published: true
layout: post
tags: backup shell terminal xfs
title: Fast and efficient backup of  XFS partition
---
If you are using the [XFS](https://en.wikipedia.org/wiki/XFS) filesystem for your Linux partition you can create full and incremental backups with the powerful tool `xfsdump`. 

I am creating a backup of my home partition like this:

    sudo xfsdump -l 0 -L "Backup level 0 of /home `date`" -M Full  - /home | lzop > /media/my-backup-directory/home-xfsdump-`date +%Y-%m-%d`.lzo

[lzop](https://en.wikipedia.org/wiki/Lzop) will compress the filesystem data with minimal CPU usage and not slowing down your backup procedure at all, the limiting bottleneck will probably be your backup storage (external USB drive or network storage)

You probably have to install xfsdump and lzop first:

    sudo apt install xfsdump lzop

Now you also have the `xfsrestore` command, which you will need to restore the filesystem from the backup:

    lzop -dc my-xfsdump.lzo | xfsrestore - /home
    
With xfsdump you can even do incremental backups, Red Hat has a comprehensive article about [BACKING UP AND RESTORING XFS FILE SYSTEMS](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/storage_administration_guide/xfsbackuprestore)


