<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import ingredientData from '../../data/ingredients.json'
import { useUserStore } from '@/stores/user'
import { patchUser } from '@/libs/userManagement'
import StoreView from "./StoreView.vue"

const props = defineProps({
     meats: {
        type: Array,
     },
     vegetables: {
        type: Array,
    },
    userIngredients: {
        type: Array
    }
})

const showBag = ref(false)
const userStore = useUserStore()
const selectedPage = ref(0)

const handleSelectPage = (pageNumber) => {
  selectedPage.value = pageNumber
}

const toggleView = () => {
  showBag.value = !showBag.value // Toggle between IngredientBar and IngredientBag
}

const meats = ref([])
const vegetables = ref([])

watchEffect(() => {
    const mappedIngredients = props.userIngredients.map((ingd) => {
        const ingredient = (Array.from(ingredientData)).find((ingdData) => ingd.id === ingdData.id)
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
    // const currentAmount = userStore.user.userDetail.ingredients.find((ingd) => ingd.id === targetIngredient.id).amount
    console.log(targetIngredient)
    const copyUserDetail = { ...userStore.user.userDetail }
    copyUserDetail.ingredients = copyUserDetail.ingredients.map((ingd) => {
        return {
            id: ingd.id,
            amount: targetIngredient.id === ingd.id ? ((ingd.amount - 1 >= 0) ? ingd.amount - 1 : 0) : ingd.amount
        }
    })

    console.dir(copyUserDetail)

    const patchedUser = await patchUser(userStore.user.id, { userDetail: copyUserDetail })
    if (patchedUser?.id) {
        userStore.user = patchedUser
    } else {
        console.error('Error to update user data.')
    }
}
</script>

<template>
  <div v-if="!showBag" class="flex flex-col px-1">
    <div class="flex-none bg-base text-center text-xl font-rowdies rounded-md p-2 shadow-neutral-500 shadow-md">
      <p class="py-3">Ingredient</p>
      <div class="flex rounded-lg">
        <div @click="handleSelectPage(0)"
          class="flex-1 flex justify-center cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white">
          <img src="/meat.png" alt="meat-bar" class="w-12">
        </div>
        <div @click="handleSelectPage(1)"
          class="flex-1 flex justify-center cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white">
          <img src="/vegetable.png" alt="vegetable-bar" class="w-12">
        </div>
      </div>
    </div>

    <div
      class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto custom-scrollbar shadow-neutral-500 shadow-md">
      <div v-show="selectedPage === 0" v-for="meat in meats" :key="meat.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
          cursor-pointer rounded-lg w-10/12 h-20 flex justify-center" @click="handleIngredientClick(meat)">
        <div
          class="bg-secondary-100 text-white rounded-full w-[20%] h-[40%] flex justify-center border-2 border-[#6a5944]">
          {{ meat.amount }}
        </div>
        <img :src="`/meat/${meat.name}.png`" :alt="meat.name" class="w-24">
        <p class="text-sm text-gray-700  bottom-0 -right-10">{{ meat.display_name }}</p>
      </div>

      <div v-show="selectedPage === 1" v-for="vegetable in vegetables" :key="vegetable.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
            cursor-pointer rounded-lg w-10/12 h-20 flex justify-center" @click="handleIngredientClick(vegetable)">
        <div class="bg-secondary-100 text-white rounded-full w-[20%] h-[40%] flex justify-center border-2
            border-[#6a5944]">
          {{ vegetable.amount }}
        </div>
        <img :src="`/vegetable/${vegetable.name}.png`" :alt="vegetable.name" class="w-24">
        <p class="text-sm text-gray-700 bottom-0 -right-10">{{ vegetable.display_name }}</p>
        

      </div>
    </div>

    <!-- <div
      class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto custom-scrollbar shadow-neutral-500 shadow-md">
      <div v-show="selectedPage === 0" v-for="meat in meats" :key="meat.id"
        class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border] cursor-pointer rounded-lg w-10/12 h-20 flex justify-center">
        <div class="relative">
          <img :src="`/meat/${meat.name}.png`" alt="${meat.name}" class="w-20" />
          <p class="text-sm text-gray-700 absolute bottom-0 -right-10">{{ meat.display_name }}</p>
        </div>
      </div>
    </div>

    <div v-show="selectedPage === 1" v-for="vegetable in vegetables" :key="vegetable.id"
      class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border] cursor-pointer rounded-lg w-10/12 h-20 flex justify-center">
      <div class="relative">
        <img :src="`/vegetable/${vegetable.name}.png`" alt="${vegetable.name}" class="w-20" />
        <p class="text-sm text-gray-700 absolute bottom-0 -right-10">{{ vegetable.display_name }}</p>
      </div>
    </div> -->

    <!-- Button to toggle to IngredientBag -->
    <div class="bg-zinc-700 h-[5rem] flex justify-center items-center shadow-neutral-500 shadow-md">
      <button @click="toggleView" class="bg-[#ACC6AA] hover:bg-[#90a58e] p-2 rounded-xl h-fit border border-white">
        <img src="/src/assets/bag.svg" alt="shop" class="h-8" />
      </button>
    </div>
  </div>

  <StoreView v-if="showBag" :meats="meats" :vegetables="vegetables" @toggleBack="toggleView" />
</template>

<style scoped></style>
