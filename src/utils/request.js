import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  //  /api 这个代理只是给开发环境配置的代理
  //  /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API // 设置axios请求的基础的基础地址
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use(response => {
  // 响应成功
  const { success, message, data } = response.data
  // 注意：这个判断是否成功，是业务上是否成功
  if (success) { // 要根据success的值来判断 响应的是否成功
    // 成功返回
    return data
  } else {
    // 失败 进catch
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, error => {
  // 响应失败，提示信息
  Message.error(error.message)
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

export default service
