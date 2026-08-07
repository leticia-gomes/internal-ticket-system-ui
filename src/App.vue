<script setup lang="ts">
import { onMounted } from 'vue'

import { useTicketStore } from '@/modules/tickets/stores/ticket.store'
import socket from '@/shared/socket/socket'

const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.listenSocket()

  if (!socket.connected) {
    socket.connect()
  }
})
</script>

<template>
  <RouterView />
</template>
