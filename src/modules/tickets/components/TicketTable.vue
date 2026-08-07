<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useTicketStore } from '../stores/ticket.store'

const ticketStore = useTicketStore()

const emit = defineEmits<{
  delete: [ticketId: number]
}>()

function formatDate(date: string): string {
  return new Date(date).toLocaleString('pt-BR')
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Título</th>
        <th>Status</th>
        <th>Prioridade</th>
        <th>Responsável</th>
        <th>Atualizado em</th>
        <th>Ação</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="ticket in ticketStore.tickets" :key="ticket.id">
        <td>{{ ticket.id }}</td>

        <td>{{ ticket.title }}</td>

        <td>{{ ticket.status }}</td>

        <td>{{ ticket.priority }}</td>

        <td>
          {{ ticket.assignedTo?.name ?? '-' }}
        </td>

        <td>
          {{ formatDate(ticket.updatedAt) }}
        </td>

        <td>
          <RouterLink :to="`/tickets/${ticket.id}`"> View </RouterLink>
          <RouterLink :to="`/tickets/${ticket.id}/edit`"> Editar </RouterLink>
          <button type="button" @click="emit('delete', ticket.id)">Delete</button>
        </td>
      </tr>

      <tr v-if="!ticketStore.loading && !ticketStore.tickets.length">
        <td colspan="6">No tickets found.</td>
      </tr>

      <tr v-if="ticketStore.loading">
        <td colspan="6">Loading tickets...</td>
      </tr>
    </tbody>
  </table>
</template>
