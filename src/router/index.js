import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    hidden: false,
    meta: { title: '布局1' },
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
    component: Layout,
    hidden: false,
    meta: { title: '布局2' },
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
    component: Layout,
    hidden: false,
    meta: { title: '布局3' },
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
    component: Layout,
    hidden: false,
    meta: { title: '布局4' },
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
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
