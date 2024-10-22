import { useUserStore } from '@/stores/user'
import ingredientsData from '../../data/ingredients.json'
import foodData from '../../data/foods.json'
import { useGameState } from '@/stores/gameState'
import { getIngredientData } from './utils'

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
    have: [],
    doNotHave: []
  }

  let totalIngredients = 0 // ตัวนับสำหรับวัตถุดิบทั้งหมดใน actualRecipeIngredients (ไม่รวม notHave)
  let matchedIngredients = 0 // ตัวนับสำหรับวัตถุดิบที่ตรงกับสูตรรวม
  let doNotHaveCount = 0 // ตัวนับสำหรับวัตถุดิบที่อยู่ใน notHave
  const foodName = recipe.display_name //ชื่ออาหารของ order นี้
  let recipeUnlockId = null // ตัวแปรสำหรับเก็บ id ของสูตรที่ถูกเปิดล็อค
  let gold = 0 // ตัวแปรสำหรับเก็บค่า gold ที่ได้
  let pop = userStore.user.userDetail.popularity // ตัวแปรสำหรับเก็บค่า popularity ของผู้เล่น

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
          actualRecipeIngredients[ingdType][ingdType] +=
            condition.value[ingdType]
        }
        continue
      }

      if (condition.type === 'double') {
        for (const ingdName in actualRecipeIngredients[condition.value]) {
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

          if (!actualRecipeIngredients.doNotHave.includes(noNeedIngd)) {
            actualRecipeIngredients.doNotHave.push(noNeedIngd)
          }

          if (
            actualRecipeIngredients[ingdData.type] &&
            actualRecipeIngredients[ingdData.type][noNeedIngd]
          ) {
            delete actualRecipeIngredients[ingdData.type][noNeedIngd]
          }
        }
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

  // นับจำนวนวัตถุดิบทั้งหมดใน actualRecipeIngredients (ไม่รวม notHave)
  for (const category in actualRecipeIngredients) {
    if (
      category === 'have' ||
      category === 'category' ||
      category === 'doNotHave'
    )
      continue
    totalIngredients += Object.keys(actualRecipeIngredients[category]).reduce(
      (acc, key) => acc + actualRecipeIngredients[category][key],
      0
    )
  }

  // คัดลอก actualRecipeIngredients เพื่อทำการลบวัตถุดิบที่แมชออก
  const tempIngredients = JSON.parse(JSON.stringify(actualRecipeIngredients))

  // ตรวจสอบการแมชและลบวัตถุดิบที่ใช้แล้วออก
  for (const ingredient of serve) {
    const category = ingredient.type
    const name = ingredient.name

    // ตรวจสอบว่า ingredient นี้อยู่ใน notHave หรือไม่
    if (
      actualRecipeIngredients.doNotHave &&
      actualRecipeIngredients.doNotHave.includes(name)
    ) {
      doNotHaveCount += 1 // เพิ่มตัวนับถ้า ingredient อยู่ใน notHave
    } else if (
      tempIngredients[category] &&
      tempIngredients[category][name] > 0
    ) {
      matchedIngredients += 1
      tempIngredients[category][name] -= 1 // ลบวัตถุดิบที่ใช้แล้ว
    }
  }

  // คำนวณเปอร์เซ็นต์การแมช
  let matchPercentage =
    totalIngredients > 0
      ? Math.round((matchedIngredients / totalIngredients) * 100)
      : 0

  // จัดการเงื่อนไข doNotHave
  if (doNotHaveCount === 1 && matchPercentage > 60) {
    matchPercentage = 60 // ถ้ามี 1 วัตถุดิบที่ห้ามใส่
  } else if (doNotHaveCount > 1) {
    matchPercentage = 10 // ถ้ามีมากกว่า 1 วัตถุดิบที่ห้ามใส่
  }

  // คำนวณคะแนนตามเปอร์เซ็นต์การแมช
  let stars = 0
  if (matchPercentage >= 100) {
    stars = 5
  } else if (matchPercentage >= 80) {
    stars = 4
  } else if (matchPercentage >= 60) {
    stars = 3
  } else if (matchPercentage >= 40) {
    stars = 2
  } else {
    stars = 1
  }
  let review = ''

  // ตรวจสอบรีวิวตามดาวที่ได้
  if (stars === 5) {
    review = spr.goodReview
  } else if (stars === 4 || stars === 3) {
    review = spr.normalReview
  } else {
    review = spr.badReview
  }

  

  // สุ่มสูตรใหม่เมื่อผู้เล่นทำอาหารได้ 5 ดาว
  if (stars === 5 && userStore.user.userDetail.fiveStarMenus[recipe.id - 1].isUnlock === false) {
    const lockedRecipes = userStore.user.userDetail.recipes.filter(
      (recipe) => recipe.isUnlock === false
    )

    if (lockedRecipes.length > 0) {
      recipeUnlockId =
        lockedRecipes[Math.floor(Math.random() * lockedRecipes.length)].id
    }
  } else {
    console.log('อย่าโกงดิ๊')
  }



  // คำนวนค่า gold ที่ได้
  for (const ingredient of serve) {
    const ingdData = getIngredientData(ingredient.name)
    gold += ingdData.price
  }
  gold += matchedIngredients * 30


  // คำนวนค่า popularity ที่ได้
  if (userStore.user.userDetail.popularity >= 0) {
    
    if (stars >= 4) {
      pop = (5 - Math.round((pop + 50) / 20))//เพิ่ม
    } 
     if (stars === 3) {
      pop = 0
    }
    if ( stars <= 2) {
      pop = Math.round((pop + 50) / 20) * -1 //ลด
    } 
  } 
  if (userStore.user.userDetail.popularity < 0) {
    if (stars >= 4) {
       pop = Math.round(((pop * -1) + 50) / 20)
    }
    if (stars === 3) {
      pop = 0
    }
    if (stars <= 2) {
      pop = (5 - Math.round(((pop * -1) + 50) / 20)) * -1
    } 
  }
    
  



  console.log(`actualRecipeIngredients`, actualRecipeIngredients)
  console.log('Serve', serve)
  console.log(`Total Ingredients: ${totalIngredients}`)
  console.log(`Matched Ingredients: ${matchedIngredients}`)
  console.log(`DoNotHave Count: ${doNotHaveCount}`)
  console.log(`Matching Percentage: ${matchPercentage}%`)
  console.log(`foodName:${foodName}`)
  console.log(`stars:${stars}`)
  console.log(`review:${review}`)
  console.log(`recipeUnlockId = ${recipeUnlockId}`)
  console.log(`gold:${gold}`)
  console.log(userStore.user.userDetail.fiveStarMenus[recipe.id - 1])
  console.log(`pop:${pop}`)
  

  return {
    totalIngredients,
    matchedIngredients,
    matchPercentage,
    doNotHaveCount,
    stars,
    review,
    foodName,
    recipeUnlockId,
    gold,
    pop
  }
}
