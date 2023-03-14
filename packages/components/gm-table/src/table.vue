<template>
  <div>
    <a-table v-bind="$attrs" :pagination="false">
      <template v-for="key in Object.keys(slots)" :key="key" #[key]="data">
        <slot :name="key" v-bind="data"></slot>
      </template>
    </a-table>
    <div class="mt-16 text-right" >
      <a-pagination
          v-bind="pagination"
          :disabled="$attrs.loading"
          @change="paginationEvent.change"
          @show-size-change="paginationEvent.showSizeChange"
      ></a-pagination>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "gm-table"
}
</script>
<script lang="ts" setup>
import {useSlots, useAttrs, defineEmits, reactive, watch } from 'vue'
const slots = useSlots()
const attrs = useAttrs()
const emits = defineEmits(['reginster', 'page-change', 'show-size-change'])

const pagination = reactive({
  size: 'small',
  current: 1,
  defaultCurrent: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number | string) => `共${total}条`,
  showLessItems: true,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  ...attrs.pagination
})

const paginationEvent = reactive({
  change: async (current: number, size: number) => {
    emits('page-change', current, size)
  },
  showSizeChange: async (current: number, size: number) => {
    emits('show-size-change', current, size)
  }
})

watch(()=>attrs, (newAttrs)=>{
  Object.assign(pagination, newAttrs.pagination)
}, {
  immediate: true,
  deep: true
})

</script>

<style scoped>

</style>