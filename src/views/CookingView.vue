<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import IngredientBar from '@/components/IngredientBar.vue'
import SeasoningBar from '@/components/SeasoningBar.vue'
import GoldAndPopularity from '@/components/goldAndPopularity.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function routeToCustomerOrderModal() {
    router.push({ name: 'user-order-modal' })
}

// Image animation
const cauldronRef = ref(null)
const countInteractive = ref(0)
const currentCauldronImageFrame = ref(0)
const currentImage = computed(() => {
    const cauldronImage = ['/cauldron.png', '/1.png', '/2.png', '/3.png', '/4.png']
    return cauldronImage[currentCauldronImageFrame.value]
})

let cauldronInterval = null
const handleCauldronClick = () => {
    if (countInteractive.value > 2 || cauldronInterval) return

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
}


const meats = ref([
    {
        "id": 10,
        "type": "meat",
        "name": "slime",
        "display_name": "สไลม์",
        "description": "เป็นมิตรไม่โจมตีใครก่อน มีลักษณะคล้ายเยลลี รูปร่างกึ่งของเหลวมีหลากสี แต่พบได้มากเป็นสีเขียว รสสัมผัสเหนียวนุ่มชุ่มฉ่ำ",
        "rank": 1
    },
    {
        "id": 22,
        "type": "meat",
        "name": "tempo",
        "display_name": "เทมโป",
        "description": "ทำจากถั่วหมัก มีสีขาวนุ่ม นิยมรับประทานในหมู่เอลฟ์",
        "rank": 1
    }
])
const vegetables = ref([
    {
        "id": 20,
        "type": "vegetable",
        "name": "amalo",
        "display_name": "อามาโล่",
        "description": "พืชสีแดงที่มีความเผ็ดจัด นิยมใช้ในการปรุงรสอาหาร",
        "rank": 1
    },
    {
        "id": 21,
        "type": "vegetable",
        "name": "rice",
        "display_name": "ข้าว",
        "description": "เมล็ดธัญพืชสีขาว เป็นอาหารหลักในหลายประเทศ",
        "rank": 1
    }
])

</script>

<template>
    <div class="bg-[#71A0A5] border drop-shadow-md w-screen h-[4rem] p-3 ">
        <div class="flex justify-between">
            <!-- <button class="bg-primary w-12 rounded-lg"> -->
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

                <button
                    class="bg-[#ACC6AA] hover:bg-[#90a58e] flex justify-center items-center w-12 rounded-lg h-10 border border-white">
                    <img src="/src/assets/trophy.svg" class="w-10" />
                </button>

                <button class="bg-[#ACC6AA] flex justify-center items-center w-12 rounded-lg h-10">
                    <div @click="toggleBgm" class="m-2 cursor-pointer group">
                        <svg class="group-hover:fill-slate-500" xmlns="http://www.w3.org/2000/svg" width="35"
                            height="35" fill="white" viewBox="0 0 16 16">
                            <path
                                d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                            <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                        </svg>
                        <!-- <svg class="group-hover:fill-slate-500" width="35" height="35" viewBox="0 0 35 35"
                                fill="#f44" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.125 28.4375C13.125 30.8547 10.675 32.8125 7.65626 32.8125C7.21095 32.8125 6.77803 32.7699 6.36351 32.6895C6.7751 32.4975 7.16075 32.2317 7.50049 31.892L10.9549 28.4375L12.6819 26.7105L13.125 26.2674V28.4375Z"
                                    fill="white" />
                                <path
                                    d="M6.08627 30.4777C5.30522 31.2588 4.03889 31.2588 3.25784 30.4777C2.4768 29.6967 2.4768 28.4304 3.25784 27.6493L6.79006 24.1171L10.9375 19.9696L13.125 17.7821L23.4038 7.50337L28.2649 2.64226L29.4208 1.48636C30.2018 0.705312 31.4682 0.705312 32.2492 1.48636C32.8638 2.10091 32.9948 3.01589 32.6422 3.75853C32.5467 3.95973 32.4157 4.14829 32.2492 4.31479L32.189 4.375L30.625 5.939L29.6892 6.87483L13.125 23.439L11.3511 25.2129L10.9375 25.6265L6.08627 30.4777Z"
                                    fill-rule="evenodd" />
                                <path
                                    d="M32.8125 24.0625C32.8125 26.4797 30.3625 28.4375 27.3438 28.4375C24.325 28.4375 21.875 26.4797 21.875 24.0625C21.875 21.6453 24.325 19.6875 27.3438 19.6875C28.5746 19.6875 29.7108 20.013 30.625 20.5623V8.76742L32.8125 6.57993V24.0625Z"
                                    fill="white" />
                                <path
                                    d="M10.9375 6.35468C10.9375 5.81239 11.1389 5.28943 11.5027 4.88725C11.8665 4.48507 12.3667 4.23235 12.9063 4.17812L25.1222 2.95653L20.2611 7.81764L13.125 8.53125V14.9537L10.9375 17.1412V8.75V6.5625V6.35468Z"
                                    fill="white" />
                            </svg> -->
                    </div>
                </button>
            </div>
        </div>
    </div>

    <div class="bg-[url('/bg.png')] bg-cover w-screen h-[calc(100vh-4rem)] grid grid-cols-5 grid-rows-6 gap-2">
        <div class="grid row-span-5 py-6">
            <IngredientBar :userIngredients="userStore.user.userDetail.ingredients" />
        </div>
        <div class="row-start-6 col-start-2 flex items-end">
            <SeasoningBar />
        </div>
        <div class="row-span-3 col-span-2 col-start-3 row-start-2 flex justify-center items-center">
            <!-- ! Cauldron -->
            <img ref="cauldronRef" :src="currentImage" alt="caudron" class="select-none cursor-pointer"
                @click="handleCauldronClick" />
        </div>

        <div
            class="bg-[#ACC6AA] col-span-2 col-start-3 row-start-5 flex justify-center rounded-xl shadow-neutral-500 shadow-md z-20">
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

        <div class="col-start-4 row-start-1 ">
            <GoldAndPopularity />
        </div>

        <div @click="routeToCustomerOrderModal" class="col-start-5 row-start-1 flex justify-center">
            <div class="bg-[#614b3c] h-[50%] px-2 shadow-neutral-500 shadow-md"></div>
            <div class="bg-[#c5a691] w-[7rem] flex justify-center items-center rounded-md shadow-neutral-500 shadow-md">
                <div class="bg-white w-[5rem] h-[60%] flex cursor-pointer rounded-md">
                    <span class="fixed flex h-3 w-3">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <img src="../assets/person-fill.svg" class="w-[90%] justify-center" />
                </div>
            </div>
            <div class="bg-[#614b3c] h-[50%] px-2 shadow-neutral-500 shadow-md"></div>
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
