<template>
  <div class="toast" v-show="isShow">
    <div class="content">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message:'',
      isShow:false
    };
  },
  methods: {
    show(msg="默认消息",duration=2000){
      this.isShow = true
      this.message = msg;
      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },duration)
    }
  },
};
</script>

<style scoped>
.toast {
  position:fixed;
  top:50%;
  left:50%;
  z-index:9999;
  transform:translate(-50%,-50%);
  
}
.content {
  padding:8px 10px;
  background:rgba(0,0,0,.75);
  color:#fff;
  border-radius:4px;
}
</style>
