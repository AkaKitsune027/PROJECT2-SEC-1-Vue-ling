<script setup>
import { ref } from 'vue'
import { useGameState } from '../stores/gameState'
import { useUserStore } from '../stores/user'


const gameState = useGameState()

function addSeasoning(id) {
    if (gameState.countInteractive >= gameState.requireClick) return
    if (gameState.isPreparePhase) return
    if (gameState.cauldron.length >= 14) return

    gameState.cauldron.push(id)
}

</script>

<template>
    <div class="font-noto-thai">
        <div class="bg-[#ACC6AA] text-center text-lg rounded-lg font-bold">เครื่องปรุง
            <div class="bg-zinc-700 flex gap-3 p-2 rounded-lg h-20">
                <div @click="addSeasoning(24)"
                    class="w-20 transition-[border] bg-white rounded-lg hover:bg-gray-300 hover:border-4 border-[#77628C] cursor-pointer flex justify-center bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]">
                    <img src="/seasoning/bottle-of-sugar.png" alt="bottle-of-sugar" class="w-14">
                    <span class="h-5 w-[5%] rounded-lg text-sm bg-white absolute translate-y-11">
                        น้ำตาล
                    </span>
                </div>
                <div @click="addSeasoning(23)"
                    class="w-20 transition-[border] bg-white rounded-lg hover:bg-gray-300 hover:border-4 border-[#77628C] cursor-pointer flex justify-center bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]">
                    <img src="/seasoning/bottle-of-salt.png" alt="bottle-of-salt" class="w-14">
                    <span class="h-5 w-[5%] rounded-lg text-sm bg-white absolute translate-y-11">
                        เกลือ
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
