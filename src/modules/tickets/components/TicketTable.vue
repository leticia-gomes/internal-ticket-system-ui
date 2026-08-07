<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useTicketStore } from '../stores/ticket.store'
import { formatPriority, formatStatus } from '@/shared/utils/ticket'

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
        <td>#{{ ticket.id }}</td>

        <td class="title">
          {{ ticket.title }}
        </td>

        <td>
          <span class="badge status" :class="ticket.status.toLowerCase()">
            {{ formatStatus(ticket.status) }}
          </span>
        </td>

        <td>
          <span class="badge priority" :class="ticket.priority.toLowerCase()">
            {{ formatPriority(ticket.priority) }}
          </span>
        </td>

        <td>
          {{ ticket.assignedTo?.name ?? '-' }}
        </td>

        <td>
          {{ formatDate(ticket.updatedAt) }}
        </td>

        <td class="actions">
          <RouterLink :to="`/tickets/${ticket.id}`" class="action view"> Ver </RouterLink>

          <RouterLink :to="`/tickets/${ticket.id}/edit`" class="action edit"> Editar </RouterLink>

          <button type="button" class="action delete" @click="emit('delete', ticket.id)">
            Excluir
          </button>
        </td>
      </tr>

      <tr v-if="!ticketStore.loading && !ticketStore.tickets.length">
        <td colspan="6" class="empty">Nenhum ticket encontrado.</td>
      </tr>

      <tr v-if="ticketStore.loading">
        <td colspan="6" class="empty">Carregando tickets...</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.title {
  font-weight: 600;
  color: var(--text-color);
}
.badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.status.open {
  background: #dbeafe;
  color: #1d4ed8;
}
.status.in_progress {
  background: #fef3c7;
  color: #92400e;
}
.status.resolved {
  background: #dcfce7;
  color: #166534;
}
.status.closed {
  background: #e5e7eb;
  color: #374151;
}
.priority.low {
  background: #dcfce7;
  color: #166534;
}
.priority.medium {
  background: #fef3c7;
  color: #92400e;
}
.priority.high {
  background: #fed7aa;
  color: #9a3412;
}
.priority.urgent {
  background: #fee2e2;
  color: #991b1b;
}
.actions {
  display: flex;
  gap: 8px;
}
.action {
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
}
.view {
  background: #e0f2fe;
  color: #0369a1;
}
.edit {
  background: #fef3c7;
  color: #92400e;
}
.delete {
  background: #fee2e2;
  color: #991b1b;
}
.empty {
  text-align: center;
  padding: 30px;
  color: var(--text-light);
}
</style>
