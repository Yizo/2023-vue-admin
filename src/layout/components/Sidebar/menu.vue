<template>
  <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
  >
    <menu-item v-for="route in data" :key="route.path" :route="route" />
  </a-menu>
</template>

<script lang="ts">
export default {
  name: "menu"
}
</script>
<script setup lang="ts">
import menuItem from './menu-item.vue'
import {ref, defineProps, watch} from "vue";
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  data: {
    type: Array as PropType<any>,
    required: true
  }
})

const route = useRoute()
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
console.log(props.data)

watch(()=>route, (newRoute)=>{
  console.log(newRoute)
  selectedKeys.value = [newRoute.path];
  openKeys.value = [newRoute.path];
})
</script>

<style scoped>

</style>