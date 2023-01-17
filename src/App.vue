<!-- APP.vue -->
<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>
<script setup>
import { reactive } from "vue";
import { ConfigProvider } from "ant-design-vue";

const colorState = reactive({
  primaryColor: "#25b864"
});
ConfigProvider.config({
  theme: colorState,
});
</script>