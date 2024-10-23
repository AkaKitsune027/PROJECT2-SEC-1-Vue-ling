<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useGameState } from '@/stores/gameState'
import { calculatePrice } from '@/libs/calculateScore'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'
import customers from '../../data/customers.json'
import specialRequirement from '../../data/specialRequirement.json'
import CustomerOrderModal from './CustomerOrderModal.vue'

const router = useRouter()
const userStore = useUserStore()
const gameState = useGameState()

const ratingStars = (stars) => `/star-${stars}.png`
const summary = ref(calculatePrice())
const sprFromCustomer = gameState

function checkFiveStar() {
  if (summary.value.stars >= 5) {
    return true
  }
  return false
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
          class="w-44 absolute -top-8 -left-16 -rotate-[10deg]"
        />

        <!-- Modal header -->
        <div class="relative flex items-center justify-center pt-8">
          <h1 class="text-4xl font-extrabold font-noto-thai text-gray-600">
            สรุปผลรวมคะแนน
          </h1>
          <button
            @click="closeModal"
            class="absolute top-6 right-6 text-gray-400 bg-transparent hover:bg-[#ffedb2] hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
            :src="ratingStars(summary.stars)"
            alt="Star Rating"
            class="w-1/2 mt-1"
          />
          <p class="text-4xl font-bold font-noto-thai text-gray-600 mt-3">
            {{ summary.foodName }}
          </p>
        </div>

        <!-- Modal content -->
        <div
          class="pt-4 pb-8 text-xl font-bold font-noto-thai text-gray-600 text-center"
        >
          <div class="text-start px-12">
            <p class="pb-4">
              ความต้องการพิเศษ: <span class="font-medium">แต่{{ sprFromCustomer.currentOrder.specialRequirement?.description }}</span>
            </p>
            <p>รีวิว: <span class="font-medium">{{ summary.review }}</span></p>
          </div>
          <div class="grid grid-cols-3 gap-4 py-8 px-12 text-start">
            <p>โกลด์: <span class="font-medium">{{ summary.gold }} 💰</span></p>
            <p>ชื่อเสียง: <span class="font-medium">{{ summary.pop }} 📣</span></p>
            <p>ความถูกต้อง: <span class="font-medium">{{ summary.matchPercentage }} %</span></p>
          </div>
          <div
            v-if="checkFiveStar()"
            class="gradient flex flex-row justify-center bg-amber-200 p-2">
            <p>รางวัลพิเศษสำหรับการปลดล็อก 5 ดาว :</p>
            <p>&nbsp;สูตร<span>ข้าวผัดราชาหมู</span></p>
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
