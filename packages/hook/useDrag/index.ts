import { ref, unref } from 'vue'
import type { Ref } from 'vue'
import { useDraggable, useElementBounding } from '@vueuse/core'
import type { MaybeComputedRef, UseDraggableOptions, Position } from '@vueuse/core'
// @ts-ignore
import { clamp } from '@gm/utils'

export type UseDragProps = UseDraggableOptions & {
    parent?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
}

export type UseDragReturn = {
    isDragging: Ref<boolean>,
    position: Ref<Position>
}

/**
 * 封装增加父级边界判断
 * */
export function useDrag(target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>, options: UseDragProps = {}): UseDragReturn {
    const { parent, initialValue, onStart, onMove, onEnd, } = options
    const { left, right, top, bottom } = useElementBounding(parent);
    const { width, height } = useElementBounding(target);
    const defaultPos = unref(initialValue) ? unref(initialValue) : { x: 0, y: 0 }
    const position = ref<Position>(defaultPos as Position)
    const { position: _position, isDragging } = useDraggable(target, {
        ...options,
        onStart: (pos, e) => {
            onStart && onStart(position.value, e)
        },
        onMove: (pos, e) => {
            position.value.x = clamp(left.value, _position.value.x, right.value - width.value) - left.value
            position.value.y = clamp(top.value, _position.value.y, bottom.value - height.value) - top.value
            onMove && onMove(position.value, e)
        },
        onEnd: (pos, e) => {
            onEnd && onEnd(position.value, e)
        }
    });
    return {
        isDragging,
        position,
    }
}