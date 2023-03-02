import type { PropType, VNode } from 'vue'
import { createVNode } from "vue";
// @ts-ignore
import { isFunction, isString } from '@gm/utils'
function renderContent(props: { [key: string]: any }): VNode {
    const { content } = props
    if(isFunction(content)) {
       return content(createVNode)
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