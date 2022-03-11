---
title: 面试题之JS
date: 2021-08-27 14:19:17
top_img: top_img.png
cover: top_img.png
tags:
    - JS
categories:
    - code
---

## js数据类型

7 大数据类型
- Number (数字)
- String (字符串)
- Boolean (布尔)
- Symbol (符号)
- Object (对象)
  - function (函数)
  - Array (数组)
  - Date (日期)
  - RegExp (正则表达式)
- Null (空)
- Undefined (未定义)

五种基本数据类型 Number,Null,Undefined,Boolean,String
一种复杂数据类型 Object
es6 新加入 symbol

## null与undefined

- undefined 已声明，未定义
- null 空值

## 判断数据类型的方法

### 一、typeof

- 优点：能够快速区分基本数据类型 
- 缺点：不能将Object、Array和Null区分，都返回object
- 注意！ typeof(null)//object 但typeof 可以检测function

### 二、instanceof

可进一步区分object为对象还是数组还是函数
- 优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象 
- 缺点：Number，Boolean，String基本数据类型不能判断

### 三、Object.prototype.toString.call()

```js
var toString = Object.prototype.toString;
 
console.log(toString.call(1));                      //[object Number]
console.log(toString.call(true));                   //[object Boolean]
console.log(toString.call('abc'));                  //[object String]
console.log(toString.call([]));                     //[object Array]
console.log(toString.call({}));                     //[object Object]
console.log(toString.call(function(){}));           //[object Function]
console.log(toString.call(undefined));              //[object Undefined]
console.log(toString.call(null));                   //[object Null]
```

- 优点：精准判断数据类型 
- 缺点：写法繁琐不容易记，推荐进行封装后使用 
<b>为什么可以这么干？</b>
Number Boolean String这些类型原型也指向Object,可以调用它上面的toString
<b>那为什么要用prototype再call一下呢？</b>
因为其实Number String之类的已经重写过了toString方法

## 原生ajax

其实很简单
1.创建xhr(xmlhttprequest)对象
2.请求参数，url ，类型，参数等
3.发送请求
4.监听回调xhr.onreadystate change,说明请求完成

```js
//步骤一:创建异步对象
var ajax = new XMLHttpRequest();
//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
ajax.open('get','getStar.php?starName='+name);
//步骤三:发送请求
ajax.send();
//步骤四:注册事件 onreadystatechange 状态改变就会调用
ajax.onreadystatechange = function () {   if (ajax.readyState==4 &&ajax.status==200) {
    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的　　　　console.log(ajax.responseText);//输入相应的内容  　　}
}
```

## 对象深浅拷贝

### 浅拷贝

一.object.assign(target,souce)//Object.assign({},{a:1,b:2})

二.手动实现
自己实现也很简单，就一个for循环进行赋值

```javascript
function simpleClone(obj) {
    var result = {};
    for (var i in obj) {
        result[i] = obj[i];
    }
    return result;
}
```

### 深拷贝

一.json.parse(json.stringfy(obj))
缺点：
（1）如果对象里有函数,函数无法被拷贝下来
（2）无法拷贝Obj对象原型链上的属性和方法
（3）当数据的层次很深，会栈溢出
二.手动实现
也没想象中难，就用递归把所有属性都复制下来,但是其中有比较多的细节可以注意

```javascript
function deepClone(obj) {
    var result = {};
    for (var i in obj) {
        if(typeof obj[i] === "object"){
             result[i] = deepClone(obj[i])
        }else{
            result[i] = obj[i];
        }
        
    }
    return result;
}

function deepCopyTwo(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj == 'object') {
        for (const key in obj) {
            //判断obj子元素是否为对象，如果是，递归复制
            if (obj[key] && typeof obj[key] === "object") {
                objClone[key] = deepCopyTwo(obj[key]);
            } else {
                //如果不是，简单复制
                objClone[key] = obj[key];
            }
        }
    }
    return objClone;
}

```

## this指向问题

<!-- - this指的是函数运行时所在的环境 -->
- this指向-记住一句话：谁调用，指向谁

下面来做几道题理解
第一道

``` js
function foo() { 
    console.log(this.bar); 
} 
var bar = "bar1"; 
var o2 = {bar: "bar2", foo: foo}; 
var o3 = {bar: "bar3", foo: foo}; 

foo();   //  "bar1";  window.foo()       
o2.foo();   //"bar2"       
foo.call(o3);  //"bar3" 改变this指向o3
```
第二道
``` js
var name = 'Nicolas';
function Person(){
    this.name = 'Smiley';
    this.sayName=function(){
        console.log(this); 
        console.log(this.name); //'Smiley'
    };
    setTimeout(this.sayName, 0);     // 第二次输出,'Nicolas'
}

var person = new Person();  
person.sayName();	// 'Smiley','Nicolas'
//person.sayname();指向person
//setTimeout 指向window
```
第三道
``` js
var length = 10;
function fn() {
	console.info(this.length)
}
fn();  // A window.fn(); 10
let Person = {
	len: 5,
	say: function() {
		fn();  // B  隐式调用 默认还是window；10
		arguments[0]();  // C
	}
}
Person.say(fn);
```

另外需要记住的：
- 箭头函数指向最近作用的this
- bind，apply,call可以改变this指向

## 数组去重的几种方式

- for循环 利用for嵌套for，然后splice去重（ES5中最常用）
- filter
- Set
...
总结来说就是两个类型
1.两层循环法
2.利用语法自身键不可重复性


## 类数组转化为数组

Array.prototype.slice.call()

## 防抖节流

节流，函数一段时间内只触发一次 //写个滚动分页就能用到了
触底加载下一页数据，一定时间内只想触发一次

防抖，持续触发只执行最后一次触发//写个固定表头就能用到了

## 闭包

一个函数能访问另一个函数的作用域就是闭包
最简单的闭包就是function 里面再写一个function

闭包的缺点：
- 内存泄漏

闭包的优点: 

- 读取函数内部的变量
- 创建一个安全的环境，保证内部代码不受到外部的干涉，(实现私有成员，对外只暴露几个接口)

## 跨域问题

我觉得这个问题挺大的，另开一篇文来写吧
已经写了
- jsonp
- iframe
- cors
- nginx
[文章链接](解决跨域问题的几种方法.md)

## 原型链相关

MDN的解释
>JavaScript 只有一种结构：对象。每个实例对象（object）都有一个私有属性（称之为 \__proto__ ）指向它的构造函数的原型对象（prototype）。该原型对象也有一个自己的原型对象（\__proto__），层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

__proto__像一个链接，指向对象的构造函数的prototype,函数才有prototype
``` js
var Foo = function(){
  var s = 10;
}
var foo = new Foo();
var b = function(){
  return
}
console.log(foo.__proto__);//{constructor: ƒ...}
console.log(foo.prototype);//undefined
console.log(Foo.prototype === foo.__proto__);//true
```



## 事件委托

一开始觉得这是个什么简单问题，在jquery里面直接用就好了

``` js

$(selector).on(event,childSelector,data,function)

```
![描述](jqueryOn.png)

看了别人的文章之后，发现自己其实只会用，并不清楚其中原理。
所以，事件委托到底是个什么东西呢？

其实就是委托父级代为执行事件，利用的是事件冒泡原理，元素的事件可以冒泡到父级，例如：要让ul里面的li点击事件，最原始的方法就是循环给所有的li增加点击事件，通过委托给ul，只需要在ul上添加一个点击事件即可。
委托的优势还有，对于新加入的li节点，点击也可以触发事件。

[这边有一篇讲的很细致的参考博客](https://www.cnblogs.com/liugang-vip/p/5616484.html)
我感觉我这就是一篇博客收集文，😀


## 输入url之后，到底发生了什么？

这个问题，很眼熟吧，但是记不住，亏我之前还是网络专业的

- 1.DNS解析
- 2.建立TCP连接 
  ![三次握手 ](tcp.jpg)
  - 第一次握手：客户端尝试连接服务器，向服务器发送 syn 包（同步序列编号Synchronize Sequence Numbers），syn=j，客户端进入 SYN_SEND 状态等待服务器确认
  - 第二次握手：服务器接收客户端syn包并确认（ack=j+1），同时向客户端发送一个 SYN包（syn=k），即 SYN+ACK 包，此时服务器进入 SYN_RECV 状态
  - 第三次握手：第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手
- 3.发送http请求
- 4.接收响应结果
- 5.解析html
- 6.渲染

 ![输入url之后，到底发生了什么](url.png)

## http与https

二者区别：https安全性较高

> HTTP 与 HTTPS 区别
  HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。
  使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用。证书颁发机构如：Symantec、Comodo、GoDaddy 和 GlobalSign 等。
  HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。
  http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
  HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。
  https = http + ssl
  https对传输数据进行加密处理
  
HTTPS 的工作原理
 ![HTTPS 的工作原理](https-intro.png)

## 重排与重绘

能当那意思，但好像说不了很清晰

重排比重绘不好

对dom进行操作会导致重排
改变css之类的属性只会引起重绘


## ES6新特性

[阮一峰的博客](https://es6.ruanyifeng.com/)

这里只讲几个常见容易记的
  
### const和let
- const:只读常量
    const对象之能使对象的地址不变，对象里面的值控制不了
- let:局部变量
    1）只在当前代码块有效
    2）不会出现变量提升
    3）存在暂时性死区
    4）不允许重复声明

### 变量的解构赋值

- 形如 let [a,b] = [1,2]
- 解构赋值允许指定默认值
  let[x,y='2'] = [1]
- 应用:值的交换
  let a =10,b=20;
  [a,b] = [b,a]

### 模板字面量

这个其实没什么好说的，但我觉得对于我这种写过jquery的人来说，这东西太好了
```js
  //原来的写法
  var str = "<div>"
          +"<span>"+name+"</span>"
          +"</div>";
  //多好啊
  var str1 = `<div>
                <span>${name}</span>
            </div>`;
```

### 展开运算符

三个点

- 合并数组
- 替代apply
- 解构赋值
- 字符串转数组
- 具有 Iterator 接口的对象,转换成数组
- 浅拷贝
[ES6之展开运算符(...)](https://www.jianshu.com/p/3935a80342a0)

### 剩余参数(可变参数)

也是三个点
用于剩余的将不定数量的参数收集成数组
我觉得上面展开运算符的解构赋值就是剩余参数

### ES6箭头函数

- this 指向不能改变
- this指向箭头函数创建词法作用域的this

### 默认参数函数

- function test(a=2,b)

### 默认值与解构

``` js
var foo = function({x=2,y}){
  console.log(x,y)
}
foo({y:10})
```
### Promise

``` js
 // 第四题：手动实现Promise
    class myPromise{
      constructor (handle){
        if(typeof handle !== "function"){
            throw new TypeError('Promise resolver ${executor} is not a function')
        }
        //记录状态和值的改变
        //初始化值
        this.value = null //终值
        this.reason = null //拒因
        this.state = 'pending' //状态
        const resolve = value =>{
          //成功后的一系列操作（状态的改变，成功回调的执行）
          if(this.state === 'pending'){
            //状态进行改变
            this.state = 'fulfilled'
            //执行成功的回调，把终值进行赋值
            this.value = value
          }
        }
        const reject = reason =>{
            //失败后的一系列操作（状态的改变，失败回调的执行）
            if(this.state === 'pending'){
                //状态进行改变
                this.state = 'rejected'
                //执行成功的回调，把据因进行赋值
                this.reason = reason
            }
        }
        executor(resolve,reject)
      }
    }
```

### for...of循环

可迭代类型的数据都可以使用for of循环，不需要通过下标来取值

### 类与继承

这一块比较复杂，再开一篇
