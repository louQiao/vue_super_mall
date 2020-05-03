<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name: 'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      loadNub:0
    };
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad(){
      this.loadNub ++;
      if(this.loadNub == this.banners.length){
        this.$emit("swiperImgLoad")
      }
    }
  },
};
</script>

<style scoped>

</style>
