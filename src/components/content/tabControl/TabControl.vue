<template>
  <div class="tab-control">
    <div class="tab-control-item" 
         :class="{'active':currentIndex === index}" 
         v-for="(item,index) in titles"
         @click="handleClick(index)"
         >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
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
  methods: {
    handleClick(index){
      this.currentIndex = index;
      this.$emit("changeTab",index)
    }
  },
};
</script>

<style scoped>
.tab-control {
  display:flex;
    height:40px;
  line-height:40px;
  background:#fff;
}
.tab-control-item {
  flex:1;
  text-align:center;

  font-size:15px;
}
.tab-control-item span {
  padding:5px;
}
.tab-control-item.active {
  color:var(--color-high-text)
}
.tab-control-item.active span {
  border-bottom:3px solid var(--color-tint);
}
</style>
