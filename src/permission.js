import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { router } from './router'

const whiteList = ['/login', '/facede']

function hasPermission(roles, route) {
  if (roles.indexOf('admin') >= 0) return true
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果获取到 token 信息
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果已经登录
      if (to.meta && to.meta.role) {
        console.log(to.meta)
      }
      console.log(store.getters.roles)
      if (store.getters.roles.length === 0) {
        if (hasPermission(store.getters.roles, router.options.routes)) {
          next()
        } else {
          next(`/login`)
        }
      } else {
        store
          .dispatch('GetInfo')
          .then(res => {
            const roles = store.getters.roles
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
            // 如果有权限
            if (hasPermission(store.getters.roles, router.options.route)) {
              next()
            } else {
              next(`/login`)
            }
          })
          .catch(error => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(error || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      // next(`/facede`) // 否则全部重定向到前端
      NProgress.done()
    }
  }
})
