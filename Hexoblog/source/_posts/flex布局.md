---
title: flex布局
date: 2021-08-27 13:27:55
top_img: top_img.png
cover: top_img.png
tags:
    - CSS
categories:
    - code
---

## Flex 父容器属性

### flex-direction 方向

value：
- row(default)
    - 排列方式从右到左
- column
    - 排列方式从上到下
- row-reverse
    - 排列方式从左到右
- column-reverse
    - 排列方式从下到上

### flex-wrap  换行

value：
- nowrap(default)
    - 不换行
- wrap
    - 换行
- wrap-reverse
    - 相反的顺序换行
- initial
    - 设置该属性为它的默认值
- inherit
    - 从父元素继承

### justify-content  主轴上的对齐方式

value:
- flex-start(default)
    - 行首起始位置排列（主轴为row时左对齐）
- flex-end
    - 行尾排列（主轴为row时右对齐）
- center 
    - 居中
- space-between（|div     1     div|）
    - 分散对齐，左右顶格分散对齐
- space-around
    - 分散对齐，子容器左右间隔一致（|1div  2  div1|）
- space-evenly
    - 分散对齐，均匀分布，容器之间间隔一致（|1 div 1 div 1|）
- initial
    - 设置该属性为它的默认值
- inherit
    - 从父元素继承

### align-item  交叉轴上的对齐方式

value:
- stretch (default) 
    - 元素被拉伸以适应容器，遵照min/max-width/height属性限制
- center 
    - 元素位于容器的中心
- flex-start
    - 元素位于容器的开头
- flex-end
    - 元素位于容器的结尾
- baseline
    - 元素位于容器的基准线
- initial
    - 设置该属性为它的默认值
- inherit
    - 从父元素继承

### align-content

属性同align-item，用于对齐多行项目，将所有项目看成一个整体

## Flex 子容器属性

### order  排序依据

### flex-grow   扩展

### flex-shrink  缩放

### flex-basis  设置或检索弹性盒伸缩基准值

### flex  flex-grow flex=shrink flex-basis的缩写

### align-self

- 可覆盖align-item的值

