import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

const storageKey = 'portfolio-language'
let savedLanguage = null

try {
  savedLanguage = localStorage.getItem(storageKey)
} catch {
  // Use French when storage is unavailable.
}

const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  locale: savedLanguage === 'en' ? 'en' : 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr,
    en,
  },
})

watch(
  i18n.global.locale,
  (language) => {
    document.documentElement.lang = language

    try {
      localStorage.setItem(storageKey, language)
    } catch {
      // Keep switching languages when storage is unavailable.
    }
  },
  { immediate: true },
)

export default i18n
