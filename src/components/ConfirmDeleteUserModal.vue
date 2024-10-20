<script setup>
import { deleteUser } from '@/libs/userManagement';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isModalVisible = ref(true)
const userStore = useUserStore()
const currentPassword = ref('')

const confirmDelete = async () => {
  const currentUser = userStore.user
  if (currentPassword.value === currentUser.password) {
    await deleteUser(currentUser.id)
    router.push({ name: 'login-page' })
  }
  else {
    alert('Invalid password')
  }
}

</script>

<template>
  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-sunday">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-64">
      <p class=" text-xl font-bold text-center text-[#0d0d0d]">
        Confirm Account Deletion
      </p>
      <span class="mb-2 text-sm">
        To delete your account, please enter your password for confirmation. 
        <p class="text-sm text-[#b12c2c]">
        this action will permanently delete all your related data, and once the process is complete, it cannot be undone.
        </p>
      </span>
      
      <div class="flex gap-2 mt-6">
         <!-- <span class="text-gray-700 mt-2 block text-center text-nowrap">Your Password :</span> -->
      <input
        type="password"
        v-model="currentPassword"
        placeholder="your password..."
        class="w-full px-4 py-2 mb-4 rounded-lg border text-white bg-[#676867] border-[#20201f] focus:outline-none focus:border-[#4c4541]"
      />
      </div>
     

      <div class="flex justify-center gap-2">
        <!-- ปุ่ม confirm -->
        <button @click="confirmDelete" class="bg-[#269f3e] text-white px-4 py-2 rounded-lg">Confirm</button>
        
        <!-- ปุ่ม cancel -->
        <button @click="$emit('close')" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
