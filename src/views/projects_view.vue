<script setup>
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/project_card.vue'
import { useProjects } from '@/composables/use_projects.js'
import { ref, computed } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const { projects } = useProjects()

const selectedCategory = ref('all')

const categoryFilters = [
  { id: 'all', label_key: 'projects.filters.all' },
  { id: 'web', label_key: 'projects.filters.web' },
  { id: 'mobile', label_key: 'projects.filters.mobile' },
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value
  }

  return projects.value.filter((project) => project.category === selectedCategory.value)
})
</script>

<template>
  <main class="container projects_page">
    <p class="projects_count">// {{ t('projects.count', projects.length) }}</p>
    <h1 id="projects_title">{{ t('projects.title') }}</h1>
    <p class="projects_description">
      {{ t('projects.description') }}
    </p>

    <div class="projects_filters" role="group" :aria-label="t('projects.filter_label')">
      <button
        v-for="filter in categoryFilters"
        :key="filter.id"
        class="projects_filter"
        :class="{ projects_filter_active: selectedCategory === filter.id }"
        type="button"
        :aria-pressed="selectedCategory === filter.id"
        @click="selectedCategory = filter.id"
      >
        {{ t(filter.label_key) }}
      </button>
    </div>

    <section class="projects" aria-labelledby="projects_title">
      <div class="projects_grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          layout="row"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.projects_page {
  padding-block: 5rem 5.625rem;

  h1 {
    margin: 0;
    font-size: clamp(2.25rem, 4.5vw, 3.25rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }

  .projects_count {
    margin: 0 0 1rem;
    color: var(--color-accent-ink);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  .projects_description {
    max-width: 35rem;
    margin: 0.75rem 0 2.5rem;
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.6;
  }
}

.projects_filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.projects_filter {
  min-height: 2.75rem;
  padding: 0.5rem 0.8125rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.71875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    border-color: var(--color-accent-ink);
  }

  &_active {
    border-color: var(--color-accent);
    background-color: var(--color-accent);
    color: var(--color-on-accent);
  }
}

.projects_grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

@media (max-width: 48rem) {
  .projects_page {
    padding-block: 2.5rem;
  }

  .projects_grid {
    grid-template-columns: 1fr;
  }
}
</style>
