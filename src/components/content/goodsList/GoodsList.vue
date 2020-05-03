<template>
  <div class="goods-list">
    <goods-item v-for="(item,index) in goods" :key="index" :itemData = "item" />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem"
export default {
  name: 'GoodsList',
  props:{
    goods:{
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
  components:{
    GoodsItem
  },
  created(){
    //console.log(this.goods)
  },
  methods: {},
};
</script>

<style scoped>
.goods-list {
  display:flex;
  flex-wrap:wrap;
  justify-content:space-evenly;
}
</style>
