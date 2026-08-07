<script setup lang="ts">
import { watch } from 'vue'

import { useTicketStore } from '../stores/ticket.store'

const ticketStore = useTicketStore()

const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

async function applyFilters() {
  await ticketStore.loadTickets()
}

function clearFilters() {
  ticketStore.clearFilters()

  ticketStore.loadTickets()
}

watch(
  () => ticketStore.filters,
  () => {
    applyFilters()
  },
  {
    deep: true,
  },
)
</script>

<template>
  <section>
    <select v-model="ticketStore.filters.status">
      <option value="">All statuses</option>

      <option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>

    <select v-model="ticketStore.filters.priority">
      <option value="">All priorities</option>

      <option v-for="priority in priorities" :key="priority" :value="priority">
        {{ priority }}
      </option>
    </select>

    <button type="button" @click="clearFilters">Clear</button>
  </section>
</template>
