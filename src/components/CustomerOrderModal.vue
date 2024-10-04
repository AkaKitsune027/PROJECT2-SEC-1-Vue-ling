<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

import customersData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'
import specialRequirementData from '../../data/specialRequirement.json'

const order = ref(null)

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

onMounted(() => {
    order.value = genarateOrder()
    console.log(order.value);
    
})

const closeModal = () => {
    router.push({ name: 'cooking-page' })
}

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div class="bg-white p-3 rounded-lg shadow-lg w-1/3">
            <h2 class="text-lg font-bold mb-4">{{ order?.customer.display_name }}</h2>
            <div class="flex justify-center">
                <img :src="`/${order?.customer.name}.png`" class="w-40 h-40">
            </div>
            <p>{{ order?.customer.description }}</p>
            <p class="text-xl text-orange-600">Required: {{ order?.food.display_name }}</p>
            <p class="text-xl text-green-600">Special:{{ order?.specialRequirement.description }}
            </p>
            <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                ปิด Modal
            </button>
        </div>
    </div>
</template>

<style scoped></style>
