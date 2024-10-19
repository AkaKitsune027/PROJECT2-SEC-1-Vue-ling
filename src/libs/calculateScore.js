import { useUserStore } from '@/stores/user'
import ingredientsData from '../../data/ingredients.json'
import { useGameState } from '@/stores/gameState'

function getIngredientData(ingredientName) {
  return ingredientsData.find((ingd) => ingd.name === ingredientName)
}

export function calculatePrice() {
  const userStore = useUserStore()
  const gameState = useGameState()

  const {
    customer,
    food: recipe,
    specialRequirement: spr
  } = gameState.currentOrder
  const serve = gameState.ingredientInCauldron
  const actualRecipeIngredients = {
    meat: {},
    vegetable: {},
    seasoning: {},
    category: {},
    have: []
  }

  for (const ingdName of recipe.ingredients) {
    if (['meat', 'vegetable'].includes(ingdName)) {
      actualRecipeIngredients[ingdName][ingdName] = actualRecipeIngredients[
        ingdName
      ][ingdName]
        ? actualRecipeIngredients[ingdName][ingdName] + 1
        : 1
    } else {
      const ingdData = ingredientsData.find((ingd) => ingd.name === ingdName)
      actualRecipeIngredients[ingdData.type][ingdData.name] =
        actualRecipeIngredients[ingdData.type][ingdData.name]
          ? actualRecipeIngredients[ingdData.type][ingdData.name] + 1
          : 1
    }
  }

  if (spr.conditions.length > 0) {
    for (const condition of spr.conditions) {
      // ? looseModify
      if (condition.type === 'looseModify') {
        for (const ingdType in condition.value) {
          if (!actualRecipeIngredients[ingdType][ingdType]) {
            let currentQuatity = 0
            for (const ingdName in actualRecipeIngredients[ingdType]) {
              currentQuatity += actualRecipeIngredients[ingdType][ingdName]
            }
            actualRecipeIngredients[ingdType][ingdType] = currentQuatity
          }
          actualRecipeIngredients[ingdType][ingdType] += condition.value[ingdType]
        }
        continue
      }

      if (condition.type === 'double') {
        for (const ingdName of Object.keys(
          actualRecipeIngredients[condition.value]
        )) {
          actualRecipeIngredients[condition.value][ingdName] =
            actualRecipeIngredients[condition.value][ingdName] * 2
        }
        continue
      }

      if (condition.type === 'doNotHaveInType') {
        actualRecipeIngredients[condition.value] = {}
        continue
      }

      if (condition.type === 'replace') {
        const quantity = Object.values(
          actualRecipeIngredients[condition.value.replace]
        ).reduce((acc, cur) => acc + cur, 0)
        actualRecipeIngredients[condition.value.replace] = {}

        const ingdData = getIngredientData(condition.value.with)
        actualRecipeIngredients[ingdData.type][condition.value.with] = quantity
        continue
      }

      if (condition.type === 'modifyByCategory') {
        const targetCategory = condition.value.category
        const modifier = condition.value.amount

        for (const ingdType in actualRecipeIngredients) {
          if (ingdType === 'category') {
            break
          }
          for (const ingdName in actualRecipeIngredients[ingdType]) {
            const ingdData = ingredientsData.find(
              (ingd) => ingd.name === ingdName
            )
            if (ingdData && ingdData.category.includes(targetCategory)) {
              actualRecipeIngredients.category[condition.value.category] =
                actualRecipeIngredients.category[condition.value.category]
                  ? +modifier
                  : modifier
            }
          }
        }
        continue
      }

      if (condition.type === 'mustHave') {
        for (const needIngdName of condition.value) {
          const ingdData = getIngredientData(needIngdName)
          if (!actualRecipeIngredients[ingdData.type][needIngdName]) {
            actualRecipeIngredients.have.push(needIngdName)
          }
        }
        continue
      }

      if (condition.type === 'doNotHave') {
        for (const noNeedIngd of condition.value) {
          const ingdData = getIngredientData(noNeedIngd)
          if (actualRecipeIngredients[ingdData.type][noNeedIngd]) {
            delete actualRecipeIngredients[ingdData.type][noNeedIngd]
          }
        }
        continue
      }

      if (condition.type === 'specificModify') {
        for (const ingdName in condition.value) {
          const ingdData = getIngredientData(ingdName)
          actualRecipeIngredients[ingdData.type][ingdName] =
            actualRecipeIngredients[ingdData.type][ingdName]
              ? actualRecipeIngredients[ingdData.type][ingdName] +
                condition.value[ingdName]
              : condition.value[ingdName]
        }
        continue
      }
    }
  }
  console.log(actualRecipeIngredients)
}
