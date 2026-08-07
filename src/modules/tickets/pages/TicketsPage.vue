<script setup lang="ts">
import { onMounted } from 'vue'

import TicketFilters from '../components/TicketFilters.vue'
import TicketTable from '../components/TicketTable.vue'

import { useTicketStore } from '../stores/ticket.store'

const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.loadTickets()
})
</script>

<template>
  <section>
    <h1>Tickets</h1>

    <TicketFilters />

    <TicketTable />
  </section>
</template>
