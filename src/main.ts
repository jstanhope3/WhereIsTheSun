import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import OpenLayersMap from "vue3-openlayers"

const app = createApp(App)

app.use(router)
app.use(OpenLayersMap);
app.mount('#app')
