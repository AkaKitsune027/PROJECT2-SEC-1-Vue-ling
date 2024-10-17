<script setup>
const closeModal = () => {
    router.push({ name: 'home-page' })
}
</script>
 
<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    delete
    <button @click="closeModal">close</button>
</div>
</template>
 
<style scoped>

</style>