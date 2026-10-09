<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { ArrowRight } from '@lucide/vue'
import { computed } from 'vue'
import { useTheme } from '@/composables/use_theme.js'
import phpIcon from '@/assets/icons/technologies/php.svg'
import symfonyLightIcon from '@/assets/icons/technologies/symfonylight.svg'
import symfonyDarkIcon from '@/assets/icons/technologies/symfonydark.svg'
import doctrineIcon from '@/assets/icons/technologies/doctrine.svg'
import mysqlIcon from '@/assets/icons/technologies/mysql.svg'
import stripeWhiteIcon from '@/assets/icons/technologies/stripe.svg'
import stripePurpleIcon from '@/assets/icons/technologies/stripe_purple.svg'
import reactNativeIcon from '@/assets/icons/technologies/reactnative.svg'
import dockerIcon from '@/assets/icons/technologies/docker.svg'

const { t } = useI18n({ useScope: 'global' })

const { isDark } = useTheme()
const technologyIcons = computed(() => ({
  PHP: phpIcon,
  Symfony: isDark.value ? symfonyLightIcon : symfonyDarkIcon,
  Doctrine: doctrineIcon,
  MySQL: mysqlIcon,
  Stripe: isDark.value ? stripeWhiteIcon : stripePurpleIcon,
  'React Native': reactNativeIcon,
  Docker: dockerIcon,
}))

defineProps({
  project: {
    type: Object,
    required: true,
  },
  layout: {
    type: String,
    default: 'card',
  },
  headingTag: {
    type: String,
    default: null,
    validator: (value) => ['h2', 'h3'].includes(value),
  },
})
</script>

<template>
  <component
    :is="layout === 'row' ? RouterLink : 'article'"
    :to="layout === 'row' ? { name: 'project', params: { id: project.id } } : undefined"
    class="project_card"
    :class="{ project_card_row: layout === 'row' }"
  >
    <span v-if="layout === 'row'" class="project_card_number">
      {{ project.number }}
    </span>

    <component :is="headingTag || (layout === 'row' ? 'h2' : 'h3')" class="project_card_title">
      {{ project.title }}
    </component>

    <div class="project_card_content">
      <p class="project_card_description">{{ project.description }}</p>

      <ul class="project_card_technologies" :aria-label="t('project.technologies')">
        <li
          v-for="technology in project.technologies"
          :key="technology"
          class="project_card_technology"
          :title="technology"
        >
          <img
            :src="technologyIcons[technology]"
            :alt="technology"
            :class="{ project_card_icon_mysql: technology === 'MySQL' }"
            width="32"
            height="32"
          />
        </li>
      </ul>
    </div>

    <div v-if="layout === 'row'" class="project_card_meta">
      <span class="project_card_category">
        {{ t(`project.categories.${project.category}`) }}
      </span>
      <span class="project_card_link" aria-hidden="true">
        <ArrowRight :size="18" />
      </span>
    </div>
  </component>
</template>

<style scoped lang="scss">
.project_card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background-color: var(--color-surface);

  &_row {
    display: grid;
    grid-template-columns: 2.875rem minmax(0, 1.3fr) minmax(0, 2fr) max-content;
    align-items: baseline;
    gap: 1.625rem;
    padding: 1.375rem 1rem;
    border: 0;
    border-top: 1px solid var(--color-border);
    border-radius: 0;
    background-color: transparent;
    color: var(--color-text);
    text-decoration: none;

    &:hover {
      background-color: var(--color-surface);
      box-shadow: inset 3px 0 0 var(--color-accent);
    }

    &:hover .project_card_link,
    &:focus-visible .project_card_link {
      color: var(--color-accent-ink);
    }

    &:last-child {
      border-bottom: 1px solid var(--color-border);
    }

    .project_card_description {
      margin: 0;
      font-size: 0.9375rem;
    }

    .project_card_technologies {
      margin: 0.75rem 0 0;
    }
  }

  &_title {
    min-width: 0;
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
  }

  &_content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  &_number {
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }

  &_meta {
    display: inline-flex;
    align-items: center;
    justify-self: end;
    align-self: start;
    gap: 1rem;
    white-space: nowrap;
  }

  &_link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.75rem;
    height: 1.625rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    color: var(--color-muted);
    text-decoration: none;

    &:hover {
      color: var(--color-accent-ink);
    }
  }

  &_category {
    justify-self: start;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0.375rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  &_description {
    margin-block: 1rem 1.5rem;
    color: var(--color-muted);
  }

  &_technologies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: auto 0 0;
    padding: 0;
    list-style: none;
  }

  &_technology {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;

    img {
      display: block;
      width: 1.75rem;
      height: 1.75rem;
      object-fit: contain;

      &.project_card_icon_mysql {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
  }
}

@media (max-width: 64rem) {
  .project_card_row {
    grid-template-columns: 2.875rem minmax(0, 1fr) max-content;
    gap: 0.75rem 1rem;

    .project_card_number {
      grid-column: 1;
      grid-row: 1;
    }

    .project_card_title {
      grid-column: 2;
      grid-row: 1;
    }

    .project_card_content {
      grid-column: 2 / -1;
      grid-row: 2;
    }

    .project_card_meta {
      grid-column: 3;
      grid-row: 1;
    }
  }
}

@media (max-width: 40rem) {
  .project_card_row {
    grid-template-columns: 1.5rem minmax(0, 1fr) max-content;
    column-gap: 0.75rem;
    padding-inline: 0;

    .project_card_content {
      grid-column: 1 / -1;
    }

    .project_card_meta {
      align-items: flex-start;
      gap: 0.5rem;
    }

    .project_card_category {
      max-width: 6rem;
      white-space: normal;
    }

    .project_card_link {
      width: 1.5rem;
    }
  }
}
</style>

@media (max-width: 22.5rem) { .project_card_row .project_card_title { font-size: 1.125rem;
line-height: 1.625rem; } }
