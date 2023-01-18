<template>
  <div class="sidebar-wrapper">
    <Menu :data="data" class="my-sidebar"></Menu>
    <span class="collapsed-wrapper" @click="handleToggle">
      <menu-fold-outlined v-if="!collapsed"/>
      <menu-unfold-outlined v-else/>
    </span>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import Menu from './menu.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  collapsed: {
    type: Boolean,
    required: true
  },
  handleToggle: {
    type: Function,
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
  .collapsed-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgb(247,248,250);
    &:hover {
      background-color: rgb(229,230,235);
    }
  }
}
</style>
