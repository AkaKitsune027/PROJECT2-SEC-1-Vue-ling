import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import customersData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'
import specialRequirementData from '../../data/specialRequirement.json' 
import { useUserStore } from './user'


export const useGameState = defineStore('gameState', () => {
    const userStore = useUserStore()
    const cauldron = ref([])
    const ingredientInCauldron = computed(() => {
      const ingredientInCauldron = cauldron.value.map((ingdId) => {
        const ingd = ingredientsData.find((element) => element.id === ingdId)
        return ingd
      })
      return ingredientInCauldron
    })

    const currentOrder = ref(null)
    
    const rawOrder = computed(() => userStore.user.userDetail.currentOrder)

    const isPreparePhase = ref(true)

    watch(
      () => rawOrder.value,
      () => {
        currentOrder.value = {
          customer: customersData.find(
            (c) => c.id === rawOrder.value?.customerId
          ),
          food: foodsData.find((f) => f.id === rawOrder.value?.foodId),
          specialRequirement: specialRequirementData.find(
            (s) => s.id === rawOrder.value?.specialRequirementId
          )
        }
      },
      { immediate: true, deep: true }
    )

    function addToCauldron(ingdId) {
        cauldron.value.push(ingdId)
    }

    function dropCooking() {
        cauldron.value = []
    }

    return { cauldron, isPreparePhase, addToCauldron, dropCooking, currentOrder, rawOrder, ingredientInCauldron }
})

