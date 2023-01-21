
import { defineStore } from 'pinia'
import { fetchLogin } from '@/api/user'
import { resetRouter } from '@/router'
import tagsViewStore from './tagsViewList'
import themeStore from './theme'

const base = import.meta.env.VITE_APP_PUBLIC_PATH

const userStore = defineStore({
    id: base + '-user',
    state: ()=>{
        return {
            userInfo: null,
            token: ''
        }
    },
    getters: {
        token() {
            return this.token
        }
    },
    actions: {
        reset(){
            this.$reset()
        },
        setLogin(res) {
            const {token, ...data}=res
            this.$patch({
                token,
                userInfo: data
            })
        },
        login(data) {
            const self = this
            const theme = themeStore()
            return new Promise((resolve, reject)=>{
                fetchLogin(data).then(res=>{
                    theme.generateRoutes()
                    self.setLogin(res)
                    resolve(res)
                })
            })
        },
        resetUser(){
            const tagView = tagsViewStore()
            const theme = themeStore()
            this.reset()
            tagView.reset()
            theme.reset()
            // resetRouter()
        },
        outLogin() {
            // TODO: 调用退出登录接口
            return new Promise((resolve)=>{
                this.resetUser()
                resolve()
            })
        }
    },
    persist: true
})

export default userStore

