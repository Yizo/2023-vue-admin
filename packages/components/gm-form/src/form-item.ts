import {createVNode} from 'vue'
import type { PropType } from 'vue'
import dayjs from 'dayjs'
import { FormItem } from 'ant-design-vue'
import componentMap from './componentMap'
import type { RuleItem } from '../types/Rule'
import type { RenderCallbackParams, FormActionType, FunctionRenderCallbackParams } from '../types/Form'
// @ts-ignore
import { isFunction, isBoolean, isEmpty, isArray, isPromise } from '@gm/utils'


const componentPublicProps = {
    allowClear: true
}
function getPropsFactory<T>(props: FunctionRenderCallbackParams<T>, renderCallbackParams: RenderCallbackParams): T {
    if(isFunction(props)){
        try{
            // @ts-ignore
            return props(renderCallbackParams)
        }catch(err: any){
            throw new Error(err)
        }
    } else {
        return props as T
    }
}

function getDisabled(props: Record<string, any>, content: any, renderCallbackParams: RenderCallbackParams) {
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

function getRules(props: Record<string, any>, content: any, renderCallbackParams: RenderCallbackParams) {
    let rules = []
    const { schema } = props
    const { dynamicRules } = schema
    if(dynamicRules) {
        if(isFunction(dynamicRules)) {
            rules = dynamicRules(renderCallbackParams).filter((rule: any) => rule)
        } else if(isArray(dynamicRules)) {
            rules = dynamicRules.filter((rule: any) => rule)
        }
    } else {
        rules = props.rules
    }
    return rules
}

function formItem(props: any, content: any){
    const { attrs } = content
    const { schema, slot, model, actions } = props
    const { field, label, itemProps, component, componentProps, ifShow } = schema
    const renderCallbackParams: RenderCallbackParams = {
        field,
        schema,
        model,
        // @ts-ignore
        actions
    }
    const isCheck = component && ['a-switch', 'a-checkbox'].includes(component);
    const isDate = component && ['a-date-picker', 'a-range-picker'].includes(component);
    const eventList: string[] = []
    let rules = [...getRules(props, content, renderCallbackParams)]

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
        ...getPropsFactory(itemProps, renderCallbackParams)
    }
    // form-item下的表单组件的props
    const childProps = {
        inheritAttrs: false,
        ...attrs,
        ...componentPublicProps,
    }
    function getEventValue(e: any){
        let value = undefined
        if(isEmpty(e)) {
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
            value = value ? value.map((v: Date)=>dayjs(v).format(childProps.valueFormat)): undefined
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

    if(ifShow !== undefined && (ifShow === false || ifShow(renderCallbackParams) === false)){
        return null
    }


    Object.assign(childProps, {
        disabled: getDisabled(props, content, renderCallbackParams),
        ...getPropsFactory(componentProps, renderCallbackParams),
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