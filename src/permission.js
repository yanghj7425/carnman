import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

import { asyncRouterMap, constantRouterMap } from './router'

const whiteList = ['/login', '/facede']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果获取到 token 信息
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            next()
          })
          .catch(error => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(error || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next(`/login`) // 否则全部重定向到登录页
      next(`/facede`) // 否则全部重定向到前端
      NProgress.done()
    }
  }
})

/**
 *
 * @param {角色} roles
 * @param {路由} route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routes: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouter = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) return true
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouter)
        resolve()
      })
    }
  }
}
