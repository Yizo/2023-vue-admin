import { h, render, ref } from 'vue'
import modal from './modal.vue'
import { Props as ModalProps } from './types'
export * from'./FactoryModal'

export function getBtns(props: ModalProps) {
    return [{
        text: props.cancelText || '取消',
        props: {
            ...props.cancelButtonProps
        }
    },{
        text: props.okText || '确定',
        props: {
            type: props.okType ||'primary',
            ...props.okButtonProps
        }
    }]
}

function useLoading(){
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
function useModal(props: ModalProps) {
    const btns = props.btns ? props.btns.map(btn=>{
        return {
            text: btn.text,
            props: {
                ...btn.props
            },
            onclick: btn?.onclick
        }
    }) : getBtns(props)
    const options = {
        ...props,
        btns,
        destroy: () => close()
    } as ModalProps

    const node = h(modal, {
        props: {
            _functional: true,
            visible: true,
            destroyOnClose: true,
            maskClosable: false,
            type: 'info',
            closable: true,
            cancelText: '取消',
            okText: '确定',
            okType: 'primary',
            title: '',
            ...options,
        },
    })
    const open = () => {
        render(node, document.body)
    }

    const close = () => {
        render(null, document.body)
    }

    return {
        open,
        close
    }

}

export {
    modal,
    useModal,
    useLoading
}

export type {
    ModalProps
}