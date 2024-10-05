<script setup>
import router from "@/router"
import { ref, computed, watch } from "vue"

const isSignUp = ref(false)
const isRestaurantStep = ref(false)
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const restaurantName = ref("")

const passwordError = ref("")
const usernameError = ref("")
const confirmPasswordError = ref("")

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
  isRestaurantStep.value = false
}

// ฟังก์ชันตรวจสอบความถูกต้องของ username
// const validateUsername = () => {
//     if (!username.value) {
//         usernameError.value = 'กรุณากรอก Username';
//         return false;
//     }
//     usernameError.value = '';  // ถ้า username ถูกต้องให้เคลียร์ error message
//     return true;
// }
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
const handleLogin = () => {
  // ตรวจสอบว่า username และ password ถูกต้องหรือไม่
  if (
    // !validateUsername() ||
    !validatePassword() ||
    (isSignUp.value && !validateConfirmPassword())
  ) {
    return
  }

  if (isSignUp.value && !isRestaurantStep.value) {
    // แสดงขั้นตอนการสร้างร้านเมื่อกดปุ่ม Sign Up
    isRestaurantStep.value = true
  } else if (isSignUp.value && isRestaurantStep.value) {
    // ถ้าอยู่ในขั้นตอนสร้างร้านแล้วให้ไปหน้า Home หลังจากสร้างร้านเสร็จ
    handleTohome()
  } else {
    // ในกรณี Sign In
    handleTohome()
  }
}

// const isSignInDisabled = computed(() => {
//   return !username.value || !password.value || passwordError.value || usernameError.value
// })


function handleTohome() {
  router.push({ name: "home-page" })
}
</script>

<template>
  <div
    class="signin flex flex-col items-center justify-center min-h-screen bg-pink-50 isekai-background"
  >
    <div class="w-full max-w-md relative">
      <h1 class="text-6xl mb-8 text-center bold text-shadow text-[#fcfbfb]">
        ISEKAI COOKING
      </h1>
    </div>

    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <form @submit.prevent="handleLogin" class="space-y-2">
        <div
          v-if="!isRestaurantStep"
          class="text-center text-4xl text-[#6c4949] bold"
        >
          <p>{{ isSignUp ? "Sign Up" : "Sign In" }}</p>
        </div>

        <div v-if="isSignUp">
          <!-- Sign Up Form -->
          <div v-if="!isRestaurantStep">
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
            <!-- แจ้งเตือน password -->

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
            <!-- แจ้งเตือน confirm password -->
          </div>

          <div v-else>
            <!-- ขั้นตอนการสร้างร้าน -->
            <h2 class="text-2xl text-center bold text-[#6c4949]">
              Create Your Restaurant
            </h2>
            <label
              class="block text-[#6c4949] font-bold mt-2"
              for="restaurant-name"
              >RESTAURANT NAME <span class="text-red-600">*</span></label
            >
            <input
              v-model="restaurantName"
              id="restaurant-name"
              type="text"
              required
              class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
            />
          </div>

          <div class="mt-2">
            <button
              @click="handleLogin"
              type="submit"
              :disabled="
                (isRestaurantStep && !restaurantName) ||
                !username ||
                !validatePassword() ||
                !validateConfirmPassword()
              "
              class="w-full bg-[#3f6a45] bold text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400"
            >
              {{ isRestaurantStep ? "Create Restaurant" : "Sign Up" }}
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
          <!-- <p v-if="usernameError" class="text-red-600 text-sm">
            {{ usernameError }}
          </p> -->
          <!-- แจ้งเตือน username -->

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
          <!-- แจ้งเตือน password -->

          <div class="mt-2">
            <button
              @click="handleTohome"
              type="submit"
              :disabled="!username || !validatePassword()"
              class="w-full bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700 disabled:bg-gray-400"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </form>

      <div class="text-center text-md text-[#606060]">
        <span v-if="!isRestaurantStep">
          <span v-if="isSignUp">Already have an account? </span>
          <span v-else>Don't have an account? </span>
          <a
            href="#"
            @click.prevent="toggleForm"
            class="text-[#3447d7] bold hover:underline"
          >
            {{ isSignUp ? "Sign In" : "Sign Up" }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signin {
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