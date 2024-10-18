<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import ingredientData from '../../data/ingredients.json'
import { useUserStore } from '@/stores/user'
import { getUserById, patchUser, updateUserDetails } from '@/libs/userManagement'
import { useGameState } from '@/stores/gameState'

defineEmits(['toggleFoodStoreClick'])

const props = defineProps({
    userIngredients: {
        type: Array
    }
})

const userStore = useUserStore()
const gameState = useGameState()
const showBag = ref(false)
const selectedPage = ref(0)

const handleSelectPage = (pageNumber) => {
    selectedPage.value = pageNumber
}

const meats = ref([])
const vegetables = ref([])

watchEffect(() => {
    console.log(props.userIngredients)

    const mappedIngredients = props.userIngredients.map((ingd) => {
        const ingredient = (ingredientData).find((ingdData) => ingd.id === ingdData.id)
        ingredient['amount'] = ingd.amount
        return ingredient
    })

    const userMeats = []
    const userVegetables = []

    for (const ingd of mappedIngredients) {
        if (ingd.type === 'meat') userMeats.push(ingd)
        else userVegetables.push(ingd)
    }

    meats.value = userMeats
    vegetables.value = userVegetables
})

const handleIngredientClick = async (targetIngredient) => {

    if (targetIngredient.amount < 1) return
    if (gameState.cauldron.length >= 14) return

    const updateIngredients = userStore.user.userDetail.ingredients.map((ingd) => {
        return {
            id: ingd.id,
            amount: targetIngredient.id === ingd.id ? ((ingd.amount - 1 >= 0) ? ingd.amount - 1 : 0) : ingd.amount
        }
    })


    const updatedUserDetail = await updateUserDetails(userStore.user.id, { ingredients: updateIngredients })
    if (updatedUserDetail) {
        userStore.user.userDetail = updatedUserDetail
        console.log(updateIngredients)

        gameState.addToCauldron(targetIngredient.id)
    } else {
        console.error('Error to update user data.')
    }


    console.log(gameState.cauldron)
    console.dir(updatedUserDetail)
}

const handleToggleFoodStoreClick = () => {
    emits('toggleFoodStoreClick')
}
</script>

<template>
    <div class="relative flex flex-col overflow-hidden rounded-r-xl">
        <div
            class="pointer-events-none w-full h-16 absolute bottom-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]">
        </div>
        <div class="flex-none bg-base text-center text-xl font-rowdies p-2 ">
            <p class="py-3">Ingredient</p>
            <div class="flex  rounded-lg">
                <div @click="handleSelectPage(0)"
                    class="flex-1 flex justify-center cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white">
                    <img src="/meat.png" alt="meat-bar" class="w-12">
                </div>
                <div @click="handleSelectPage(1)"
                    class="flex-1 flex justify-center cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white ">
                    <img src="/vegetable.png" alt="vegetable-bar" class="w-12">
                </div>
            </div>
        </div>
        <div
            class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto custom-scrollbar">
            <button @click="handleIngredientClick(meat)" v-show="selectedPage === 0" v-for="meat in meats"
                :key="meat.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
            cursor-pointer rounded-lg w-10/12 h-20 flex" :class="{ 'grayscale': meat.amount === 0 }">
                <div class="bg-secondary-100 text-white p-1 rounded-full h-[40%] flex items-center justify-between border-2
            border-secondary-200">
                    {{ meat.amount }}
                </div>
                <div class="flex">
                    <img :src="`/meat/${meat.name}.png`" :alt="meat.name" class="w-16" />
                    <span class="font-serif h-7 px-3 rounded-lg">{{
                        meat.display_name
                    }}</span>
                </div>
            </button>
            <div v-show="selectedPage === 1" v-for="vegetable in vegetables" :key="vegetable.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
            cursor-pointer rounded-lg w-10/12 h-20 flex" @click="handleIngredientClick(vegetable)">
                <div class="bg-secondary-100 text-white p-1 rounded-full h-[40%] flex justify-center items-center border-2
            border-secondary-200">
                    {{ vegetable.amount }}
                </div>
                <div class="flex">
                    <img :src="`/vegetable/${vegetable.name}.png`" :alt="vegetable.name" class="w-16" />
                    <span class="font-serif h-7 px-3 rounded-lg">{{
                        vegetable.display_name
                    }}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
