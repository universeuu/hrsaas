// 权限拦截，是在路由跳转 导航守卫
import router from '@/router'
import store from '@/store' // 引入store实例 和组件中的this.$store 是一样的
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404', '/', '/dashboard'] // 定义白名单  所有不受权限控制的页面
// 前置守卫，一般用于权限，查看是否有token
// next是前置守卫必须执行的钩子函数
// next() 放过
// next(false) 终止跳转
// next(地址) 跳转到这个地址
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) { // 如果有token
    if (to.path === '/login') { // 如果要去登录页面
      next('/') // 跳到主页
    } else {
      next() // 不是登录页，让其进去，放行
    }
  } else { // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 表示在白名单内，放行
      next()
    } else {
      // 不在白名单内，跳转到登录页面
      next('/login')
    }
  }
  NProgress.done() // 解决手动切换地址，进度条不关闭的问题
})

/**
 * 后置守卫
 * router.afterEach((to,from) => {跳转到某个页面之前要做的事})
 */
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
