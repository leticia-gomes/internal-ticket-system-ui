<script setup lang="ts">
import { watch } from 'vue'

import { useTicketStore } from '../stores/ticket.store'
import { formatPriority, formatStatus } from '@/shared/utils/ticket'

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
    <div class="filters">
      <div class="field">
        <label>Status</label>

        <select v-model="ticketStore.filters.status">
          <option value="">Todos status</option>

          <option v-for="status in statuses" :key="status" :value="status">
            {{ formatStatus(status) }}
          </option>
        </select>
      </div>

      <div class="field">
        <label>Prioridade</label>

        <select v-model="ticketStore.filters.priority">
          <option value="">Todas propriedades</option>

          <option v-for="priority in priorities" :key="priority" :value="priority">
            {{ formatPriority(priority) }}
          </option>
        </select>
      </div>

      <button type="button" class="clear-button" @click="clearFilters">Limpar</button>
    </div>
  </section>
</template>

<style scoped>
.filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: end;
  gap: 20px;
  margin-bottom: 25px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
label {
  font-size: 14px;
  color: var(--text-light);
}
select {
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: white;
  min-width: 180px;
}
.clear-button {
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 8px;
  background: #e5e7eb;
  cursor: pointer;
}
.clear-button:hover {
  background: #d1d5db;
}
</style>
