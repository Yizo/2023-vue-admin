<template>
  <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inlineCollapsed="false"
      @click="handleClick"
  >
    <menu-item v-for="route in data" :key="route.path" :route="route" />
  </a-menu>
</template>

<script lang="ts">
export default {
  name: "i-menu"
}
</script>
<script setup lang="ts">
import menuItem from './menu-item.vue'
import {ref, defineProps, watch, computed} from "vue";
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  data: {
    type: Array as PropType<any>,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

function handleClick({ key }) {
  router.push(key)
}

watch(()=>route, (newRoute)=>{
  selectedKeys.value = [newRoute.path];
}, {
  immediate: true,
  deep: true
})
</script>

<style lang="less">
.ant-layout-sider-collapsed {
  .ant-menu-submenu-title {
    .ant-menu-submenu-arrow {
      display: none;
    }
  }
  .ant-menu-inline-collapsed {
    .ant-menu-item {
      text-overflow: inherit;
      .ant-menu-title-content {
        display: none;
      }
    }
  }
}
</style>