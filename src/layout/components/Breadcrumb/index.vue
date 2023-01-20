<template>
  <a-breadcrumb class="my-breadcrumb">
    <a-breadcrumb-item>
      <appstore-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
      <template v-if="index === breadcrumbData.length - 1">
        <span>{{ item.meta.name }}</span>
      </template>
      <template v-else>
        <a href="javascript:void(0)">
          <router-link :key="item.path" :to="item.path">
            {{ item.meta.name }}
          </router-link>
        </a>
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue'
import {ref, watch} from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()
const breadcrumbData: Ref<RouteLocationMatched[]> = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item: any)=>item.meta && item.meta.name)
}

watch(()=>route, ()=>getBreadcrumbData(), { immediate: true, deep: true})

</script>

<style lang="less" scoped>
@import '@/styles/transition';
.my-breadcrumb {
  padding-left: 0 !important;
}
</style>