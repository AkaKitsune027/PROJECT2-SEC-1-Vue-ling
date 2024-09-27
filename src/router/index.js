import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/game',
            name: 'cooking-page',
            component: () => import('@/views/CookingView.vue')
        }
    ]
})

export default router