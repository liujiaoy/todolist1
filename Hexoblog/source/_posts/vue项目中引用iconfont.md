---
title: vue项目中引用iconfont
date: 2021-03-31 15:46:24
cover: 01.png
top_image: 01.png
categories: 
    - code
tags:
    - vue
description: 在完善项目时发觉已经忘了怎么使用iconfont了，记录一下
---

## 官网登录

官网:[iconfont](https://www.iconfont.cn/)
最好使用github账号登录
[登录img](01.png)

## 创建项目

1.在”资源管理-我的项目“中创建一个项目，命名推荐与vu项目同名
[创建项目img](02.png)
2.在图标库找你所需要的icon并加入购物车
3.购物车的图标添加至项目
4.下载项目至本地

## vue项目使用

解压后讲图标文件放入vue项目相关文件夹中
[项目图](03.png)
!!注意：iconfont.css中的路径，如上图iconfont.css与其他文件不在同一文件夹，需要修改路径
[css路径图](04.png)
插入iconfont 代码中
解压的文件夹下demo_index.html有非常详细的例子
1.使用Unicode
2.使用font-class
3.Symbol 引用
