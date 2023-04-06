<template>
<div>
  <div>
    <h1>弹窗表单</h1>
    <div>
      <a-button @click="open">传递组件</a-button>
      <a-button @click="open2">传递字符串</a-button>
      <a-button @click="open3">传递函数</a-button>
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

const { open } = useModal({ title: '传递组件', width: '600px', btns, content: formComponent})
const { open: open2 } = useModal({ title: '传递字符串', width: '400px', btns, content: '123'})
const { open: open3 } = useModal({ title: '传递函数', width: '400px', btns, content: ()=>'函数'})
</script>

<style scoped>

</style>