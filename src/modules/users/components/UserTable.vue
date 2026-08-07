<script setup lang="ts">
import { formatRole } from '@/shared/utils/user'
import type { User } from '../types/user.type'

defineProps<{
  users: User[]
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Perfil</th>
        <th>Criado em</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id" class="user-row">
        <td class="name">
          {{ user.name }}
        </td>

        <td class="email">
          {{ user.email }}
        </td>

        <td>
          <span class="badge" :class="user.role.toLowerCase()">
            {{ formatRole(user.role) }}
          </span>
        </td>

        <td class="date">
          {{ new Date(user.createdAt).toLocaleDateString() }}
        </td>
      </tr>

      <tr v-if="!users.length">
        <td colspan="4" class="empty">Nenhum usuário encontrado.</td>
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
  padding: 16px;

  border-bottom: 1px solid #f0f2f5;

  vertical-align: middle;
}

.user-row {
  transition: background-color 0.15s ease;
}

.user-row:hover {
  background: #fafbfc;
}

.user-row:last-child td {
  border-bottom: none;
}

.name {
  font-weight: 600;
  color: var(--text-color);
}

.email {
  color: var(--text-color);
}

.date {
  color: var(--text-light);
  white-space: nowrap;
}

/* Badge */

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

/* Roles */

.admin {
  background: #dbeafe;
  color: #1d4ed8;
}

.agent {
  background: #dcfce7;
  color: #166534;
}

.requester {
  background: #fef3c7;
  color: #92400e;
}

/* Empty */

.empty {
  padding: 40px 20px;

  text-align: center;

  color: var(--text-light);
}
</style>
