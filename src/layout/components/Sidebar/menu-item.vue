<template>
  <div>
    <a-sub-menu v-if="getChildRoute(route).length" :key="route.path">
      <template #icon>
        <svg-icon v-if="route.meta && route.meta.icon" class-name="menu-icon" :icon="route.meta.icon" />
      </template>
      <template #title>
        <span>{{ route.meta.name }}</span>
      </template>
      <menu-item v-for="child in route.children" :key="child.path" :route="child" />
    </a-sub-menu>
    <template v-else>
      <a-menu-item v-if="!route.meta.hidden" :key="route.path" :title="route.meta.name">
        <template #icon>
          <svg-icon v-if="route.meta && route.meta.icon" class-name="menu-icon" :icon="route.meta.icon" />
        </template>
        <span>{{ route.meta.name }}</span>
      </a-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: "menu-item"
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
const props = defineProps({
  route: {
    type: Object as PropType<any>,
    required: true
  }
})

const getChildRoute = (item: any) => {
  if (item.children) {
    return item.children.filter((route: any) => route.meta.hidden !== true);
  }
  return [];
};
</script>

<style scoped>

</style>