<template>
<div class="parent" ref="parentRef">
  <div class="child  none-select" ref="childRef" :style="styles">
    {{ position }}
  </div>
</div>
</template>

<script lang="ts" setup>
import { useDrag } from "@gm/hook"
import { ref, computed } from 'vue'
const childRef = ref(null)
const parentRef = ref(null)
const { isDragging, position } = useDrag(childRef, {
  parent: parentRef,
  initialValue: {
    x: 10,
    y: 10
  }
})
const styles = computed(() => ({
  top: position.value.y + 'px',
  left: position.value.x + 'px',
}))

</script>

<style lang="less" scoped>
.parent {
  padding: 10px;
  border: 1px solid black;
  height: 70vh;
  position: relative;
  .child {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid red;
    cursor: move;
    z-index: 100;
    select: none;
  }
}
</style>