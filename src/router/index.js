import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/layout'

Vue.use(Router)

export const constantRouterMap = [
  // 后台路由开始
  {
    path: '/',
    name: 'home',
    component: Admin,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/admin/home')
      }
    ]
  },
  {
    path: '/sd',
    name: 'Layout',
    component: Admin,
    meta: { title: '布局1', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/dis',
    name: 'dis1',
    component: Admin,
    hidden: false,
    meta: { title: '布局2', icon: 'tree' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/diss',
    name: 'dis1s',
    component: Admin,
    hidden: false,
    meta: { title: '布局3', icon: 'tree' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/disss',
    name: 'dis1ss',
    component: Admin,
    hidden: false,
    meta: { title: '布局4', icon: 'tree' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/admin/login/index'),
    hidden: true
  }
  // 后台路由结束
  // 签到台路由开始
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
