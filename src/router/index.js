import { useUserStore } from "@/stores/user"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login-page' }
    },
    {
      path: '/signIn',
      name: 'login-page',
      component: () => import('@/views/SignInSignUpView.vue')
    },
    {
      path: '/signUp',
      name: 'signUp-page',
      component: () => import('@/views/SignInSignUpView.vue')

    },
    {
      path: '/homepage',
      name: 'home-page',
      component: () => import('@/views/HomepageView.vue'),
      
    },
    {
      path: '/setup',
      name: 'setup-page',
      component: () => import('@/views/SetupView.vue')
    },
    
    {
      path: '/game',
      name: 'cooking-page',
      component: () => import('@/views/CookingView.vue'),
      children: [
        {
          path: 'userOrder',
          name: 'user-order-modal',
          component: () => import('../components/CustomerOrderModal.vue')
        }
      ]
    }
  ]
})

export default router
