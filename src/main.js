import { createApp } from 'vue'
import { initializeTheme } from '@/composables/use_theme.js'
import App from './App.vue'
import i18n from '@/i18n'
import router from './router'
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/main.scss'

initializeTheme()

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
