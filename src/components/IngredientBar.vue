<script setup>
import { ref } from 'vue'

defineProps({
    meats: {
        type: Array,
        required: true
    },
    vegetables: {
        type: Array,
        required: true
    }
})

const selectedPage = ref(0)

const handleSelectPage = (pageNumber) => {
    selectedPage.value = pageNumber
}

</script>

<template>
    <div class="flex flex-col px-1 ">
        <div
            class="flex-none bg-[#ACC6AA] text-center text-xl font-rowdies rounded-md p-2 shadow-neutral-500 shadow-md">
            <p class="py-3">Ingredient</p>
            <div class="flex  rounded-lg">
                <div @click="handleSelectPage(0)"
                    class="flex-1 flex justify-center cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white">
                    <img src="/meat.png" alt="meat-bar" class="w-12">
                </div>
                <div @click="handleSelectPage(1)"
                    class="flex-1 flex justify-center  cursor-pointer bg-[#c3e0c1] hover:bg-[#90a58e] rounded-lg border border-white">
                    <img src="/vegetable.png" alt="vegetable-bar" class="w-12">
                </div>
            </div>
        </div>
        <div
            class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto custom-scrollbar shadow-neutral-500 shadow-md">
            <div v-show="selectedPage === 0" v-for="meat in meats" :key="meat.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
                             cursor-pointer rounded-lg w-10/12 h-20 flex justify-center">
                <img src="/unicorn-horn.png" alt="unicorn-horn" class="h-full">
            </div>
            <div v-show="selectedPage === 1" class="w-[100%]">
                <slot name="vegetable">
                    <div class="text-white">No Vegetable</div>
                </slot>
            </div>
        </div>
        <div class="bg-zinc-700 h-[4rem] flex justify-center items-center shadow-neutral-500 shadow-md">
            <button class="bg-[#ACC6AA] hover:bg-[#90a58e] p-2 rounded-xl h-fit border border-white">
                <img src="/src/assets/bag.svg" alt="shop" class="h-8">
            </button>
        </div>

    </div>
</template>

<style scoped></style>