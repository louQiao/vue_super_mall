import { debounce } from "./util"
import BackTop from "components/content/backTop/BackTop"

export const imgLoadMixin = {
  data(){
    return {
      refresh:null
    }
  },
  mounted(){
    //监听图片加载是否完成
    this.refresh = debounce(this.$refs.scroll.refresh,10)
    this.imgLoadListener = () => {
      //console.log("我是混入的")
      this.refresh("aaa","bbb")
    }
    this.$bus.$on("imageLoad",this.imgLoadListener)
  }
}

//回到顶部小图标混入
export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,400)
    },
    listenerScroll(position){
      this.isShowBackTop = Math.abs(position.y) > 1000
    }
  }
}