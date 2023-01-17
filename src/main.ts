import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import permission from '@/router/permission'
// @ts-ignore
import store from './store'
import 'virtual:svg-icons-register'
// @ts-ignore
import SvgIcon from './SvgIcon'

// @ts-ignore
import { antdVue } from '@/plugins'
import "ant-design-vue/dist/antd.variable.min.css";

// @ts-ignore
const app = createApp(App)
app.use(router)
app.use(store)
app.use(antdVue)
app.use(SvgIcon)

app.mount('#app')

permission(router)
