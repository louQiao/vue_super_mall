<template>
  <div id="detail">
    <detail-nav  :titles="titles" @navClick="handleNavClick" ref="nav" />
    <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="banners" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImgLoad="goodsImgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comments" :comment-info="commentInfo" />
      <goods-list ref="goodsList" :goods="recommends" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goodsList/GoodsList"

import DetailNav from "./childComps/DetailNav"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import { getDetailData,Goods,Shop,GoodsParam,getRecommend } from "network/detail"

import { imgLoadMixin,backTopMixin } from "@/common/mixin"
import { debounce } from "@/common/util"
export default {
  name: 'Detail',
  mixins:[imgLoadMixin,backTopMixin],
  data() {
    return {
      iid:null,
      titles:["商品","参数","评论","推荐"],
      banners:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[], //推荐数据
      imgLoadListener:null,
      offsetTopY:[],
      imgDebounce:null,
      currentTheme:0
    };
  },
 
  components:{
    Scroll,
    GoodsList,

    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  
  },
  created(){
    this.iid = this.$route.params.iid;
    this.getDetails(this.iid)
    getRecommend().then(res => {
      this.recommends = res.data.list;
      //console.log(this.recommends)
    })
    this.imgDebounce = debounce(() => {
      this.offsetTopY = []
      this.offsetTopY.push(0)
      this.offsetTopY.push(this.$refs.params.$el.offsetTop - 44)
      this.offsetTopY.push(this.$refs.comments.$el.offsetTop - 44)
      this.offsetTopY.push(this.$refs.goodsList.$el.offsetTop - 44)
      console.log(this.offsetTopY)
    },100)
  },
  destroyed() {
    this.$bus.$off("imageLoad",this.imgLoadListener)
  },

  methods: {
    //获取数据
    getDetails(iid){
      getDetailData(iid).then(res => {
        //console.log(res)
        const data = res.result;
        this.banners = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取详情信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论数据
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    back(){
      this.$router.go(-1)
    },
    goodsImgLoad(){
      this.refresh()
      this.imgDebounce()
    },
    handleNavClick(index){
      this.$refs.scroll.scrollTo(0,-this.offsetTopY[index],300)
    },
    //监听滚动事件
    contentScroll(position){
      let positionY = -position.y
      let length = this.offsetTopY.length;
      for(let i=0;i<length;i++){
        if( i !== this.currentTheme &&((i<length-1 && positionY >= this.offsetTopY[i] && positionY < this.offsetTopY[i+1]) || (i==length-1 && positionY >= this.offsetTopY[i]))){
            console.log(i)
            this.currentTheme = i;
            this.$refs.nav.currentIndex = i;
        }
      }
      //是否显示回到顶部
      this.listenerScroll(position)
    },
    //加入购物车
    
    
  },
};
</script>

<style scoped>
#detail {
  height:100vh;
  position:relative;
  z-index:1;
}
.detail-content {
  height:calc(100% - 44px);
  background:#fff;
}
</style>
