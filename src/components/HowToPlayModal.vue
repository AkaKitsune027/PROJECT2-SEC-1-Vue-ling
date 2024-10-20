<script setup>
import { ref } from 'vue'

// หน้าที่กำลังแสดงและจำนวนหน้าทั้งหมด
const currentPage = ref(1)
const totalPages = 5 // เปลี่ยนตามจำนวนหน้าที่ต้องการ

// ฟังก์ชันสำหรับเปลี่ยนหน้า
const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    <!-- กระดานคำสั่ง (Order Board) -->
    <div class="order-board relative w-3/4 h-3/4 p-5 rounded-lg shadow-lg">
      <!-- ปุ่มปิด -->
      <div class="flex justify-end">
        <button @click="$emit('close')"
          class="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-2 right-2">X</button>
      </div>

      <!-- หัวข้อ "How to Play" -->
      <div class="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 w-80 text-center">
        <div class="bg-yellow-300 px-6 py-2 rounded-lg text-xl font-bold">How to Play</div>
      </div>

      <!-- เนื้อหาตามหน้าที่เลือก -->
      <div class="content-container mt-10 px-5 py-3 text-center text-gray-900 overflow-y-auto">
        <div class="page-header">
          <!-- หัวข้อของแต่ละหน้า -->
          <!-- <h3 v-if="currentPage === 1" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">การทำอาหาร</h3>
          <h3 v-if="currentPage === 2" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">การใช้วัตถุดิบ</h3>
          <h3 v-if="currentPage === 3" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">ระบบชื่อเสียงร้าน</h3>
          <h3 v-if="currentPage === 4" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สูตรอาหาร</h3>
          <h3 v-if="currentPage === 5" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สมุดสะสม</h3> -->
          <h3 v-if="currentPage === 1" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">Ingredients</h3>
          <h3 v-if="currentPage === 2" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">การใช้วัตถุดิบ</h3>
          <h3 v-if="currentPage === 3" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">ระบบชื่อเสียงร้าน
          </h3>
          <h3 v-if="currentPage === 4" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สูตรอาหาร</h3>
          <h3 v-if="currentPage === 5" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สมุดสะสม</h3>
        </div>

        <!-- ส่วนเนื้อหา ให้อยู่กึ่งกลางในแนวตั้ง -->
        <div class="page-content flex-grow flex items-center justify-center">
          <div v-if="currentPage === 1" class="content text-left">
            <!-- <div v-for="(ingd, index) in ingredientInCauldron" :key="index"
              class="bg-white border-2 border-[#e9d1ff] rounded-lg w-10 h-10 flex justify-center items-center ">
              <img :src="`/${ingd.type}/${ingd.name}.png`" class="w-10 h-10">
            </div> -->
          </div>

          <div v-if="currentPage === 2" class="content text-left">
            <p>เมื่อกดใช้ 1 ครั้ง จะลดทีละ -1</p>
            <p>ร้านค้า หากวัตถุดิบใด ๆ หมด คุณสามารถซื้อของได้ที่ร้านค้า...</p>
          </div>

          <div v-if="currentPage === 3" class="content text-left">
            <p>ชื่อเสียงจะลดถ้าทำอาหารได้ 3 ดาวลงไป...</p>
            <p>ชื่อเสียงจะบวกถ้าทำอาหารได้ 3 ดาวขึ้นไป...</p>
          </div>

          <div v-if="currentPage === 4" class="content text-left">
            <p>สูตรต้นตำรับ...</p>
          </div>

          <div v-if="currentPage === 5" class="content text-left">
            <p>ถ้าหากเราทำอาหารได้ 5 ดาว...</p>
          </div>
        </div>
      </div>

      <!-- ปุ่มเลื่อนหน้า -->
      <button @click="prevPage" :disabled="currentPage === 1" class="nav-button left-4">‹</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="nav-button right-4">›</button>

      <!-- Pagination Dots -->
      <div class="pagination-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span v-for="page in totalPages" :key="page" class="dot w-4 h-4 rounded-full"
          :class="{ 'bg-gray-700': currentPage === page, 'bg-gray-300': currentPage !== page }"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-board {
  background-color: rgba(255, 255, 255, 0.95);
  border: 10px solid #d4a373;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.content-container {
  max-height: 60vh;
  overflow-y: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* จัดหัวข้อให้อยู่ด้านบน */
}

.page-header h3 {
  margin-top: 1rem;
  /* ทำให้ h3 อยู่ห่างจาก How to Play ประมาณ mt-3 */
}

.page-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* จัดเนื้อหาให้อยู่ตรงกลางในแนวตั้ง */
}

.content p {
  margin: 10px 0;
}

.nav-button {
  background-color: #e0e0e0;
  color: #333;
  padding: 8px 12px;
  border-radius: 10%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
