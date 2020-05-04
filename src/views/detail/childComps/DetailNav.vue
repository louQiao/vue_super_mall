<template>
  <nav-bar class="detail-nav">
    <div @click="goBack" slot="nav-left" class="left">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="nav-center" class="center">
      <span v-for="(item,index) in titles" 
            :key="index" 
            :class="[currentIndex === index ? 'active' : '']"
            @click="changeNav(index)"
            >{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name: 'DetailNav',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    };
  },
  components:{
    NavBar
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    changeNav(i){
      this.currentIndex = i;
      this.$emit("navClick",i)
    }
  }
};
</script>

<style scoped>
.detail-nav {
  position:relative;
  z-index:99;
  background:#fff;
}
.left img {
  margin-top:15px;
}
.center {
  display:flex;
  justify-content:space-around;
}
.active {
  color:var(--color-tint);
}
</style>
