<script setup>
  function scrollToTop() {
    window.scrollTo(0, 0)
  }
</script>

<template>
  <footer class="container">
      <p>© 2026 Oleksii Chahinian. Tous droits réservés.</p>
      <button type="button" @click="scrollToTop">
        Retour en haut
      </button>
  </footer>
</template>
