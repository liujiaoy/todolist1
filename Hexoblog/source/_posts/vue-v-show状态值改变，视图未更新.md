---
title: vue v-show状态值改变，视图未更新
date: 2021-03-31 15:46:24
top_img: images/冬雪.jpg
cover: images/冬雪.jpg
categories: 
    - code
tags:
    - vue
description: vue列表存在父子关系，在点击父级子级想要呈现toggle模式时遇到困难
---

## 思路

每个父级都有一个点击事件，改变子级的显示隐藏状态,这个状态存放在item对象中
核心即为
1.子级显示状态值v-show="item.isshow"
2.父级点击事件handleTitleClick，点击改变v-show状态值
问题：状态值改变之后视图未更新，
原因：直接给对象添加属性不会引起视图改变
<b>解决：使用this.$set(this.data,'key',value)</b>

## 关于Vue.set

[vue官网关于set的文档](https://cn.vuejs.org/v2/api/#Vue-set)

## 附上代码

```vue
<template>
  <div class="mp">
    <div class="mp-main">
      <div class="item"
      v-for="(item,index) of mpContent"
      :key="index"
      >
        <div class="item-title border-bottom"
          @click="handleTitleClick(item)">{{item.title}}</div>
        <div class="item-child"
          v-if="item.children"
          v-show="item.isshow"
        >
          <detail-container :mpContent="item.children"></detail-container>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailContainer',
  props: {
    mpContent: Array
  },
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.mpContent)
  },
  methods: {
    handleTitleClick (item) {
      // item.isshow = !(item.isshow === undefined ? false : item.isshow)
      this.$set(item, 'isshow', !(item.isshow === undefined ? false : item.isshow))
      console.log(item.isshow)
    } 
  }
}

</script>
```

对应的数据

``` json
    "categoryList": [{
        "title": "成人票",
        "children": [{
          "title": "成人三馆联票",
          "children": [{
            "title": "成人三馆联票 - 某一连锁店销售"
          }]
        },{
          "title": "成人五馆联票"
        }]
      }, {
        "title": "学生票",
        "children": [{
          "title": "学生三馆联票",
          "children": [{
            "title": "学生三馆联票 - 某一连锁店销售"
          }]
        },{
          "title": "学生五馆联票"
        }]
      }, {
        "title": "儿童票",
        "children": [{
          "title": "儿童三馆联票",
          "children": [{
            "title": "儿童三馆联票 - 某一连锁店销售"
          }]
        },{
          "title": "儿童五馆联票"
        }]
      }, {
        "title": "特惠票",
        "children": [{
          "title": "特惠三馆联票",
          "children": [{
            "title": "特惠三馆联票 - 某一连锁店销售"
          }]
        },{
          "title": "特惠五馆联票"
        }]
      }]
    ```

