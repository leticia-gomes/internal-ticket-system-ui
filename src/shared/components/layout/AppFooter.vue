<template>
  <footer class="footer">
    <span>
      © {{ new Date().getFullYear() }} Global Sonic - Internal Ticket System | @ Letícia Gomes
      Ribeiro
    </span>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;

  justify-content: center;

  align-items: center;

  height: 50px;

  background: white;

  border-top: 1px solid var(--border-color);

  color: var(--text-light);

  font-size: 14px;
}
</style>
