---
title: 域名关联GitHub Page
date: 2021-05-19 10:40:33
top_img: 01.png
cover: 01.png
tags:
    - Git
categories: 
    - code
---

## 背景

github Pages提供了外界访问的入口，让自己的项目可以被别人看见，但是网址不简洁，我想拥有自己的网址。
之前已经购买过域名并且根据别人的博客教程的顺利的和github page关联上了，但是我的域名没续费过期了，今天想起再买回来，顺带记录其中步骤。

## 购买域名

1.简单点直接选阿里云，登录后（之前注册过，注册步骤省略）搜索域名即可，不然真不好找
附图![登录搜索域名](01.png)
2.输入自己想要的域名加购购买...此处跟购物一样省略
3.购买成功后可进入"管理我的域名"，请注意域名状态，可能会是审核中，审核完成后配置的域名解析才会生效
  ![域名管理入口](02.png)
4.添加域名解析（重要）
  ![添加域名解析](03.png)
  ![添加域名解析](04.png)
使用新手引导将github page IP地址填进去就ok啦
例如我的page地址为liujiaoy.Github.io
win+R cmd ping liujiaoy.Github.io之后可以得到IP地址
  ![获取ip地址](05.png)

## github添加关联

在github page项目中添加CNAME文件，文件中填入自己的域名
![CNAME关联](06.png)