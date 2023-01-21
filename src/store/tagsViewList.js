
import { defineStore } from 'pinia'
import { omit } from 'lodash-es'

const base = import.meta.env.VITE_APP_PUBLIC_PATH

const userStore = defineStore({
    id: base + '-tagsViewList',
    state: ()=>{
        return {
            currentTag: null,
            tagsViewObj: {}
        }
    },
    actions: {
        reset(){
            this.$reset()
        },
        setCurrentTag(path) {
          this.currentTag = path
        },
        addTagsViewList(tag) {
            this.tagsViewObj[tag.path] = {
                ...tag
            }
            this.setCurrentTag(tag.path)
        },
        removeTagsView(key) {
            this.tagsViewObj = {
                ...omit(this.tagsViewObj, [key])
            }
        },
        batchRemoveTagsView(keys) {
            console.log(keys)
            this.tagsViewObj = {
                ...omit(this.tagsViewObj, keys)
            }
        }
    },
    persist: true
})

export default userStore

