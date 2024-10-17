<script setup>
import { ref } from 'vue'
import { useGameState } from '@/stores/gameState'
import { useUserStore } from '@/stores/user'


const gameState = useGameState()

function useSugar() {
    gameState.cauldron.push(23)
}

function useSalt() {
    gameState.cauldron.push(24)
}



</script>

<template>
    <div>
        <div class="bg-[#ACC6AA] text-center text-lg font-rowdies rounded-lg">Seasoning
            <div class="bg-zinc-700 flex gap-3 p-2 rounded-lg">
                <div @click="useSalt"
                    class="w-20 transition-[border] bg-white rounded-lg hover:bg-gray-300 hover:border-4 border-[#77628C] cursor-pointer">
                    <img src="/seasoning/bottle-of-salt.png" alt="bottle-of-salt" class="w-20">
                </div>
                <div @click="useSugar"
                    class="w-20 transition-[border] bg-white rounded-lg hover:bg-gray-300 hover:border-4 border-[#77628C] cursor-pointer">
                    <img src="/seasoning/bottle-of-sugar.png" alt="bottle-of-sugar" class="w-20">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>