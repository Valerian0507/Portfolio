<script setup>
  import {RouterLink} from 'vue-router'
</script>

<template>
  <header>
    <nav class="container" aria-label="Navigation principale">
      <RouterLink to="/">Oleksii Chahinian</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
      <RouterLink to="/projects">Projets</RouterLink>
      <RouterLink to="/skills">Compétences</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>
  </header>
</template>
