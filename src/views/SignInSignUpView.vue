<script setup>
import { useRouter } from "vue-router"
import { ref, computed, watch } from "vue"
import { useUserStore } from "@/stores/user"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const isSignUp = computed(() => route.name === "signup-page")

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
    // alert("ยังไม่มี Sign Up นะ")
    await userStore.signup(username.value, password.value)

    if (userStore.user) {
      router.push({ name: "home-page" })
    } else {
      alert("Can not create user")
    }
  }
}

const toggleForm = () => {
  if (route.name === "login-page") {
    router.push({ name: "signup-page" })
  } else {
    router.push({ name: "login-page" })
  }
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
</script>

<template>
  <div class="page font-sunday flex flex-col items-center justify-center min-h-screen isekai-background">
    <div class="w-full max-w-md relative font-bold">
      <h1 class="text-7xl mb-6 text-center text-shadow text-[#ffffff]">
        ISEKAI COOKING
      </h1>
    </div>

    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <form @submit.prevent="handleLoginOrSignUp" class="space-y-2">
        <div class="text-center text-4xl text-[#6c4949] font-bold">
          <p>{{ isSignUp ? "Sign Up" : "Sign In" }}</p>
        </div>

        <div v-if="isSignUp">
          <!-- Sign Up Form -->
          <div v-if="isSignUp">
            <!-- ขั้นตอนแรกของ Sign Up -->
            <label class="block text-[#6c4949] font-bold" for="username">USERNAME <span
                class="text-red-600">*</span></label>
            <input v-model="username" id="username" type="text" required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

            <label class="block text-[#6c4949] font-bold mt-2" for="password">PASSWORD <span
                class="text-red-600">*</span></label>
            <input v-model="password" id="password" type="password" required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />
            <p v-if="passwordError" class="text-red-600 text-sm">
              {{ passwordError }}
            </p>

            <label class="block text-[#6c4949] font-bold mt-2" for="confirm-password">CONFIRM PASSWORD <span
                class="text-red-600">*</span></label>
            <input v-model="confirmPassword" id="confirm-password" type="password" required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />
            <p v-if="confirmPasswordError" class="text-red-600 text-sm">
              {{ confirmPasswordError }}
            </p>
          </div>

          <div class="mt-2">
            <button type="submit" :disabled="!username ||
              !password ||
              password.length < 8 ||
              !confirmPassword ||
              password !== confirmPassword
              " class="w-full bg-[#3f6a45] bold text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400">
              Sign up
            </button>
          </div>
        </div>

        <div v-else>
          <!-- Sign In Form -->
          <label class="block text-[#6c4949] font-bold" for="username">USERNAME <span
              class="text-red-600">*</span></label>
          <input v-model="username" id="username" type="text" required
            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />
          <label class="block text-[#6c4949] font-bold mt-2" for="password">PASSWORD <span
              class="text-red-600">*</span></label>
          <input v-model="password" id="password" type="password" required
            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

          <div class="mt-2">
            <button type="submit" :disabled="!username || !password"
              class="w-full font-bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400">
              SIGN IN
            </button>
          </div>
        </div>
      </form>

      <div class="text-center text-md text-[#606060]">
        <!-- <span v-if="!isSignupStep"> -->
        <span v-if="isSignUp">Already have an account? </span>
        <span v-else>Don't have an account? </span>
        <RouterLink :to="{ name: isSignUp ? 'login-page' : 'signup-page' }"
          class="text-[#3447d7] font-bold hover:underline">
          {{ isSignUp ? "Sign In" : "Sign Up" }}
        </RouterLink>
        <!-- </span> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.absolute {
  position: absolute;
}

.isekai-background {
  position: relative;
  /* background-color: #231414; ed9848*/
  /* background-image: linear-gradient(10deg, #a15852 0%, #eeaa69 100%); */
  background-image: url("../assets/bg-isekai.png");
  background-size: cover;
  /* ทำให้ภาพคลุมทั้งหน้า */
  background-position: center;
  /* จัดตำแหน่งตรงกลาง */
  overflow: hidden;
}

.text-shadow {
  text-shadow: -2px -4px 50px #000000;
  /* ขยายเงา */
}
</style>
