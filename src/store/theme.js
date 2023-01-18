
import { defineStore } from 'pinia'

const base = import.meta.env.VITE_APP_PUBLIC_PATH

const themeStore = defineStore({
    id: base + '-theme',
    state: ()=>{
        return {
            // 主题色
            primary: '#25b864',
            // 侧边栏开收起
            collapsed: false,
            // 侧边栏宽度
            sideBarWidth: 200,
        }
    },
    getters: {
        primary() {
            return this.primary
        }
    },
    actions: {
        setPrimary(state){
            this.primary = state
        }
    },
    persist: true
})

export default themeStore