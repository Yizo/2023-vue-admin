
import { defineStore } from 'pinia'
import { fetchLogin } from '@/api/user'

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
            return new Promise((resolve, reject)=>{
                fetchLogin(data).then(res=>{
                    self.setLogin(res)
                    resolve(res)
                })
            })
        }
    },
    persist: true
})

export default userStore

