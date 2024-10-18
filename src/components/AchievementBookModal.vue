<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import foodsData from "../../data/foods.json"
import ingredientsData from "../../data/ingredients.json"

const router = useRouter()
const userStore = useUserStore()
const selectedMenu = ref(null) // Store the selected menu details
const selectedMenuIngredients = ref([]) // Store the selected menu ingredients

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

const closeModal = () => {
  router.push({ name: "cooking-page" })
}

function showSelectedMenu(menu) {
  if (menu.isUnlock) {
    selectedMenu.value = menu // Set the selected menu data
    console.log(`Selected menu: ${menu.name}`)

    const ingredients = [] // Store the selected menu ingredients
    for (const ingredientName of selectedMenu.value.ingredients) {
      console.log(selectedMenu.value.ingredients)
      const existsIngredientIndex = ingredients.findIndex(
        (i) => i.name === ingredientName
      )
      console.log(`Exists indx: ${existsIngredientIndex}`)
      if (existsIngredientIndex === -1) {
        if (["meat", "vegetable"].includes(ingredientName)) {
          ingredients.push({
            type: ingredientName,
            name: ingredientName,
            display_name: `${ingredientName === "meat" ? "เนื้อ" : "ผัก"
              }อะไรก็ได้`,
            amount: 1,
            // image: `/meat/meat.png`,
          })
          console.log(ingredientName)
          console.log(ingredients)
        } else if (["salt", "sugar"].includes(ingredientName)) {
          ingredients.push({
            type: "seasoning",
            name: "bottle-of-" + ingredientName,
            display_name: `${ingredientName === "salt" ? "เกลือ" : "น้ำตาล"}`,
            amount: 1,
          })
        } else {
          ingredients.push({
            ...ingredientsData.find((i) => i.name === ingredientName),
            amount: 1,
          })
        }
      } else {
        ingredients[existsIngredientIndex].amount += 1
      }
    }
    selectedMenuIngredients.value = ingredients
    console.log(ingredients)
  }
  // else {
  //   console.log(`Locked menu: ${menu.name}`)
  // }

  // showSelectedMenu.value = false
  // showSelectedMenu.value = true
  // console.log(showSelectedMenu.value)
}
</script>

<template>
  <!-- Modal -->
  <div class="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center pl-20">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 class="text-3xl font-bold text-gray-600">Achievement Book</h3>
          <button @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="body h-[630px] overflow-y-auto">
          <div class="grid grid-cols-4 pt-2">
            <!-- Empty div for the first grid column -->
            <img src="/5stars.png" alt="banner" class="col-span-2 col-start-2 flex justify-center" />
          </div>
          <div class="pt-0 p-8 flex flex-col gap-2 lg:grid grid-cols-3 grid-flow-row lg:gap-6">
            <div @click="showSelectedMenu(menu)" v-for="(menu, index) in mappedFiveStarMenus" :key="index" :class="{
              grayscale: !menu.isUnlock,
              'hover:scale-[1.03] duration-300': menu.isUnlock,
            }" class="gradient rounded-lg shadow-xl border-4 border-[#eed285] p-1 cursor-pointer">
              <div v-if="menu.isUnlock">
                <img :src="`/foods/${menu.name}.png`" alt="food.name"
                  class="w-full h-auto drop-shadow-[0_8px_5px_rgba(0,0,0,0.3)]" />
                <p class="text-center mt-1 font-semibold text-lg font-noto-thai text-gray-600">
                  {{ menu.display_name }}
                </p>
              </div>

              <div v-else class="opacity-55">
                <img src="/unknownDish.png" alt="unknown-dish" class="w-full h-auto" />
                <p class="text-center mt-1 font-semibold text-gray-600">
                  Locked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Menu -->
    <div class="relative bg-white rounded-lg shadow w-[38rem] h-auto mx-10">
      <div class="body p-4">
        <h1 :class="{
          'text-4xl font-bold text-gray-600 my-4 font-noto-thai text-center':
            selectedMenu?.display_name,
          'text-4xl font-bold text-gray-600 my-4 font-rowdies text-center':
            !selectedMenu?.display_name,
        }">
          {{ selectedMenu?.display_name || "Mystery Menu" }}
        </h1>
        <div class="flex justify-center items-center">
          <img :src="selectedMenu
              ? `/foods/${selectedMenu?.name}.png`
              : '/unknownDish.png'
            " :alt="selectedMenu?.name || 'unknown dish'" class="w-60" />
        </div>
        <div class="description px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Description</p>
          <p class="font-noto-thai font-medium text-gray-600 text-lg indent-6 ps-4 py-2">
            {{
              selectedMenu?.description ||
              "Achieve a 5-star rating to collect all of these menus!"
            }}
          </p>
        </div>
        <div class="ingredients px-12 py-2">
          <p class="text-2xl font-bold text-gray-600">Ingredients</p>
          <div class="container flex flex-row justify-items-center gap-4 m-4 w-auto h-auto overflow-x-auto">
            <div class="flex flex-col gap-2 mb-4 px-2 py-2 rounded-lg min-w-20 bg-gray-200" v-if="!selectedMenu"
              v-for="n in 8" :key="n">
              <img :src="selectedMenu
                  ? `/meat/${selectedMenu?.ingredients}.png`
                  : '/unknownIngredient.png'
                " :alt="selectedMenu?.ingredients || 'unknown ingredient'" />
              <p class="text-sm text-center">Unknown Ingredient</p>
            </div>
            <div class="flex flex-col gap-2 mb-4 px-2 py-2 rounded-lg min-w-20 bg-gray-200"
              v-for="ingredient in selectedMenuIngredients || []" :key="ingredient">
              <!-- <img
                src="/public/meat/redEyedSnakeEggs.png"
                alt="red-eyed-snake-eggs"
              /> -->
              <img :src="`/${ingredient.type}/${ingredient.name}.png`"
                :alt="ingredient.display_name || 'unknown ingredient'" />
              <p class="text-sm text-center">
                {{ ingredient.display_name }} ({{ ingredient.amount }})
              </p>
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
  background: linear-gradient(135deg,
      rgba(249, 242, 149, 0.75) 0%,
      rgba(224, 170, 62, 0.75) 35%,
      rgba(250, 243, 152, 0.75) 75%,
      rgba(184, 138, 68, 0.75) 100%);
}
</style>
