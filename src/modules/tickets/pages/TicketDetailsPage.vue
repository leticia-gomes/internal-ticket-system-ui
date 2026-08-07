<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useTicketStore } from '../stores/ticket.store'

const route = useRoute()

const ticketStore = useTicketStore()

onMounted(() => {
  const id = Number(route.params.id)

  ticketStore.loadTicket(id)
})
</script>

<template>
  <section>
    <div v-if="ticketStore.loading">Loading ticket...</div>

    <div v-else-if="ticketStore.selectedTicket">
      <h1>
        {{ ticketStore.selectedTicket.title }}
      </h1>

      <p>
        {{ ticketStore.selectedTicket.description }}
      </p>

      <div>
        <strong>Status:</strong>

        {{ ticketStore.selectedTicket.status }}
      </div>

      <div>
        <strong>Priority:</strong>

        {{ ticketStore.selectedTicket.priority }}
      </div>

      <div>
        <strong>Created by:</strong>

        {{ ticketStore.selectedTicket.createdBy.name }}
      </div>

      <div>
        <strong>Assigned to:</strong>

        {{ ticketStore.selectedTicket.assignedTo?.name ?? '-' }}
      </div>

      <div>
        <strong>Updated at:</strong>

        {{ new Date(ticketStore.selectedTicket.updatedAt).toLocaleString() }}
      </div>
    </div>
  </section>
</template>
