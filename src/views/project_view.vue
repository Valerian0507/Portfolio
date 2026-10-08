<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from '@lucide/vue'
import ProjectGallery from '@/components/project_gallery.vue'
import { projects } from '@/data/projects.js'

const route = useRoute()
const projectIndex = computed(() => projects.findIndex((entry) => entry.id === route.params.id))
const project = computed(() => projects[projectIndex.value])
const previousProject = computed(() => projects[projectIndex.value - 1])
const nextProject = computed(() =>
  projectIndex.value >= 0 ? projects[projectIndex.value + 1] : undefined,
)
const categoryLabels = { web: 'Application web', mobile: 'Application mobile' }
</script>

<template>
  <main class="project_page">
    <template v-if="project">
      <div class="container project_back_container">
        <RouterLink class="project_back" to="/projects">
          <ArrowLeft :size="14" aria-hidden="true" />
          Tous les projets
        </RouterLink>
      </div>

      <header class="container project_hero">
        <p class="project_kicker">
          {{ project.number }} · {{ categoryLabels[project.category] }}
          <template v-if="project.year"> · {{ project.year }}</template>
        </p>
        <h1>{{ project.title }}</h1>
        <p class="project_description">{{ project.description }}</p>
        <div class="project_actions">
          <a
            v-if="project.demoUrl"
            class="project_button project_button_primary"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le projet <ArrowUpRight :size="16" aria-hidden="true" />
          </a>
          <button
            v-else
            class="project_button project_button_primary"
            type="button"
            title="Lien de démonstration à venir"
            disabled
          >
            Voir le projet <ArrowUpRight :size="16" aria-hidden="true" />
          </button>
          <a
            v-if="project.sourceUrl"
            class="project_button"
            :href="project.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code source <ArrowUpRight :size="16" aria-hidden="true" />
          </a>
          <button
            v-else
            class="project_button"
            type="button"
            title="Lien du code source à venir"
            disabled
          >
            Code source <ArrowUpRight :size="16" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div class="project_metadata_section">
        <dl class="container project_metadata">
          <div>
            <dt>Rôle</dt>
            <dd>{{ project.role || '—' }}</dd>
          </div>
          <div>
            <dt>Année</dt>
            <dd>{{ project.year || '—' }}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{{ categoryLabels[project.category] }}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{{ project.technologies.join(' · ') }}</dd>
          </div>
        </dl>
      </div>

      <section class="project_section" aria-labelledby="project_overview_title">
        <div class="container project_section_content">
          <h2 id="project_overview_title" class="project_section_title">01 / PRÉSENTATION</h2>
          <p class="project_overview">{{ project.overview || project.description }}</p>
        </div>
      </section>

      <section
        v-if="project.highlights?.length"
        class="project_section"
        aria-labelledby="project_highlights_title"
      >
        <div class="container project_section_content">
          <h2 id="project_highlights_title" class="project_section_title">02 / RÉALISATIONS</h2>
          <ul class="project_highlights">
            <li v-for="highlight in project.highlights" :key="highlight">
              <ChevronRight :size="18" aria-hidden="true" />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="project_section" aria-labelledby="project_stack_title">
        <div class="container project_section_content">
          <h2 id="project_stack_title" class="project_section_title">03 / STACK</h2>
          <ul class="project_technologies">
            <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
          </ul>
        </div>
      </section>

      <section class="project_section" aria-labelledby="project_screenshots_title">
        <div class="container project_section_content">
          <h2 id="project_screenshots_title" class="project_section_title">
            04 / CAPTURES D’ÉCRAN
          </h2>
          <ProjectGallery
            :key="project.id"
            :screenshots="project.screenshots || []"
            :mobile="project.category === 'mobile'"
          />
        </div>
      </section>

      <nav class="project_navigation" aria-label="Autres projets">
        <div class="container project_navigation_content">
          <RouterLink
            v-if="previousProject"
            class="project_navigation_link"
            :to="{ name: 'project', params: { id: previousProject.id } }"
          >
            <span class="project_navigation_label"
              ><ArrowLeft :size="14" aria-hidden="true" /> Projet précédent</span
            >
            <span class="project_navigation_title">{{ previousProject.title }}</span>
          </RouterLink>
          <RouterLink
            v-if="nextProject"
            class="project_navigation_link project_navigation_next"
            :to="{ name: 'project', params: { id: nextProject.id } }"
          >
            <span class="project_navigation_label"
              >Projet suivant <ArrowRight :size="14" aria-hidden="true"
            /></span>
            <span class="project_navigation_title">{{ nextProject.title }}</span>
          </RouterLink>
        </div>
      </nav>
    </template>

    <section v-else class="container project_not_found">
      <RouterLink class="project_back" to="/projects"
        ><ArrowLeft :size="14" aria-hidden="true" /> Tous les projets</RouterLink
      >
      <p class="project_kicker">// 404</p>
      <h1>Projet introuvable</h1>
      <p>Ce projet n’existe pas. Retrouvez mes réalisations dans la liste des projets.</p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.project_page {
  --project_border: var(--color-border);
  --project_muted: var(--color-muted);
  line-height: normal;
}
.project_back_container {
  padding-top: 2.75rem;
}
.project_back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.75rem;
  margin-block: -0.75rem;
  color: var(--project_muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  &:hover {
    color: var(--color-text);
  }
}
.project_hero {
  padding-block: 1.625rem 0.5rem;
  h1 {
    margin: 0 0 1.25rem;
    font-size: clamp(2.25rem, 5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
  }
}
.project_kicker {
  margin: 0 0 1rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
}
.project_description {
  max-width: 42.5rem;
  margin: 0 0 2.125rem;
  color: var(--project_muted);
  font-size: 1.3125rem;
  line-height: 1.55;
}
.project_actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
}
.project_button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.8125rem 1.375rem;
  border: 1px solid var(--project_border);
  border-radius: 0.625rem;
  background-color: transparent;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  &:hover:not(:disabled) {
    border-color: var(--color-accent);
  }
  &:disabled {
    cursor: not-allowed;
  }
  &_primary {
    border-color: var(--color-accent);
    background-color: var(--color-accent);
    color: var(--color-background);
  }
}
.project_metadata_section {
  margin-top: 2.75rem;
  border-top: 1px solid var(--project_border);
}
.project_metadata {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  margin-block: 0;
  padding-block: 2.125rem;
  font-family: var(--font-mono);
  dt {
    margin-bottom: 0.4375rem;
    color: var(--project_muted);
    font-size: 0.6875rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  dd {
    margin: 0;
    font-size: 0.875rem;
    overflow-wrap: anywhere;
  }
}
.project_section {
  border-top: 1px solid var(--project_border);
  &_content {
    display: grid;
    grid-template-columns: 12.5rem minmax(0, 1fr);
    gap: 3rem;
    padding-block: 4.5rem;
  }
  &_title {
    margin: 0;
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.08em;
  }
}
.project_overview {
  max-width: 42.5rem;
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.7;
}
.project_highlights {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 42.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    font-size: 1.0625rem;
    line-height: 1.6;
  }
  svg {
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 0.3125rem;
    color: var(--color-accent);
  }
}
.project_technologies {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: 0.5625rem;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 0.5rem 0.875rem;
    border: 1px solid var(--project_border);
    border-radius: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }
}
.project_navigation {
  border-top: 1px solid var(--project_border);
  &_content {
    display: flex;
    justify-content: space-between;
    gap: 1.25rem;
    padding-block: 2.5rem 5.625rem;
  }
  &_link {
    min-width: 0;
    max-width: 48%;
    color: var(--color-text);
    text-decoration: none;
    &:hover {
      color: var(--color-accent);
    }
  }
  &_next {
    margin-left: auto;
    text-align: right;
    .project_navigation_label {
      justify-content: flex-end;
    }
  }
  &_label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4375rem;
    color: var(--project_muted);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  &_title {
    font-family: var(--font-heading);
    font-size: 1.375rem;
    font-weight: 600;
  }
}
.project_not_found {
  padding-block: 3rem 5rem;
  .project_kicker {
    margin-top: 2rem;
  }
}
@media (max-width: 48rem) {
  .project_back_container {
    padding-top: 1.5rem;
  }
  .project_description {
    font-size: 1.125rem;
  }
  .project_metadata {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .project_section_content {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    padding-block: 2.5rem;
  }
  .project_overview {
    font-size: 1.125rem;
  }
  .project_navigation_content {
    padding-bottom: 3rem;
  }
}
@media (max-width: 30rem) {
  .project_navigation_content {
    flex-direction: column;
    gap: 2rem;
  }
  .project_navigation_link {
    max-width: 100%;
  }
}
</style>
