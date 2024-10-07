<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()
const restaurantName = ref("")

const handleSetOutletName = () => {
  router.push({ name: "home-page" })
}
</script>

<template>
  <div
    class="page flex flex-col items-center justify-center min-h-screen isekai-background"
  >
    <div class="w-full h-96 max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl text-center bold text-[#6c4949]">
        Create Your Restaurant
      </h2>
      <img src="/Home.svg" alt="Restaurant" class="w-24 h-24 object-cover ml-36 mt-4" />
      <label class="block text-[#6c4949] font-bold mt-4" for="restaurant-name"
        >RESTAURANT NAME <span class="text-red-600">*</span>
      </label>
      <input
        v-model="restaurantName"
        id="restaurant-name"
        type="text"
        required
        class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
      />

      <button
        @click="handleSetOutletName"
        :disabled="!restaurantName"
        class="w-full bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700 mt-2 disabled:bg-gray-400"
      >
        CREATE
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  font-family: "SUNDAY";
}

.isekai-background {
  position: relative;
  /* background-color: #231414; ed9848*/
  background-image: linear-gradient(10deg, #a15852 0%, #eeaa69 100%);
  overflow: hidden;
}
</style>