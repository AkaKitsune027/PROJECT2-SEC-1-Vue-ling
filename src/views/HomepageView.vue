<script setup>
import { ref } from "vue"
import { useUserStore } from "../stores/user"
import { useRouter } from "vue-router"
import { useSoundStore } from "../stores/sounds"
import ConfirmDeleteUserModal from "../components/ConfirmDeleteUserModal.vue"
import HowToPlayModal from "../components/HowToPlayModal.vue"

const router = useRouter()
const userStore = useUserStore()
const soundStore = useSoundStore()
const showHowToPlayModal = ref(false)
const showDeleteModal = ref(false)

function handleToGame() {
  router.push({ name: "cooking-page" })
  soundStore.playSound("bgm", "/sounds/background.mp3")

}

function deleteUser() {
  showDeleteModal.value = true
}
function handleHowToPlay() {
  showHowToPlayModal.value = true
}

const signout = () => {
  router.push({ name: "login-page" })
}
</script>
<template>
  <div class="menu min-h-screen ">
    <div class="fixed inset-0 bg-[#2e2c2c] bg-opacity-40 flex flex-col items-center min-h-screen ">
      <div class="w-screen h-20 flex justify-end py-4 px-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M212.92 17.69a8 8 0 0 0-6.86-1.45l-128 32A8 8 0 0 0 72 56v110.08A36 36 0 1 0 88 196V62.25l112-28v99.83A36 36 0 1 0 216 164V24a8 8 0 0 0-3.08-6.31" />
        </svg>
      </div>
      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#ffffff]">
        ISEKAI COOKING
      </h1>

      <div class="flex flex-col justify-center md:flex-row mt-2 space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 w-4/5">
        <!-- Restaurant Info Section -->
        <div
          class="bg-[#f9f9f6] p-8 rounded-lg justify-center shadow-2xl flex flex-col items-center w-full md:w-5/12 h-fit">
          <img src="/logoHome2.png" alt="Restaurant" class="w-32 h-32 object-cover" />
          <div class="flex w-full mt-4">
            <p class="text-[#2d2d2d] text-m font-sunday font-bold mr-10 text-center mt-4">USERNAME</p>
            <label class="bg-[#b9bcbda5] w-96 h-16 text-center py-4 text-black rounded-md text-xl font-sunday">
              {{ userStore.user.username }}
            </label>
          </div>
          <div class="flex w-full mt-2">
            <p class="text-[#2d2d2d] font-bold font-sunday mr-4 text-center mt-2">YOUR RESTAURANT</p>
            <label class="bg-[#b9bcbda5] w-96 h-16 text-center py-4 text-[#000000] rounded-md text-xl font-rowdies">
              {{ userStore.user.outletName }}
            </label>
          </div>

          <p class="text-[#606060] mt-4">
            Do you want to delete your account?
            <button @click="deleteUser" class="text-nowrap font-bold text-[#f63939] hover:underline">
              Delete
            </button>
          </p>
          <button @click="signout" class="signout text-white font-bold bg-[#52443b] rounded-md w-28 h-10 mt-4">Sign
            out</button>
        </div>

        <!-- Buttons Section -->
        <div class="flex flex-col justify-center space-y-4 w-full md:w-auto">
          <button @click="handleToGame" class="btn-play h-14">PLAY</button>
          <button @click="handleHowToPlay" class="btn-how text-nowrap h-14">
            HOW TO PLAY
          </button>
        </div>
      </div>
      <ConfirmDeleteUserModal v-if="showDeleteModal" @close="showDeleteModal = false" />
      <HowToPlayModal v-if="showHowToPlayModal" @close="showHowToPlayModal = false" />
    </div>
  </div>
</template>

<style scoped>
.menu {
  font-family: "SUNDAY";
  /* background-image: linear-gradient(10deg, #e7bfca 0%, #f0f4f1 100%); */
  text-emphasis: none;
  -shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  background-image: url("/bg-homepage.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}


.btn-play,
.btn-how {
  /* background-color: #61544b; */
  background-color: #28724d;
  color: white;
  padding: 10px 5vw;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.btn-play:hover,
.btn-how:hover {
  background-color: #53bb85;
  transform: translateY(-5px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

.signout:hover {
  background-color: #676056;
  transform: translateY(-5px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

h1 {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}
</style>
