import {
  createUser,
  getUserByUsername,
  validateUsername
} from '@/libs/userManagement'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  async function login(username, password) {
    const actualUser = await getUserByUsername(username)

    if (actualUser && actualUser.password === password) {
      user.value = actualUser
      console.log('Login success: ', user.value)
    } else {
      user.value = null // ถ้า username หรือ password ไม่ถูกต้อง
    }
  }

  async function signup(username, password) {
    const isUsernameValid = await validateUsername(username)
    if (isUsernameValid) {
      const createdUser = await createUser(username, password)

      if (createdUser) {
        user.value = createdUser
      } else {
        alert('Failed to create user')
      }
    } else {
      alert('Please enter a different username')
    }
  }
  return { user, login, signup }
})
