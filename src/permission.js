import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

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
      next(`/login`) // 否则全部重定向到登录页
      // next(`/facede`) // 否则全部重定向到前端
      NProgress.done()
    }
  }
})
