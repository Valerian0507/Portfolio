<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowDown } from '@lucide/vue'
import ProjectCard from '@/components/project_card.vue'
import { useProjects } from '@/composables/use_projects.js'

const { t } = useI18n({ useScope: 'global' })

const { projects } = useProjects()

const cvUrl = `${import.meta.env.BASE_URL}cv_oleksii_chahinian.pdf`

const profileCode = `<?php

$profile = [
    'name' => 'Oleksii Chahinian',
    'role' => 'PHP developer',
    'stack' => [
        'PHP',
        'Symfony',
        'Laravel',
    ],
    'location' => 'Lyon',
];`
</script>

<template>
  <main>
    <section class="container hero">
      <div class="hero_intro">
        <p class="hero_stack">PHP / Symfony / Laravel</p>

        <h1>{{ t('home.title') }}</h1>

        <p class="hero_description">
          {{ t('home.description') }}
        </p>

        <p class="hero_availability">
          <span class="hero_availability_light" aria-hidden="true"></span>
          <span>{{ t('home.availability') }}</span>
        </p>

        <div class="hero_actions">
          <RouterLink class="hero_button hero_button_primary" to="/projects">
            {{ t('home.view_projects') }}
            <ArrowRight :size="16" aria-hidden="true" />
          </RouterLink>

          <a class="hero_button" :href="cvUrl" download="CV_Oleksii_Chahinian.pdf">
            {{ t('nav.download_cv') }}
            <ArrowDown :size="16" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="hero_terminal">
        <div class="hero_terminal_header">
          <span>profile.php</span>
          <span>PHP</span>
        </div>

        <pre
          class="hero_terminal_body"
        ><code>{{ profileCode }}<span class="hero_terminal_cursor" aria-hidden="true"></span></code></pre>
      </div>
    </section>
    <section class="projects" aria-labelledby="projects_title">
      <div class="container">
        <div class="projects_header">
          <h2 id="projects_title" class="projects_title">// {{ t('home.selected_projects') }}</h2>
          <RouterLink class="projects_link" to="/projects">
            {{ t('home.all_projects', { count: projects.length }) }}
            <ArrowRight :size="14" aria-hidden="true" />
          </RouterLink>
        </div>

        <div class="projects_list">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            layout="row"
            heading-tag="h3"
          />
        </div>
      </div>
    </section>

    <section class="home_contact" aria-labelledby="home_contact_title">
      <div class="container home_contact_content">
        <h2 id="home_contact_title">{{ t('home.contact_title') }}</h2>
        <RouterLink class="home_contact_link" to="/contact">
          {{ t('home.contact_link') }}
          <ArrowRight :size="16" aria-hidden="true" />
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  align-items: center;
  gap: 3.5rem;
  padding-block: 6rem 4.5rem;

  &_button {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--color-border);
    border-radius: 0.625rem;
    background-color: transparent;
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    text-decoration: none;

    &:hover {
      border-color: var(--color-accent-ink);
    }

    &_primary {
      border-color: var(--color-accent);
      background-color: var(--color-accent);
      color: var(--color-on-accent);
    }
  }

  &_terminal {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    background-color: var(--color-surface);
    font-family: var(--font-mono);
  }

  &_terminal_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-muted);
    font-size: 0.75rem;
  }

  &_terminal_cursor {
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    margin-left: 0.3125rem;
    background-color: var(--color-accent);
    vertical-align: -0.1875rem;
    animation: terminal_blink 1.1s steps(1, end) infinite;
  }

  &_terminal_body {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;
    color: var(--color-accent-ink);
    font-family: inherit;
    font-size: 0.8125rem;
    line-height: 1.8;

    code {
      font: inherit;
    }
  }

  h1 {
    margin: 0;
    font-size: clamp(2.25rem, 4.5vw, 4rem);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -0.025em;
  }

  &_stack {
    margin: 0 0 1.375rem;
    color: var(--color-accent-ink);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &_description {
    margin: 1.625rem 0 0;
    max-width: 28.75rem;
    font-size: 1.125rem;
    line-height: 1.65;
  }

  &_availability {
    display: flex;
    align-items: center;
    gap: 0.5625rem;
    margin: 1.625rem 0 0;
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: 0.78125rem;
  }

  &_availability_light {
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--color-accent);
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--color-accent) 22%, transparent);
  }

  &_actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    margin-top: 2.125rem;
  }
}

@keyframes terminal_blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero_terminal_cursor {
    animation: none;
  }
}

@media (max-width: 48rem) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-block: 3rem;
  }
}

.projects {
  padding-block: 5rem;
  border-top: 1px solid var(--color-border);

  &_header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-bottom: 0.5rem;
  }

  &_title {
    margin: 0;
    color: var(--color-accent-ink);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.08em;
  }

  &_link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2.75rem;
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-decoration: none;

    &:hover {
      color: var(--color-text);
    }
  }

  &_list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
}

@media (max-width: 48rem) {
  .projects {
    padding-block: 3rem;
  }
}
.home_contact {
  border-top: 1px solid var(--color-border);

  &_content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding-block: 5.5rem;
  }

  h2 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  &_link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.875rem 1.5rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.625rem;
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 200ms ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 48rem) {
  .home_contact_content {
    padding-block: 3rem;
  }

  .home_contact h2 {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home_contact_link {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
