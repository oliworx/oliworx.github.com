---
layout: post
title: "Reset and sync local git repository with remote branch"
tags:
  - git
  - shell
---
## Reset and sync local git repository with remote branch

Messed up your local files and git repo?
Just clean up the mess and make it like the remote master branch again:

```bash
git fetch origin
git reset --hard origin/master
git clean -f -d
```

Your local branch is now an exact copy of the remote branch.
