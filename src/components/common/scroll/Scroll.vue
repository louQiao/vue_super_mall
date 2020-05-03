<template>
  <div ref="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      BScroll:null
    };
  },
  mounted(){
    this.BScroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    this.BScroll.on("scroll",position => {
      this.$emit("scroll",position)
    })

    this.BScroll.on("pullingUp",() => {
      this.$emit("pullUp")
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.BScroll && this.BScroll.scrollTo(x,y,time)
    },
    finishPull(){
      this.BScroll && this.BScroll.finishPullUp()
    },
    refresh(a,b){
      //console.log("------------",a,b)
      this.BScroll && this.BScroll.refresh()
    },
    getScrollY(){
      return this.BScroll && this.BScroll.y;
    }
  },
};
</script>

<style scoped>

</style>
