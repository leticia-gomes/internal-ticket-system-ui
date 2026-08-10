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
  <div class="login-card">
    <div class="logo">GS System</div>

    <h1>Internal Ticket System</h1>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label>Email</label>

        <input v-model="form.email" type="email" placeholder="Digite seu email" />
      </div>

      <div class="field">
        <label>Password</label>

        <input v-model="form.password" type="password" placeholder="Digite sua senha" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>

      <p v-if="error" class="error">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-card {
  width: 380px;

  background: white;

  padding: 40px;

  border-radius: 12px;

  box-shadow: var(--shadow);
}

.logo {
  font-size: 26px;

  font-weight: bold;

  color: var(--primary-color);

  text-align: center;
}

h1 {
  font-size: 20px;

  text-align: center;

  margin-bottom: 30px;

  color: var(--text-color);
}

.field {
  display: flex;

  flex-direction: column;

  gap: 6px;

  margin-bottom: 20px;
}

label {
  font-size: 14px;

  color: var(--text-light);
}

input {
  padding: 12px;

  border: 1px solid var(--border-color);

  border-radius: 8px;

  font-size: 14px;
}

input:focus {
  outline: none;

  border-color: var(--primary-color);
}

button {
  width: 100%;

  padding: 12px;

  background: var(--primary-color);

  color: white;

  border: none;

  border-radius: 8px;

  font-size: 15px;

  cursor: pointer;
}

button:hover {
  background: var(--primary-hover);
}

button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.error {
  margin-top: 20px;

  color: var(--danger-color);

  text-align: center;
}
</style>
