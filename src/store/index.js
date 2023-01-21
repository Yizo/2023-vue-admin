import { createPinia, storeToRefs } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import userStore from './user'
import themeStore from './theme'
import tagViewStore from './tagsViewList'

const store = createPinia()
store.use(createPersistedState({
    storage: sessionStorage
}))

export {
    userStore,
    themeStore,
    tagViewStore,
    storeToRefs
}
export default store