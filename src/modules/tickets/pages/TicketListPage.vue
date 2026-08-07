<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TicketFilters from '../components/TicketFilters.vue'
import TicketTable from '../components/TicketTable.vue'

import { useTicketStore } from '../stores/ticket.store.ts'

const router = useRouter()

const ticketStore = useTicketStore()

function goTicketCreatePage() {
  router.push({ name: 'tickets.create' })
}

async function handleDeleteTicket(ticketId: number) {
  const confirmed = window.confirm('Do you want to delete this ticket?')

  if (!confirmed) {
    return
  }

  await ticketStore.deleteTicket(ticketId)
}

onMounted(() => {
  ticketStore.loadTickets()
})
</script>

<template>
  <section>
    <h1>Tickets</h1>

    <TicketFilters />

    <button type="button" @click="goTicketCreatePage">Novo</button>

    <TicketTable @delete="handleDeleteTicket" />
  </section>
</template>
