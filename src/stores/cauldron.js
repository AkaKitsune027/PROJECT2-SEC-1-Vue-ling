
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCauldronStore = defineStore('cauldron', () => {
  const cauldron = ref([])

  function addToCauldron(ingredient) {
    cauldron.value.push(ingredient)
  }

  function cancelCooking() {
    cauldron.value = []
  }

  return { cauldron }
})

