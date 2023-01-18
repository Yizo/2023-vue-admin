<!-- APP.vue -->
<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>
<script setup>
import { reactive } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { themeStore } from '@/store'

const theme = themeStore()
const colorState = reactive({
  primaryColor: theme.$state.primary
});
ConfigProvider.config({
  theme: colorState,
});
</script>