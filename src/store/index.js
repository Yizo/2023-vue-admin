import { createPinia, storeToRefs } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import userStore from './user'
import themeStore from './theme'

const store = createPinia()
store.use(createPersistedState({
    storage: sessionStorage
}))

export {
    userStore,
    themeStore,
    storeToRefs
}
export default store