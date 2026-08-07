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

    <form @submit.prevent="handleSubmit" class="ticket-form">
      <div class="field">
        <label> Título </label>

        <input v-model="form.title" required placeholder="Digite o título do ticket" />
      </div>

      <div class="field">
        <label> Descrição </label>

        <textarea
          v-model="form.description"
          required
          placeholder="Descreva o problema ou solicitação"
        />
      </div>

      <div class="field">
        <label> Prioridade </label>

        <select v-model="form.priority">
          <option value="LOW">Baixa</option>

          <option value="MEDIUM">Média</option>

          <option value="HIGH">Alta</option>

          <option value="URGENT">Urgente</option>
        </select>
      </div>

      <div class="field">
        <label> Responsável </label>

        <select v-model="form.assignedToId">
          <option :value="undefined">Não atribuído</option>

          <option v-for="user in userStore.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn-primary" :disabled="loading">
        {{ loading ? 'Criando...' : 'Criar Ticket' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.ticket-form {
  background: white;

  padding: 30px;

  border-radius: 12px;

  box-shadow: var(--shadow);
}

.field {
  display: flex;

  flex-direction: column;

  gap: 8px;

  margin-bottom: 20px;
}

label {
  font-size: 14px;

  font-weight: 600;

  color: var(--text-color);
}

input,
textarea,
select {
  width: 100%;

  padding: 12px;

  border: 1px solid var(--border-color);

  border-radius: 8px;

  font-size: 14px;
}

textarea {
  min-height: 140px;

  resize: vertical;

  font-family: inherit;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;

  border-color: var(--primary-color);
}

.btn-primary {
  background: var(--primary-color);

  color: white;

  border: none;

  padding: 12px 24px;

  border-radius: 8px;

  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-primary:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}
</style>
