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
function errorModal(title: string | Props, content: string|undefined, props: Props|undefined): ModalInstaceReturun{
    let options: Props = {}
    if(typeof title === 'string'){
        options['title'] = title
        options.content = content
        options = {
            ...options,
            ...props
        }
    } else {
        options = {
            ...title
        }
    }
    return factory(options, 'error')
}

/**
 * 成功消息弹窗
 * */
function successModal(title: string | Props, content: string|undefined, props: Props|undefined): ModalInstaceReturun{
    let options: Props = {}
    if(typeof title === 'string'){
        options['title'] = title
        options.content = content
        options = {
            ...options,
            ...props
        }
    } else {
        options = {
            ...title
        }
    }
    return factory(options, 'success')
}

/**
 * 警告弹窗
 * */
function warningModal(title: string | Props, content: string|undefined, props: Props|undefined): ModalInstaceReturun{
    let options: Props = {}
    if(typeof title === 'string'){
        options['title'] = title
        options.content = content
        options = {
            ...options,
            ...props
        }
    } else {
        options = {
            ...title
        }
    }
    return factory(options, 'warning')
}

/**
 * 普通弹窗
 * */
function infoModal(title: string | Props, content: string|undefined, props: Props|undefined): ModalInstaceReturun {
    let options: Props = {}
   if(typeof title === 'string'){
       options['title'] = title
       options.content = content
       options = {
           ...options,
           ...props
       }
   } else {
       options = {
           ...title
       }
   }
   return factory(options)
}

export  {
    useModal,
    successModal,
    errorModal,
    warningModal,
    infoModal
}