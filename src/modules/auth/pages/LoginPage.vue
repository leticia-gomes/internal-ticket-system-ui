<script setup lang="ts">
import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import { AuthService } from '../services/auth.service'
import { authStorage } from '@/shared/storage/auth.storage'
import { useAuthStore } from '../stores/auth.store'

const authService = new AuthService()
const authStore = useAuthStore()

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''

    const response = await authService.login(form)

    authStorage.saveToken(response.accessToken)

    await authStore.login({
      email: form.email,
      password: form.password,
    })

    router.push('/dashboard')
  } catch {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="login">
    <h1>Internal Ticket System</h1>

    <form @submit.prevent="handleSubmit">
      <input v-model="form.email" type="email" placeholder="Email" />

      <input v-model="form.password" type="password" placeholder="Password" />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>

      <p v-if="error">
        {{ error }}
      </p>
    </form>
  </section>
</template>
