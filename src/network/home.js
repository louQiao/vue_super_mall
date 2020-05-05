import {request} from "./request"

export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
  })
}

//获取商品列表数据
export function getHomeGoodsList(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}