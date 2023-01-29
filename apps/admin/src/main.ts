import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import router from './router'
// @ts-ignore
import permission from '@/router/permission'
// @ts-ignore
import store from './store'
import 'virtual:svg-icons-register'
// @ts-ignore
import SvgIcon from '@/SvgIcon'
// @ts-ignore
import gmComponents from '@gm/components'

// @ts-ignore
import { antdVue } from '@gm/plugins'
import "ant-design-vue/dist/antd.variable.min.css";

const app = createApp(App)
app.use(store)
app.use(antdVue)
app.use(SvgIcon)
app.use(router)
app.use(permission(router))
app.use(gmComponents)
router.isReady().then(()=>{
    app.mount('#app')
})


