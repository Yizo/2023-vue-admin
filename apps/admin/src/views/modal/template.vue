<template>
<div>
  <div>
    <h1>弹窗表单</h1>
    <div>
      <a-button @click="open">打开表单</a-button>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { infoModal, useModal } from '@gm/hook'
import type { ModalProps } from '@gm/hook'
import formComponent from './form/template/form.vue'
const btns = [{
  onClick: () => {
    const fn = (timeout: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, timeout)
      })
    }
    return new Promise<void>(async (resolve) => {
      await fn(5000)
      resolve()
    })
  },
}]

const { open } = useModal({ title: '弹窗表单', btns, content: formComponent})
</script>

<style scoped>

</style>