import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 *
 * @param {角色} roles
 * @param {路由} route
 */
function hasPermission(roles, route) {
  if (roles.indexOf('admin') >= 0) return true
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
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouter = asyncRouterMap.filter(v => {
          if (roles.indexOf('ROLE_ADMIN') >= 0) return true
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
export default permission
