---
published: true
layout: post
tags: backup shell terminal xfs
title: Fast and efficient backup of  XFS partition
---
If you are using the [XFS](https://en.wikipedia.org/wiki/XFS) filesystem for your Linux partition you can create full and incremental backups with the powerful tool `xfsdump`. 

I am creating a backup of my home partition like this:

    sudo xfsdump -l 0 -L "Backup level 0 of /home `date`" - /home | lzop > /backup-dir/home-xfsdump-`date +%Y-%m-%d`.lzo

Let's have a detailed look on the used commands and parameters:

 * `sudo` : the xfsdump command is only available with root privileges
 * `xfsdump` : is doing the heavy lifting of dumping the filesystem
 * `-l 0` : we want to do a level 0 backup, not an incremental backup
 * ```-L "Backup level 0 of /home `date`"``` an optional label for the dump
 * `-` : to write the dumped data to STDOUT instead of a file
 * `/home` is the mount point of the XFS partition
 * `|lzop` put the dumped data into the lzop compression program
 * ```> /backup-dir/home-xfsdump-`date +%Y-%m-%d`.lzo``` save the compressed dump data in a file with a descriptive name (what, how, when)
   
[lzop](https://www.lzop.org/) will compress the filesystem data with minimal CPU usage and not slowing down your backup 
procedure at all, the limiting bottleneck will probably be your backup storage (external USB drive or network storage):

[![xfsdump load](/img/xfsdump-load.png){:width="100%" style="padding: 5px; border: 2px solid #555"}](/img/xfsdump-load.png)


You probably have to install xfsdump and lzop first:

    sudo apt install xfsdump lzop

Now you also have the `xfsrestore` command, which you will need to restore the filesystem from the backup:

    lzop -dc my-xfsdump.lzo | xfsrestore - /home
    
With xfsdump you can even do incremental backups, Red Hat has a comprehensive article about [BACKING UP AND RESTORING XFS FILE SYSTEMS](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/storage_administration_guide/xfsbackuprestore)
