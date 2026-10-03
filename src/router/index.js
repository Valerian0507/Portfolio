import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home_view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about_view.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/projects_view.vue')
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/skills_view.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact_view.vue')
    }
  ],
})

export default router
