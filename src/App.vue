<script setup>
  import { RouterView } from 'vue-router'
  import SiteNavbar from '@/components/site_navbar.vue'
  import SiteFooter from '@/components/site_footer.vue'
</script>

<template>
  <SiteNavbar />
  <RouterView />
  <SiteFooter />
</template>

<style scoped></style>
