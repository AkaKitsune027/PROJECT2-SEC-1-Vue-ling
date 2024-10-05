<script setup>
import { defineProps, ref } from "vue"
import { useRouter } from "vue-router"

// Accept the showBook prop from the parent component
const props = defineProps({
  showBook: Boolean,
})

const router = useRouter()
const dish = ref({})
const showSelectedDish = ref(false)

const closeModal = () => {
  router.back()
}

function OpenSelectedDish() {
  showSelectedDish.value = true
  console.log(showSelectedDish.value)
}
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
        <div class="flex justify-center items-center pt-2">
          <img src="/5stars.png" alt="banner" class="w-80" />
        </div>
        <div
          class="body pt-0 p-8 grid grid-cols-3 grid-rows-3 gap-6 overflow-y-auto"
        >
          <img
            src="/riceWithEgg.png"
            alt="rice-with-egg"
            class="cursor-pointer"
            @click="OpenSelectedDish('riceWithEgg')"
          />
          <img src="/riceWithMeat.png" alt="rice-with-meat" />
          <img src="/beachSoup.png" alt="beach-soup" />
          <img src="/rainbowPudding.png" alt="rainbow-pudding" />
          <img
            v-for="n in 5"
            :key="n"
            src="/unknownBowl.png"
            alt="unknown-bowl"
            class="opacity-55"
          />
        </div>
      </div>
    </div>

    <!-- Selected Dish -->
    <div
      v-show="showSelectedDish"
      class="relative bg-white rounded-lg shadow w-[600px] h-auto ml-10"
    >
      <div class="body p-4">
        <h1 class="text-4xl font-bold text-gray-600 mt-4 text-center">
          <!-- {{ dish.name }} -->
          Rice with Egg
        </h1>
        <div class="flex justify-center items-center">
          <!-- <img :src="dish.image" alt="dish"> -->
          <img src="/riceWithEgg.png" alt="dish" class="w-60" />
        </div>
        <div class="description px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Description</p>
          <p class="text-lg ps-4 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div class="ingredients px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Ingredients</p>
          <div class="flex flex-row gap-4 m-4">
            <div
              class="flex flex-col gap-2 px-2 py-2 rounded-lg w-20 bg-gray-200"
              v-for="n in 5"
              :key="n"
            >
              <img src="/redEyedSnakeEggs.png" alt="red-eyed-snake-eggs" />
              <p class="text-sm">Red Eyed Snake Eggs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
