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

onMounted(() => {
  ticketStore.loadTickets()
})
</script>

<template>
  <section>
    <h1>Tickets</h1>

    <TicketFilters />

    <button type="button" @click="goTicketCreatePage">Novo</button>

    <TicketTable />
  </section>
</template>
