<template>
  <a-button @click="$attrs.onReset">
    <template #icon>
      <sync-outlined />
    </template>
    {{ $attrs.resetText || '重置' }}
  </a-button>
  <a-button @click="$attrs.onSubmit" class="ml-16" type="primary">
    <template #icon>
      <search-outlined />
    </template>
    {{ $attrs.submitText || '查询' }}
  </a-button>
</template>
<script>
export default {
  name: "gm-form-search"
}
</script>
<script setup>
import { SearchOutlined, SyncOutlined } from '@ant-design/icons-vue'

</script>

<style scoped>

</style>