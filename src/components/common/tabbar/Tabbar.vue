<template>
  <div class="tab-bar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
       
    };
  },
  methods: {},
};
</script>

<style scoped>
.tab-bar {
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  right:0px;
  background-color:#f6f6f6;
  box-shadow:0 -1px 1px rgba(100,100,100,.1)
}
</style>
