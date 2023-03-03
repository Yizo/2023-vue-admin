<template>
<WujieVue v-bind="$attrs"></WujieVue>
</template>

<script>
export default {
  name: "gm-wujie"
}
</script>

<script setup>
import WujieVue from 'wujie-vue3'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<style scoped>

</style>