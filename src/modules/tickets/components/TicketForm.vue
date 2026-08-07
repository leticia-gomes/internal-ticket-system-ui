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
    <input v-model="form.title" />

    <textarea v-model="form.description" />

    <select v-model="form.status">
      <option value="OPEN">OPEN</option>

      <option value="IN_PROGRESS">IN_PROGRESS</option>

      <option value="RESOLVED">RESOLVED</option>

      <option value="CLOSED">CLOSED</option>
    </select>

    <select v-model="form.priority">
      <option value="LOW">LOW</option>

      <option value="MEDIUM">MEDIUM</option>

      <option value="HIGH">HIGH</option>

      <option value="URGENT">URGENT</option>
    </select>

    <button>Save</button>
  </form>
</template>
