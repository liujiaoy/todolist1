---
title: hexo博客源码提交至github
date: 2021-06-07 08:14:49
top_img: hexo.png
cover: hexo.png
tags:
    - Hexo
categories:
    - code
description:
---


兴致勃勃打开家里电脑写博客，从github把博客文件下载下来整了半天发现没用，原来是之前配置的hexo deploy 只会把博客内容上传到github，源码并没有上传。原来如此！

## 博客源码提交到博客仓库的另一个分支进行管理

博客设置成了github Page，源码经过查阅资料选择了用当前仓库的hexo分支进行保存管理，以后hexo分支为源码，master分支为hexo d生成的文件。

### 1.初始化文件夹（已进行初始化可忽略）

```git
git init 
```

### 2.关联远程仓库

```git
git remote add origin git@github.com:liujiaoy/liujiaoy.github.io.git //关联远程仓库
```

### 3.创建并切换分支

```git
git switch -c hexo
```

### 4.将源码添加到仓库

这里由于使用了主题，即包含了主题作者的仓库，添加时会出现问题
需要子仓库排除在外再进行提交

```git
git add .
git rm themes/butterfly
git commit -m"提交说明"
git push
```

### 5.此时即可通过正常的git clone进行项目克隆，但主题的问题仍未解决，我这边还是通过重新安装或主题包来解决的，这个问题还需要持续跟进

解决方法（有待验证）：在butterfly主题教程中有看见通过npm方式下载主题包，个人认为此方式应该可以避免项目中存在别人的子仓库的问题，这样克隆安装时通过npm i会直接把包加进来

## 其他电脑下载源码进行配置

### 1.克隆项目

```git
git clone git@github.com:liujiaoy/liujiaoy.github.io.git
```

此时master分支hexo d生成的文件，开发时需切换至hexo分支

### 2.切换分支并安装依赖

```git
git switch hexo
npm install

git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly //安装主题文件
```

### 3.运行项目发布项目

```hexo
hexo s
hexo d
```
