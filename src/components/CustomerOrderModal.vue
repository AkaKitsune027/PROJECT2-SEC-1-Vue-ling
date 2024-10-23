<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

import customersData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import specialRequirementData from '../../data/specialRequirement.json'

import { useGameState } from '../stores/gameState'
import { useUserStore } from '../stores/user'
import { updateUser, updateUserDetails } from '@/libs/userManagement'

const router = useRouter()
const route = useRoute()
const gameState = useGameState()
const userStore = useUserStore()

const isPrepareOrder = computed(() => route.name === "prepare-modal")

const emits = defineEmits(['handleConfirmOrder'])

function generateOrder() {
    const randomCustomerIndex = Math.floor(Math.random() * customersData.length)
    const randomFoodIndex = Math.floor(Math.random() * foodsData.length)

    const customer = customersData[randomCustomerIndex]
    const food = foodsData[randomFoodIndex]

    const filteredSpecialRequirements = specialRequirementData.filter(sr => customer.type === sr.type)
    const randomSpecialRequirementIndex = Math.floor(Math.random() * filteredSpecialRequirements.length)

    const specialRequirement = filteredSpecialRequirements[randomSpecialRequirementIndex]

    return {
        customerId: customer.id,
        foodId: food.id,
        specialRequirementId: specialRequirement.id,
    }
}

onMounted(async () => {
    const currentOrder = userStore.user.userDetail.currentOrder
    if (currentOrder) return
    gameState.rawOrder = generateOrder()
    userStore.user.userDetail = await updateUserDetails(userStore.user.id, {
        'currentOrder': gameState.rawOrder,
        isCurrentOrderCommitted: false
    })
})

const closeModal = () => {
    router.push({ name: 'cooking-page' })
}

const handleCancelOrder = async () => {
    // ตรวจสอบว่ากำลังอยู่ในขั้นตอนการเตรียมหรือไม่
    if (gameState.isPreparePhase) {
        router.replace({ name: "cooking-page" })
    } else {
        router.replace({ name: "cooking-page" })
        gameState.countInteractive = 0
        gameState.isPreparePhase = true

        // ลดค่าชื่อเสียง (popularity) ลง 1
        let updatedPopularity = userStore.user.userDetail.popularity - 1

        // ตรวจสอบว่า popularity ไม่ต่ำกว่า -50
        if (userStore.user.userDetail.popularity === -50) {
            updatedPopularity = 0
        }

        // กำหนดค่า currentOrder ใหม่
        userStore.user.userDetail.currentOrder = generateOrder()


        // อัปเดตข้อมูลผู้ใช้
        const updateData = {
            currentOrder: gameState.rawOrder,
            isCurrentOrderCommitted: false,
            popularity: updatedPopularity // ลดค่าชื่อเสียง
        }

        try {
            const updatedUserDetails = await updateUserDetails(userStore.user.id, updateData)

            if (updatedUserDetails && updatedUserDetails.popularity === updatedPopularity) {
                userStore.user.userDetail.popularity = updatedUserDetails.popularity
                userStore.user.userDetail.currentOrder = updatedUserDetails.currentOrder
            } else {
                useUserStore.user = null
                router.push({ name: 'login-page' })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

const handleConfirmOrder = async () => {

    if (gameState.isPreparePhase) {
        router.replace({ name: "cooking-modal" })
        gameState.isPreparePhase = false
        userStore.user.userDetail = await updateUserDetails(userStore.user.id, {
            isCurrentOrderCommitted: true
        })

        emits('handleConfirmOrder')
    }
    else {
        router.replace({ name: "cooking-page" })
    }

}

</script>

<template>

    <!-- Prepare phase -->
    <div v-if="isPrepareOrder" class="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div class="bg-[#b4a690] p-3 rounded-lg shadow-lg w-1/3 border border-[#706149]">
            <p class="text-xl bg-base text-center font-bold border border-white">โอ๊ะ โอ๋ เหมือนว่าลูกค้าจะมานะ?</p>

            <div class="flex justify-center bg-white">
                <img src="/person.png" class="w-40 h-40">
            </div>

            <p class="bg-primary text-white text-md text-center py-1 border border-white">
                คุณพร้อมจะรับออเดอร์หรือไม่?
            </p>
            <p class="bg-white text-alert-100 text-center py-3">* ถ้าคุณกดตกลงที่จะทำอาหารให้ลูกค้าแล้ว
                คุณจะไม่สามารถออกไปซื้อของในระหว่างนั้นได้
                *</p>

            <div class="flex justify-around py-4">
                <div @click="handleConfirmOrder" class="bg-confirm-200 hover:bg-confirm-300 w-16 h-14 flex justify-center items-center
                    cursor-pointer border border-gray-500 hover:border hover:border-white rounded-lg">

                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="60" fill="black"
                        class="hover:fill-confirm-100" viewBox="0 0 16 16">
                        <path
                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>

                </div>

                <div @click="handleCancelOrder"
                    class="bg-alert-200 hover:bg-alert-300 w-16 h-14 flex justify-center items-center cursor-pointer border border-gray-500 hover:border hover:border-white  rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="60" fill="black"
                        class="hover:fill-alert-100" viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Cooking phase -->

    <div v-else class="fixed inset-0 flex items-center justify-center bg-opacity-50 font-noto-thai">
        <div class="bg-[#b4a690] p-3 rounded-lg shadow-lg w-1/3 border border-[#706149]">
            <div class="flex justify-end">
                <button @click="closeModal" class="bg-red-500 hover:bg-red-600 text-white rounded p-2.5 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
            </div>
            <p class="text-xl bg-base text-center font-bold border border-white">ใบสั่งอาหาร </p>

            <div class="flex justify-end fixed">

                <button class="bg-third m-2 p-2 rounded-lg" :title="gameState.currentOrder.customer?.description">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
                <p class="flex items-center text-gray-600">ชี้ค้างไว้เพื่อสำรวจลูกค้า</p>
            </div>

            <div class="flex justify-center bg-white py-10">
                <img :src="`/customer/${gameState.currentOrder.customer?.name}.png`" class="w-40 h-40">
            </div>
            <p class="bg-primary text-white text-md text-center py-1 border border-white">ลูกค้า : {{
                gameState.currentOrder.customer?.display_name }}
            </p>

            <div class="font-noto-thai">
                <p class="bg-white p-2">ฉันต้องการ <span class="font-extrabold">{{
                    gameState.currentOrder.food?.display_name }}</span></p>
                <p class="bg-white p-2"><span class="font-bold">คำอธิบายเมนู: </span> {{
                    gameState.currentOrder.food?.description }}</p>
                <p class="bg-white px-2 pb-2 text-green-600">แต่{{
                    gameState.currentOrder.specialRequirement?.description }}</p>
            </div>

            <div class="flex justify-around pt-2">

            </div>
            <div class="flex flex-col justify-around  items-center">
                <p class="text-xs pb-2"><span class="text-red-600 font-bold">คำเตือน:</span>
                    การยกเลิกออเดอร์มีผลต่อค่าชื่อเสียง โปรดตัดสินใจอย่างรอบคอบ </p>
                <div class="flex justify-around items-center gap-5 ">
                    <div class="flex flex-col justify-center items-center ">
                        <button @click="closeModal"
                            class="bg-emerald-600 hover:bg-emerald-700 w-28 h-14 flex justify-center items-center border border-gray-500 hover:border hover:border-white text-white rounded-lg">
                            กลับไปทำอาหาร
                        </button>
                    </div>
                    <div class="flex flex-col justify-center items-center ">
                        <button @click="handleCancelOrder"
                            class="bg-alert-200 hover:bg-alert-300 w-28 h-14 flex justify-center items-center border border-gray-500 hover:border hover:border-white text-white rounded-lg">
                            ยกเลิกออเดอร์
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
