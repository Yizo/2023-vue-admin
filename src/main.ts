import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
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
app.use(store)
app.use(antdVue)
app.use(SvgIcon)
app.use(router)
app.use(permission(router))
router.isReady().then(()=>{
    console.log('isReady:2')
    app.mount('#app')
})


