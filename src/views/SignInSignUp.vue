<script setup>
import { ref } from 'vue'

const isSignUp = ref(false)
const isRestaurantStep = ref(false)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const restaurantName = ref('')

// ฟังก์ชันสำหรับสลับระหว่างหน้า Sign In และ Sign Up
const toggleForm = () => {
    isSignUp.value = !isSignUp.value;
    isRestaurantStep.value = false; // รีเซ็ตขั้นตอนการสร้างร้านเมื่อเปลี่ยนฟอร์ม
}

// ฟังก์ชันเมื่อกดปุ่ม Sign Up
const handleLogin = () => {
    if (isSignUp.value && !isRestaurantStep.value) {
        // แสดงขั้นตอนการสร้างร้านเมื่อกดปุ่ม Sign Up
        isRestaurantStep.value = true;
    } else {
        // ดำเนินการ Sign In หรือ Sign Up ตามปกติ
        console.log('Sign In/Sign Up');
    }
}
</script>

<template>
    <div class="signin flex flex-col items-center justify-center min-h-screen bg-pink-50 isekai-background">
        <div class="w-full max-w-md relative">
            <h1 class="text-6xl mb-8 text-center bold text-shadow text-[#fcfbfb]">ISEKAI COOKING</h1>
        </div>

        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <form @submit.prevent="handleLogin" class="space-y-6">
                <div v-if="!isRestaurantStep" class="text-center text-4xl text-[#6c4949] bold">
                    <p>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</p>
                </div>
                <div v-if="isSignUp">
                    <!-- Sign Up Form -->
                    <div v-if="!isRestaurantStep">
                        <!-- ขั้นตอนแรกของ Sign Up -->
                        <label class="block text-[#6c4949] font-bold" for="username">USERNAME</label>
                        <input v-model="username" id="username" type="text"
                            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

                        <label class="block text-[#6c4949] font-bold mt-2" for="password">PASSWORD</label>
                        <input v-model="password" id="password" type="password"
                            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

                        <label class="block text-[#6c4949] font-bold mt-2" for="confirm-password">CONFIRM
                            PASSWORD</label>
                        <input v-model="confirmPassword" id="confirm-password" type="password"
                            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />
                    </div>

                    <div v-else>
                        <!-- ขั้นตอนการสร้างร้าน -->
                        <h2 class="text-2xl text-center bold text-[#6c4949]">Create Your Restaurant</h2>
                        <label class="block text-[#6c4949] font-bold mt-2" for="restaurant-name">RESTAURANT NAME</label>
                        <input v-model="restaurantName" id="restaurant-name" type="text"
                            class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />
                    </div>

                    <div class="mt-2">
                        <button @click="handleLogin" type="submit"
                            class="w-full bg-[#3f6a45] bold text-white py-3 rounded-lg hover:bg-brown-700">
                            {{ isRestaurantStep ? 'Create Restaurant' : 'Sign Up' }}
                        </button>
                    </div>
                </div>

                <div v-else>
                    <!-- Sign In Form -->
                    <label class="block text-[#6c4949] font-bold " for="username">USERNAME</label>
                    <input v-model="username" id="username" type="text"
                        class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

                    <label class="block text-[#6c4949] font-bold mt-2" for="password">PASSWORD</label>
                    <input v-model="password" id="password" type="password"
                        class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

                    <div class="mt-2">
                        <button @click="handleLogin" type="submit"
                            class="w-full bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700">
                            SIGN IN
                        </button>
                    </div>
                </div>
            </form>

            <div class="text-center text-md text-[#606060]">
                <span v-if="!isRestaurantStep">
                    <span v-if="isSignUp">Already have an account? </span>
                    <span v-else>Don't have an account? </span>
                    <a href="#" @click.prevent="toggleForm" class="text-[#3447d7] bold hover:underline">
                        {{ isSignUp ? 'Sign In' : 'Sign Up' }}
                    </a>
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.signin {
    font-family: 'SUNDAY';
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

/* .isekai-background::after {
    content: '';
    position: absolute;
    top: 80px;
    right: 440px;
    width: 100px;
    height: 100px;
    background-image: url('/public/carrot.png');
    background-size: contain;
    animation: spin 20s linear infinite;
    opacity: 0.5;
} */

/* .isekai-background::after {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    background-image: url('/public/food-pork');
    background-size: contain;
    animation: spin 30s linear infinite reverse;
    opacity: 0.4;
} */

/* @keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
} */
</style>