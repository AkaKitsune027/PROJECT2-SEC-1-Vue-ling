<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IngredientBar from '@/components/IngredientBar.vue'
import SeasoningBar from '@/components/SeasoningBar.vue'

const router = useRouter()

function routeToCustomerOrderModal() {
    router.push({ name: 'user-order-modal' })
}

</script>

<template>
    <div class="overflow-hidden">
        <div class="bg-[#71A0A5] border drop-shadow-md w-screen h-[4rem] p-3">
            <div class="grid col-start-1 row-start-1">
                <!-- <button class="bg-primary w-12 rounded-lg"> -->
                <button class="bg-[#ACC6AA] w-12 rounded-lg">
                    <img src="/src/assets/arrow-back.svg" class="w-10" />
                </button>

                <div class="grid grid-flow-col col-start-3 row-start-1 justify-end gap-3 px-3">

                    <button class="bg-[#ACC6AA] flex justify-center w-12 rounded-lg h-10">
                        <img src="/src/assets/book-open.svg" class="w-10" />
                    </button>

                    <button class="bg-[#ACC6AA] flex justify-center items-center w-12 rounded-lg h-10">
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
                            <svg class="group-hover:fill-slate-500" width="35" height="35" viewBox="0 0 35 35"
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
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-white h-[calc(100vh-4rem)] grid grid-cols-5 grid-rows-6 gap-2">
            <div class="grid row-span-5 py-10">
                <IngredientBar>
                    <div v-for="n in 10" :key="n" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C]
                         cursor-pointer rounded-lg w-10/12 h-20 flex justify-center">
                        <img src="/unicorn-horn.png" alt="unicorn-horn" class="h-full">
                    </div>
                </IngredientBar>
            </div>
            <div class="row-start-6 col-start-2 flex items-end">
                <SeasoningBar />
            </div>
            <div class="row-span-3 col-span-2 col-start-3 row-start-2 flex justify-center items-center">
                <img src="/pot2.png" alt="pot" class="select-none">
            </div>

            <div class="bg-[#ACC6AA] col-span-2 col-start-3 row-start-5 flex justify-center rounded-xl">
                <div class="flex justify-center place-items-center gap-3">
                    <div v-for="n in 2" :key="n" class="bg-white rounded-lg w-10/12 h-20">
                        <img src="/unicorn-horn.png" alt="unicorn-horn"
                            class="h-full border border-gray-600 border-dashed rounded-lg">
                    </div>
                </div>
            </div>

            <div class="col-start-3 row-start-6 flex justify-center place-items-center">
                <button class="bg-[#77628C] border border-white px-6 rounded-lg h-10 text-xl text-white">Serve
                    !!</button>
            </div>
            <div class="col-start-4 row-start-6 flex justify-center place-items-center">
                <button class="bg-third border border-white px-6 rounded-lg h-10"><img src="/src/assets/trash.svg"
                        alt="trash"></button>
            </div>
            <div @click="routeToCustomerOrderModal" class="col-start-5 row-start-1 flex justify-center">
                <button class="bg-[#ACC6AA] w-[7rem]">
                    <img src="../assets/icons/customer.svg" class="w-10">
                </button>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<style scoped></style>
