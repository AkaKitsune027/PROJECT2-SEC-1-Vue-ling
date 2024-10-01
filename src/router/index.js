import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'game',
            component: () => import('@/views/CookingView.vue'),
        },

        {
            path: '/game',
            name: 'cooking-page',
            component: () => import('@/views/CookingView.vue'),
            children: [
                {
                    path: 'userOrder',
                    name: 'user-order-modal',
                    component: () => import('../components/CustonerOrderModal.vue'),
                }
            ]
            
        }

    ]
})

export default router
