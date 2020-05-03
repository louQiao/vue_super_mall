<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
        <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
        <slot name="item-icon"></slot>
    </div>
    <div :style="{color:showActiveColor}" >
        <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
        //isActive:true
    };
  },
  props:{
      path:String,
      activeColor:{
          type:String,
          default:"red"
      }
  },
  computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
      },
      showActiveColor(){
          return this.isActive ? this.activeColor : ''
      }
  },
  methods: {
      itemClick(){
          this.$router.push(this.path)
      }
  },
};
</script>

<style scoped>
.tab-bar-item {
    height:49px;
    flex:1;
    text-align:center;
    font-size:14px;
}
.tab-bar-item img {
    width:24px;
    height:24px;
    vertical-align:middle;
    margin-top:3px;
}
.active {
    color:red;
}
</style>
