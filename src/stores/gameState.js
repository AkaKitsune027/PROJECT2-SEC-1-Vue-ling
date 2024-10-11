import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameState = defineStore('gameState', () => {
    const cauldron = ref([])

    const isPreparePhase = ref(true)

    function addToCauldron(ingredient) {
        cauldron.value.push(ingredient)
    }

    function cancelCooking() {
        cauldron.value = []
    }

    return { cauldron, isPreparePhase }
})

