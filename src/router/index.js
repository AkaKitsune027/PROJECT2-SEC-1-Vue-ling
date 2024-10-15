import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: 'home-page' }
    },
    {
      path: "/login",
      name: "login-page",
      component: () => import("@/views/SignInSignUpView.vue"),
    },
    {
      path: "/sign-up",
      name: "signup-page",
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
          path: "prepare-order",
          name: "prepare-modal",
          component: () => import("../components/CustomerOrderModal.vue"),
        },
        {
          path: "cooking-order",
          name: "cooking-modal",
          component: () => import("../components/CustomerOrderModal.vue"),
        },
        {
          path: "achievement-book",
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

  if (['login-page', 'signup-page'].includes(to.name) === false && userStore.user === null) {
    next({ name: 'login-page' })
  } else {
    next()
  }
})

export default router
