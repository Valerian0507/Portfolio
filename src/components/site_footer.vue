<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowUp } from '@lucide/vue'

const { t } = useI18n({ useScope: 'global' })

const currentYear = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <footer class="footer">
    <div class="container footer_content">
      <p class="footer_copyright">
        © {{ currentYear }} Oleksii Chahinian. {{ t('footer.rights') }}
      </p>

      <button class="footer_top" type="button" @click="scrollToTop">
        {{ t('footer.top') }}
        <ArrowUp :size="14" aria-hidden="true" />
      </button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding-block: 1.5rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.71875rem;

  &_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &_copyright {
    margin: 0;
  }

  &_top {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    min-height: 2.75rem;
    padding: 0.5rem;
    border: 0;
    background-color: transparent;
    color: inherit;
    cursor: pointer;

    &:hover {
      color: var(--color-text);
    }
  }
}

@media (max-width: 40rem) {
  .footer_content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
