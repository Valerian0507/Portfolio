import { computed, ref } from 'vue'

const storageKey = 'portfolio-theme'
const theme = ref('dark')

function applyTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
}

export function initializeTheme() {
  let savedTheme = null

  try {
    savedTheme = localStorage.getItem(storageKey)
  } catch {
    // Use the system preference when storage is unavailable.
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme

  applyTheme(initialTheme)
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme() {
    const nextTheme = isDark.value ? 'light' : 'dark'

    applyTheme(nextTheme)

    try {
      localStorage.setItem(storageKey, nextTheme)
    } catch {
      // Keep switching themes even when the preference cannot be saved.
    }
  }

  return { isDark, toggleTheme }
}
