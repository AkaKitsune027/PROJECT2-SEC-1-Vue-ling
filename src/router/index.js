import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/signIn",
      name: "login-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/signUp",
      name: "signUp-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/homepage",
      name: "home-page",
      component: () => import("@/views/HomepageView.vue"),
    },
    {
      path: "/setup",
      name: "setup-page",
      component: () => import("@/views/SetupView.vue"),
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
        {
          path: "achievementBook",
          name: "achievement-book-modal",
          component: () => import("../components/AchievementBookModal.vue"),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (["home-page", "cooking-page"].includes(to.name)) {
    if (userStore.user) {
      if (userStore.user.outletName === "") {
        next({ name: "setup-page" })
      } else {
        next()
      }
    } else {
      next({ name: "login-page" })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name !== 'login-page' && userStore.user === null) {
    next({ name: 'login-page' })
  } else {
    next()
  }
})

export default router
