<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const user = authStore.user

function handleLogout() {
  authStore.logout()
  router.push({ name: 'auth.login' })
}
</script>

<template>
  <header class="header">
    <div>Internal Ticket System</div>

    <div class="user-area">
      <span v-if="user"> Olá, {{ user.name }} </span>

      <button @click="handleLogout">Sair</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 64px;

  background: white;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 30px;

  box-shadow: var(--shadow);
}

.user-area {
  display: flex;

  align-items: center;

  gap: 20px;
}

button {
  background: var(--primary-color);

  color: white;

  border: none;

  padding: 8px 16px;

  border-radius: 8px;

  cursor: pointer;
}

button:hover {
  background: var(--primary-hover);
}
</style>
