<template>
  <main class="auth-layout">
    <RouterView />
  </main>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background: var(--background-color);

  padding: 20px;
}
</style>
