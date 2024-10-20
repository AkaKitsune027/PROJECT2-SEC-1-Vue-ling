<script setup>
import { computed, ref } from 'vue';
import foods from '../../data/foods.json';
import { useUserStore } from "@/stores/user";

// ดึงข้อมูลผู้ใช้จาก store
const userStore = useUserStore();
const selectedRecipe = ref(null); // เก็บค่าของสูตรที่เลือก
const isOpenModal = ref(false); // สถานะเปิด/ปิด modal

// กำหนดสูตรที่ปลดล็อกได้ของผู้ใช้
const userRecipes = userStore.user.userDetail.recipes;
const unlockedRecipes = computed(() => {
    // กรองสูตรที่ปลดล็อกแล้วจาก foods.json โดยเช็ค isUnlock ของ user
    return foods.filter((food) =>
        userRecipes?.some((recipe) => recipe.id === food.id && recipe.isUnlock === true)
    );
});

// ฟังก์ชันเพื่อเปิด modal เมื่อเลือกสูตรอาหาร
const openModal = () => {
    if (selectedRecipe.value) {
        isOpenModal.value = true;
    }
};

// ฟังก์ชันเพื่อปิด modal และรีเซ็ต selectedRecipe
const closeModal = () => {
    isOpenModal.value = false;
    // รีเซ็ต selectedRecipe หลังจากปิด modal เพื่อให้สามารถเลือกสูตรเดิมได้อีกครั้ง
    selectedRecipe.value = null;
};
</script>

<template>
    <div class="max-w-lg mx-auto p-4">
        <div class="form-control mb-4">
            <label for="recipes" class="label">
                <span class="label-text font-bold bg-white rounded-md p-2 w-64">สูตรอาหาร</span>
            </label>
            <!-- ใช้ v-model สำหรับเลือกสูตรอาหาร -->
            <select v-model="selectedRecipe" @change="openModal"
                class="select select-bordered w-full max-w-xs rounded-md cursor-pointer">
                <!-- ข้อความเริ่มต้นที่เป็น placeholder -->
                <option :value="null" disabled selected hidden class="text-slate-400 shadow-lg">เลือกสูตรอาหารของคุณ</option>

                <!-- แสดงรายการสูตรอาหาร -->
                <option v-for="recipe in unlockedRecipes" :key="recipe.id" :value="recipe"
                    class="text-slate-800 rounded-md  cursor-pointer">
                <!-- ใช้ display_name เป็นข้อความที่แสดงในรายการ -->
                 
                    {{ recipe.display_name }}
                </option>
            </select>
        </div>

        <!-- แสดงโมดัลเมื่อ isOpenModal เป็น true -->
        <div v-if="isOpenModal" class="modal bg-white p-2 rounded-md shadow-lg">
            <div class="modal-box relative">

                <h2 class="font-bold text-xl mb-2 text-green-500">สูตร: {{ selectedRecipe.display_name }}</h2>
                <p class="text-gray-700 mb-4">{{ selectedRecipe.description }}</p>
                <h3 class="font-bold text-lg mb-2">วัตถุดิบ:</h3>

                <!-- ถ้าวัตถุดิบเกิน 5 รายการจะมี scroll -->
                <div :class="{ 'max-h-40 overflow-y-auto': selectedRecipe.ingredients.length > 5 }">
                    <ul class="list-disc ml-5">
                        <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient"
                            class="text-gray-600 flex items-center">      
                            {{ ingredient }}
                        </li>
                    </ul>
                </div>

                <!-- ปุ่มปิดโมดัลที่ด้านล่าง -->
                <div class="modal-action ">
                    <label @click="closeModal"
                        class="bg-red-500 rounded-lg p-1 mt-4 cursor-pointer text-white">ปิด</label>
                </div>
            </div>

            <!-- พื้นหลังโมดัล -->
            <label class="modal-backdrop" @click="closeModal"></label>
        </div>
    </div>
</template>

<style scoped>
/* สไตล์เพื่อทำให้มีการ scroll เมื่อมีวัตถุดิบเกิน 5 รายการ */
.max-h-40 {
    max-height: 10rem;
    /* 40 หน่วย (10rem) เพื่อจำกัดความสูง */
}

.overflow-y-auto {
    overflow-y: auto;
    /* เพิ่ม scroll */
}
</style>