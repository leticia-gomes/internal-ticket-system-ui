<template>
  <main class="dashboard">
    <section class="welcome">
      <h1>Dashboard</h1>

      <p>
        Bem-vindo ao Internal Ticket System. Gerencie seus chamados de forma simples e organizada.
      </p>
    </section>

    <section class="cards">
      <div class="card">
        <span>Tickets</span>
        <strong>-</strong>
      </div>

      <div class="card">
        <span>Pendentes</span>
        <strong>-</strong>
      </div>

      <div class="card">
        <span>Resolvidos</span>
        <strong>-</strong>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  display: flex;

  flex-direction: column;

  gap: 30px;
}

.welcome {
  background: white;

  padding: 30px;

  border-radius: 12px;

  box-shadow: var(--shadow);
}

h1 {
  margin: 0;

  color: var(--primary-color);
}

p {
  color: var(--text-light);

  margin-top: 10px;
}

.cards {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;
}

.card {
  background: white;

  padding: 25px;

  border-radius: 12px;

  box-shadow: var(--shadow);

  display: flex;

  flex-direction: column;

  gap: 10px;
}

.card span {
  color: var(--text-light);

  font-size: 14px;
}

.card strong {
  font-size: 30px;

  color: var(--primary-color);
}
</style>
