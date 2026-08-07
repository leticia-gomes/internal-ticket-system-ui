<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTicketStore } from '../stores/ticket.store'
import { useUserStore } from '@/modules/users/stores/user.store'

const route = useRoute()
const router = useRouter()

const ticketStore = useTicketStore()
const userStore = useUserStore()

const loading = ref(false)

const form = reactive({
  title: '',
  description: '',
  priority: '',
  status: '',
  assignedToId: undefined as number | undefined,
})

const ticketId = computed(() => Number(route.params.id))

onMounted(async () => {
  await userStore.fetchUsers()

  await ticketStore.loadTicket(ticketId.value)

  const ticket = ticketStore.selectedTicket

  if (ticket) {
    form.title = ticket.title
    form.description = ticket.description
    form.priority = ticket.priority
    form.status = ticket.status
    form.assignedToId = ticket.assignedTo?.id
  }
})

async function handleSubmit() {
  try {
    loading.value = true

    await ticketStore.updateTicket(ticketId.value, {
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      assignedToId: form.assignedToId,
    })

    router.push(`/tickets/${ticketId.value}`)
  } finally {
    loading.value = false
  }
}

console.log('TicketDetailsPage carregou')
</script>

<template>
  <section>
    <h1>Editar Ticket</h1>

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
        <label> Status </label>

        <select v-model="form.status">
          <option value="OPEN">Aberto</option>

          <option value="IN_PROGRESS">Em andamento</option>

          <option value="RESOLVED">Resolvido</option>

          <option value="CLOSED">Fechado</option>
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
        {{ loading ? 'Salvando...' : 'Salvar alterações' }}
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
