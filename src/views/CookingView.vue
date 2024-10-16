<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSoundStore } from '@/stores/sounds'
import IngredientBar from '@/components/IngredientBar.vue'
import SeasoningBar from '@/components/SeasoningBar.vue'

import { useGameState } from '@/stores/gameState'
import GoldAndPopularity from '@/components/GoldAndPopularity.vue'
import RecipesModal from '@/components/RecipesModal.vue'
import Sound from '@/components/Sound.vue'
import ShopBar from '@/components/ShopBar.vue'

const router = useRouter()
const soundStore = useSoundStore()
const userStore = useUserStore()
const gameState = useGameState()

const isShow = ref(true)
const handleGameGuideConfirm = () => {
    isShow.value = !isShow.value
}

onMounted(() => {
    gameState.isPreparePhase = !userStore.user.userDetail.isCurrentOrderCommitted
})

function handleOrderSignClick() {
    if (gameState.isPreparePhase) router.push({ name: 'prepare-modal' })
    else router.push({ name: 'cooking-modal' })
}

// Image animation
const cauldronRef = ref(null)
const countInteractive = ref(0)
const currentCauldronImageFrame = ref(0)
const currentImage = computed(() => {
    const cauldronImage = ['/cauldron.png', '/1.png', '/2.png', '/3.png', '/4.png']
    return cauldronImage[currentCauldronImageFrame.value]
})
const isShopping = ref(false)


let cauldronInterval = null
const handleCauldronClick = () => {
    if (countInteractive.value > 3 || cauldronInterval) return

    cauldronRef.value.classList.add('animate-stir')

    cauldronInterval = setInterval(() => {
        currentCauldronImageFrame.value++
        if (currentCauldronImageFrame.value > 4) {
            currentCauldronImageFrame.value = 0
            countInteractive.value++
            console.log('CurrentCountInteractive: ' + countInteractive.value)
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
    // console.log(showAchievementBook.value)
}

const handleToggleFoodStoreClick = () => {
    isShopping.value = !isShopping.value
}
</script>

<template>
    <div class="bg-[#71A0A5] border drop-shadow-md w-screen h-[4rem] p-3 ">
        <div class="flex justify-between">
            <RouterLink to="/homepage">
                <button class="bg-[#ACC6AA] hover:bg-[#90a58e] w-12 rounded-lg border border-white">
                    <img src="/src/assets/arrow-back.svg" class="w-10" />
                </button>
            </RouterLink>

            <div
                class="absolute pointer-events-none text-center w-[calc(100%-1.5rem)] font-rowdies text-3xl text-white">
                Isekai
                Cooking
            </div>

            <div class="flex gap-3">

                <button
                    class="bg-[#ACC6AA] hover:bg-[#90a58e] flex justify-center w-12 rounded-lg h-10 border border-white">
                    <img src="/src/assets/book-open.svg" class="w-10" />
                </button>

                <button @click="openAchievementBook"
                    class="bg-[#ACC6AA] hover:bg-[#90a58e] flex justify-center items-center w-12 rounded-lg h-10 border border-white">
                    <img src="/src/assets/trophy.svg" class="w-10" />
                </button>

                <Sound />
            </div>
        </div>
    </div>

    <div class="bg-[url('/bg.png')] bg-cover w-screen h-[calc(100vh-4rem)] grid grid-cols-5 grid-rows-6">
        <div class="grid row-span-5 pt-6">
            <IngredientBar v-if="!isShopping" :userIngredients="userStore.user.userDetail.ingredients" />
            <ShopBar v-else-if="isShopping" />
        </div>
        <div class="row-start-6 col-start-1 pt-2">
            <!-- ? Toggle Food Store Button -->
            <div class="bg-zinc-700 h-[5rem] rounded-r-xl grid place-items-center">
                <button @click="handleToggleFoodStoreClick" :disabled="gameState.isPreparePhase === false"
                    class="bg-[#ACC6AA] hover:bg-[#90a58e] w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-xl border border-white grid place-items-center">
                    <div v-show="!isShopping" class="flex justify-center items-center gap-2">
                        <img src="/src/assets/bag.svg" alt="shop" class="h-6" />
                        <div class="text-xl text-white">Shop</div>
                    </div>
                    <div v-show="isShopping" class="flex justify-center items-center gap-2">
                        <img src="/src/assets/home.svg" alt="home" class="h-6" />
                        <div class="text-xl text-white">Back</div>
                    </div>
                </button>
            </div>
        </div>
        <div class="row-start-6 col-start-2 flex justify-center items-end">
            <SeasoningBar />
        </div>
        <div class="row-span-3 col-span-2 col-start-3 row-start-2 flex justify-center items-center z-60">
            <!-- ! Cauldron -->
            <img ref="cauldronRef" :src="currentImage" alt="caudron" class="select-none cursor-pointer"
                @click="handleCauldronClick" />
        </div>

        <div
            class="bg-[#ACC6AA] col-span-2 col-start-3 row-start-5 flex justify-center rounded-xl shadow-neutral-500 shadow-md z-0">
            <div class="flex justify-center place-items-center gap-3">
                <div v-for="n in 2" :key="n" class="bg-white rounded-lg w-10/12 h-20">
                </div>
            </div>
        </div>

        <div class="col-start-3 row-start-6 flex justify-center place-items-center">
            <button
                class="bg-[#77628C] hover:bg-[#5c4b6c] border border-white px-6 rounded-lg h-10 text-xl text-white font-rowdies">Serve
                !!</button>
        </div>
        <div class="col-start-4 row-start-6 flex justify-center place-items-center">
            <button class="bg-alert-200 hover:bg-[#7f4641] border border-white px-6 rounded-lg h-10">
                <img src="/src/assets/trash.svg" alt="trash" />
            </button>
        </div>

        <div class="col-start-2 row-start-1 row-span-4 flex justify-center">
            <RecipesModal />
        </div>
        <div class="col-start-4 row-start-1 ">
            <GoldAndPopularity />
        </div>

        <div @click="handleOrderSignClick" class="col-start-5 row-start-1 flex justify-center">
            <div class="bg-[#614b3c] h-[50%] px-2 shadow-neutral-500 shadow-md"></div>
            <div class="bg-[#c5a691] w-[7rem] flex justify-center items-center rounded-md shadow-neutral-500 shadow-md">
                <div class="bg-white w-[5rem] h-[60%] grid place-items-center relative cursor-pointer rounded-md">
                    <div class="absolute h-3 w-3 -translate-x-1 -translate-y-1 top-0 left-0">
                        <div class="animate-ping absolute h-full w-full rounded-full bg-red-600 opacity-75"></div>
                        <div class="relative rounded-full h-3 w-3 bg-red-600"></div>
                    </div>
                    <img src="../assets/person-fill.svg" class="w-[90%] justify-center" />
                </div>
            </div>
            <div class="bg-[#614b3c] h-[50%] px-2 shadow-neutral-500 shadow-md"></div>
        </div>

        <div v-show="isShow" class="col-start-5 row-start-3 row-span-1 flex flex-col justify-center items-center">
            <div class="my-9 pointer-events-none">
                <img src="/src/assets/arrow-up.svg" class="animate-bounce w-[70%] h-[70%] my-9 fill-red-600" />
            </div>
            <!-- <div class="col-start-5 row-start- row-span-2 flex">
            </div> -->
            <div class="col-start-5 row-start-4 row-span-2 flex">
                <div class="bg-white p-10 rounded-lg mb-5">
                    <p class="text-red-600 py-2">* โปรดระวัง: หากคุณคลิกที่ปุ่มออเดอร์
                        คุณจะต้องเลือกระหว่างรับออเดอร์หรือไม่รับออเดอร์ *</p>
                    <li>ถ้าคุณรับออเดอร์ คุณจะต้องทำอาหารให้เสร็จและในระหว่างนั้นจะไม่สามารถสั่งซื้อของได้</li>
                    <li class="py-4">ถ้าคุณไม่รับออเดอร์ คุณจะต้องเสียค่าชื่อเสียง</li>
                    <button @click="handleGameGuideConfirm"
                        class="bg-green-500 rounded-lg px-3 text-white flex">เข้าใจแล้วล่ะ</button>
                </div>
            </div>
        </div>
    </div>
    <RouterView />
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
