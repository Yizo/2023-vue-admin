import type { ModalProps } from 'ant-design-vue'
import modal from './modal.vue'
import { h, render } from 'vue'

export function useModal(props: ModalProps) {
    const btnProps = {
        text: '取消',
        props: {
            size: 'large',
            type: 'primary'
        },
        onclick: (cancel: any)=>{
            cancel()
        }
    }
    // @ts-ignore
    const btns = props && props.btns ? props.btns.map(btn=>{
        return {
            text: btn.text,
            props: {
                ...btnProps.props,
                ...btn.props
            },
            onclick: btn.onclick
        }
    }) : [btnProps]
    const options = {
        destroyOnClose: true,
        maskClosable: false,
        title: '提示',
        content: '',      // 显示内容
        type: 'success', // success || error
        ...props,
        // 显示的按钮
        btns,
        destroy: () => {
            render(null, document.body)
        }
    }

    // @ts-ignore
    const node = h(modal, {
        attrs: {
            ...options,
        }
    })

    render(node, document.body)

}

export function errorModal(props: ModalProps) {
    const options = {
        type: 'error',
        ...props
    }
    useModal(options)
}

export function successModal(props: ModalProps) {
    const options = {
        type: 'success',
        ...props
    }
    useModal(options)
}