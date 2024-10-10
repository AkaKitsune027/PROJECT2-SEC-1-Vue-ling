<script setup>
import { ref, defineEmits } from 'vue'

// รับ props ของ item และ type ('buy' หรือ 'sell')
defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

// สร้าง emit สำหรับส่ง event กลับไปยัง parent
const emit = defineEmits(['close'])

// สร้าง state เพื่อเก็บจำนวนที่จะซื้อหรือขาย
const quantity = ref(1)

// ฟังก์ชันสำหรับการเพิ่มจำนวน
const increaseQuantity = () => {
  quantity.value += 1
}

// ฟังก์ชันสำหรับการลดจำนวน
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

// ฟังก์ชันกดยืนยัน (Okay)
const handleConfirm = () => {
  console.log(`${type} ${quantity.value} of ${item.name}`)
  emit('close') // ปิด modal หลังจากยืนยัน
}

// ฟังก์ชันกดยกเลิก (Cancel)
const handleCancel = () => {
  emit('close') // ส่ง event 'close' เพื่อปิด modal โดยไม่ทำอะไร
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    <div class="bg-white w-1/3 p-5 rounded-lg shadow-lg text-center relative overflow-visible">
      <h2 class="text-2xl font-bold">{{ type === 'sell' ? 'Sale' : 'Buy' }}</h2>
      
      <!-- แสดงรูปภาพ item ที่กด -->
      <div class="my-4">
        <img :src="`/${item.type}/${item.name}.png`" alt="item" class="mx-auto w-32 h-32">
        <p class="text-xl">{{ item.display_name }}</p>
      </div>
      
      <div class="flex items-center justify-center gap-3">
        <button @click="decreaseQuantity" class="bg-gray-300 px-4 py-2 rounded-lg">-</button>
        <span class="text-xl">{{ quantity }}</span>
        <button @click="increaseQuantity" class="bg-gray-300 px-4 py-2 rounded-lg">+</button>
      </div>
      
      <div class="flex justify-center gap-4 mt-6">
        <button @click="handleConfirm" class="bg-green-500 text-white px-4 py-2 rounded-lg">Confirm</button>
        <button @click="handleCancel" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
      </div>

      <div class="absolute top-28 -right-20">
        <img src="../assets/cat.png" width="250" height="200">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
