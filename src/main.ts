import '@/assets/main.scss'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHtml5 } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faHtml5, faAngleDown, faAngleUp, faAngleRight)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(Toast)

app.mount('#app')
