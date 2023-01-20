<template>
  <div class="sidebar-wrapper">
    <i-menu :data="data" class="my-sidebar"></i-menu>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import IMenu from './menu.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

</script>

<style lang="less" scoped>
:deep(.ant-menu-sub.ant-menu-inline) {
  background-color: #fff !important;
}
.sidebar-wrapper {
  overflow-y: hidden;
  height: 100%;
  position: relative;
  :deep(.my-sidebar) {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
