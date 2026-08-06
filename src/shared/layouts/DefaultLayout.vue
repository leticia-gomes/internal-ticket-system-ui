<script setup lang="ts">
import AppHeader from '@/shared/components/layout/AppHeader.vue'
// import AppSidebar from '@/shared/components/layout/AppSidebar.vue'
// import AppFooter from '@/shared/components/layout/AppFooter.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />

    <div class="content-wrapper">
      <!-- <AppSidebar /> -->

      <main class="main-content">
        <RouterView />
      </main>
    </div>

    <!-- <AppFooter /> -->
  </div>
</template>
