import type { PropType, VNode } from 'vue'
import { createVNode } from "vue";
// @ts-ignore
import { isFunction, isObject } from '@gm/utils'
function renderContent(props: { [key: string]: any }): VNode {
    const { content } = props
    if(isFunction(content)) {
       const data = content(props)
       if(isObject(data)) {
           return createVNode(data)
       } else {
           return createVNode('div', null, data)
       }
    } else if(isObject(content)) {
        return createVNode(content)
    } else {
        return createVNode('div', null, content)
    }
}

renderContent.props = {
    content: {
        type: (String || Object) as PropType<string | VNode>,
        default: ''
    }
}
export default renderContent