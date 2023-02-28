import {createVNode} from 'vue'
import componentMap from './componentMap'
// @ts-ignore
import { isFunction } from '@gm/utils'


const componentPublicProps = {
    allowClear: true
}

function formItem(props: any, content: any){
    const { attrs } = content
    console.log(content)
    const isCheck = props.schema.component && ['a-switch', 'a-checkbox', 'a-checkbox-group'].includes(props.schema.component);
    const eventList: string[] = []
    console.group('gm-form-item')
    console.log(props)

    props.schema.componentProps && Object.keys(props.schema.componentProps).forEach(key=>{
        if(/^on[A-Z]+[a-z]+$/.test(key)){
            eventList.push(key)
        }
    })

    const childProps = {
        inheritAttrs: false,
        ...attrs,
        ...componentPublicProps,
        ...props.schema.componentProps,
        value: props.model[props.field],
        onChange: (e: any) => {
            const value = isCheck ? e : e.target.value
            props.actions.setFieldValue(props.field, value)
        }
    }

    eventList.forEach(key=>{
        childProps[key] = function (...args: any[]) {
            const [e] = args
            const target = e ? e.target : null;
            const value = target ? (isCheck ? target.checked : target.value) : e;
            if(key === 'onChange' || key === 'onInput'){
                props.actions.setFieldValue(props.schema.field, value)
            }
            props.schema.componentProps[key](...args, {
                field: props.schema.field,
                schemas: props.schema,
                model: props.model,
                actions: props.actions,
            })
        }
    })

    console.groupEnd()

    // 存在插槽时，渲染插槽
    if(isFunction(props.slot)) {
        return createVNode('div', {}, [props.slot({
            field: props.field,
            schemas: props.schema,
            model: props.model,
            actions: props.actions
        })])
    }

    // @ts-ignore
    return createVNode(componentMap[props.schema.component], {
        ...childProps,
    })
}

formItem.props = {
    slot: {
        type: Function || null,
        default: ()=>{}
    },
    field: {
        type: String,
        default: ''
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
        type: Object,
        required: true
    }
}
export default  formItem