<script setup>
import { ref, defineEmits, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateUser, updateUserDetails } from '@/libs/userManagement'
import { useRouter } from 'vue-router'

// รับ props ของ item และ type 'buy'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isGoldEnough: {
    type: Boolean,
    required: true
  }
})

// สร้าง emit สำหรับส่ง event กลับไปยัง parent
const emit = defineEmits(['close'])

const router = useRouter()

// สร้าง state เพื่อเก็บจำนวนที่จะซื้อหรือขาย
const quantity = ref(1)

// สร้าง state สำหรับข้อความเตือน
const errorMessage = ref('')

// คำนวณราคารวม
const totalPrice = computed(() => {
  return props.item.price * quantity.value
})

// เข้าถึง store ของผู้ใช้
const userStore = useUserStore()

// ฟังก์ชันสำหรับการเพิ่มจำนวน
const increaseQuantity = () => {
  quantity.value += 1
  checkGold() // เรียกฟังก์ชันตรวจสอบ gold เมื่อเพิ่มจำนวน
}

// ฟังก์ชันสำหรับการลดจำนวน
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
    checkGold() // เรียกฟังก์ชันตรวจสอบ gold เมื่อลดจำนวน
  }
}

// ฟังก์ชันตรวจสอบ gold
const checkGold = () => {
  const currentGold = userStore.user.userDetail.gold
  if (currentGold < totalPrice.value) {
    errorMessage.value = 'Gold ไม่เพียงพอสำหรับการซื้อ'
  } else {
    errorMessage.value = '' // ลบข้อความเตือนเมื่อ gold เพียงพอ
  }
}

// ฟังก์ชันกดยืนยัน (Okay)
const handleConfirm = async () => {
  const currentGold = userStore.user.userDetail.gold

  if (currentGold >= totalPrice.value) {
    // มีเงินเพียงพอ ทำการหักเงิน
    const updatedGold = currentGold - totalPrice.value
    const ingredientIndex = userStore.user.userDetail.ingredients.findIndex(ingd => ingd.id === props.item.id)

    // ถ้ามีอยู่แล้วเพิ่มจำนวน ถ้าไม่มีให้เพิ่มใหม่
    if (ingredientIndex !== -1) {
      userStore.user.userDetail.ingredients[ingredientIndex].amount += quantity.value
    } else {
      userStore.user.userDetail.ingredients.push({
        id: props.item.id,
        amount: quantity.value
      })
    }

    // อัปเดตข้อมูลผู้ใช้
    const updateData = {
      gold: updatedGold,
      ingredients: userStore.user.userDetail.ingredients
    }

    try {
      const updatedUserDetails = await updateUserDetails(userStore.user.id, updateData)
      if (updatedUserDetails && updatedUserDetails.gold === updatedGold) {
        userStore.user.userDetail.gold = updatedUserDetails.gold
        await updateUser(userStore.user.id, userStore.user)
      } else {
        useUserStore.user = null
        router.push({ name: 'login-page' })
      }
    } catch (error) {
      console.error(error)
    }

    emit('close') // ปิด modal หลังจากการซื้อเสร็จสิ้น
  }
}

// ฟังก์ชันกดยกเลิก (Cancel)
const handleCancel = () => {
  emit('close') // ส่ง event 'close' เพื่อปิด modal โดยไม่ทำอะไร
}

// ตรวจสอบการเปลี่ยนแปลงของราคารวมและ gold
watch([totalPrice, () => userStore.user.userDetail.gold], () => {
  checkGold() // เรียกฟังก์ชันตรวจสอบ gold ทุกครั้งที่ราคาหรือ gold เปลี่ยนแปลง
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-noto-thai">
    <div class="bg-white w-1/3 p-5 rounded-lg shadow-lg text-center relative overflow-visible">
      <h2 class="text-2xl font-bold">ซื้อวัตถุดิบ</h2>
      
      <!-- แสดงรูปภาพ item ที่กด -->
      <div class="my-4">
        <img :src="`/${item.type}/${item.name}.png`" alt="item" class="mx-auto w-32 h-32">
        <p class="text-xl">{{ item.display_name }}</p>
      </div>
      
      <!-- แสดงการเพิ่ม/ลดจำนวน -->
      <div class="flex items-center justify-center gap-3">
        <button @click="decreaseQuantity" class="bg-gray-300 px-4 py-2 rounded-lg">-</button>
        <span class="text-xl">{{ quantity }}</span>
        <button @click="increaseQuantity" class="bg-gray-300 px-4 py-2 rounded-lg">+</button>
      </div>

      <!-- แสดงราคารวม -->
      <p class="text-xl mt-4 ">ราคารวม: {{ totalPrice }} โกลด์</p>

      <!-- ข้อความแจ้งเตือนสีแดง -->
      <p v-if="!props.isGoldEnough || errorMessage" class="text-red-500 mt-2">
        {{ errorMessage || 'Gold ไม่เพียงพอสำหรับการซื้อ' }}
      </p>

      <!-- ปุ่มยืนยัน และยกเลิก -->
      <div class="flex justify-center gap-4 mt-6 ">
        <button
          @click="handleConfirm"
          class="text-white px-4 py-2 rounded-lg"
          :class="{
            'bg-gray-500 opacity-50': errorMessage || !props.isGoldEnough,
            'bg-green-500': !errorMessage && props.isGoldEnough
          }"
          :disabled="errorMessage || !props.isGoldEnough"
        >
          ยืนยัน
        </button>
        <button @click="handleCancel" class="bg-red-500 text-white px-4 py-2 rounded-lg">ยกเลิก</button>
      </div>

      <div class="absolute top-28 -right-20 pointer-events-none">
        <img src="../assets/cat.png" width="250" height="200">
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-button:disabled {
  background-color: gray;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
