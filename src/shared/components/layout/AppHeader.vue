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
  <header>
    <span v-if="user"> Olá, {{ user.name }} </span>

    <button @click="handleLogout">Sair</button>
  </header>
</template>
