<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

import customesrOderData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'

const router = useRouter()


const customer = ref(customesrOderData)
const foods = ref(foodsData)
const ingredients = ref(ingredientsData)

const randomIndex = (length) => Math.floor(Math.random() * length)
const randomCustomerIndex = ref(0)
const randomFoodIndex = ref(0)
const randomIngredientsIndex = ref(0)

const generateRandomIndices = () => {
    randomCustomerIndex.value = randomIndex(customer.value.length)
    randomFoodIndex.value = randomIndex(foods.value.length)
    randomIngredientsIndex.value = randomIndex(ingredients.value.length)
}

onMounted(() => {
    generateRandomIndices()
})


const randomFoods = () => {
    return Math.floor(Math.random() * 10); // สุ่มเลข 0-9
}

const randomCustomers = () => {
    return Math.floor(Math.random() * 11); // สุ่มเลข 0-9
}


const closeModal = () => {
    router.back()
}
console.log(customer.value[2].name);


</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div class="bg-white p-3 rounded-lg shadow-lg w-1/3">
            <h2 class="text-lg font-bold mb-4">{{ customer[randomCustomerIndex].display_name }}</h2>
            <div class="flex justify-center">
                <img :src="`/${customer[randomCustomerIndex].name}.png`" class="w-40 h-40">
            </div>
            <p>{{ customer[randomCustomerIndex].description }}</p>
            <p class="text-xl text-orange-600">Required: {{ foods[randomFoodIndex].display_name }}</p>
            <p class="text-xl text-green-600">Special:</p>
            <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                ปิด Modal
            </button>
        </div>
    </div>
</template>

<style scoped></style>
