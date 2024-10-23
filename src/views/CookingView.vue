<script setup>

import { computed, onMounted, ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { useSoundStore } from "@/stores/sounds"
import IngredientBar from "@/components/IngredientBar.vue"
import SeasoningBar from "@/components/SeasoningBar.vue"

import { useGameState } from "@/stores/gameState"
import GoldAndPopularity from "@/components/GoldAndPopularity.vue"
import RecipesModal from "@/components/RecipesModal.vue"
import Sound from "@/components/Sound.vue"
import ShopBar from "@/components/ShopBar.vue"
import { calculatePrice } from "../libs/calculateScore"


const router = useRouter()
const soundStore = useSoundStore()
const userStore = useUserStore()
const gameState = useGameState()
// const showHowToPlayModal = ref(false)

const isShow = ref(true)
const handleConfirmOrderClick = () => {
    if (isShopping.value) isShopping.value = false
}

const handleGameGuideConfirm = () => {
    isShow.value = !isShow.value
}

onMounted(() => {
    gameState.isPreparePhase = !userStore.user.userDetail.isCurrentOrderCommitted
})

function handleOrderSignClick() {
    if (gameState.isPreparePhase) router.push({ name: "prepare-modal" })
    else router.push({ name: "cooking-modal" })
}

// Image animation
const cauldronRef = ref(null)
const currentCauldronImageFrame = ref(0)
const currentImage = computed(() => {
    const cauldronImage = [
        "/cauldron.png",
        "/1.png",
        "/2.png",
        "/3.png",
        "/4.png",
    ]
    return cauldronImage[currentCauldronImageFrame.value]
})
const isShopping = ref(false)

let cauldronInterval = null
const handleCauldronClick = () => {
    if (gameState.countInteractive >= gameState.requireClick || cauldronInterval) return

    cauldronRef.value.classList.add('animate-stir')

    cauldronInterval = setInterval(() => {
        currentCauldronImageFrame.value++
        if (currentCauldronImageFrame.value > 4) {
            currentCauldronImageFrame.value = 0
            gameState.countInteractive++
            console.log('CurrentgameState.countInteractive: ' + gameState.countInteractive)
            clearInterval(cauldronInterval)
            cauldronInterval = null
            cauldronRef.value.classList.remove('animate-stir')
        }
    }, 700)
    soundStore.playSound('sfx', '/sounds/boiling-water-sound.mp3')
}

async function openAchievementBook() {
    const data = await useUserStore.getData
    console.log(data)

    router.push({ name: "achievement-book-modal" })
}

const handleToggleFoodStoreClick = () => {
    isShopping.value = !isShopping.value
}

const handleServeClick = () => {
    calculatePrice()
    router.push({ name: "calculate-score-modal" })
}

function handleCancelCooking() {
    router.push({ name: "cancel-order-modal" })
}

</script>

<template>
    <div class="w-screen h-[4rem] p-3 fixed top-0 bg-transparent">
        <div class="flex justify-between">
            <RouterLink to="/homepage">
                <button class="hover:shadow-md w-12 transform transition-transform duration-300 hover:scale-110">
                    <img src="/arrow-back2.png" class="w-11" />
                </button>
            </RouterLink>

            <div
                class="absolute pointer-events-none text-center w-[calc(100%-1.5rem)] font-rowdies text-3xl text-white">
                Isekai Cooking
            </div>

            <div class="relative">
                <div class="flex flex-row relative z-10 gap-2">
                    <button>
                        <img src="/book.png" class="w-10" />
                    </button>
                    <button @click="openAchievementBook">
                        <img src="/trophy.png" class="w-10" />
                    </button>
                    <Sound />
                </div>
            </div>
        </div>
    </div>

    <div
        class="bg-[url('/kitchen-room1.png')] bg-cover w-screen pt-[4rem] h-screen grid grid-cols-5 grid-rows-6 overflow-hidden font-noto-thai">
        <div class="grid row-span-5 pt-6">
            <IngredientBar v-if="!isShopping" :userIngredients="userStore.user.userDetail.ingredients" />
            <ShopBar v-else-if="isShopping" />
        </div>
        <div class="row-start-6 col-start-1 pt-2">
            <!-- ? Toggle Food Store Button -->
            <div class="bg-zinc-700 h-[5rem] rounded-r-xl grid place-items-center">
                <button @click="handleToggleFoodStoreClick" :disabled="gameState.isPreparePhase === false"
                    class="w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-xl border border-white grid place-items-center active:scale-95 hover:scale-105 transition"
                    :class="[{ grayscale: !gameState.isPreparePhase }, isShopping ? 'bg-[#9d8a69] hover:bg-[#d1ba91]' : 'bg-base hover:bg-[#90a58e]']">
                    <div v-show="!isShopping" class="flex justify-center items-center gap-2">
                        <img src="/src/assets/bag.svg" alt="shop" class="h-6" />
                        <div class="text-xl text-white">ร้านค้า</div>
                    </div>
                    <div v-show="isShopping" class="flex justify-center items-center gap-2">
                        <img src="/src/assets/home.svg" alt="home" class="h-6" />
                        <div class="text-xl text-white">กลับร้าน</div>
                    </div>
                </button>
            </div>
        </div>
        <div class="row-start-6 col-start-2 flex justify-center items-end">
            <SeasoningBar />
        </div>

        <div class="row-span-3 col-span-2 col-start-3 row-start-3 flex justify-center items-center z-60">
            <!-- ! Cauldron -->
            <div v-show="!gameState.isPreparePhase" class="row-start-4 col-start-4 fixed">
                <!-- <div>
                    <img src="/src/assets/mouse.svg" class="w-16 select-none pointer-events-none hover:bg-white" />
                    <div class="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></div>
                </div> -->
                <div class="row-start-4 col-start-3 w-fit p-4 rounded-md z-20 select-none pointer-events-none my-3"
                    :class="gameState.requireClick - gameState.countInteractive === 0 ? 'bg-yellow-400 shadow-md animate-pulse shadow-white' : 'bg-white scale-80 shadow-inner'">
                    <span class="animate-pulse"
                        v-show="(gameState.requireClick - gameState.countInteractive > 0)">คลิกอีก
                        <span class="text-red-600 font-bold">{{ gameState.requireClick -
                            gameState.countInteractive }}</span>
                        ครั้งเพื่อคนส่วนผสมเข้าด้วยกัน !
                    </span>
                    <span v-show="(gameState.requireClick - gameState.countInteractive === 0)"
                        class="text-white scale-100 transition font-bold">พร้อมเสิร์ฟให้ลูกค้าแล้ว !</span>
                </div>
            </div>
            <img ref="cauldronRef" :src="currentImage" alt="cauldron" class="select-none pointer-events-none" />
            <button @click="handleCauldronClick"
                class="absolute rounded-full w-[26%] h-[49%] translate-y-[7%] cursor-pointer disabled:cursor-default"
                :class="gameState.requireClick - gameState.countInteractive === 0 ? 'pointer-events-none' : 'cursor-pointer'"
                :disabled="gameState.isPreparePhase"></button>
        </div>


        <div class="col-start-3 row-start-6 col-span-2">
            <div class="bg-[#ACC6AA] flex rounded-xl shadow-neutral-500 shadow-md relative justify-center h-full">
                <div class="flex justify-center place-items-center gap-2 flex-wrap mx-6 w-[60%]">
                    <div v-for="(ingd, index) in gameState.ingredientInCauldron" :key="index"
                        class="bg-white border-2 border-[#e9d1ff] rounded-lg w-10 h-10 flex justify-center items-center ">
                        <img :src="`/${ingd.type}/${ingd.name}.png`" class="w-10 h-10">
                    </div>
                </div>
                <!-- ปุ่มถังขยะ -->
                <div class="w-28 flex items-center justify-end">
                    <div class="flex justify-end transform">
                        <button :disabled="gameState.cauldron.length === 0" @click="handleCancelCooking"
                            :class="gameState.cauldron.length === 0 ? 'cursor-not-allowed opacity-50' : ''"
                            class="bg-alert-200 hover:bg-[#7f4641] border border-white w-12 rounded-lg flex justify-center">
                            <img src="/src/assets/trash.svg" alt="trash" class="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-start-5 row-start-6 flex justify-center place-items-center">
            <button @click="handleServeClick"
                class="border-2 bg-yellow-400 border-white rounded-lg h-20 w-64 text-3xl text-white disabled:cursor-not-allowed relative hover:contrast-75 transition duration-300 disabled:hover:contrast-100"
                :class="gameState.countInteractive >= gameState.requireClick ? 'scale-100 saturate-100' : 'scale-90 saturate-[30%]'"
                :disabled="gameState.isPreparePhase || gameState.countInteractive < gameState.requireClick">
                <div class="absolute w-full h-full grid place-items-center">เสิร์ฟ !!</div>
                <div class="h-full rounded-lg transition-[width_filter] duration-300 bg-yellow-500"
                    :style="{ width: `${gameState.countInteractive * (100 / gameState.requireClick)}%` }"></div>
            </button>
        </div>

        <div class="col-start-2 row-start-1 row-span-4 flex justify-center">
            <RecipesModal />
        </div>
        <div class="col-start-4 row-start-1">
            <GoldAndPopularity />
        </div>

        <div class="col-start-5 row-start-1 flex justify-center">
            <img src="/borad.png" class="absolute z-0 h-36" />
            <div
                class="bg-[#c5a691] w-[7rem] flex justify-center items-center rounded-md mt-2 shadow-neutral-500 shadow-md">
                <div @click="handleOrderSignClick"
                    class="bg-white w-[10rem] h-[100%] grid place-items-center relative cursor-pointer rounded-md">
                    <div class="absolute h-5 w-5 -translate-x-1 -translate-y-1 top-0 left-0">
                        <div class="animate-ping absolute h-full w-full rounded-full bg-red-600 opacity-75"></div>
                        <div class="relative rounded-full h-4 w-4 bg-red-600"></div>
                      </div>
                      <img src="../assets/person-fill.svg" class="w-[80%] justify-center" />
                </div>
            </div>
        </div>

        <div v-show="isShow" class="col-start-5 row-start-3 row-span-1 flex flex-col justify-center items-center">
            <!-- <div class="my-9 pointer-events-none">
                <img src="/src/assets/arrow-up.svg" class="animate-bounce w-[70%] h-[70%] my-9 fill-red-600" />
            </div> -->
            <!-- <div class="col-start-5 row-start- row-span-2 flex">
            </div> -->
            <!-- <div class="col-start-5 row-start-4 row-span-2 flex">
                <div class="bg-white p-10 rounded-lg mb-5">
                    <p class="text-red-600 py-2">* โปรดระวัง: หากคุณคลิกที่ปุ่มออเดอร์
                        คุณจะต้องเลือกระหว่างรับออเดอร์หรือไม่รับออเดอร์ *</p>
                    <li>ถ้าคุณรับออเดอร์ คุณจะต้องทำอาหารให้เสร็จและในระหว่างนั้นจะไม่สามารถสั่งซื้อของได้</li>
                    <li class="py-4">ถ้าคุณไม่รับออเดอร์ คุณจะต้องเสียค่าชื่อเสียง</li>
                    <button @click="handleGameGuideConfirm"
                        class="bg-green-500 rounded-lg px-3 text-white flex">เข้าใจแล้วล่ะ</button>
                </div>
            </div> -->
        </div>
    </div>
    <RouterView @handleConfirmOrder="handleConfirmOrderClick" />
</template>

<style scoped>
.animate-stir {
    animation: stir 3.5s;
}

@keyframes stir {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(10deg);
    }

    50% {
        transform: rotate(-10deg);
    }

    75% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>
