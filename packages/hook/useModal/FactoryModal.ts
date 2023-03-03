import {h, render} from 'vue'
// @ts-ignore
import type {ModalProps as Props, ModalInstaceReturun, ContentType} from "@gm/components";
// @ts-ignore
import { getBtns, gmModal } from '@gm/components'

function factory(props: Props, type?: Props["type"]): ModalInstaceReturun {
    const btns = getBtns(props)
    const modal = useModal({...props, type, btns })
    modal.open()
    return modal
}

function useModal(props: Props) {
    const btns = getBtns(props)
    const options = {
        ...props,
        btns,
        destroy: () => close()
    } as Props

    const node = h(gmModal, {
        _functional: true,
        visible: true,
        destroyOnClose: true,
        mask: true,
        type: 'info',
        closable: true,
        cancelText: '取消',
        okText: '确定',
        okType: 'primary',
        title: '',
        width: '450px',
        ...options,
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

/**
 * 错误消息弹窗
 * */
function errorModal(title: string|Props, content?: ContentType, props?: Props): ModalInstaceReturun{
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
function successModal(title: string|Props, content?: ContentType, props?: Props): ModalInstaceReturun{
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
function warningModal(title: string | Props, content?: ContentType, props?: Props): ModalInstaceReturun{
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
function infoModal(title: string|Props, content?: ContentType, props?: Props): ModalInstaceReturun {
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