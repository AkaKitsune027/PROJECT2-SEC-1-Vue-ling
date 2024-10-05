import { getUserByUsername } from "@/libs/userManagement"

export const useUserStore = defineStore("user", () => {
  const user = ref(null)

  async function login(username, password) {
    const user = await getUserByUsername(username)

    if (user && user.password === password) {
      user.value = user
    } else {
      user.value = null // ถ้า username หรือ password ไม่ถูกต้อง
    }
  }

  return { user, login }
})
