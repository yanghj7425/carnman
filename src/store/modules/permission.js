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

function filterAsyncRouter(roles, routes) {
  const menus = []
  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRouter(roles, temp.children)
      }
      menus.push(temp)
    }
  })
  return menus
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
        const accessedRouter = filterAsyncRouter(roles, asyncRouterMap)
        commit('SET_ROUTERS', accessedRouter)
        resolve()
      })
    }
  }
}
export default permission
