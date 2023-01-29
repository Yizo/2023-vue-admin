<template>
  <div v-if="isExternal"
       :style="{ '--svg-icon-url': `url(${icon})` }"
       class="svg-icon svg-icon-online"
       :class="className"/>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon'
}
</script>

<script setup>
import { isExternal as external } from '@gm/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon))

/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>

