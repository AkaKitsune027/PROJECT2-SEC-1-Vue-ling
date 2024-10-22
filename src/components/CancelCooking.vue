<script setup>
import { useUserStore } from "@/stores/user"
import { useGameState } from '@/stores/gameState'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const gameState = useGameState()
const router = useRouter()

function handleCancelCooking() {
    gameState.dropCooking()
}

function back() {
    router.push({ name: "cooking-page" })
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-noto-thai">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-64">
            <div class="flex justify-center">
                <img src="@/assets/icons/alert.svg" alt="Cancel" class="w-16 h-16 ">
            </div>
            <p class="text-2xl font-bold mb-2 text-center">
                คำเตือน
            </p>

            <p class=" text-lg ">
                วัตถุดิบในหม้อที่ถูกลบ<span
                    class=" underline text-[#b12c2c]">จะหายไปจากคลังของคุณและไม่ได้รับเงินค่าวัตถุดิบคืน</span>ยืนยันที่จะลบวัตถุดิบในหม้อหรือไม่?
            </p>
            <div class="flex justify-center gap-2 mt-3">
                <!-- ปุ่ม confirm -->
                <button @click="handleCancelCooking"
                    class="bg-[#269f3e] text-white px-4 py-2 rounded-lg">Confirm</button>

                <!-- ปุ่ม cancel -->
                <button @click="back" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>