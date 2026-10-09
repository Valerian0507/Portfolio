import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home_view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      redirect: '/skills',
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/projects_view.vue'),
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('../views/project_view.vue'),
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/skills_view.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact_view.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not_found',
      component: () => import('../views/not_found_view.vue'),
    },
  ],
})

export default router
