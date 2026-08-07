<script setup lang="ts">
import { reactive } from 'vue'

import { useTicketStore } from '../stores/ticket.store'

import type { Ticket } from '../types/ticket.type'
import type { UpdateTicketRequest } from '../types/update-ticket-request.type'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  saved: []
}>()

const ticketStore = useTicketStore()

const form = reactive<UpdateTicketRequest>({
  title: props.ticket.title,

  description: props.ticket.description,

  status: props.ticket.status,

  priority: props.ticket.priority,

  assignedToId: props.ticket.assignedTo?.id ?? null,
})

async function submit() {
  await ticketStore.updateTicket(props.ticket.id, form)

  emit('saved')
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label> Descrição </label>

      <textarea v-model="form.description" placeholder="Descreva o problema ou solicitação" />
    </div>

    <div class="field">
      <label> Status </label>

      <select v-model="form.status">
        <option value="OPEN">Aberto</option>

        <option value="IN_PROGRESS">Em andamento</option>

        <option value="RESOLVED">Resolvido</option>

        <option value="CLOSED">Fechado</option>
      </select>
    </div>

    <div class="field">
      <label> Prioridade </label>

      <select v-model="form.priority">
        <option value="LOW">Baixa</option>

        <option value="MEDIUM">Média</option>

        <option value="HIGH">Alta</option>

        <option value="URGENT">Urgente</option>
      </select>
    </div>

    <button class="btn-primary">Salvar</button>
  </form>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}
textarea {
  min-height: 120px;
  resize: vertical;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
}
select {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: white;
}
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
}
.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--primary-hover);
}
</style>
