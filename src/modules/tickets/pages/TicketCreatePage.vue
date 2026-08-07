<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/modules/users/stores/user.store'

import { useTicketStore } from '../stores/ticket.store'

const router = useRouter()
const userStore = useUserStore()

const ticketStore = useTicketStore()

const loading = ref(false)

const form = reactive({
  title: '',
  description: '',
  priority: 'MEDIUM',
  assignedToId: undefined as number | undefined,
})

async function handleSubmit() {
  try {
    loading.value = true

    const ticket = await ticketStore.createTicket(form)

    router.push(`/tickets/${ticket.id}`)
  } catch (error) {
    const err = error as { response?: { data: unknown } }
    console.log('ERRO CREATE TICKET:', err.response?.data)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <section>
    <h1>Novo Ticket</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label> Título </label>

        <input v-model="form.title" required />
      </div>

      <div>
        <label> Descrição </label>

        <textarea v-model="form.description" required />
      </div>

      <div>
        <label> Prioridade </label>

        <select v-model="form.priority">
          <option value="LOW">Baixa</option>

          <option value="MEDIUM">Média</option>

          <option value="HIGH">Alta</option>

          <option value="URGENT">Urgente</option>
        </select>
      </div>

      <div>
        <label> Responsável </label>

        <select v-model="form.assignedToId">
          <option :value="undefined">Não atribuído</option>

          <option v-for="user in userStore.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <button type="submit" :disabled="loading">Criar Ticket</button>
    </form>
  </section>
</template>
