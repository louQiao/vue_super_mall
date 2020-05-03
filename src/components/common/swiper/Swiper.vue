<template>
  <div id="hy-swiper">
    <div class="swiper" ref="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
          <div v-for="(item,index) in slideCount" :key="index" :class="['indicator-item',index === currentIndex-1 ? 'active':'']"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props:{
    //多少秒显示下一张
    interval:{
      type:Number,
      default:2500
    },
    //移动动画的时间
    animateDuration:{
      type:Number,
      default:300
    },
    //手指移动的话，移动到swiper宽度的多少比例，松手后它自动移动
    moveRatio:{
      type:Number,
      default:0.25
    },
    //是否显示小圆点
    showIndicator:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      slideCount:0,   //滑块个数，一共几个元素
      totalWidth:0,   //swiper的宽度
      swiperStyle:{},   //swiper的样式
      currentIndex:1,   //当前显示第几个
      scrolling:false   //是否正在滚动
    };
  },
  mounted(){
    setTimeout(() => {
      //操作dom，前后添加slide
      this.handleDom()
      //开启定时器
      this.startTimer()
    },100)
  },
  methods: {
    //操作dom，在dom前后添加slide
    handleDom(){
      let swiperEl = this.$refs.swiper;
      let swiperItemEls = swiperEl.getElementsByClassName("slide")
      //保存个数
      this.slideCount = swiperItemEls.length;
      //如果大于1个，在前后添加slide,复制最后一个，添加到最前边，复制第一个，添加到最后边
      if(this.slideCount > 1){
        let cloneFirst = swiperItemEls[0].cloneNode(true)
        let cloneLast = swiperItemEls[this.slideCount - 1].cloneNode(true)
        swiperEl.appendChild(cloneFirst)
        swiperEl.insertBefore(cloneLast,swiperItemEls[0])
        //获取swiper的宽度和样式
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style
      }

      this.setTransform(-this.totalWidth)
    },
    startTimer(){
      this.playTimer = window.setInterval(() => {
        this.currentIndex ++ ;
        this.scrollContent(-this.currentIndex*this.totalWidth)
      },this.interval)
    },
    stopTimer(){
      window.clearInterval(this.playTimer)
    },
    //滚动到正确位置
    scrollContent(currentPosition){
      this.scrolling = true;
      //开始滚动动画
      this.swiperStyle.transition = "transform" + this.animateDuration + "ms"
      this.setTransform(currentPosition)
      //判断滚动位置
      this.checkPosition()
      //停止动画
      this.scrolling = false;
    },
    //设置滚动位置
    setTransform(currentPosition){
      this.swiperStyle.transform = `translate3D(${currentPosition}px,0,0)`;
      this.swiperStyle['-webkit-transform'] = `translate3D(${currentPosition}px,0,0)`;
      this.swiperStyle['-ms-transform'] = `translate3D(${currentPosition}px,0,0)`;
    },
    checkPosition(){
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms"
        if(this.currentIndex >= this.slideCount+1){
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth)
        }else if(this.currentIndex <= 0){
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
      },this.animateDuration)
    },

    touchStart(e){
      //如果正在滚动，不可以拖动
      if(this.scrolling){
        return
      }
      //停止定时器
      this.stopTimer()
      //记录手指按下位置
      this.startX = e.touches[0].pageX
    },
    touchMove(e){
      //记录用户拖动距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;

      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      this.setTransform(moveDistance)
    },
    touchEnd(e){
        //获取移动距离 Math.abs获取绝对值
        let currentMove = Math.abs(this.distance)

        if(this.distance === 0){
          return
        }else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){//向右移动了swiper宽度的0.25
          this.currentIndex--
        }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){ //向左移动了swiper宽度的0.25
          this.currentIndex++
        }
        //移动到正确位置
        this.scrollContent(-this.currentIndex * this.totalWidth)
        //开启定时器
        this.startTimer()
    }
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow:hidden;
  position:relative;
}
.swiper {
  display:flex;
}
.indicator {
  display:flex;
  justify-content:center;
  position:absolute;
  bottom:8px;
  width:100%;
}
.indicator-item {
  width:8px;
  height:8px;
  border-radius:4px;
  background:#fff;
  margin:0 5px;
    text-align: center;
    font-size: 12px;
}
.indicator-item.active {
  background-color: rgba(212,62,46,1.0);
}

</style>
