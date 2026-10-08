import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/main.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
