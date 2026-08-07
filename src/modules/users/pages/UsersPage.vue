<template>
  <main class="users-page">
    <section class="page-header">
      <div>
        <h1>Usuários</h1>

        <p>Gerencie os usuários do sistema.</p>
      </div>
    </section>

    <section class="empty-card">
      <p>Módulo de usuários em desenvolvimento.</p>
    </section>
  </main>
</template>

<style scoped>
.users-page {
  display: flex;

  flex-direction: column;

  gap: 25px;
}

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
