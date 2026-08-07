<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/modules/users/stores/user.store'

import { useTicketStore } from '../stores/ticket.store'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const ticketStore = useTicketStore()
const userStore = useUserStore()
const newComment = ref('')

async function handleAssignUser(event: Event) {
  const assignedToId = Number((event.target as HTMLSelectElement).value)

  await ticketStore.assignUser(ticketStore.selectedTicket!.id, assignedToId)
}

async function handleAddComment() {
  if (!newComment.value.trim()) {
    return
  }

  await ticketStore.addComment(ticketStore.selectedTicket!.id, newComment.value)

  newComment.value = ''
}

onMounted(() => {
  const id = Number(route.params.id)

  userStore.fetchUsers()

  ticketStore.loadTicket(id)
})
</script>

<template>
  <section>
    <div v-if="ticketStore.loading">Loading ticket...</div>

    <div v-else-if="ticketStore.selectedTicket">
      <div>
        <button @click="router.push(`/tickets/${ticketStore.selectedTicket.id}/edit`)">
          Editar
        </button>
      </div>

      <p>#{{ ticketStore.selectedTicket.id }}</p>

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
        <strong>Prioridade:</strong>
        {{ ticketStore.selectedTicket.priority }}
      </div>

      <div>
        <strong>Solicitante:</strong>
        {{ ticketStore.selectedTicket.createdBy.name }}
      </div>

      <div>
        <strong>Responsável:</strong>

        <select :value="ticketStore.selectedTicket.assignedTo?.id ?? ''" @change="handleAssignUser">
          <option value="undefined">Não atribuído</option>

          <option v-for="user in userStore.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div>
        <strong>Atualizado em:</strong>

        {{ new Date(ticketStore.selectedTicket.updatedAt).toLocaleString() }}
      </div>

      <hr />

      <h2>Comentários</h2>

      <div v-if="ticketStore.selectedTicket.comments.length" class="comments">
        <div
          v-for="comment in ticketStore.selectedTicket.comments"
          :key="comment.id"
          class="comment"
        >
          <p>{{ comment.content }}</p>

          <small>
            <strong>{{ comment.user.name }}</strong>

            •

            {{ new Date(comment.createdAt).toLocaleString() }}
          </small>

          <hr />
        </div>
      </div>

      <p v-else>Nenhum comentário cadastrado.</p>

      <h3>Novo comentário</h3>

      <textarea v-model="newComment" rows="4" placeholder="Digite um comentário..." />

      <br />

      <button type="button" @click="handleAddComment">Adicionar comentário</button>
    </div>
  </section>
</template>
