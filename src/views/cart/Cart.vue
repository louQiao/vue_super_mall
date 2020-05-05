<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="nav-center">购物车({{cartListLen}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
import { mapGetters } from "vuex"
export default {
  name: 'Cart',
  data() {
    return {
    };
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartListLen'])
  },
  methods: {},
};
</script>

<style scoped>
#cart {
  height:calc(100% - 49px - 40px);
}
.nav-bar {
  background:var(--color-tint);
  color:#fff;
  font-weight:600;
  position:relative;
  z-index:99;
}
</style>
