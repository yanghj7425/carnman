import store from './store'
import NProgress from 'nprogress' // Progress
import { getToken } from '@/utils/auth'
import { router } from './router'

const whiteList = ['/login', '/client']

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
  // if contain token information
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if has login
      if (store.getters.roles.length !== 0) {
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
            // if have permission
            if (hasPermission(store.getters.roles, to)) {
              next()
            } else {
              next(`/login`)
            }
          })
          .catch(error => {
            return Promise.reject(error)
          })
        // here will be catch exception if have other problems
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // redirect to login page
      // next(`/client`) // 否则全部重定向到前端
      NProgress.done()
    }
  }
})
