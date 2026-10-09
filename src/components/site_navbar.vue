<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Moon, Sun, Languages, ArrowDown } from '@lucide/vue'
import { useTheme } from '@/composables/use_theme.js'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

function toggleLanguage() {
  locale.value = locale.value === 'fr' ? 'en' : 'fr'
}

const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const cvUrl = `${import.meta.env.BASE_URL}cv_oleksii_chahinian.pdf`
</script>

<template>
  <header class="navbar_header">
    <nav class="container navbar" :aria-label="t('nav.navigation')">
      <RouterLink class="navbar_logo" to="/" :aria-label="t('nav.logo')">
        <span class="navbar_mark" aria-hidden="true"></span>
        <span>oleksii<span class="navbar_logo_suffix">.chahinian</span></span>
      </RouterLink>

      <div class="navbar_links">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/projects" :class="{ navbar_link_active: route.name === 'project' }">{{
          t('nav.projects')
        }}</RouterLink>
        <RouterLink to="/skills">{{ t('nav.stack') }}</RouterLink>
        <RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink>
      </div>

      <div class="navbar_actions">
        <button
          type="button"
          :aria-label="t(isDark ? 'nav.light_theme' : 'nav.dark_theme')"
          :title="t(isDark ? 'nav.light_theme' : 'nav.dark_theme')"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="18" aria-hidden="true" />
          <Moon v-else :size="18" aria-hidden="true" />
        </button>

        <button
          type="button"
          :aria-label="t('nav.switch_language')"
          :title="t('nav.switch_language')"
          @click="toggleLanguage"
        >
          <Languages :size="18" aria-hidden="true" />
        </button>

        <a
          class="navbar_cv"
          :href="cvUrl"
          download="CV_Oleksii_Chahinian.pdf"
          :aria-label="t('nav.download_cv')"
          :title="t('nav.download_cv')"
        >
          <span>CV</span>
          <ArrowDown :size="16" aria-hidden="true" />
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.navbar_header {
  --navbar_border: var(--color-border);
  --navbar_muted: var(--color-muted);
  --navbar_hover: var(--color-surface);

  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--navbar_border);
  background-color: var(--color-background);

  @supports (backdrop-filter: blur(12px)) {
    background-color: color-mix(in srgb, var(--color-background) 82%, transparent);
    backdrop-filter: blur(12px);
  }
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-block: 0.8125rem;
  font-family: var(--font-mono);

  &_logo {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    min-height: 2.75rem;
    color: var(--color-text);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      color: var(--color-accent-ink);
    }
  }

  &_logo_suffix {
    color: var(--navbar_muted);
  }

  &_mark {
    width: 0.5625rem;
    height: 0.5625rem;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--color-accent);
  }

  &_links {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a {
      position: relative;
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      color: var(--navbar_muted);
      font-size: 0.75rem;
      line-height: 1.4;
      letter-spacing: 0.06em;
      text-decoration: none;
      text-transform: uppercase;
      white-space: nowrap;
      transition: color 150ms ease;

      &::after {
        position: absolute;
        inset-inline: 0;
        bottom: 0.375rem;
        height: 1px;
        background-color: currentColor;
        opacity: 0;
        content: '';
      }

      &:hover {
        color: var(--color-text);
      }

      &.router-link-exact-active,
      &.navbar_link_active {
        color: var(--color-accent-ink);

        &::after {
          opacity: 1;
        }
      }
    }
  }

  &_actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;

    button,
    .navbar_cv {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-width: 2.75rem;
      min-height: 2.75rem;
      padding: 0.5rem;
      border: 1px solid var(--navbar_border);
      border-radius: 0.5625rem;
      background-color: transparent;
      color: var(--color-text);
      font-family: inherit;
      line-height: 1;
      text-decoration: none;
      cursor: pointer;
      transition:
        color 150ms ease,
        border-color 150ms ease,
        background-color 150ms ease;

      &:hover {
        border-color: var(--color-accent-ink);
        background-color: var(--navbar_hover);
        color: var(--color-accent-ink);
      }
    }

    .navbar_cv {
      padding-inline: 0.875rem;
      border-color: var(--color-accent-ink);
      color: var(--color-accent-ink);
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;

      &:hover {
        background-color: var(--color-accent);
        color: var(--color-on-accent);
      }
    }
  }
}

@media (max-width: 58rem) {
  .navbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.375rem 1rem;

    &_links {
      grid-column: 1 / -1;
      grid-row: 2;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0 1.25rem;
    }
  }
}

@media (max-width: 34rem) {
  .navbar {
    padding-block: 0.625rem;

    &_logo_suffix {
      display: none;
    }

    &_links {
      gap: 0 0.75rem;

      a {
        letter-spacing: 0.03em;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar_links a,
  .navbar_actions button,
  .navbar_actions .navbar_cv {
    transition: none;
  }
}
</style>
