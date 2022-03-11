---
title: BFC到底是什么
date: 2022-02-25 16:59:37
top_img: top_img.png
cover: top_img.png
tags:
    - HTML
categories:
    - code
---

## 关于BFC

这个问题可以穿插到清除浮动时问。
对于BFC，感觉是知其然而不知其所以然，只了解基本概念，比如全称是Block Formatting Context（块格式化上下文），可以清除浮动。
却没有详细去了解，今天查看了一下才有一种恍然大悟的感觉

[参考博客地址](https://www.cnblogs.com/qs-cnblogs/p/12349887.html)
[MDN文档地址](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## BFC的特性
1、属于同一个BFC的两个相邻容器的上下margin会重叠（重点）
2、计算BFC高度时浮动元素也参于计算（重点）
3、BFC的区域不会与浮动容器发生重叠（重点）
4、BFC内的容器在垂直方向依次排列
5、元素的margin-left与其包含块的border-left相接触
6、BFC是独立容器，容器内部元素不会影响容器外部元素

## BFC解决了什么问题

块格式化上下文对浮动定位与清除浮动都很重要。
浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。
外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

### 1.margin边距重叠

将他们置于不同的BFC可以解决这个问题

### 2.Float脱离文档流高度塌陷

BFC的特性，上代码看效果

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css" type="text/css">
</head>
<body>
  <div class="outerBox">
    <div class="boxa float-div">
      boxa
    </div>
    <div class="boxb">
      boxb
    </div>
  </div>
</body>
</html>
```

``` CSS
.outerBox{
  background-color: green;
}
.boxa {
  background-color: red;
  width: 100px;
  height: 100px;
}

.boxb {
  background-color: bisque;
  width: 200px;
  /* height: 200px; */
}
.float-div{
  float: left;
}
```

高度塌陷效果图
![高度塌陷](高度塌陷.png)

outerBox触发BFC
``` CSS  
.outerBox{
  background-color: green;
  overflow: hidden;
}
```

解决高度塌陷效果图
![解决高度塌陷](解决高度塌陷.png)



### 3.两栏布局

接上面boxb触发BFC，boxa和boxb互不影响形成两栏效果

html同上
css如下

```CSS
.outerBox{
  background-color: green;
  /* overflow: hidden; */
}
.boxa {
  background-color: red;
  width: 100px;
  height: 100px;
  overflow: auto;
}

.boxb {
  background-color: bisque;
  overflow: hidden;
  /* width: 200px; */
  height: 200px;
  /* display: flex; */
}
.float-div{
  float: left;
}
```

## BFC的触发条件

- 根元素（html）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width (en-US) 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。


