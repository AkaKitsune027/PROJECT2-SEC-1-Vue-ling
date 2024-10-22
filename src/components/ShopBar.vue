<script setup>
import { ref, defineEmits, computed } from 'vue'
import BuySellConfirmModal from '../components/BuySellConfirmModal.vue'
import ingredientsData from '../../data/ingredients.json'
import { useUserStore } from '@/stores/user' // นำเข้าข้อมูล user

const isModalVisible = ref(false) // สถานะ modal เปิดหรือปิด
const selectedItem = ref(null) // เก็บข้อมูลของ item ที่ต้องการซื้อ
const isGoldEnough = ref(false) // สถานะ Gold เพียงพอหรือไม่
const userStore = useUserStore() // ดึงข้อมูล user จาก store
const userGold = computed(() => userStore.user.userDetail.gold) // คำนวณ Gold ของผู้ใช้

const meats = computed(() => {
  return ingredientsData.filter(ingredient => ingredient.type === 'meat')
})

const vegetables = computed(() => {
  return ingredientsData.filter(ingredient => ingredient.type === 'vegetable')
})

// State เพื่อควบคุมการแสดง meat หรือ vegetable
const selectedPage = ref(0)

// ฟังก์ชันเพื่อเปลี่ยนหมวดหมู่
const handleSelectPage = (pageNumber) => {
  selectedPage.value = pageNumber
}

// ฟังก์ชันสำหรับเปิด Modal และตรวจสอบ Gold
const openModal = (item) => {
  selectedItem.value = item
  // ตรวจสอบว่า Gold เพียงพอหรือไม่
  isGoldEnough.value = userGold.value >= item.price
  isModalVisible.value = true
}

// ฟังก์ชันสำหรับปิด Modal
const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div class="relative flex flex-col overflow-hidden rounded-r-xl font-noto-thai">
    <div
      class="pointer-events-none w-full h-16 absolute bottom-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]">
    </div>
    <!-- ส่วนหัวสำหรับเลือกหมวดหมู่ -->
    <div class="flex-none bg-[#d1ba91] text-center text-xl p-2">
      <p class="py-3 font-bold">ร้านค้า</p>
      <div class="flex  rounded-lg">
        <!-- ปุ่มเลือก Meat -->
        <div @click="handleSelectPage(0)"
          class="flex-1 flex justify-center cursor-pointer hover:bg-[#9d8a69] rounded-lg border border-white"
          :class="selectedPage === 0 ? 'bg-[#9d8a69]' : 'bg-[#ffe3b2]'">
          <img src="/meat.png" alt="meat-bar" class="w-12">
        </div>
        <!-- ปุ่มเลือก Vegetable -->
        <div @click="handleSelectPage(1)"
          class="flex-1 flex justify-center cursor-pointer hover:bg-[#9d8a69] rounded-lg border border-white"
          :class="selectedPage === 1 ? 'bg-[#9d8a69]' : 'bg-[#ffe3b2]'">
          <img src="/vegetable.png" alt="vegetable-bar" class="w-12">
        </div>
      </div>
    </div>

    <!-- แสดงเนื้อหา Meat หรือ Vegetable ขึ้นอยู่กับ selectedPage -->
    <div
      class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto shop custom-scrollbar">

      <!-- แสดง meat เมื่อ selectedPage === 0 -->
      <div v-show="selectedPage === 0" v-for="meat in meats" :key="meat.id"
        class="bg-white flex justify-between items-center w-10/12 h-20 rounded-lg p-2">
        <div class="flex flex-col items-center">
          <img :src="`/meat/${meat.name}.png`" :alt="meat.name" class="w-12">
          <p class="text-sm text-gray-700">{{ meat.display_name }}</p>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-700">{{ meat.price }}$</p>
          <!-- ปุ่ม Buy -->
          <button @click="openModal(meat)" class="bg-green-400 hover:bg-green-600 text-white py-1 px-2 rounded-lg">
            ซื้อ
          </button>
        </div>
      </div>

      <!-- แสดง vegetable เมื่อ selectedPage === 1 -->
      <div v-show="selectedPage === 1" v-for="vegetable in vegetables" :key="vegetable.id"
        class="bg-white flex justify-between items-center w-10/12 h-20 rounded-lg p-2">
        <div class="flex flex-col items-center">
          <img :src="`/vegetable/${vegetable.name}.png`" :alt="vegetable.name" class="w-12">
          <p class="text-sm text-gray-700">{{ vegetable.display_name }}</p>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-700">{{ vegetable.price }}$</p>
          <!-- ปุ่ม Buy -->
          <button @click="openModal(vegetable)" class="bg-green-400 hover:bg-green-600 text-white py-1 px-2 rounded-lg">
            Buy
          </button>
        </div>
      </div>
    </div>

    <!-- เรียกใช้ Modal เมื่อ isModalVisible เป็น true -->
    <BuySellConfirmModal v-if="isModalVisible" :item="selectedItem" :isGoldEnough="isGoldEnough" @close="closeModal" />
  </div>
</template>

<style scoped></style>
