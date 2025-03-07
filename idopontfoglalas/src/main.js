import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'

const app = createApp(App)

const options ={
    position: "top-right",
    timeout: 3000,
    closeOnClick: true
}

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
