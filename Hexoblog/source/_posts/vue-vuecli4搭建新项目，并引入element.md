---
title: vue/vuecli4搭建新项目，并引入element
date: 2021-10-09 13:13:05
top_img: topimg.png
cover: topimg.png
tags:
  - vue
  - element
categories:
  - code
---

## 一、vue create my-projectname

```code
  vue create my-projectname
```
<img src="1.png" alt="创建项目选择配置" width="500">
这边可以直接选择默认的配置，我选择了最后一个自己配置sass，babel，route，vuex，eslint

## 二、添加element 

element 官网(https://element.eleme.cn/#/zh-CN/component/quickstart)

这里值得注意！！vue@cli4直接一行命令搞定按需引入

> vue add element

这样项目文件中多了如图所示的plugin文件夹，里面的element.js中用于添加你需要引入的element模块。
main.js已经自行引入了此文件，接下来只需要使用即可

## 碎碎念

之前根据element文档后面的按需引入来进行操作，发现找不到 babelrc文件，原来现在变成了babel.config.js,
而且只需要一行命令就完美配置，真的牛