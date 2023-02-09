import request from '@/utils/request'

/**
 * 登录的接口封装
 */
export function login(data) {
  // 返回一个promise对象
  request({
    url: '/sys/login',
    method: 'post',
    data // 是body数据
    // params 是路径上
  })
}

export function getInfo(token) {

}

export function logout() {

}
