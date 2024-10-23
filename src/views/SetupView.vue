<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { patchUser } from "../libs/userManagement"
import { useUserStore } from "../stores/user"

const router = useRouter()
const restaurantName = ref("")
const userStore = useUserStore()

const handleSetOutletName = async () => {
  const patchData = { outletName: restaurantName.value }

  try {
    const patchedUser = await patchUser(userStore.user.id, patchData)

    if (patchedUser.id) {
      userStore.user = patchedUser
      router.push({ name: "home-page" })
    }
  } catch (error) {
    console.error("Error updating restaurant name:", error)
  }
}
</script>

<template>
  <div class="font-sunday flex flex-col items-center justify-center min-h-screen isekai-background">
    <div class="w-full h-96 max-w-md bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl text-center font-bold text-[#6c4949]">
        Create Your Restaurant
      </h2>
      <img src="/logoHome2.png" alt="Restaurant" class="w-24 h-24 object-cover ml-36 mt-4" />
      <label class="block text-[#6c4949] font-bold mt-4" for="restaurant-name">RESTAURANT NAME <span
          class="text-red-600">*</span>
      </label>
      <input v-model="restaurantName" id="restaurant-name" type="text" required
        class="w-full p-3 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]" />

      <button @click="handleSetOutletName" :disabled="!restaurantName"
        class="w-full font-bold bg-[#3f6a45] text-white py-3 rounded-lg hover:bg-brown-700 mt-2 disabled:bg-gray-400">
        CREATE
      </button>
    </div>
  </div>
</template>

<style scoped>
.isekai-background {
  position: relative;
  /* background-color: #231414; ed9848*/
  /* background-image: linear-gradient(10deg, #5c4e47 0%, #faf2b4 100%); */
  background: linear-gradient(135deg,
      rgb(103, 95, 87) 5%,
      rgb(241, 234, 186) 60%,
      #70665e 100%);
  background-size: cover;
  /* ทำให้ภาพคลุมทั้งหน้า */
  overflow: hidden;
}

.shadow {
  box-shadow: 0px 0px 30px #868383;
}
</style>
