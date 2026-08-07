<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/modules/users/stores/user.store'
import { formatStatus, formatPriority } from '@/shared/utils/ticket'
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

    <div v-else-if="ticketStore.selectedTicket" class="ticket-details">
      <section class="ticket-card">
        <div class="header">
          <div>
            <span class="ticket-id"> #{{ ticketStore.selectedTicket.id }} </span>

            <h1>
              {{ ticketStore.selectedTicket.title }}
            </h1>
          </div>

          <button
            class="btn-primary"
            @click="router.push(`/tickets/${ticketStore.selectedTicket.id}/edit`)"
          >
            Editar
          </button>
        </div>

        <div class="info-grid">
          <div class="info">
            <strong>Status</strong>

            <span class="badge status" :class="ticketStore.selectedTicket.status.toLowerCase()">
              {{ formatStatus(ticketStore.selectedTicket.status) }}
            </span>
          </div>

          <div class="info">
            <strong>Prioridade</strong>

            <span class="badge priority" :class="ticketStore.selectedTicket.priority.toLowerCase()">
              {{ formatPriority(ticketStore.selectedTicket.priority) }}
            </span>
          </div>

          <div class="info">
            <strong>Solicitante</strong>

            <span>
              {{ ticketStore.selectedTicket.createdBy.name }}
            </span>
          </div>

          <div class="info">
            <strong>Atualizado em</strong>

            <span>
              {{ new Date(ticketStore.selectedTicket.updatedAt).toLocaleString() }}
            </span>
          </div>
        </div>

        <p class="description">
          {{ ticketStore.selectedTicket.description }}
        </p>

        <div class="info">
          <strong>Responsável</strong>

          <select
            :value="ticketStore.selectedTicket.assignedTo?.id ?? ''"
            @change="handleAssignUser"
          >
            <option value="undefined">Não atribuído</option>

            <option v-for="user in userStore.users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
      </section>

      <section class="comments-card">
        <h2>Comentários</h2>

        <div v-if="ticketStore.selectedTicket.comments.length">
          <div
            v-for="comment in ticketStore.selectedTicket.comments"
            :key="comment.id"
            class="comment"
          >
            <p>
              {{ comment.content }}
            </p>

            <small>
              <strong>
                {{ comment.user.name }}
              </strong>

              •

              {{ new Date(comment.createdAt).toLocaleString() }}
            </small>
          </div>
        </div>

        <p v-else>Nenhum comentário cadastrado.</p>

        <h3>Novo comentário</h3>

        <textarea v-model="newComment" rows="4" placeholder="Digite um comentário..." />

        <button type="button" class="btn-primary" @click="handleAddComment">
          Adicionar comentário
        </button>
      </section>
    </div>
  </section>
</template>

<style scoped>
.ticket-details {
  display: flex;

  flex-direction: column;

  gap: 25px;
}

.ticket-card,
.comments-card {
  background: white;

  padding: 30px;

  border-radius: 12px;

  box-shadow: var(--shadow);
}

.header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.ticket-id {
  color: var(--text-light);

  font-size: 14px;
}

h1 {
  margin: 8px 0;

  color: var(--primary-color);
}

.description {
  margin: 25px 0;

  color: var(--text-color);

  line-height: 1.6;
}

.info-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
}

.info {
  display: flex;

  flex-direction: column;
  padding-bottom: 20px;
  gap: 6px;
}

.info strong {
  font-size: 14px;

  color: var(--text-light);
}

select,
textarea {
  padding: 12px;

  border: 1px solid var(--border-color);

  border-radius: 8px;
}

.comments-card h2 {
  margin-top: 0;
}

.comment {
  background: var(--background-color);

  padding: 15px;

  border-radius: 10px;

  margin-bottom: 15px;
}

.comment p {
  margin: 0 0 10px;
}

.comment small {
  color: var(--text-light);
}

.comments-card textarea {
  width: 100%;

  margin: 15px 0;

  resize: vertical;
}

.btn-primary {
  background: var(--primary-color);

  color: white;

  border: none;

  padding: 10px 20px;

  border-radius: 8px;

  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.badge {
  padding: 5px 10px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 600;

  width: fit-content;
}

/* STATUS */

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

/* PRIORIDADE */

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
</style>
