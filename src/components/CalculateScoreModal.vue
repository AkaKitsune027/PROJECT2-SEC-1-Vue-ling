<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../stores/gameState'
import { useUserStore } from '../stores/user'
import { calculatePrice, generateOrder } from '../libs/gameFunction'
import { getFoodDataById } from '../libs/utils'
import { patchUser, updateUserDetails } from '../libs/userManagement'

const router = useRouter()
const gameState = useGameState()
const userStore = useUserStore()

const summary = calculatePrice()
const unlockedFood = ref(null)
const sprFromCustomer = gameState.currentOrder.specialRequirement.description
const ratingStars = (stars) => `/star-${stars}.png`
const isEvent = ref(false)
const price = ref(summary.gold)

onMounted(async () => {
  const updateData = {
    gold: userStore.user.userDetail.gold,
    popularity: userStore.user.userDetail.popularity,
    isCurrentOrderCommitted: false,
    currentOrder: generateOrder(),
  }

  console.log('updateData: ', updateData)

  if (summary.stars === 5 && summary.recipeUnlockId) {
    unlockedFood.value = getFoodDataById(summary.recipeUnlockId)
    updateData['fiveStarMenus'] = JSON.parse(
      JSON.stringify(userStore.user.userDetail.fiveStarMenus)
    ) // copy old fiveStarMenus เพื่อเปลี่ยนแค่บาง field
    const menu = updateData.fiveStarMenus.find(
      (menu) => menu.foodId === summary.recipe.id
    )
    menu.isUnlock = true

    updateData['recipes'] = userStore.user.userDetail.recipes // copy old recipes เพื่อเปลี่ยนแค่บาง field
    const recipe = updateData.recipes.find(
      (recipe) => recipe.id === summary.recipeUnlockId
    )
    recipe.isUnlock = true
  }

  const currentPop = userStore.user.userDetail.popularity
  isEvent.value = Math.floor(Math.random() * 100) < Math.abs(currentPop)
  if (isEvent.value) {
    if (currentPop >= 0) {
      price.value = price.value * 2
    } else if (currentPop < 0) {
      price.value = price.value / 2
    }
  }

  updateData.gold += price.value

  if (updateData.popularity > 50) {
    updateData.popularity = 50
  } else if (updateData.popularity < -50) {
    updateData.popularity = -50
  }

  const updatedUserDetails = await updateUserDetails(
    userStore.user.id,
    updateData
  )
  if (patchUser) {
    userStore.user.userDetail = updatedUserDetails // update user on client side
  }

  gameState.dropCooking()
  gameState.isPreparePhase = true
  gameState.countInteractive = 0
})

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
        <div class="w-44 absolute -top-8 -left-16 -rotate-[10deg]">
          <img
            v-show="summary.stars == 1 || summary.stars == 2"
            src="/medal-bronze.png"
            alt="bornze medal"
          />
          <img
            v-show="summary.stars == 3 || summary.stars == 4"
            src="/medal-silver.png"
            alt="silver medal"
          />
          <img
            v-show="summary.stars == 5"
            src="/medal-gold.png"
            alt="gold medal"
          />
        </div>

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
        <div class="flex flex-col justify-center items-center p-4">
          <img
            :src="`/foods/${summary.recipe.name}.png`"
            alt="foodname"
            class="w-40 drop-shadow--[0_8px_5px_rgba(0,0,0,0.3)]"
          />
          <img
            :src="ratingStars(summary.stars)"
            alt="Star Rating"
            class="w-1/2 mt-1"
          />
          <p class="text-4xl font-bold font-noto-thai text-gray-600 mt-3">
            {{ summary.recipe.display_name }}
          </p>
        </div>

        <!-- Modal content -->
        <div
          class="pt-4 pb-8 text-xl font-bold font-noto-thai text-gray-600 text-center"
        >
          <div class="text-start px-12">
            <p class="pb-4">
              ความต้องการพิเศษ:
              <span class="font-medium">แต่{{ sprFromCustomer }}</span>
            </p>
            <p>
              รีวิว: <span class="font-medium">{{ summary.review }}</span>
            </p>
          </div>
          <div class="grid grid-cols-3 gap-4 py-8 px-12 text-start">
            <div class="flex gap-2">
              <div>โกลด์:</div>
              <div class="font-medium">
                <div>{{ price }} 💰</div>
                <div
                  v-if="isEvent && userStore.user.userDetail.popularity > 0"
                  class="text-xs text-green-600"
                >
                  ได้รับโกลด์ 2 เท่า <br />จากโบนัสชื่อเสียง
                </div>
                <div
                  v-else-if="
                    isEvent && userStore.user.userDetail.popularity <= 0
                  "
                  class="text-xs text-red-500"
                >
                  ได้รับโกลด์แค่ครึ่งเดียว <br />จากชื่อเสียงที่ไม่ดี
                </div>
              </div>
            </div>
            <p>
              ชื่อเสียง:
              <span
                class="font-medium"
                :class="{ 'text-red-500': summary.pop < 0 }"
                >{{ summary.pop }} 📣</span
              >
            </p>
            <p>
              ความถูกต้อง:
              <span class="font-medium">{{ summary.matchPercentage }} %</span>
            </p>
          </div>
          <div
            v-if="summary.stars >= 5 && summary.recipeUnlockId"
            class="gradient flex flex-row justify-center bg-amber-200 p-2"
          >
            <p>รางวัลพิเศษสำหรับการปลดล็อก 5 ดาว :</p>
            <p>
              &nbsp;สูตร<span>{{ unlockedFood?.display_name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: rgb(249, 242, 149);
  background: linear-gradient(
    135deg,
    rgba(249, 242, 149, 0.75) 0%,
    rgba(224, 170, 62, 0.75) 35%,
    rgba(250, 243, 152, 0.75) 75%,
    rgba(184, 138, 68, 0.75) 100%
  );
}
</style>
