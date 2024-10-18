<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'
import customers from '../../data/customers.json'
import specialRequirement from '../../data/specialRequirement.json'

const router = useRouter()
const userStore = useUserStore()
const rating = ref(1)

function cook(ingredient) {
  const result = ref([])
  result.value.push(ingredient)

  return result
}

// Map fiveStarMenus to corresponding food data
const mappedFiveStarMenus = computed(() => {
  return userStore.user?.userDetail?.fiveStarMenus.map((menu) => {
    const food = foodsData.find((food) => food.id === menu.foodId) // Assuming foods.json has an 'id' field
    // const ingredient = ingredientsData.find((ingredient) => ingredient.id === food.ingredients[0]
    // )
    return {
      ...food,
      // ...ingredient,
      isUnlock: menu.isUnlock,
    }
  })
})

const ratingStars = (rating) => {
  switch (rating) {
    case 1:
      return '/star-1.png'
    case 2:
      return '/star-2.png'
    case 3:
      return '/star-3.png'
    case 4:
      return '/star-4.png'
    case 5:
      return '/star-5.png'
  }
}

const closeModal = () => {
  router.push({ name: 'cooking-page' })
}
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-800 flex justify-center items-center bg-opacity-70"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <div class="bg-white rounded-2xl shadow">
        <!-- Modal header -->
        <div class="relative flex items-center justify-center pt-8 pb-5">
          <h1 class="text-4xl font-bold font-rowdies text-gray-600">REVIEW</h1>
          <button
            @click="closeModal"
            class="absolute top-6 right-6 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <!-- <div v-for="food in mappedFiveStarMenus" key="food.id">
          <img
            :src="`/foods/${food.name}.png`"
            alt="food.name"
            class="w-2/5 drop-shadow--[0_8px_5px_rgba(0,0,0,0.3)]"
          />
        </div> -->
        <div class="flex flex-col justify-center items-center p-4">
          <img
            src="/public/unknownDish.png"
            alt="foodname"
            class="w-60 drop-shadow--[0_8px_5px_rgba(0,0,0,0.3)]"
          />
          <img
            :src="ratingStars(rating)"
            alt="Star Rating"
            class="w-1/2 mt-2"
          />
          <p class="text-4xl font-bold font-noto-thai text-gray-600 mt-4">
            ซุปชายหาด
          </p>
        </div>

        <!-- Modal content -->
        <div
          class="pt-4 pb-8 text-xl font-bold font-noto-thai text-gray-600 text-center"
        >
          <p class="text-2xl">Review: {{ specialRequirement[1].goodReview }}</p>
          <div class="flex justify-around">
            <p class="py-4">Gold: {{  }}</p>
            <p class="py-4">Popularity: {{  }}</p>
          </div>
          <p>New Recipe Unlock: </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
