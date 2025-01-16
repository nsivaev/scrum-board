<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
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
  justify-content: center;
  gap: 10px;
}
</style>
