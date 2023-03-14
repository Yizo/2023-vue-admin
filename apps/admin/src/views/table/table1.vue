<template>
  <div>
    <a-button @click="reload">查询</a-button>
    <gm-table
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        @page-change="onPageChange"
        @show-size-change="onShowSizeChange"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "table1"
}
</script>
<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { useTable } from '@gm/components'
type Key = string | number;

interface DataType {
  key: Key;
  name: string;
  age: number;
  address: string;
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
const done = async () => {
  let data: any[] = []
  for (let i = 0; i < 10; i++) {
    const key = i + (pagination.current - 1) * pagination.pageSize
    data.push({
      key,
      name: `Edward King ${key}`,
      age: 32,
      address: `London, Park Lane no. ${key}`,
    });
  }
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve({
        data,
        total: 46
      })
    }, 3000)
  })
}
const { loading, data, reload, pagination, onPageChange, onShowSizeChange } = useTable(done)

onMounted(()=>{
  console.log('mounted')
  reload()
})
</script>

<style scoped>

</style>