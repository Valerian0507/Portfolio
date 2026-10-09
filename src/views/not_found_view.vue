<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <main class="container not_found">
    <p class="not_found_code">// 404</p>

    <h1>{{ t('not_found.title') }}</h1>

    <p class="not_found_description">
      {{ t('not_found.description') }}
    </p>

    <RouterLink class="not_found_link" :to="{ name: 'home' }">
      <ArrowLeft :size="16" aria-hidden="true" />
      {{ t('not_found.back_home') }}
    </RouterLink>
  </main>
</template>

<style scoped lang="scss">
.not_found {
  padding-block: 5rem;

  &_code {
    margin: 0 0 1rem;
    color: var(--color-accent-ink);
    font-family: var(--font-mono);
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
  }

  &_description {
    max-width: 32rem;
    margin: 1.5rem 0 2rem;
    color: var(--color-muted);
  }

  &_link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.625rem;
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    font-family: var(--font-mono);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
