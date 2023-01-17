import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import store from './store'
import 'virtual:svg-icons-register'
// @ts-ignore
import SvgIcon from './SvgIcon'

// @ts-ignore
import { antdVue } from '@/plugins'
import './styles/reset.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(antdVue)
app.use(SvgIcon)

app.mount('#app')
