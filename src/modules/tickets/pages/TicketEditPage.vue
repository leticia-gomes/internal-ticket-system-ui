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

      <label>Status</label>

      <select v-model="form.status">
        <option value="OPEN">Aberto</option>
        <option value="IN_PROGRESS">Em andamento</option>
        <option value="RESOLVED">Resolvido</option>
        <option value="CLOSED">Fechado</option>
      </select>

      <div>
        <label> Responsável </label>

        <select v-model="form.assignedToId">
          <option :value="undefined">Não atribuído</option>

          <option v-for="user in userStore.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <button type="submit" :disabled="loading">Salvar alterações</button>
    </form>
  </section>
</template>
