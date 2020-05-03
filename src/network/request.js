import axios from "axios"

export function request(config){
  const instance = axios.create({
    //baseURL:"请加coderwhy002添加微信获取地址",
    timeout:5000
  })
  
  instance.interceptors.request.use(config=>{
    return config
  },err => {

  })

  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    
  })

  return instance(config)
}