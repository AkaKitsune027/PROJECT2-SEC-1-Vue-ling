<script setup>
import { ref } from 'vue'

defineProps({
    meats: {
        type: Array,
    },
    vegetables: {
        type: Array,
    }
})

const selectedPage = ref(0)

const handleSelectPage = (pageNumber) => {
    selectedPage.value = pageNumber
}

const countItems = ref(1)

console.log(countItems)

</script>

<template>

    <div class="flex flex-col px-1 ">
        <div class="flex-none bg-base text-center text-xl font-rowdies rounded-md p-2 shadow-neutral-500 shadow-md">
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
                cursor-pointer rounded-lg w-10/12 h-20 flex justify-center" @click="countItems++">
                <div
                    class="bg-secondary-100 text-white rounded-full w-[20%] h-[40%] flex justify-center border-2 border-[#6a5944]">
                    {{ countItems }}
                </div>

                <img :src="`/meat/${meat.name}.png`" alt="${meat.name}" class="w-24">
            </div>

            <div v-show="selectedPage === 1" v-for="vegetable in vegetables" :key="vegetable.id" class="bg-white hover:bg-gray-300 hover:border-4 border-[#77628C] transition-[border]
                cursor-pointer rounded-lg w-10/12 h-20 flex justify-center" @click="countItems++">
                <div class=" bg-secondary text-white rounded-full w-[20%] h-[40%] flex justify-center border-2
                border-[#6a5944]">
                    {{ countItems }}
                </div>
                <img :src="`/vegetable/${vegetable.name}.png`" alt="${vegetable.name}" class="w-24">
            </div>
        </div>
        <div class="bg-zinc-700 h-[5rem] flex justify-center items-center shadow-neutral-500 shadow-md">
            <button class="bg-[#ACC6AA] hover:bg-[#90a58e] p-2 rounded-xl h-fit border border-white">
                <img src="/src/assets/bag.svg" alt="shop" class="h-8">
            </button>
        </div>

    </div>
</template>

<style scoped></style>