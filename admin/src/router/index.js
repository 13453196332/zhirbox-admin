import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
      { path: 'tools', name: 'Tools', component: () => import('../views/Tools.vue') },
      { path: 'projects', name: 'Projects', component: () => import('../views/Projects.vue') },
      { path: 'work', name: 'Work', component: () => import('../views/Work.vue') },
      { path: 'skills', name: 'Skills', component: () => import('../views/Skills.vue') },
      { path: 'config', name: 'Config', component: () => import('../views/Config.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('zhir_admin_token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
