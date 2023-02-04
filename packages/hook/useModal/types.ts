import {ButtonProps, ModalProps} from "ant-design-vue";

/**
 * 比原始的modal新增属性
 * @param {boolean} hideFooter 是否隐藏footer, 默认显示一个取消
 * @param {array} btns footer按钮组
 * */
export type Props = Partial<ModalProps & {
    _functional: boolean,
    type?: 'success' | 'error' | 'warning',
    titleTips: string, //
    content: string,
    btns?: Array<{
        text: string,
        props?: ButtonProps,
        /**
         * 1. 不传事件, 点击直接关闭
         * 2. 传普通函数, 执行成功后关闭弹窗
         * 2. 事件返回一个promise, 执行成功后关闭弹窗(异步)
         * */
        onclick?: () => void | Promise<void>,
    }>,
    destroy?: () => void
}>

export interface ModalInstaceReturun {
    open: () => void,
    close: () => void
}

export type FactoryModal = Props | {
    title: string,
    content: string,
    props?: Partial<Props>
}