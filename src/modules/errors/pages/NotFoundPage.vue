<template>
  <main class="not-found">
    <div class="card">
      <h1>404</h1>

      <h2>Página não encontrada</h2>

      <p>A página que você tentou acessar não existe ou foi removida.</p>

      <RouterLink to="/"> Voltar para início </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 60vh;

  display: flex;

  justify-content: center;

  align-items: center;
}

.card {
  background: white;

  padding: 40px;

  border-radius: 12px;

  box-shadow: var(--shadow);

  text-align: center;
}

h1 {
  font-size: 64px;

  margin: 0;

  color: var(--primary-color);
}

h2 {
  margin: 10px 0;

  color: var(--text-color);
}

p {
  color: var(--text-light);

  margin-bottom: 25px;
}

a {
  display: inline-block;

  background: var(--primary-color);

  color: white;

  padding: 10px 20px;

  border-radius: 8px;

  text-decoration: none;
}

a:hover {
  background: var(--primary-hover);
}
</style>
