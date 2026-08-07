<template>
  <aside class="sidebar">
    <div class="logo">Global Sonic</div>

    <nav>
      <RouterLink to="/tickets"> 🎫 Tickets </RouterLink>

      <RouterLink to="/users"> 👥 Usuários </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 230px;
  min-width: 230px;

  min-height: 100vh;

  background: var(--primary-color);

  padding: 25px;

  color: white;

  box-sizing: border-box;
}

.logo {
  font-size: 22px;

  font-weight: 700;

  margin-bottom: 40px;
}

nav {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

nav a {
  color: white;

  text-decoration: none;

  padding: 12px 15px;

  border-radius: 8px;

  transition: 0.2s;
}

nav a:hover,
nav a.router-link-active {
  background: rgba(255, 255, 255, 0.15);
}
</style>
