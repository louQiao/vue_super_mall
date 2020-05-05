<template>
    <scroll class="cart-content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </scroll>
</template>

<script>
import { mapGetters } from "vuex"
import CartListItem from "./CartListItem"
import Scroll from "components/common/scroll/Scroll"
export default {
  name: 'CartList',
  data() {
    return {
     
    };
  },
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    console.log(this.cartList,"aaa")
    this.$refs.scroll.refresh()
  },
  methods: {},
};
</script>

<style scoped>
.cart-content {
  height:calc(100% - 44px);
}
</style>
