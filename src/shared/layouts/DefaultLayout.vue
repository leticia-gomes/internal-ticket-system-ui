<script setup lang="ts">
import AppHeader from '@/shared/components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />

    <div class="content">
      <AppHeader />

      <main>
        <RouterView />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--background-color);
}

/* menu lateral */

.sidebar {
  width: 230px;

  background: var(--primary-color);

  color: white;

  padding: 24px;
}

.logo {
  font-size: 22px;
  font-weight: 700;

  margin-bottom: 40px;
}

nav a {
  display: flex;

  align-items: center;

  padding: 12px 14px;

  color: white;

  text-decoration: none;

  border-radius: 8px;

  transition: 0.2s;
}

nav a:hover,
nav a.router-link-active {
  background: rgba(255, 255, 255, 0.15);
}

/* área direita */

.content {
  flex: 1;
}

/* conteúdo */

main {
  padding: 30px;
}
</style>
