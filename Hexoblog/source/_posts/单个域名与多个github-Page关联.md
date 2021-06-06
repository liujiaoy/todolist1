---
title: 单个域名与多个github Page关联
date: 2021-05-24 08:52:16
top_img: 01.png
cover: 01.png
tags:
    - Git
categories: 
    - code
---

## 背景

最近在准备简历，于是想把自己的项目都变为所有人可查看，知道可以通过github Pages实现，域名特定为username.gihub.io，之前已实现。但是放在gitHub上的项目有多个，我都想展示怎么实现？之前理解为只能有一个项目能使用githubPage，可是github Pages不可能真的只能展示一个项目吧，搜索了一下真的可以展示多个项目！果然我这种小垃圾遇到的问题，其他人早也遇到过并且解决了。

## 正确解读

这边借用简书上别人文章的段落进行说明，[原文链接](https://www.jianshu.com/p/556e9b661064)
>要发布用户站点，必须创建名为 \<user>.github.io 的用户帐户所拥有的仓库。 要发布组织站点，必须创建名为 \<organization>.github.io 的组织所拥有的仓库。
>除非您使用自定义域，否则用户和组织站点位于 http(s)://\<username>.github.io 或 http(s)://\<organization>.github.io。
>项目站点的源文件与其项目存储在同一个仓库中。
>除非您使用自定义域，否则项目站点位于 http(s)://\<user>.github.io/\<repository> 或 http(s)://\<organization>.github.io/\<repository>。
>您只能为每个 GitHub 帐户创建一个用户或组织站点。 项目站点（无论是组织还是用户帐户拥有）没有限制。

## 实现方式

### 1.进入github自己的项目仓库，点击相应项目的setting

如下图 ![进入setting](01.png) <center>进入setting</center>

### 2.找到pages,选择source并save

如下图![pages配置](02.png) <center>pages配置</center>

### 3.Custom domain如果有自己的域名可以填自己的域名

例如我的域名为*better2020.top*,也可以通过cname来创建子域名 travel.better2020.top
![配置域名解析](03.png) <center>配置域名解析</center>
