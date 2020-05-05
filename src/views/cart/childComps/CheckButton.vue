<template>
  <div class="check-box" :class="{'active':isChecked}">
    <img src="~assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
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
.check-box {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
}
.active {
  background-color:#ff8198;
  border-color:#ff8198;
}
</style>
