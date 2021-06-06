---
title: hexo安装以及常用指令
date: 2020-11-03 13:57:23
top_img: empty.jpg
cover: empty.jpg
tags: 
    - Hexo
categories: 
    - code
---

## Hexo 安装

暂未整理

## 常用指令

### 1.新建指令

新建文章

```hexo
hexo new "title" //title为文章的标签
//等价于
hexo new post "title"
```

新建草稿

``` hexo
hexo new  draft "xxx"
```

新建文件夹

``` hexo
hexo new page "xxx"
```

### 2.开启本地服务器

```hexo
hexo s
//等价于
hexo server
```

### 3.清除与生成public文件

一般在修改了配置文件的时候需要执行hexo clean hexo g 再hexo s开启服务

```hexo
hexo clean //清除缓存

hexo g //生成文件
```

### 4.部署文件

将本地数据部署到远端服务器

```hexo
hexo d
```

## 使用图片

在写博客的时候经常会需要用到图片，下面将hexo怎么引用图片比较方便

1、安装图片插件

``` npm
npm install hexo-asset-image --save
```

2、修改_config.yml中的一个设置
post_asset_folder:true
这个设置在new一个博客时创建一个同名文件夹，在这个文件夹中存图片
修改博客目录下node_modules\hexo-asset-image\index.js
![修改bug](bug.png)


3、插入图片语法

```markdown
![picture1](picture1.JPG)
```

[test01](test01.png)

![alt](http://static.runoob.com/images/runoob-logo.png)

<img src="test01.png" width="25%" height="25%" />