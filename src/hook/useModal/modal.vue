<template>
  <a-modal v-model:visible="visible" @cancel="onCancel" v-bind="props">
    <template #title>
      <div v-if="attrs.type === 'error'" style="display: flex;align-items: center;">
        <close-circle-outlined style="color: #ff4d4f; font-size: 20px; margin-right: 10px" /> {{ title }}
      </div>
      <div  v-if="attrs.type === 'success'"  style="display: flex;align-items: center;">
        <check-circle-outlined  style="color: #52c41a; font-size: 20px; margin-right: 10px"/> {{ title }}
      </div>
    </template>
    <div class="content">
      {{ attrs.content }}
    </div>
    <template #footer>
      <a-button v-bind="btn.props" :key="index" v-for="(btn, index) in attrs.btns" @click="()=>btn.onclick(onCancel)">
        {{ btn.text }}
      </a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, useAttrs } from 'vue'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
const { attrs } = useAttrs()
const {title, destroy, ...props} = attrs
const visible = ref(true)
function onCancel(){
  visible.value = false
  destroy()
}
</script>

<style lang="less" scoped>
.content {
  word-wrap:break-word;
  max-width: 100%;
  max-height: 50vh;
  overflow-y: auto;
}
</style>