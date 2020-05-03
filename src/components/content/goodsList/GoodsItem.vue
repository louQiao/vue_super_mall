<template>
  <div class="goods-item" @click="goToDetail">
      <img :src="itemData.show.img" @load="imgLoad" />
      <div class="goods-info">
        <p>{{itemData.title}}</p>
        <span class="price">{{itemData.price}}</span>
        <span class="collect">{{itemData.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props:{
    itemData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    imgLoad(){
      this.$bus.$emit("imageLoad")
    },
    goToDetail(){
      this.$router.push("/detail"+itemData.iid)
    }
  },
};
</script>

<style scoped>
.goods-item {
  width:48%;
  padding-bottom:40px;
  position:relative;
}
.goods-item img{
  width:100%;
  border-radius:5px;
}
.goods-info {
  position:absolute;
  bottom:5px;
  left:0;
  right:0;
  font-size:12px;
  text-align:center;
}
.goods-info p{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin-bottom:3px;
}
.goods-info .price {
  color:var(--color-high-text);
  margin-right:20px;
}
.goods-info .collect{
  position:relative;
}
.goods-info .collect::before {
  content:'';
  position:absolute;
  left:-15px;
  top:-1px;
  width:14px;
  height:14px;
  background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
