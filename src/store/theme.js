
import { defineStore } from 'pinia'

const base = import.meta.env.VITE_APP_PUBLIC_PATH

const themeStore = defineStore({
    id: base + '-theme',
    state: ()=>{
        return {
            primary: '#ccc'
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