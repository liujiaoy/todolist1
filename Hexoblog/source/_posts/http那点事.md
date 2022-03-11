---
title: http那点事
date: 2022-03-01 13:21:10
top_img: top_img.png
cover: top_img.png
tags:
    - http相关
categories:
    - code
---

## HTTP相关面试题

### 一个页面从输入URL到页面显示加载完成，这个过程都发生了什么

应该是当之无愧的高频问题吧,[参考文章](https://segmentfault.com/a/1190000006879700)
1. DNS解析
2. 建立TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析页面
6. 连接结束

#### 1.DNS解析涉及知识点

实现域名到IP地址的转换
例子：查询www.google.com的IP地址
查询过程 .=> .com => google.com => www.google.com

DNS优化
- DNS缓存
DNS缓存（浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存）
- DNS负载均衡（DNS重定向）
选择合适的服务器返回给用户

#### 2.TCP连接

HTTPS协议（HTTP+SSL/TLS）
HTTP报文是包裹在TCP报文中发送的，服务端收到TCP报文时会提取出HTTP报文，但因为HTTP报文是明文的，存在安全隐患，所以产生了HTTPS
即在HTTP报文包裹进TCP报文中之前使用SSL/TLS进行加密，层级上位于HTTP协议和TCP之间

HTTPS过程
HTTPS在传输数据之前需要客户端和服务器进行一个握手（TLS/SSL握手），在握手过程中将确认双方的加密密码信息。TLS/SSL使用了非对称加密，对称加密，hash等。
HTTPS相对HTTP，增加了安全性，但同时也带来了一定时间上的损耗。

#### 3.HTTP请求

发送HTTP请求的过程其实就是构建HTTP报文并通过TCP协议发送到服务器指定的端口（http协议80/8080，HTTPS协议443）.
HTTP请求报文包括三个部分：请求行 请求报头 请求正文

请求行

格式如下：
> Method Request-URL HTTP-Version CRLF
> eg: GET index.html HTTP/1.1

常用的方法有：GET POST PUT DELETE OPTIONS HEAD

请求报头
常见的请求报头有: Accept, Accept-Charset, Accept-Encoding, Accept-Language, Content-Type, Authorization, Cookie, User-Agent等。

请求正文
当使用POST, PUT等方法时，通常需要客户端向服务器传递数据。这些数据就储存在请求正文中。在请求包头中有一些与请求正文相关的信息，例如: 现在的Web应用通常采用Rest架构，请求的数据格式一般为json。这时就需要设置Content-Type: application/json



### HTTP和HTTPS的区别

1.端口
    HTTP:80
    HTTPS:443
2.http不加密，https加密报文
3.http无连接，https握手阶段较为费时
4.https需要ca证书


### 常见的HTTP状态码

[参考文章]（https://seo.juziseo.com/doc/http_code/）
- 这一组状态码表明这是一个临时性响应。此响应仅由状态行和可选的HTTP头组成，以一个空行结尾。由于HTTP／1.0未定义任何1xx状态码，所以不要向HTTP／1.0客户端发送1xx响应。
- 1xx  请求信息
    - 100 Continue
    - 101 Switching protocols
    - 102 Processing

2xx  接收成功
    - 这一组状态码表明客户端的请求已经被服务器端成功接收并正确解析。
3xx  重定向
    - 这一组状态码表示客户端需要采取更进一步的行动来完成请求。通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的Location域中指明。
4xx  客户器错误
5xx  服务器错误

#### 301和302有什么区别

301 Moved Permanently  永久重定向
302 Found   临时重定向
　　302重定向只是暂时的重定向，搜索引擎会抓取新的内容而保留旧的地址，因为服务器返回302，所以，搜索搜索引擎认为新的网址是暂时的。
　　而301重定向是永久的重定向，搜索引擎在抓取新的内容的同时也将旧的网址替换为了重定向之后的网址。

### HTTP缓存
