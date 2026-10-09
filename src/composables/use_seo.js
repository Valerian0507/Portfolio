import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects.js'

const pageKeys = {
  home: {
    title_key: 'home.title',
    description_key: 'home.description',
  },
  projects: {
    title_key: 'projects.title',
    description_key: 'projects.description',
  },
  skills: {
    title_key: 'nav.stack',
    description_key: 'profile.description',
  },
  contact: {
    title_key: 'nav.contact',
    description_key: 'contact.description',
  },
  not_found: {
    title_key: 'not_found.title',
    description_key: 'not_found.description',
  },
}

export function useSeo() {
  const route = useRoute()
  const { t } = useI18n({ useScope: 'global' })

  watchEffect(() => {
    const page = pageKeys[route.name] || pageKeys.home

    let title = t(page.title_key)
    let description = t(page.description_key)

    if (route.name === 'project') {
      const project = projects.find((entry) => entry.id === route.params.id)

      title = project ? t(project.title_key) : t('not_found.title')

      description = project ? t(project.description_key) : t('not_found.description')
    }

    document.title = `${title} — Oleksii Chahinian`

    const descriptionTag = document.querySelector('meta[name="description"]')

    descriptionTag?.setAttribute('content', description)
  })
}
