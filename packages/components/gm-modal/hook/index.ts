import type { ModalProps } from '../types'

export * from './useLoading'

export function getBtns(props: ModalProps): ModalProps['btns'] {
    const defaultBtns: ModalProps['btns'] = [{
        text: props.okText || '确定',
        props: {
            // @ts-ignore
            type: props.okType ||'primary',
            ...props.okButtonProps
        }
    },{
        text: props.cancelText || '取消',
        props: {
            ...props.cancelButtonProps
        }
    }]

    if(!props.btns) {
        return []
    }
    const btns: ModalProps['btns'] = []
    // @ts-ignore
    const [ok, cancel] = defaultBtns
    props.btns.forEach((btn,index)=>{
        if(index === 0) {
            btns.push({
                ...ok,
                ...btn,
            })
        } else if(index === 1) {
            btns.push({
                ...cancel,
                ...btn
            })
        } else {
            btns.push(btn)
        }
    })
    return btns
}