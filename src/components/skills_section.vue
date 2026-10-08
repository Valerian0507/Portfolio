<script setup>
import { skillGroups } from '@/data/skills.js'
</script>

<template>
  <section id="stack" class="skills_section" aria-labelledby="skills_title">
    <div class="container">
      <h2 id="skills_title" class="skills_kicker">// STACK</h2>

      <div class="skills_grid">
        <section v-for="group in skillGroups" :key="group.id" class="skills_group">
          <h3 class="skills_group_title">{{ group.title }}</h3>

          <ul class="skills_list">
            <li v-for="technology in group.technologies" :key="technology" class="skills_item">
              {{ technology }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills_section {
  margin-top: 3.75rem;
  padding-block: 4.5rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
}

.skills_kicker {
  margin: 0 0 1.625rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.skills_grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.75rem;
}

.skills_group {
  min-width: 0;

  &_title {
    margin: 0 0 0.875rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
    color: color-mix(in srgb, var(--color-text) 65%, var(--color-background));
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

.skills_list {
  display: flex;
  flex-direction: column;
  gap: 0.5625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skills_item {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

@media (max-width: 64rem) {
  .skills_grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 40rem) {
  .skills_section {
    padding-block: 2.5rem;
  }

  .skills_grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
