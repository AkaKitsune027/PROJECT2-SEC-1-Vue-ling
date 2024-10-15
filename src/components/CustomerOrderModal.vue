<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

import customersData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import specialRequirementData from '../../data/specialRequirement.json'
import { useGameState } from '@/stores/gameState'
import { useUserStore } from '@/stores/user'
import { updateUserDetails } from '@/libs/userManagement'

const router = useRouter()
const route = useRoute()
const gameState = useGameState()
const order = ref(null)
const userStore = useUserStore()

const isPrepareOrder = computed(() => route.name === "prepare-modal")

function genarateOrder() {
    const randomCustomerIndex = Math.floor(Math.random() * customersData.length)
    const randomFoodIndex = Math.floor(Math.random() * foodsData.length)

    const customer = customersData[randomCustomerIndex]
    const food = foodsData[randomFoodIndex]

    const filteredSpecialRequirements = specialRequirementData.filter(sr => customer.type === sr.type)
    const randomSpecialRequirementIndex = Math.floor(Math.random() * filteredSpecialRequirements.length)

    const specialRequirement = filteredSpecialRequirements[randomSpecialRequirementIndex]

    return {
        customer,
        food,
        specialRequirement
    }
}

onMounted(async () => {
    const currentOrder = userStore.user.userDetail.currentOrder
    console.log('currentOrder:', currentOrder)
    if (currentOrder) {
        order.value = {
            customer: customersData.find(c => c.id === currentOrder.customerId),
            food: foodsData.find(f => f.id === currentOrder.foodId),
            specialRequirement: specialRequirementData.find(s => s.id === currentOrder.specialRequirementId),
        }
        return
    }
    order.value = genarateOrder()
    await updateUserDetails(userStore.user.id, { 'currentOrder': order.value })
})

const closeModal = () => {
    router.push({ name: 'cooking-page' })
}

const handleCancelOrder = () => {
    if (gameState.isPreparePhase) {
        router.replace({ name: "cooking-page" })
    }
    else {
        router.replace({ name: "cooking-page" })
        gameState.isPreparePhase = true
    }
}

const handleConfirmOrder = () => {
    if (gameState.isPreparePhase) {
        router.replace({ name: "cooking-modal" })
        gameState.isPreparePhase = false
        console.log(gameState.isPreparePhase)
    }
    else {
        order?.value
        router.replace({ name: "cooking-page" })
    }
}

</script>

<template>

    <!-- Prepare phase -->
    <div v-if="isPrepareOrder" class="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div class="bg-[#b4a690] p-3 rounded-lg shadow-lg w-1/3 border border-[#706149]">
            <p class="text-xl bg-base text-center font-bold border border-white">โอ๊ะ โอ๊ะ เหมือนว่าลูกค้าจะมานะ?</p>

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

    <div v-else class="fixed inset-0 flex items-center justify-center bg-opacity-50">
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
                <button class="bg-third m-2 p-2 rounded-lg" :title="order?.customer.description">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-center bg-white">
                <!-- <img :src="`/customer/${order?.customer.name}.png`" class="w-40 h-40"> -->
                <img :src="`/customer/${order?.customer.name}.png`" class="w-40 h-40">
            </div>
            <p class="bg-primary text-white text-md text-center py-1 border border-white">ลูกค้า : {{
                order?.customer.display_name }}
            </p>

            <p class="bg-white p-2"> ฉันต้องการ {{ order?.food.display_name }} </p>
            <p class="bg-white px-2">แต่{{ order?.specialRequirement.description }}</p>

            <div class="flex justify-around py-4">

            </div>
            <div class="flex justify-center">
                <button @click="handleCancelOrder"
                    class="bg-alert-200 hover:bg-alert-300 w-28 h-14 flex justify-center items-center border border-gray-500 hover:border hover:border-white text-white rounded-lg">
                    ยกเลิกออเดอร์
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
