<script setup lang="ts">
import { onMounted } from 'vue'

import { useUserStore } from '../stores/user.store'

import UserTable from '../components/UserTable.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <main class="users-page">
    <section class="page-header">
      <h1>Usuários</h1>

      <p>Usuários cadastrados no sistema</p>
    </section>

    <section class="table-card">
      <div v-if="userStore.loading">Carregando usuários...</div>

      <UserTable v-else :users="userStore.users" />
    </section>
  </main>
</template>

<style scoped>
.page-header h1 {
  margin: 0;

  color: var(--primary-color);
}

.page-header p {
  margin-top: 8px;

  color: var(--text-light);
}

.empty-card {
  background: white;

  padding: 40px;

  border-radius: 12px;

  box-shadow: var(--shadow);

  text-align: center;

  color: var(--text-light);
}
</style>
