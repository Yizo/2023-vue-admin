import { VNode, createVNode } from "vue";
import {ButtonProps, ModalProps as AModelProps} from "ant-design-vue";

export type ContentType = string | VNode | ((h: typeof createVNode)=>VNode)

/**
 * 比原始的modal新增属性
 * @param {array} btns footer按钮组
 * */
export type ModalProps = Partial<AModelProps & {
    _functional: boolean,
    type?: 'success' | 'error' | 'warning',
    titleTips: string, //
    content: ContentType,
    btns?: Array<{
        text: string,
        props?: ButtonProps,
        /**
         * 1. 不传事件, 点击直接关闭
         * 2. 传普通函数, 执行成功后关闭弹窗
         * 2. 事件返回一个promise, 执行成功后关闭弹窗, 失败不关闭
         * 3. 只要没有返回值就自动关闭，否则自己手动关闭
         * */
        onClick?: (cancel: ()=>void) => void | Promise<void>,
    }>,
    destroy?: () => void
}>

export interface ModalInstaceReturun {
    open: () => void,
    close: () => void
}

export type FactoryModal = ModalProps | {
    title: string,
    content: string,
    props?: Partial<ModalProps>
}