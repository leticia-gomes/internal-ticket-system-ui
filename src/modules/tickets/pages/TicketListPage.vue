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
  <main class="tickets-page">
    <section class="page-header">
      <div>
        <h1>Tickets</h1>

        <p>Gerencie os chamados do sistema</p>
      </div>

      <button type="button" class="btn-primary" @click="goTicketCreatePage">+ Novo Ticket</button>
    </section>

    <TicketFilters />

    <section class="table-card">
      <TicketTable @delete="handleDeleteTicket" />
    </section>
  </main>
</template>

<style scoped>
.tickets-page {
  flex-direction: column;

  gap: 25px;
}

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

h1 {
  margin: 0;

  color: var(--primary-color);
}

.page-header p {
  margin: 5px 0 0;

  color: var(--text-light);
}

.table-card {
  background: white;

  padding: 20px;

  border-radius: 12px;

  box-shadow: var(--shadow);
}

.btn-primary {
  background: var(--primary-color);

  color: white;

  border: none;

  padding: 12px 20px;

  border-radius: 8px;

  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-hover);
}
</style>
