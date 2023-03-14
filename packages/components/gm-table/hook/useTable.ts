import { ref, reactive } from 'vue'
import { DoneReturn } from '../types'

export function useTable(done: ()=>Promise<DoneReturn>) {
    const loading = ref(false)
    const data = ref([])
    const pagination = reactive({
        size: 'small',
        current: 1,
        defaultCurrent: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total: number | string) => `共${total}条`,
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100']
    })


    const onPageChange = (current: number, size: number) => {
        pagination.current = current
        pagination.pageSize = size
        reload()
    }

    const onShowSizeChange = (current: number, size: number) => {
        pagination.current = current
        pagination.pageSize = size
        reload()
    }

    const reload = async () => {
        try{
            loading.value = true
            data.value = []
            // @ts-ignore
            const {total, data: arry} = await done()
            loading.value = false
            pagination.total = total
            // @ts-ignore
            data.value = arry
        }catch (e) {
            loading.value = false
        }
    }

    return {
        loading,
        data,
        reload,
        pagination,
        onPageChange,
        onShowSizeChange
    }
}