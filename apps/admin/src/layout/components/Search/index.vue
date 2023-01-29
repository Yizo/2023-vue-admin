<template>
<div class="p-1 search-wrapper" @click="handleOpen">
  <a-tooltip>
    <template #title>搜索</template>
    <search-outlined/>
  </a-tooltip>
  <Modal ref="modalRef"></Modal>
</div>
</template>

<script>
export default {
  name: "Search"
}
</script>
<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import Modal from './Modal.vue'
import { ref } from 'vue'

const modalRef = ref(null)
function handleOpen(){
  modalRef.value.open()
}
</script>

<style lang="less" scoped>
.search-wrapper {
  :deep(.anticon-search) {
    cursor: pointer;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: -16px;
      right: -16px;
      bottom: -16px;
      left: -16px;
    }
  }
}
</style>