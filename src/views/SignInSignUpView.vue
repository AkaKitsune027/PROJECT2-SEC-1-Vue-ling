<script setup>
import { useRouter } from "vue-router"
import { ref, computed, watch } from "vue"
import { useUserStore } from "@/stores/user"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const isSignUp = ref(false)
const isSignupStep = ref(false)
const username = ref("")
const password = ref("")
const confirmPassword = ref("")

const passwordError = ref("")
const confirmPasswordError = ref("")

async function handleLoginOrSignUp() {
  if (route.name === "login-page") {
    await userStore.login(username.value, password.value)

    if (userStore.user) {
      router.push({ name: "home-page" })
    } else {
      alert("Invalid username or password")
    }
  } else {
    alert("ยังไม่มี Sign Up นะ")
  }
}

const toggleForm = () => {
  if (route.name === "login-page") {
    router.push({ name: "signUp-page" })
  } else {
    router.push({ name: "login-page" })
  }
  isSignUp.value = !isSignUp.value
  isSignupStep.value = false
}

const validatePassword = () => {
  if (password.value.length < 8) {
    passwordError.value = "Your password must be at least 8 characters long."
    return false
  }
  passwordError.value = ""
  return true
}

const validateConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords do not match. Please try again."
    return false
  }
  confirmPasswordError.value = ""
  return true
}

watch(password, () => {
  validatePassword()
})

watch(confirmPassword, () => {
  validateConfirmPassword()
})

const handleSignUp = () => {
  // if (isSignUp.value && !isSignupStep.value) {
  //   // แสดงขั้นตอนการสร้างร้านเมื่อกดปุ่ม Sign Up
  //   // isSignupStep.value = true
  // } else if (isSignUp.value && isSignupStep.value) {
  //   // ถ้าอยู่ในขั้นตอนสร้างร้านแล้วให้ไปหน้า Home หลังจากสร้างร้านเสร็จ
  //   router.push({ name: "home-page" })
  // }
}
</script>

<template>
  <div
    class="page flex flex-col items-center justify-center min-h-screen bg-pink-50 isekai-background"
  >
    <div class="w-full max-w-md relative">
      <h1 class="text-6xl mb-8 text-center bold text-shadow text-[#fcfbfb]">
        ISEKAI COOKING
      </h1>
    </div>

    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <form @submit.prevent="handleLoginOrSignUp" class="space-y-2">
        <div
          v-if="!isSignupStep"
          class="text-center text-4xl text-[#6c4949] bold"
        >
          <p>{{ isSignUp ? "Sign Up" : "Sign In" }}</p>
        </div>

        <div v-if="$route.name === 'signUp-page'">
          <!-- Sign Up Form -->
          <div v-if="isSignUp">
            <!-- ขั้นตอนแรกของ Sign Up -->
            <label class="block text-[#6c4949] font-bold" for="username"
              >USERNAME <span class="text-red-600">*</span></label
            >
            <input
              v-model="username"
              id="username"
              type="text"
              required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
            />

            <label class="block text-[#6c4949] font-bold mt-2" for="password"
              >PASSWORD <span class="text-red-600">*</span></label
            >
            <input
              v-model="password"
              id="password"
              type="password"
              required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
            />
            <p v-if="passwordError" class="text-red-600 text-sm">
              {{ passwordError }}
            </p>

            <label
              class="block text-[#6c4949] font-bold mt-2"
              for="confirm-password"
              >CONFIRM PASSWORD <span class="text-red-600">*</span></label
            >
            <input
              v-model="confirmPassword"
              id="confirm-password"
              type="password"
              required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
            />
            <p v-if="confirmPasswordError" class="text-red-600 text-sm">
              {{ confirmPasswordError }}
            </p>
          </div>

          <div class="mt-2">
            <button
              @click="handleSignUp"
              type="submit"
              :disabled="!username || !password || !confirmPassword"
              class="w-full bg-[#3f6a45] bold text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400"
            >
              Sign up
            </button>
          </div>
        </div>

        <div v-else>
          <!-- Sign In Form -->
          <label class="block text-[#6c4949] font-bold" for="username"
            >USERNAME <span class="text-red-600">*</span></label
          >
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
          />
          <label class="block text-[#6c4949] font-bold mt-2" for="password"
            >PASSWORD <span class="text-red-600">*</span></label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
          />

          <div class="mt-2">
            <button
              type="submit"
              :disabled="!username || !password"
              class="w-full bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </form>

      <div class="text-center text-md text-[#606060]">
        <!-- <span v-if="!isSignupStep"> -->
        <span v-if="isSignUp">Already have an account? </span>
        <span v-else>Don't have an account? </span>
        <a
          href="#"
          @click.prevent="toggleForm"
          class="text-[#3447d7] bold hover:underline"
        >
          {{ isSignUp ? "Sign In" : "Sign Up" }}
        </a>
        <!-- </span> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  font-family: "SUNDAY";
}

.absolute {
  position: absolute;
}

.isekai-background {
  position: relative;
  /* background-color: #231414; ed9848*/
  background-image: linear-gradient(10deg, #a15852 0%, #eeaa69 100%);
  overflow: hidden;
}

.text-shadow {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}
</style>
