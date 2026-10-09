<script setup>
import { RouterView } from 'vue-router'
import SiteNavbar from '@/components/site_navbar.vue'
import SiteFooter from '@/components/site_footer.vue'
import { useSeo } from '@/composables/use_seo.js'

useSeo()
</script>

<template>
  <SiteNavbar />
  <RouterView />
  <SiteFooter />
</template>

<style scoped></style>
