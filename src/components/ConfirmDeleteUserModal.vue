<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isModalVisible = ref(true)

const closeModal = () => {
    isModalVisible.value = false;
    router.push({ name: 'home-page' });
}

const confirmDelete = () => {
  
}
</script>

<template>
  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-sunday">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class=" text-xl font-bold text-center text-[#b12c2c]">
        Confirm Account Deletion
      </p>
      <p class="mb-2 text-md text-center">
        To delete your account, please enter your password for confirmation.
      </p>
      
      <span class="text-gray-700 mb-2 block text-center">Your Password :</span>
      <input
        type="password"
        placeholder="Type your password"
        class="w-full px-4 py-2 mb-4 rounded-lg border bg-[#96ab97] border-[#4c4541] focus:outline-none focus:border-[#4c4541]"
      />

      <div class="flex justify-center gap-2">
        <!-- ปุ่ม confirm -->
        <button @click="confirmDelete" class="bg-green-500 text-white px-4 py-2 rounded-lg">Confirm</button>
        
        <!-- ปุ่ม cancel -->
        <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
