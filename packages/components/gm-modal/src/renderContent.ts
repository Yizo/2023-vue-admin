import type { PropType, VNode } from 'vue'
import { createVNode } from "vue";
// @ts-ignore
import { isFunction, isString } from '@gm/utils'
function renderContent(props: { [key: string]: any }): VNode {
    const { content } = props
    console.log(props)
    if(isFunction(content)) {
        console.log(1)
       return content(createVNode)
    } else {
        console.log(3)
        return createVNode(content)
    }
}

renderContent.props = {
    content: {
        type: (String || Object) as PropType<string | VNode>,
        default: ''
    }
}
export default renderContent