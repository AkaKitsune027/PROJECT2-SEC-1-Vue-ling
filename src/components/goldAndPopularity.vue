<script setup>
import { computed, ref } from "vue"
import { useUserStore } from "@/stores/user"


const userStore = useUserStore()

</script>

<template>
    <div>
        <div class=" bg-white bg-opacity-80 text-black rounded-lg shadow-lg p-2 flex space-x-4 items-center fixed">
            <div class="flex items-center space-x-2">
                <span class="text-xl font-semibold">💰</span>
                <span class="text-lg font-bold">{{ userStore.user?.userDetail.gold }}</span>
                <span class="text-sm">Gold</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xl font-semibold">⭐</span>
                <span class="text-lg font-bold">{{ userStore.user?.userDetail.popularity }}</span>
                <span class="text-sm">Popularity</span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
