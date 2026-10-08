<script setup>
import SkillsSection from '@/components/skills_section.vue'
import { profileFacts, experience } from '@/data/profile.js'
</script>

<template>
  <main class="skills_page">
    <section class="container about_intro" aria-labelledby="about_intro_title">
      <div class="about_copy">
        <p class="section_kicker">// À PROPOS</p>
        <h1 id="about_intro_title">Un développeur attentif aux détails qui comptent.</h1>

        <p class="about_lead">
          Développeur full-stack spécialisé en PHP, basé à Lyon, je recherche un poste en CDI.
        </p>

        <p class="about_description">
          Je développe des applications web et des API avec Symfony et Laravel, avec une attention
          particulière à la qualité et à la maintenabilité du code.
        </p>
      </div>

      <aside class="about_facts" aria-labelledby="about_facts_title">
        <h2 id="about_facts_title" class="about_facts_title">// INFORMATIONS</h2>

        <dl class="about_facts_list">
          <div v-for="fact in profileFacts" :key="fact.id" class="about_fact">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <SkillsSection />

    <section class="experience_section" aria-labelledby="experience_title">
      <div class="container">
        <h2 id="experience_title" class="section_kicker experience_kicker">// EXPÉRIENCE</h2>

        <div class="experience_list">
          <article v-for="entry in experience" :key="entry.id" class="experience_item">
            <p class="experience_period">{{ entry.period }}</p>
            <div class="experience_details">
              <h3 class="experience_role">
                {{ entry.role }} · <span>{{ entry.company }}</span>
              </h3>
              <p v-if="entry.description" class="experience_description">{{ entry.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.skills_page {
  --profile_muted: color-mix(in srgb, var(--color-text) 65%, var(--color-background));
  --profile_border: color-mix(in srgb, var(--color-text) 15%, transparent);
  --profile_surface: color-mix(in srgb, var(--color-text) 3%, var(--color-background));
}

.about_intro {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: start;
  gap: 3.5rem;
  padding-block: 5rem 1.25rem;
}

.about_copy {
  min-width: 0;

  h1 {
    margin: 0 0 1.5rem;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
}

.section_kicker {
  margin: 0 0 1rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.about_lead {
  margin: 0 0 1.25rem;
  font-size: 1.1875rem;
  line-height: 1.7;
}

.about_description {
  margin: 0;
  color: var(--profile_muted);
  font-size: 1rem;
  line-height: 1.7;
}

.about_facts {
  min-width: 0;
  padding: 1.75rem;
  border: 1px solid var(--profile_border);
  border-radius: 0.75rem;
  background-color: var(--profile_surface);
  font-family: var(--font-mono);
}

.about_facts_title {
  margin: 0 0 1.125rem;
  color: var(--profile_muted);
  font-family: inherit;
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.about_facts_list {
  margin: 0;
}

.about_fact {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.6875rem;
  border-top: 1px solid var(--profile_border);
  font-size: 0.8125rem;

  dt {
    color: var(--profile_muted);
  }

  dd {
    margin: 0;
    text-align: right;
    overflow-wrap: anywhere;
  }
}

.experience_section {
  padding-block: 4.5rem;
  border-top: 1px solid var(--profile_border);
}

.experience_kicker {
  margin-bottom: 0.5rem;
}

.experience_list {
  border-bottom: 1px solid var(--profile_border);
}

.experience_item {
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  gap: 1.75rem;
  padding-block: 1.5rem;
  border-top: 1px solid var(--profile_border);
}

.experience_period {
  margin: 0;
  color: var(--profile_muted);
  font-family: var(--font-mono);
  font-size: 0.78125rem;
}

.experience_role {
  margin: 0;
  font-size: 1.1875rem;
  font-weight: 600;

  span {
    color: var(--profile_muted);
  }
}

.experience_description {
  max-width: 41.25rem;
  margin: 0.375rem 0 0;
  color: var(--profile_muted);
  font-size: 0.9375rem;
  line-height: 1.6;
}

@media (max-width: 48rem) {
  .about_intro {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    padding-block: 2.5rem 1.25rem;
  }

  .about_copy h1 {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .experience_section {
    padding-block: 2.5rem;
  }

  .experience_item {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 30rem) {
  .about_facts {
    padding: 1.25rem;
  }
}
</style>
