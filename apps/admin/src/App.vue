<!-- APP.vue -->
<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script setup>
import { reactive } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { themeStore } from '@/store'

const theme = themeStore()
const colorState = reactive({
  primaryColor: theme.$state.primary
});
ConfigProvider.config({
  theme: colorState,
});
dayjs.locale('cn');
</script>