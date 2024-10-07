<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
// const showSelectedDish = ref(false)

const dishes = ref([
  { name: "Rice with Egg", image: "riceWithEgg.png", unlocked: false },
  { name: "Rice with Meat", image: "riceWithMeat.png", unlocked: true },
  { name: "Beach Soup", image: "beachSoup.png", unlocked: true },
  { name: "Dragon Steak", image: "dragonSteak.png", unlocked: true },
  {
    name: "Five Companions Stew",
    image: "fiveCompanionsStew.png",
    unlocked: true,
  },
  {
    name: "Fried Orcs with Vegetables",
    image: "friedOrcsWithVegetables.png",
    unlocked: true,
  },
  {
    name: "Grilled Boar with Salt",
    image: "grilledBoarWithSalt.png",
    unlocked: true,
  },
  {
    name: "King Pork Fried Rice",
    image: "kingPorkFriedRice.png",
    unlocked: true,
  },
  {
    name: "Spicy Chicken Stir Fry",
    image: "spicyChickenStirFry.png",
    unlocked: true,
  },
  { name: "Rainbow Pudding", image: "rainbowPudding.png", unlocked: true },
])

const closeModal = () => {
  router.push({ name: "cooking-page" })
}

// function OpenSelectedDish(dishName) {
//   showSelectedDish.value = true
//   console.log(showSelectedDish.value)
// }
</script>

<template>
  <!-- Modal -->
  <div
    class="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-items-start pl-20"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <h3 class="text-3xl font-bold text-gray-600">Achievement Book</h3>
          <button
            @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
        <div class="body h-[630px] overflow-y-auto">
          <div class="grid grid-cols-4 pt-2">
            <div></div>
            <!-- Empty div for the first grid column -->
            <img
              src="/5stars.png"
              alt="banner"
              class="col-span-2 flex justify-center"
            />
          </div>
          <div class="pt-0 p-8 grid grid-cols-3 grid-rows-3 gap-6">
            <div
              v-for="(dish, index) in dishes"
              :key="index"
              :class="{ grayscale: !dish.unlocked }"
              class="gradient rounded-lg shadow-xl border-4 border-[#eed285] p-1"
            >
              <div
                v-if="dish.unlocked"
                class="cursor-pointer"
                @click="OpenSelectedDish(dish.name)"
              >
                <img
                  :src="`/foods/${dish.image}`"
                  alt="dish.name"
                  class="w-full h-auto drop-shadow-[0_8px_5px_rgba(0,0,0,0.3)]"
                />
                <p class="text-center mt-1 font-semibold text-gray-600">
                  {{ dish.name }}
                </p>
              </div>

              <div v-else class="opacity-55">
                <img
                  src="/unknownDish.png"
                  alt="unknown-dish"
                  class="w-full h-auto"
                />
                <p class="text-center mt-1 font-semibold text-gray-600">
                  Locked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Dish -->
    <div class="relative bg-white rounded-lg shadow w-[600px] h-auto mx-10">
      <div class="body p-4">
        <h1 class="text-4xl font-bold text-gray-600 my-4 text-center">
          <!-- {{ dish.name }} -->
          Menu Name
        </h1>
        <div class="flex justify-center items-center">
          <!-- <img :src="dish.image" alt="dish"> -->
          <!-- <img :src="`/foods/${dish.image}`" alt="dish" class="w-60" /> -->
          <img src="/unknownDish.png" alt="unknown dish" class="w-60" />
        </div>
        <div class="description px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Description</p>
          <p
            class="font-noto-thai font-medium text-gray-600 text-lg indent-6 ps-4 py-2"
          >
            This dish is currently locked. Unlock it by completing <br />
            5 stars!
          </p>
        </div>
        <div class="ingredients px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Ingredients</p>
          <div
            class="container flex flex-row justify-items-center gap-4 m-4 w-auto h-auto overflow-x-auto"
          >
            <div
              class="flex flex-col gap-2 mb-4 px-2 py-2 rounded-lg min-w-20 bg-gray-200"
              v-for="n in 8"
              :key="n"
            >
              <!-- <img
                src="/public/meat/redEyedSnakeEggs.png"
                alt="red-eyed-snake-eggs"
              /> -->
              <img src="/unknownIngredient.png" alt="" />
              <p class="text-sm text-center">Unknown Ingredient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b6b6b6;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

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
