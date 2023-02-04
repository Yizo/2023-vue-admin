import { getBtns, useModal } from './index'
import type {Props, ModalInstaceReturun} from "./types";

function factory(props: Props, type?: Props["type"]): ModalInstaceReturun {
    const btns = (props.btns || [getBtns(props)[1]]) as Props['btns']
    const modal = useModal({...props, type, btns })
    modal.open()
    return modal
}

/**
 * 错误消息弹窗
 * */
function errorModal(title: string|Props, content?: string, props?: Props): ModalInstaceReturun{
    if(typeof title === "string"){
        return factory({
            title,
            content,
            ...props
        }, 'error')
    } else {
        return factory(title, 'error')
    }
}

/**
 * 成功消息弹窗
 * */
function successModal(title: string|Props, content?: string, props?: Props): ModalInstaceReturun{
    if(typeof title === "string") {
        return factory({
            title,
            content,
            ...props
        }, 'success')
    } else {
        return factory(title, 'success')
    }
}

/**
 * 警告弹窗
 * */
function warningModal(title: string | Props, content?: string, props?: Props): ModalInstaceReturun{
    if(typeof title === 'string'){
        return factory({
            title,
            content,
            ...props
        }, 'warning')
    } else {
        return factory(title, 'warning')
    }
}

/**
 * 普通弹窗
 * */
function infoModal(title: string|Props, content?: string, props?: Props): ModalInstaceReturun {
    if(typeof title === 'string'){
        return factory({
            title,
            content,
            ...props
        })
    } else {
        return factory(title)
    }
}

export  {
    useModal,
    successModal,
    errorModal,
    warningModal,
    infoModal
}