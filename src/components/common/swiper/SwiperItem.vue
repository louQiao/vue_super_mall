<template>
  <div class="slide">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SwiperItem',
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
    /*flex-shrink 决定flex item如何收缩，默认为1 */
  }

  .slide img {
    width: 100%;
  }
</style>
