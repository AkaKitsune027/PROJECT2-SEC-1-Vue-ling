<script setup>
import { computed, ref } from "vue"
import { useUserStore } from "../stores/user"


const userStore = useUserStore()

</script>

<template>
    <div class="font-noto-thai font-semibold">
        <div class="bg-white bg-opacity-80 text-black rounded-lg shadow-lg p-2 flex gap-4 items-center absolute">
            <div class="flex items-center gap-2">
                <span class="text-xl">💰</span>
                <span class="text-lg font-bold">{{ userStore.user?.userDetail.gold }}</span>
                <span class="text-sm">โกลด์</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xl">⭐</span>
                <span class="text-lg font-bold">{{ userStore.user?.userDetail.popularity }}</span>
                <span class="text-sm">ชื่อเสียง</span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
