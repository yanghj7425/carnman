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
      },
      {
        path: 'home',
        component: () => import('@/views/admin/home')
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
        path: 'table1',
        name: 'Table1',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'table1',
        name: 'Table1',
        meta: { title: 'Table', icon: 'table' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/admin/login/index'),
    hidden: true
  },
  // 后台路由结束
  // 签到台路由开始
  {
    path: '/facede',
    name: 'Facede',
    component: () => import('@/views/facede/index')
  }
]

export const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Admin,
    name: '用户管理',
    hidden: false,
    meta: { role: ['ROLE_ADMIN'], title: '用户管理', icon: 'user' },
    children: [
      {
        path: '/kkkk',
        component: () => import('@/views/admin/home'),
        hidden: false,
        name: '权限测试页',
        meta: { role: ['ROLE_ADMIN'], title: 'haha' }
      },
      {
        path: '/kkk2k',
        component: () => import('@/views/admin/home'),
        name: '权限测试页1',
        meta: { role: ['ROLE_ADMIN'], title: 'wowo' }
      }
    ]
  },
  { path: '*', name: '404', redirect: '/404', hidden: true }
]

export default router
