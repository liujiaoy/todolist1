---
title: vue瀑布流布局
date: 2021-08-04 08:54:36
top_img: 瀑布流.png
cover: 瀑布流.png
categories: 
    - code
tags:
    - vue
---

## 今天用vue实现瀑布流布局

### 介绍一下瀑布流布局

瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。最早采用此布局的网站是Pinterest，逐渐在国内流行开来。国内大多数清新站基本为这类风格。

### 做个小案例来理解：照片墙

#### 案例网址 http://travel.better2020.top/dist/#/profile

#### 思路分析

瀑布流布局的特点是等宽不等高。
为了让最后一行的差距最小，从第二行开始，需要将图片放在第一行最矮的图片下面，以此类推。
实现方式
1.css3 column 可直接实现，缺点为图片竖向排列
2.绝对定位，通过top和left值来确定元素的位置，假设3列 var arr = [height1,height2,height3]
3.flex 弹性布局 每一行为一个容器，每次追加图片到最矮的容器即可
2和3的方法很接近，这次我通过3来实现

#### 开始

1.确定列数
    可以通过固定宽度，动态计算列数，也可以确定列数，动态决定宽度

2.获取数据

3.渲染至页面

```javascript
    mountMenu(arg) {
      // console.log(this.dataList.length)
      var temp = this.mainMenuList
      var index = arg || 0
      var refName = this.selectCol();
      var _this =  this;
      if (temp.length > index) {
        this.dataList[refName].push(this.mainMenuList[index])
        this.$nextTick(() => {
          let newimg = new Image();
          newimg.src = this.mainMenuList[index].imgUrl;
          //获取图片高度
          newimg.onload = function(){
            let scale = newimg.height/newimg.width;
            let img = _this.$refs.img[index];
            img.height=img.width*scale;
            _this.lazyloadimg(index)  
            _this.mountMenu(index + 1)             
          } 
        })
      }
    },
```

此处注意点：1）每次图片的添加需要等图片加载完成之后才能得到图片的高度，图片加载完成函数img.onload = function(){...}
         2)dom更新之后才能继续下一张图片的加载，因为要获取列的高度this.$nextTick
4.上完整代码

#### template部分，确定图片的布局

``` vue
<template>
  <div>
    <div class="box" ref="box">
      <div class="col" :style="colwidth" v-for="(itemdata,name,index) in dataList" :key=index  ref="col">
        <div class="item border-right border-bottom" v-for="item of itemdata" :key="item.id" >
          <img src="../../../assets/img/1.jpg" :data-src="item.imgUrl"  ref="img" >
          <div class="title">{{item.title}}</div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
```

#### js部分，主要的逻辑实现都在这里，顺带简单实现了一下图片懒加载，即只有元素在可见区域里，才加载图片

``` javascript
<script>
export default {
  name: 'Waterfall',
  props:{
    col:2,//列数
    mainMenuList:Array//图片信息
  },
  data() {
    return{
      // mainMenuList: [],
      dataList:{},
      scrolltime:null
     
    }
  },
  computed:{
    //列宽
    colwidth:function(){
      return{
        width:(100/Object.keys(this.dataList).length)+"%",
        color:"red"
      }
    },
  },
  created(){
    this.initdataList();//dom挂载
  },
  mounted() {
    window.addEventListener('scroll',this.listenScroll, true)
  },
  methods: {
    //加载数据
    mountMenu(arg) {
      var temp = this.mainMenuList
      var index = arg || 0
      var refName = this.selectCol();
      var _this =  this;
      if (temp.length > index) {
        this.dataList[refName].push(this.mainMenuList[index])
        this.$nextTick(() => {
          let newimg = new Image();
          newimg.src = this.mainMenuList[index].imgUrl;
          newimg.onload = function(){
            let scale = newimg.height/newimg.width;
            let img = _this.$refs.img[index];
            img.height=img.width*scale;
            _this.lazyloadimg(index); 
            _this.mountMenu(index + 1);             
          } 
        })
      }
    },
    //选择高度最矮的列
    selectCol() {
      let cols = this.$refs.col;//所有列
      let lowcol=0;
      let lowheight = cols[lowcol].offsetHeight;
      for (let index = 0; index<this.col; index++) {
        let item = cols[index];
        let itemheight = item.offsetHeight;
        if(lowheight >= itemheight){
          lowheight = itemheight;
          lowcol = index;
        }
      }
      return lowcol;
    },
    //图片懒加载，只显示当前页面的image
    lazyloadimg(index) {
      let scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let winH = document.documentElement.clientHeight;
      let elem = this.$refs.img[index];
      if(elem == undefined){return}
      let elemposition  = elem.getBoundingClientRect();
      let elemTop = elemposition.top;
      let elemBot = elemposition.bottom;
      if(elem.dataset.src&&((elemTop>0 && elemTop<winH)||(elemBot>0 && elemBot<winH))){
        elem.src = elem.dataset.src;
        elem.dataset.src = "";
      }
    },
    //将dom挂载到Vue实例，不然后续插入元素页面不会改变
    initdataList(){
      for(let i = 0;i<this.col;i++){
        this.$set(this.dataList,i,[])
      }
    },
    //监听页面滚动，防抖
    listenScroll(){
      // console.log("scroll")
      clearTimeout(this.scrolltime);
      this.scrolltime = setTimeout(this.handleScroll,200);
    },
    //处理页面滚动
    handleScroll(){
      let length = 0;
      while(length<this.mainMenuList.length){
        this.lazyloadimg(length);
        length ++;
      }
      
    }
  }
}
</script>
```

#### css部分

``` css
<style lang="stylus" scoped>
*
  box-sizing border-box
.box
  width 100%
  display flex
  align-items flex-start
.col img
  width 100%
  padding .1rem
.item .title
  text-align center
  line-height .5rem
.border-right,.border-bottom
  border 1px solid #ddd
</style>

```

#### 图片数据

``` json
{
    "ret": true,
    "data": [{
        "id":1,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":2,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":32,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片32",
        "desc":"壁纸"
    },{
        "id":33,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201407%2F20%2F20140720141804_j2zi5.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222627&t=77f7308f43c26e272857fed6549fb3bb",
        "title":"图片33",
        "desc":"壁纸"
    },{
        "id":35,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180629%2F0c07976d1c4942009eee1c95a5cec5f6.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222627&t=8b5054e5614268f4381436a7c6755aed",
        "title":"图片2",
        "desc":"壁纸"
    },{
        "id":36,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-23ef0ef1a833415e276b057a7c718371_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222627&t=ae7d428e51e81b1e1e7788b4c092b034",
        "title":"图片2",
        "desc":"壁纸"
    },{
        "id":3,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":4,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":5,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":6,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":7,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":8,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":9,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":10,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":11,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":12,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":13,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":14,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":15,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":16,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":17,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":18,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":19,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":20,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":21,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":22,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":23,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":24,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":25,
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":26,
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":27,
        "imgUrl": "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7af40ad162d9f2d32ec6b91facec8a136227cc6f.jpg",
        "title":"图片1",
        "desc":"衣服"
    },{
        "id":28,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fblog%2F201306%2F19%2F20130619130519_rPMZr.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222566&t=e08da9372f706f46c272a432641fd3eb",
        "title":"图片2",
        "desc":"衣服"
    },{
        "id":29,
        "imgUrl": "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7af40ad162d9f2d32ec6b91facec8a136227cc6f.jpg",
        "title":"图片29",
        "desc":"衣服"
    },{
        "id":30,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201806%2F06%2F211948u71hl59993sw560s.jpg&refer=http%3A%2F%2Fbbsfiles.vivo.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222627&t=8105c099c2d014ff9b67b0f545848357",
        "title":"图片30",
        "desc":"壁纸"
    },{
        "id":31,
        "imgUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201806%2F06%2F211948u71hl59993sw560s.jpg&refer=http%3A%2F%2Fbbsfiles.vivo.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630222627&t=8105c099c2d014ff9b67b0f545848357",
        "title":"图片31",
        "desc":"壁纸"
    }
]
  }
  
```