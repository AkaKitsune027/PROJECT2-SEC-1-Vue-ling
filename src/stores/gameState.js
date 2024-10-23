import { defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
import customersData from '../../data/customers.json'
import foodsData from '../../data/foods.json'
import ingredientsData from '../../data/ingredients.json'
import specialRequirementData from '../../data/specialRequirement.json'
import { useUserStore } from './user'
import { useRouter } from 'vue-router'
import { resetUser } from '@/libs/userManagement'


export const useGameState = defineStore('gameState', () => {
  const router = useRouter()
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

  const requireClick = 3
  const countInteractive = ref(0)

  const totalIngredientsAmount = computed(() => {
    return userStore.user.userDetail.ingredients?.reduce((total, ingredient) => {
      return total + (ingredient.amount || 0)
    }, 0)
  })
 
  const handleGameOver = async () => {
    const currentUser = userStore.user.id
    await resetUser(currentUser)
    router.push({ name: "setup-page" })
  }
  
  watchEffect(() => {
    if (userStore.user.userDetail.gold < 5) {
      if (totalIngredientsAmount.value === 0 && cauldron.value.length === 0) {
        handleGameOver()
      }
      console.log(totalIngredientsAmount)
    }
  })

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
        router.push({ name: 'cooking-page' })
    }

  return { cauldron, isPreparePhase, countInteractive, requireClick, addToCauldron, dropCooking, currentOrder, rawOrder, ingredientInCauldron }
})

