import { ADD_COUNT,ADD_CART } from "./mutation-type"
export default {
  addToCart(context,payload){
   return new Promise((resolve,reject) => {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct){
      context.commit(ADD_COUNT,oldProduct)
      resolve("该商品数量+1")
    }else{
      context.commit(ADD_CART,payload)
      resolve("该商品添加到购物车")
    }
   })
  }
}