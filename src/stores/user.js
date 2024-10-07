import { getUserByUsername } from "@/libs/userManagement"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref(null)

  async function login(username, password) {
    const actualUser = await getUserByUsername(username)

    if (actualUser && actualUser.password === password) {
      user.value = actualUser
      console.log("Login success: ", user.value)
    } else {
      user.value = null // ถ้า username หรือ password ไม่ถูกต้อง
    }
  }

  async function getData() {
    const data = await getAllUser()
    console.log(data)
    return data.value
  }

  return { user, login, getData }
})
