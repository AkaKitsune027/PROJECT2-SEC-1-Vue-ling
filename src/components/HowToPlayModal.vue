<script setup>
import ingredientsData from '../../data/ingredients.json'
import { ref, computed } from 'vue'

// หน้าที่กำลังแสดงและจำนวนหน้าทั้งหมด
const currentPage = ref(1)
const totalPages = 3 // เปลี่ยนตามจำนวนหน้าที่ต้องการ

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
    <div class="order-board relative w-4/5 h-3/4 rounded-lg shadow-lg">
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
          <h3 v-if="currentPage === 1" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3 font-bold">
            วิธีการเล่น</h3>
          <h3 v-if="currentPage === 2" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3 font-bold">วัตถุดิบ
          </h3>
          <h3 v-if="currentPage === 3" class="text-2xl border-2 border-gray-300 p-2 rounded-lg mt-3 font-bold">
            ระบบโกลด์และชื่อเสียง
          </h3>
        </div>

        <div v-if="currentPage === 1" class="text-left">
          <p class="my-3 text-xl font-bold">ขั้นตอนในการเล่นเกม</p>

          <div class="flex gap-3">
            <div class="flex flex-start justify-between">

              <div class="flex my-2 justify-center items-center ">
                <span
                  class=" bg-slate-200 border-4 border-slate-400 rounded-full justify-center items-center  flex w-10 h-10 font-bold mx-4 ">
                  1
                </span>
                <div class="font-bold">ซื้อของเตรียมไว้สำหรับทำอาหาร</div>
              </div>
            </div>

          </div>
          <div class="flex gap-4 justify-center items-center">
            <img src="/res1.png" alt="res1" class="border-4 h-72">
            <img src="/res2.png" alt="res2" class="border-4 h-72">
            <img src="/res3.png" alt="res2" class="border-4 h-64">
          </div>
          <div class="px-14 py-4 bg-white border-2 rounded-lg">
            ก่อนที่เราจะทำเมนูใด ๆ ให้ลูกค้า เราจะต้องซื้อวัตถุดิบที่จะนำมาทำอาหารเท่าที่ต้องการ
            โดยกดไปที่ปุ่มร้านค้าในแถบวัตถุดิบที่มุมล่าง จากนั้นแถบจะเปลี่ยนเป็นแถบร้านค้า
            เราสามารถเลือกซื้อของอะไรก็ได้ กี่ชิ้นก็ได้ <span class="text-red-600">แต่ก็ต้องบริหารเงินดี ๆ นะ
              ถ้าเงินไม่พอจะไม่สามารถซื้อของได้และอาจแพ้เกมได้ด้วยนะ</span>
          </div>

          <div class="flex gap-3">
            <div class="flex flex-start justify-between">

              <div class="flex my-2 justify-center items-center ">
                <span
                  class=" bg-slate-200 border-4 border-slate-400 rounded-full flex justify-center items-center w-10 h-10 font-bold mx-4 ">
                  2
                </span>
                <div class="font-bold">รับออเดอร์</div>
              </div>
            </div>

          </div>
          <div class="flex gap-4 justify-center items-center">
            <img src="/order1.png" alt="order1" class="border-4 h-52">
            <img src="/order2.png" alt="order2" class="border-4 h-52">
            <img src="/order3.png" alt="order3" class="border-4 h-52">
          </div>
          <div class="px-14 py-4 bg-white border-2 rounded-lg">
            เมื่อซื้อของเสร็จแล้ว เราจะต้องรับออเดอร์ที่เข้ามาโดยการคลิกที่ <span
              class="text-yellow-600">'แผ่นออเดอร์รูปคน'</span> ที่แปะอยู่กับไม้
            <br />เมื่อกดมาแล้ว ถ้าเราจะ <span class="text-green-600">'อ่านข้อมูลและรับออเดอร์'</span> ให้เรา <span
              class="text-green-600">'ติ๊กถูก'</span>
            <br />แต่ถ้าเราจะ <span class="text-red-600">'ไม่อ่านข้อมูลและไม่รับออเดอร์'</span> ให้เรา <span
              class="text-red-600">'ติ๊กกากบาท' </span>
            <span class="text-gray-600">(เมื่อปฏิเสธจะไม่มีผลอะไรเหมือนการปิดร้านชั่วคราว
              และลูกค้าคนอื่นจะเข้ามาสั่งแทน)</span>
            <br />จากนั้นเกมจะพาเราไปยังหน้ารายละเอียดอาหารที่ลูกค้าสั่ง
            โดยข้อมูลจะประกอบไปด้วย
            <br />
            <span class="text-yellow-600">'ชื่อเมนูที่ลูกค้าต้องการ', 'คำอธิบายของเมนูนั้น ๆ'
              และ 'ความต้องการเพิ่มเติมของลูกค้า'</span>
            <p class="text-red-600"> !! คำเตือน : แต่ถ้าเราเลือกที่จะ 'ไม่รับออเดอร์หลังจากอ่านรายละเอียดแล้ว'
              เราจะเสียค่าชื่อเสียง
              เนื่องจากรับมาแล้วแต่ปฏิเสธออเดอร์ภายหลัง</p>
          </div>

          <div class="flex gap-3">
            <div class="flex flex-start justify-between">

              <div class="flex my-2 justify-center items-center ">
                <span
                  class=" bg-slate-200 border-4 border-slate-400 rounded-full flex justify-center items-center w-10 h-10 font-bold mx-4 ">
                  3
                </span>
                <div class="font-bold">ทำอาหาร</div>
              </div>
            </div>

          </div>
          <div class="flex gap-4 justify-center items-center">
            <img src="/cook1.png" alt="cook1" class="border-4 h-40">
            <img src="/cook2.png" alt="cook2" class="border-4 h-32">
            <img src="/cook3.png" alt="cook3" class="border-4 h-32">
            <img src="/cook4.png" alt="cook4" class="border-4 h-32">
          </div>

          <div class="px-14 py-4 bg-white border-2 rounded-lg">
            เราจะเริ่มทำอาหารตามออเดอร์ โดยถ้าจำรายละเอียดออเดอร์ไม่ได้ สามารถกดที่ 'แผ่นออเดอร์รูปคน'
            เพื่อดูรายละเอียดอีกครั้งได้
            <br>จากนั้นให้เราเลือกวัตถุดิบที่คิดว่าลูกค้าจะชอบ จาก <span
              class="text-yellow-600">'ชื่อเมนูที่ลูกค้าต้องการ' และ
              'ความต้องการเพิ่มเติมของลูกค้า'</span>
            <br><span class="text-yellow-600">แล้วคนหม้อให้วัตถุดิบเข้ากัน 3 ครั้ง
              เสร็จแล้วเราจะสามารถเสิร์ฟอาหารให้ลูกค้าได้</span>
          </div>

          <div class="flex gap-3">
            <div class="flex flex-start justify-between">

              <div class="flex my-2 justify-center items-center ">
                <span
                  class=" bg-slate-200 border-4 border-slate-400 rounded-full flex justify-center items-center w-10 h-10 font-bold mx-4 ">
                  4
                </span>
                <div class="font-bold">คำนวณอาหาร</div>
              </div>
            </div>

          </div>
          <div class="flex gap-4 justify-center items-center">
            <div class="flex gap-4 justify-center items-center">
              <img src="/cal1.png" alt="cal1" class="border-4 h-32">
              <img src="/cal2.png" alt="cal2" class="border-4 w-80">
              <img src="/cal3.png" alt="cal3" class="border-4 h-32">
              <img src="/recp.png" alt="recp" class="border-4 h-52">
            </div>

          </div>

          <div class="px-14 py-4 bg-white border-2 rounded-lg">
            เมื่อกดปุ่ม เสิร์ฟ เราจะได้หน้าที่แสดงรายละเอียดการให้คะแนนต่าง ๆ ได้แก่ <br />
            <span class="text-yellow-600">'ดาว', 'ชื่ออาหาร', 'ความต้องการเพิ่มเติมของลูกค้า', 'รีวิว', 'โกลด์',
              'ชื่อเสียง' และ
              'ความถูกต้องของเมนู'</span>
            <br />โดยการให้คะแนนเมนูจะมีทั้งหมด 5 ช่วง
            <li>0 - 39 คะแนน (1 ดาว / 20%)</li>
            <li>40 - 59 คะแนน (2 ดาว / 40%)</li>
            <li>60 - 79 คะแนน (3 ดาว / 60%)</li>
            <li>80 - 99 คะแนน (4ดาว /80%)</li>
            <li>100 คะแนน (5ดาว / 100%)</li>
            <br />
            <span class="text-yellow-600">หากเราทำอาหารได้ดี หรือได้ 5 ดาว เราจะได้รับสูตรต้นตำหรับของเมนูอื่นมา 1 เมนู
              และจะได้รับการบันทึกเมนู 5 ดาว ลงสมุดแห่งเกียรติยศ</span>
            <br>
          </div>

          <div class="flex gap-3">
            <div class="flex flex-start justify-between">

              <div class="flex my-2 justify-center items-center ">
                <span
                  class=" bg-slate-200 border-4 border-slate-400 rounded-full flex justify-center items-center w-10 h-10 font-bold mx-4 ">
                  4
                </span>
                <div class="font-bold">สมุดแห่งเกียรติยศ และสูตรอาหาร</div>
              </div>
            </div>

          </div>
          <div class="flex gap-4 justify-center items-center">
            <img src="/ar1.png" alt="ar1" class="border-4 h-40">
            <img src="/ar2.png" alt="ar2" class="border-4 w-96">
            <img src="/ar3.png" alt="ar3" class="border-4 w-96">
          </div>

          <div class="px-14 py-4 bg-white border-2 rounded-lg">
            นอกจากนั้น เรายังมีระบบที่ <span class="text-yellow-600">บันทึกความสำเร็จของเมนูอาหาร</span>อีกด้วย
            โดยมีเงื่อนไข คือ <span class="text-yellow-600">เราต้องทำเมนูนั้นให้ได้ 5 ดาว</span>
            <br>ถ้าเราทำอาหารได้ 5 ดาว เราจะมีหน้าตาของอาหาร กรอบสีทอง วัตถุดิบ และคำอธิบายของอาหารโผล่ขึ้นมา
            <br>ถ้าเราทำอาหารได้ไม่ถึง 5 ดาว เมนูนั้น ๆ จะถูกล็อกไว้เป็นเมนูปริศนา
            เราจะไม่เห็นหน้าตาของเมนูนั้นและกรอบจะยังคงเป็นสีเทา
          </div>

        </div>


        <!--** หน้าที่ 2  -->
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

            <div
              class="text-lg flex my-6 bg-[#c576dd] text-white w-[50%] h-10 text-center items-center justify-center rounded-lg">
              เครื่องปรุง
            </div>

            <div class="bg-[#efd3f7] flex gap-6 justify-start py-4 w-full">

              <div class="flex-col bg-white border-2 p-2 items-center rounded-lg min-w-20 flex flex-wrap m-3">
                <img src="/seasoning/bottle-of-sugar.png" alt="sugar" class="w-20 h-20 " />
                <div class="bg-[#d196e1] text-center font-bold rounded-lg px-6">น้ำตาล</div>
                <div class="m-4 text-wrap w-36">เครื่องปรุงอเนกประสงค์ รสหวาน ว่ากันว่าชาวต่างโลกเป็นผู้คิดค้นสิ่งนี้
                </div>
              </div>
              <div
                class="flex-col bg-white border-2 p-2 justify-center items-center rounded-lg min-w-20 flex flex-wrap m-3">
                <img src="/seasoning/bottle-of-salt.png" alt="salt" class="w-20 h-20" />
                <div class="bg-[#d196e1] text-center font-bold rounded-lg px-6">เกลือ</div>
                <div class="m-4 text-wrap w-36">เครื่องปรุงอเนกประสงค์ รสเค็ม ว่ากันว่าชาวต่างโลกเป็นผู้คิดค้นสิ่งนี้
                </div>
              </div>

            </div>
          </div>
        </div>

        <!--** หน้าที่ 3  -->
        <div v-if="currentPage === 3" class="text-left">
          <div class="flex justify-center py-4">
            <img src="/pop.png" alt="pop" class="w-7/12" />
          </div>
          <div class="bg-white px-3 rounded-lg">
            <div>
              <li class="font-bold text-lg">ระบบโกลด์</li>
              โกลด์เป็นสิ่งที่มีไว้เพื่อใช้จ่ายในหน้าร้านค้า
              <br>วิธีการได้รับโกลด์ คือ การทำออเดอร์ส่งลูกค้า ยิ่งทำได้ดาวมาก ลูกค้ายิ่งจ่ายเงินมาก
              <p class="text-red-500">!! คำเตือน : ถ้าหากเงินของเราเหลือน้อยกว่าเงินขั้นต่ำของวัตถุดิบที่ต่ำที่สุด
                ระบบเกมจะเด้งให้ไปตั้งชื่อร้านค้าใหม่ และเริ่มต้นร้านค้านั้นใหม่ทันที <br>'ทุกอย่าง'
                ในร้านอาหารเก่าจะถูกลบออกไปทั้งหมด</p>
            </div>

            <div class="py-4">
              <li class="font-bold text-lg">ระบบชื่อเสียง</li>
              ระบบชื่อเสียงจะใช้ในการได้รับทิปค่าอาหาร 2 เท่า และการได้รับค่าอาหารครึ่งราคา
              <br>ชื่อเสียงจะมีระยะตั้งแต่ -50 ถึง 50
              <li>ได้รับทิปค่าอาหาร 2 เท่า: <span class="text-green-600">ยิ่งค่าชื่อเสียงมาก ยิ่งมีโอกาส (%) ที่จะได้ทิป
                  2 เท่ามากขึ้นเท่านั้น</span>
                เช่น ถ้าค่าชื่อเสียงเป็น 20 เราจะมีโอกาสได้ทิป 2 เท่า เป็น 20 % </li>
              <li>การได้รับค่าอาหารครึ่งราคา:
                <span class="text-red-600">ยิ่งค่าชื่อเสียงน้อย ยิ่งมีโอกาส (%)
                  ที่ลูกค้าจะจ่ายครึ่งราคามากขึ้นเท่านั้น</span> เช่น
                ถ้าค่าชื่อเสียงเป็น -20 เราจะมีโอกาสได้รับเงินค่าอาหารครึ่งราคา เป็น 20 %
              </li>
              <br>
            </div>
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
