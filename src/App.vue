<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">🏠 Домой</RouterLink>
      |
      <RouterLink to="/login">🔐 Логин</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>
header {
  margin-block: 20px;
}

nav {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
}
</style>
