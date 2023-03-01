import {createVNode} from 'vue'
import type { PropType } from 'vue'
import dayjs from 'dayjs'
import { FormItem } from 'ant-design-vue'
import componentMap from './componentMap'
import type { RuleItem } from '../types/Rule'
import type { RenderCallbackParams, FormActionType } from '../types/Form'
// @ts-ignore
import { isFunction, isBoolean } from '@gm/utils'


const componentPublicProps = {
    allowClear: true
}

function getDisabled(props: {[key: string]: any}, content: any, renderCallbackParams: RenderCallbackParams) {
    const { attrs } = content
    const {schema: { dynamicDisabled }} = props
    let disabled = false
    if(attrs.disabled !== undefined) {
        disabled = attrs.disabled
    } else if(isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
    }else if(isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(renderCallbackParams)
    }
    return disabled
}

function formItem(props: any, content: any){
    const { attrs } = content
    const { schema, slot, model, actions } = props
    const { field, label, itemProps, component, componentProps, ifShow, dynamicDisabled, dynamicRules} = schema
    const rules = props.rules

    const isCheck = component && ['a-switch', 'a-checkbox'].includes(component);
    const isDate = component && ['a-date-picker', 'a-range-picker'].includes(component);
    const eventList: string[] = []

    const renderCallbackParams: RenderCallbackParams = {
        field,
        schema,
        model,
        // @ts-ignore
        actions
    }

    componentProps && Object.keys(componentProps).forEach(key=>{
        if(/^on[A-Z]+[a-z]+$/.test(key)){
            eventList.push(key)
        }
    })

    // form-item的props
    const formItemProps = {
        label,
        name: field,
        rules,
        ...(isFunction(itemProps) ? itemProps(renderCallbackParams) : itemProps),
    }
    // form-item下的表单组件的props
    const childProps = {
        inheritAttrs: false,
        ...attrs,
        ...componentPublicProps,
    }
    function getEventValue(e: any){
        let value = undefined
        if(e === undefined) {
            value = undefined
        } else if(isBoolean(e)){
            value = e
        } else if(e.target) {
            value = e.target.value
        } else {
            value = e
        }
        if(component === 'a-date-picker'){
            value = value ? dayjs(value).format(childProps.valueFormat) : undefined
        } else if(component === 'a-range-picker'){
            value = value ? value.map((v: Date)=>dayjs(v).format(childProps.valueFormat)): []
        }
        return value
    }

    if(isCheck){
        childProps.checked = model[field]
    } else {
        childProps.value = model[field]
    }
    if(isDate) {
        childProps.valueFormat = 'YYYY-MM-DD'
    }

    // ifShow
    if(ifShow !== undefined && (ifShow === false || ifShow(renderCallbackParams) === false)){
        return null
    }


    Object.assign(childProps, {
        disabled: getDisabled(props, content, renderCallbackParams),
        ...(isFunction(componentProps) ? componentProps(renderCallbackParams) : componentProps),
        onChange: (e: any) => {
            const value = getEventValue(e)
            actions.setFieldValue(field, value)
        }
    })

    eventList.forEach(key=>{
        childProps[key] = function (...args: any[]) {
            const [e] = args
            const value = getEventValue(e)
            actions.setFieldValue(field, value)
            schema.componentProps[key](...args, renderCallbackParams)
        }
    })

    // 存在插槽时，渲染插槽
    if(isFunction(props.slot)) {
        return createVNode(FormItem, formItemProps, {
                default: ()=>slot(renderCallbackParams),
            }
        )
    }

    return createVNode(FormItem, formItemProps, {
        default: ()=>(
            // @ts-ignore
            createVNode(componentMap[component], {
                ...childProps,
            })
        )
    })
}

formItem.props = {
    slot: {
        type: Function || null,
        default: ()=>{}
    },
    rules: {
        type: Array as PropType<RuleItem[]>,
        defulat: () => []
    },
    schema: {
        type: Object,
        required: true
    },
    model: {
        type: Object,
        required: true
    },
    actions: {
        type: Object as PropType<FormActionType>,
        required: true
    }
}
export default  formItem