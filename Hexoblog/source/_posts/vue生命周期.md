---
title: vue生命周期
date: 2021-09-02 16:36:21
tags:
    - vue
categoies:
    - code
top_img: lifecycle.png
cover: lifecycle.png
---

## 前言

首先，这是一道被问频率很高的面试题，其次，他的使用频率也很高，不了解清楚容易踩坑。

## 生命周期图示

vue官网的图,配合下面的解释食用风味更佳

<img src="lifecycle.png" alt="vue生命周期" width="500">

## 生命周期钩子及使用场景

### BeforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

### 使用场景

此时连数据都没有，只能放些无关痛痒的操作，比如loadding

### Created

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

### 使用场景

data里面的数据有了，一般可以进行ajax请求了，但如果要用到页面dom的请求就还不能用

### BeforeMount

在挂载开始之前被调用：相关的 render 函数首次被调用。
该钩子在服务器端渲染期间不被调用。

### 使用场景

很少，或许可以修改render?

### Mounted

实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。
注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick：

``` js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```
该钩子在服务器端渲染期间不被调用。

### 使用场景

父子间的通信
修改数据会触发 beforeUpdate,Updated钩子函数

### BeforeUpdate

数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。

### 使用场景

弹出确定要修改吗？

### Updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

注意 updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick：
```js
updated: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
```
该钩子在服务器端渲染期间不被调用。

### 使用场景

### BeforeDestory

实例销毁之前调用。在这一步，实例仍然完全可用。
该钩子在服务器端渲染期间不被调用。

### 使用场景

离开页面前的行为
简单来说，就是一些你写 定时器/全局监听 事件，如果没有被销毁的话，会一直存在当前项目所有的生命周期中。
单纯的销毁组件并不会销毁定时器/监听事件，最终可能会影响页面出现卡顿或者 data 一直被反复修改。
所以需要在组件销毁时去清理这些东西

应用场景： 比如用户在提交form表单时，在内容填写 到 提交表单过程中，有后退或其他操作时可以在这个钩子提示内容尚未提交或保存，是否退出之类的

### Destoryed

实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
该钩子在服务器端渲染期间不被调用。

### 使用场景


