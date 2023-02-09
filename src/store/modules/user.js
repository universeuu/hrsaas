import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken() // 设置token为共享状态,初始化vuex的时候就从缓存中读取token
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex置空
    // 同步给缓存
    removeToken()
  }
}
// 执行异步,
const actions = {
  async login(context, data) { // data就数据 mobile,password
    // 调用登录接口
    const result = await login(data)
    // login(data)是promise对象
    // axios默认加了一层data，但是我们在响应拦截器里已经处理过了
    // 登录成功，则得到数据，将拿到的token给state
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
