import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects as projectData } from '@/data/projects.js'

export function useProjects() {
  const { t, te } = useI18n({ useScope: 'global' })

  const projects = computed(() =>
    projectData.map((project) => ({
      ...project,
      title: t(project.title_key),
      description: t(project.description_key),
      role: t(project.role_key),
      overview: t(project.overview_key),
      highlights: project.highlight_keys.map((key) => {
        const hasLabel = te(`${key}.label`)

        return {
          id: key,
          label: hasLabel ? t(`${key}.label`) : '',
          description: t(hasLabel ? `${key}.description` : key),
        }
      }),
    })),
  )

  return { projects }
}
