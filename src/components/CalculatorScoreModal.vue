<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import customers from '../../data/customers.json'
import foods from '../../data/foods.json'
import ingredients from '../../data/ingredients.json'
import special from '../../data/special.json'




function cook(ingredient) {
    const result = ref([])
    result.value.push(ingredient)

    return result
}

</script>
 
<template>
<div>

</div>
</template>
 
<style scoped>

</style>
