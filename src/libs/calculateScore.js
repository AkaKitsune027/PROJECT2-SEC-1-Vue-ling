import { useUserStore } from '@/stores/user'
import ingredientsData from '../../data/ingredients.json'
import { useGameState } from '@/stores/gameState'

export function calculatePrice() {
  const userStore = useUserStore()
  const gameState = useGameState()

  const { customer, food: recipe, specialRequirement: spr } = gameState.currentOrder
  const serve = gameState.ingredientInCauldron
  const actualRecipeIngredients = {
    meat: {},
    vegetable: {},
    seasoning: {},
    category: {}
  }



  for (const ingdName of recipe.ingredients) {
    
    if (['meat', 'vegetable'].includes(ingdName)) {
      actualRecipeIngredients[ingdName][ingdName] = actualRecipeIngredients[ingdName][ingdName] ? actualRecipeIngredients[ingdName][ingdName] + 1 : 1
    } else {
      const ingdData = ingredientsData.find((ingd) => ingd.name === ingdName) 
      actualRecipeIngredients[ingdData.type][ingdData.name] = actualRecipeIngredients[ingdData.type][ingdData.name] ? actualRecipeIngredients[ingdData.type][ingdData.name] + 1: 1
    }
  }

  
  

  if (spr.conditions.length > 0){
    for (const condition of spr.conditions){
      // ? looseModify 
      if(condition.type === 'looseModify'){
        
        if(condition.value.meat) {
          actualRecipeIngredients.meat.meat += condition.value.meat
        }
        
        if (condition.value.vegetable) {
          actualRecipeIngredients.vegetable.vegetable += condition.value.vegetable
        }
        continue 
      }

      if(condition.type === 'double'){
        for (const ingdName of Object.keys(actualRecipeIngredients[condition.type])) {
          actualRecipeIngredients[condition.type][ingdName] = actualRecipeIngredients[condition.type][ingdName] * 2
        }
        continue
      }
      if (condition.type === 'doNotHaveInType') {
        actualRecipeIngredients[condition.value] = {}
      }
      if (condition.type === 'replace') {
        const quantity = Object.values(actualRecipeIngredients[condition.value.replace]).reduce((acc, cur) => acc + cur, 0)
        actualRecipeIngredients[condition.value.replace] = {}

        const ingdData = ingredientsData.find((ingd) => ingd.name === condition.value.with) 
        actualRecipeIngredients[ingdData.type][condition.value.with] = quantity

      }
      if (condition.type === 'modifyByCategory') {
        
      }
      if (condition.type === 'mustHave') {
      }
      if (condition.type === 'doNotHave') {
      }
      if (condition.type === 'specificModify') {
      }

      
    }
  }
  console.log(actualRecipeIngredients);
  
}
