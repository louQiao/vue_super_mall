<template>
  <div class="bottom-bar">
    <div class="sele-content">
      <check-button :is-checked="getIsChecked" @click.native="clickAllCheckButton" />
      <span class="sele-all">全选</span>
    </div>
    <div class="total">
      合计：{{getTotalPrice}}
    </div>
    <div class="calc">
      去计算({{getTotalNub}})
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton"
import { mapGetters } from "vuex"
export default {
  name: 'CartBottomBar',
  data() {
    return {
    };
  },
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    getTotalPrice(){
      return "¥" + this.cartList.filter(item => item.checked)
                   .reduce((pre,item) => {
                      return pre + item.newPrice * item.count
                   },0).toFixed(2)
    },
    getTotalNub(){
      return this.cartList.filter(item => item.checked).length;
    },
    getIsChecked(){
      if(this.cartList.length === 0){
        return false
      }else{
        return this.getTotalNub === this.cartList.length
      }
    }
  },
  methods: {
    clickAllCheckButton(){
      if(this.getIsChecked){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    }
  },
};
</script>

<style scoped>

.bottom-bar {
  position:relative;
  display:flex;
  height:40px;
  font-size:15px;
  background:#eee;
}
.sele-content {
  margin-left:10px;
  display:flex;
  align-items:center;
  width:100px;
}
.sele-all {
  margin-left:8px;
}
.total {
  flex:1;
  line-height:40px;
}
.calc {
  width:100px;
  background:red;
  line-height:40px;
  color:#fff;
  text-align:center;
}
</style>
