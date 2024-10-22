<script setup>
import ingredientsData from '../../data/ingredients.json'
import { ref, computed } from 'vue'

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

const meats = computed(() => {
  return ingredientsData.filter(ingredient => ingredient.type === 'meat')
})

const vegetables = computed(() => {
  return ingredientsData.filter(ingredient => ingredient.type === 'vegetable')
})

</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-noto-thai">
    <!-- กระดานคำสั่ง (Order Board) -->
    <div class="order-board relative w-3/4 h-3/4 p-5 rounded-lg shadow-lg">
      <!-- ปุ่มปิด -->
      <div class="flex justify-end">
        <button @click="$emit('close')"
          class="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-2 right-2">X</button>
      </div>

      <!-- หัวข้อ "How to Play" -->
      <div class="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 w-80 text-center">
        <div class="bg-yellow-300 border-4 border-white px-6 py-2 rounded-lg text-xl font-bold">How to Play</div>
      </div>

      <!-- เนื้อหาตามหน้าที่เลือก -->
      <div class="mt-10 px-5 py-3 text-center text-gray-900 overflow-y-auto m-10">
        <div class="page-header">
          <!-- หัวข้อของแต่ละหน้า -->
          <!-- <h3 v-if="currentPage === 1" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">การทำอาหาร</h3>
          <h3 v-if="currentPage === 2" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">การใช้วัตถุดิบ</h3>
          <h3 v-if="currentPage === 3" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">ระบบชื่อเสียงร้าน</h3>
          <h3 v-if="currentPage === 4" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สูตรอาหาร</h3>
          <h3 v-if="currentPage === 5" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สมุดสะสม</h3> -->
          <h3 v-if="currentPage === 1" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">วิธีการเล่น</h3>
          <h3 v-if="currentPage === 2" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3 font-bold">วัตถุดิบ
          </h3>
          <h3 v-if="currentPage === 3" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">ระบบชื่อเสียงร้าน
          </h3>
          <h3 v-if="currentPage === 4" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สูตรอาหาร</h3>
          <h3 v-if="currentPage === 5" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3">สมุดสะสม</h3>
        </div>

        <div v-if="currentPage === 1" class="text-left">
          <p class="my-3">ขั้นตอนในการเล่นเกม</p>
          <div class="flex items-center gap-3">
            <span
              class=" bg-slate-200 border-4 border-slate-400 rounded-full flex justify-center items-center w-10 h-10 font-bold">
              1
            </span>
            <span>ซื้อของเตรียมไว้สำหรับทำอาหาร</span>
          </div>
        </div>

        <div v-if="currentPage === 2" class="text-left flex justify-center">
          <div class="flex flex-col items-center">
            <div
              class="text-lg flex my-6 bg-red-400 text-white w-[50%] h-10 text-center items-center justify-center rounded-lg font-bold">
              เนื้อ
            </div>
            <div class="bg-red-100 flex gap-6 flex-wrap justify-start">
              <div v-for="(meat, index) in meats" :key="index" class="rounded-lg min-w-20 flex flex-wrap m-3">
                <div class="flex flex-col bg-white border-2 p-2 items-center">
                  <img :src="`/meat/${meat.name}.png`" class="w-20 h-20" />
                  <div class="bg-red-300 text-center font-bold rounded-lg px-3">{{ meat.display_name }}</div>
                  <div class="m-4 text-wrap w-36">{{ meat.description }}</div>
                </div>
              </div>
            </div>

            <div
              class="text-lg flex my-6 bg-[#71896e] text-white w-[50%] h-10 text-center items-center justify-center rounded-lg">
              ผัก ผลไม้ และเห็ด
            </div>
            <div class="bg-[#d2e8d0] flex gap-6 flex-wrap justify-start py-4">
              <div v-for="(vegetable, index) in vegetables" :key="index" class="rounded-lg min-w-20 flex flex-wrap m-3">
                <div class="flex-col bg-white border-2 p-2 justify-center items-center">
                  <img :src="`/vegetable/${vegetable.name}.png`" class="w-20 h-20 gap-5 flex" />
                  <div class="bg-base text-center font-bold rounded-lg">{{ vegetable.display_name }}</div>
                  <div class="m-4 text-wrap w-36">{{ vegetable.description }}</div>
                </div>
              </div>
            </div>
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



      <!-- Pagination Dots -->
      <div
        class="pagination-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 justify-center items-center">

        <!-- ปุ่มเลื่อนหน้า -->
        <button @click="prevPage" :disabled="currentPage === 1"
          class="nav-button left-4 w-10 h-10 text-4xl active:scale-95 hover:scale-105 transition">‹</button>

        <span v-for="page in totalPages" :key="page" class="dot w-4 h-4 rounded-full"
          :class="{ 'bg-gray-700': currentPage === page, 'bg-gray-300': currentPage !== page }"></span>

        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="nav-button right-4 w-10 h-10 text-4xl active:scale-95 hover:scale-105 transition">›</button>
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
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* จัดหัวข้อให้อยู่ด้านบน */
}

.page-header h3 {
  margin-top: 1rem;
  /* ทำให้ h3 อยู่ห่างจาก How to Play ประมาณ mt-3 */
}

.content p {
  margin: 10px 0;
}

.nav-button {
  background-color: #e0e0e0;
  color: #333;
  /* padding: 8px 12px; */
  border-radius: 10%;
  /* position: absolute; */
  top: 50%;
  /* transform: translateY(-50%); */
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
