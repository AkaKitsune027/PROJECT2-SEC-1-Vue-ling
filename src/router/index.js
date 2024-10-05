import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
      path: "/",
      name: "login-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/singIn",
      name: "login-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/singUp",
      name: "login-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/homepage",
      name: "home-page",
      component: () => import("@/views/HomepageView.vue"),
    },
    {
      path: "/game",
      name: "cooking-page",
      component: () => import("@/views/CookingView.vue"),
      children: [
        {
          path: "userOrder",
          name: "user-order-modal",
          component: () => import("../components/CustomerOrderModal.vue"),
        },
      ],
    },
  ],
})

export default router
