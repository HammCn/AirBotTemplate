import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/view/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/view/admin.vue'),
    children: [
      {
        path: '',
        component: () => import('@/view/admin/index.vue')
      },
      {
        path: ':catchAll(.*)',
        component: () => import('@/view/admin/error.vue')
      }
    ]
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})
