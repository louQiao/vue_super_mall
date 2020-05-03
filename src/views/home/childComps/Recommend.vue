<template>
  <div class="recommends-wrapper">
    <div v-for="(item,index) in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        <p>{{item.title}}</p>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
.recommends-wrapper {
  display:flex;
  text-align:center;
  padding:10px 0 20px;
  border-bottom:8px solid #eee;
}
.recommend-item {
  flex:1;
}
.recommend-item img {
  width:80px;
  height:80px;
  margin-bottom:5px;
}
</style>
