<script setup lang="ts">
import { onMounted } from 'vue'

import { useTicketStore } from '../stores/ticket.store'

const store = useTicketStore()

onMounted(() => {
  store.loadTickets()
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Assigned To</th>
        <th>Updated At</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="ticket in store.tickets" :key="ticket.id">
        <td>{{ ticket.title }}</td>

        <td>{{ ticket.status }}</td>

        <td>{{ ticket.priority }}</td>

        <td>
          {{ ticket.assignedTo?.name ?? '-' }}
        </td>

        <td>
          {{ new Date(ticket.updatedAt).toLocaleString() }}
        </td>

        <td>
          <RouterLink :to="`/tickets/${ticket.id}`"> View </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>
