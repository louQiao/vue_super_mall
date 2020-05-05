import { ADD_COUNT,ADD_CART } from "./mutation-type"
export default {
  [ADD_COUNT](state,payload){
    payload.count += 1
  },
  [ADD_CART](state,payload){
    payload.count = 1
    payload.checked = true;
    state.cartList.push(payload)
  }
}