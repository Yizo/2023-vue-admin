import {ref} from "vue";

export function useLoading(){
    const loading = ref(false)
    const loadingIndex = ref(-1)
    const openLoading = (index: number) => {
        loading.value = true
        loadingIndex.value = index
    }
    const closeLoading = () => {
        loading.value = false
        loadingIndex.value = -1
    }
    return {
        loading, loadingIndex, openLoading, closeLoading
    }
}