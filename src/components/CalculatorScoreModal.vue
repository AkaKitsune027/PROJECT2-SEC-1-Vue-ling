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
      <div class="bg-[#fff8e2] rounded-2xl shadow">
        <img
          :src="`/medal-bronze.png`"
          alt="medal"
          class="w-44 absolute -top-10 -left-14 -rotate-[10deg]"
        />

        <!-- Modal header -->
        <div class="relative flex items-center justify-center pt-8">
          <h1 class="text-4xl font-semibold font-rowdies text-gray-600">
            Score Summary
          </h1>
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
            src="/foods/beachSoup.png"
            alt="foodname"
            class="w-40 drop-shadow--[0_8px_5px_rgba(0,0,0,0.3)]"
          />
          <img
            :src="ratingStars(rating)"
            alt="Star Rating"
            class="w-1/2 mt-1"
          />
          <p class="text-4xl font-bold font-noto-thai text-gray-600 mt-3">
            ซุปชายหาด
          </p>
        </div>

        <!-- Modal content -->
        <div
          class="pt-4 pb-8 text-xl font-bold font-noto-thai text-gray-600 text-center"
        >
          <p class="text-2xl pb-4">
            Description: {{ specialRequirement[1].description }}
          </p>
          <p class="text-2xl">Review: {{ specialRequirement[1].goodReview }}</p>
          <div class="flex justify-around py-8">
            <p class="">Gold: 200 💰</p>
            <p class="">Popularity: 4.5 📣</p>
            <p class="">Matching: 20 %</p>
          </div>
          <div class="gradient flex flex-row justify-center bg-amber-200 p-2">
            <p>รางวัลพิเศษสำหรับการปลดล็อก 5 ดาว: สูตร</p>
            <p>ข้าวผัดราชาหมู</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: rgb(249, 242, 149);
  background: linear-gradient(135deg,
      rgba(249, 242, 149, 0.75) 0%,
      rgba(224, 170, 62, 0.75) 35%,
      rgba(250, 243, 152, 0.75) 75%,
      rgba(184, 138, 68, 0.75) 100%);
}
</style>
