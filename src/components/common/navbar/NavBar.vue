<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="nav-left" />
    </div>
    <div class="center">
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <slot name="nav-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
.nav-bar {
  display:flex;
  align-items:center;
  height:44px;
  line-height:44px;
  text-align:center;
  box-shadow:0 1px 1px rgba(100,100,100,.2)
}
.center {
  flex:1;
}
.left,.right {
  width:60px;
}
</style>
