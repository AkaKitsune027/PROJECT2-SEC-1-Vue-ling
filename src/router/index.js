import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login-page',
            component: () => import('@/views/SignInSignUp.vue')
        },
        {
            path: '/homepage',
            name: 'home-page',
            component: () => import('@/views/HomepageView.vue')
        },
        {
            path: '/game',
            name: 'cooking-page',
            component: () => import('@/views/CookingView.vue')
        }
    ]
})

export default router
