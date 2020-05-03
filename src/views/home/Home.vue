<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control tab-control-1" 
                  :titles='["流行","新款","精选"]' 
                  @changeTab="handleTabChange"
                  v-show="isFixedTabControl"
                  ref="tabControl1"
                   />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="scrollContent" @pullUp="loadMore" >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend :recommends="recommends" />
      <feature  />
      <tab-control class="tab-control" ref="tabControl"  :titles='["流行","新款","精选"]' @changeTab="handleTabChange" />
      
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goodsList/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"

import HomeSwiper from "./childComps/HomeSwiper"
import Recommend from "./childComps/Recommend"
import Feature from "./childComps/Feature"

import { getHomeMultidata,getHomeGoodsList } from "network/home"
import {debounce} from "@/common/util.js"
export default {
  name: 'Home',
  data() {
    return {
      banners:[],
      recommends:[],
      currentType:'pop',
      goods:{
        "pop":{
          page:0,
          list:[]
        },
        "new":{
          page:0,
          list:[]
        },
        "sell":{
          page:0,
          list:[]
        }
      },
      isShowBackTop:false,
      tabControlOffsetTop:0,
      isFixedTabControl:false,
      tabControlCurrent:0,
      scrollY:0
    };
  },
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    Recommend,
    Feature
  },
  created(){
    this.getMultidata()
    //获取商品列表数据
    this.getGoodsList("pop")
    this.getGoodsList("new")
    this.getGoodsList("sell")
  },
  mounted(){
    //监听图片加载是否完成
    let refresh = debounce(this.$refs.scroll.refresh,10)
    this.$bus.$on("imageLoad",() => {
      refresh("aaa","bbb")
      //console.log("-------------")
    })
    
  },
  destroyed() {
    console.log("home destroyed")
  },
  activated() {
    //console.log(this.scrollY,"jin")
    this.$refs.scroll.scrollTo(0,this.scrollY,0)
  //this.$refs.scroll.refresh()
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY()
    //console.log(this.scrollY)
  },
  methods: {
    //防抖
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args){
    //     if(timer){
    //       clearTimeout(timer)
    //     }
    //     timer = setTimeout(() => {
    //       func()
    //     },delay)
    //   }
    // },
    getMultidata(){
      getHomeMultidata().then(res=>{
        //console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    //获取商品列表数据
    getGoodsList(type){
      const page = this.goods[type].page + 1
      getHomeGoodsList(type,page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //console.log(this.goods)
      })
    },
    //切换tabControl
    handleTabChange(i){
      this.$refs.tabControl1.currentIndex = i;
      this.$refs.tabControl.currentIndex = i;
      switch(i){
        case 0 : {
          this.currentType = "pop"
          break
        }
        case 1 : {
          this.currentType = "new"
          break
        }
        case 2 : {
          this.currentType = "sell"
          break
        }
      }
    },
    //返回顶部
    backTop(){
      this.$refs.scroll.scrollTo(0,0,400)
    },
    //监听滚动距离，判断是否显示返回顶部按钮和tabControl是否吸顶
    scrollContent(position){
      this.isShowBackTop = Math.abs(position.y) > 1000
      //根据滑动距离和tabControl距离顶部的距离做对比，判断是否需要吸顶
      if(-position.y >= this.tabControlOffsetTop){
        this.isFixedTabControl = true
      }else{
        this.isFixedTabControl = false
      }
    },
    //上拉加载更多
    loadMore(){
      this.getGoodsList(this.currentType)
      this.$refs.scroll.finishPull()
    },
    //监听轮播图图片加载完毕
    swiperImgLoad(){
      this.$refs.scroll.refresh()
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
    }
  },
};
</script>

<style scoped>
#home {
  height:100vh;
  padding-top:44px;
}
.home-nav {
  background-color:var(--color-tint);
  color:#fff;
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:99;
}
.content {
  position:absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
  background:#fff;
}
.tab-control {
  position:sticky;
  top:44px;
}
.tab-control-1 {
  display:fixed;
  top:44px;
  left:0px;
  right:0;
  z-index:99
}
</style>
