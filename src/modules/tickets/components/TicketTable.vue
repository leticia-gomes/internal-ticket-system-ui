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
        <th>Última atualização</th>
        <th>Ação</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="ticket in ticketStore.tickets" :key="ticket.id" class="ticket-row">
        <td class="ticket-id">#{{ ticket.id }}</td>

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

        <td class="assigned">
          {{ ticket.assignedTo?.name ?? 'Não atribuído' }}
        </td>

        <td class="date">
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
        <td colspan="7" class="empty">Nenhum ticket encontrado.</td>
      </tr>

      <tr v-if="ticketStore.loading">
        <td colspan="7" class="empty">Carregando tickets...</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
}

thead {
  background: #f8fafc;
}

th {
  padding: 14px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-light);
  border-bottom: 1px solid var(--border-color);
}

td {
  padding: 16px 0;
  border-bottom: 1px solid #f0f2f5;
  vertical-align: middle;
}

.ticket-row {
  transition: background-color 0.15s ease;
}

.ticket-row:hover {
  background: #fafbfc;
}

.ticket-row:last-child td {
  border-bottom: none;
}

.ticket-id {
  color: var(--text-light);
  font-weight: 600;
  white-space: nowrap;
}

.title {
  max-width: 280px;
  font-weight: 600;
  color: var(--text-color);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.assigned {
  color: var(--text-color);
}

.date {
  color: var(--text-light);
  white-space: nowrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px 10px;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;

  white-space: nowrap;
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
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.action {
  border: none;
  padding: 7px 10px;

  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;

  text-decoration: none;
  cursor: pointer;

  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.action:hover {
  transform: translateY(-1px);
}

.view {
  background: #eff6ff;
  color: #2563eb;
}

.view:hover {
  background: #dbeafe;
}

.edit {
  background: #fef3c7;
  color: #92400e;
}

.edit:hover {
  background: #fde68a;
}

.delete {
  background: #fef2f2;
  color: #dc2626;
}

.delete:hover {
  background: #fee2e2;
}

.empty {
  padding: 40px 20px;
  text-align: center;
  color: var(--text-light);
}
</style>
