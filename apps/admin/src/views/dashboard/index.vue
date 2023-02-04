<template>
  <div class="dashboard-container page-main">
    <div>
      <h1>组件弹窗</h1>
      <div>
        <a-button @click="aOpen">原始弹窗</a-button>
        <a-modal v-model:visible="aVisible" @cancel="aClose">
          <template #title>测试原始#</template>
          <div>原始弹窗1</div>
        </a-modal>
      </div>
    </div>
    <div class="mt-16">
      <h1>函数组件</h1>
      <a-button @click="open1">成功函数弹窗</a-button>
      <a-button class="ml-16" @click="open2">失败函数弹窗</a-button>
      <a-button class="ml-16" @click="open3">警告函数弹窗</a-button>
      <a-button class="ml-16" @click="open4">普通函数弹窗</a-button>
      <div class="mt-16">
        <h2>外部修改弹窗内</h2>
        <div class="h2-warp">
          <a-button class="ml-16" @click="open5">3秒后修改标题</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { userStore } from '@/store'
import { useModal, successModal, errorModal, warningModal, infoModal } from '@gm/hook'
const user = userStore()

const btns = [{
  text: '确定',
  props: {
    type: 'primary'
  },
  onclick: (cancel: ()=>void) => {
    const fn = (timeout: number) => {
      return new Promise((resolve) => {
        setTimeout(()=>{
           resolve(true)
        }, timeout)
      })
    }
    return new Promise(async (resolve) => {
      await fn(5000)
      resolve(true)
    })
  }
},{
  text: '取消',
  onclick: (cancel: ()=>void) => {
    cancel()
  }
}]

const { open } = useModal({ title: '测试', content: '测试通过!' + user.userInfo.userName, btns })
// successModal({
//   title: '测试',
//   content: '自执行测试成功'
// })

function open1() {
  successModal({title: '成功', content: '测试成功'})
}
function open2() {
  errorModal({title: '失败', content: '测试失败'})
}
function open3() {
  warningModal({title: '警告', content: '查看信息'})
}

function open4() {
  infoModal({title: '查看', content: '查看信息', titleTips: '您有新消息'})
}

function open5() {
  const data = reactive({title: '查看', content: '查看信息', titleTips: '您有新消息'})
  const modal = infoModal(data)
  setTimeout(()=>{
    data.title = '3秒后修改标题'
  }, 3000)
}
function modal() {
  const aVisible = ref(false)
  function aOpen() {aVisible.value = true}
  function aClose() {aVisible.value = false}
  return {aVisible, aOpen, aClose}
}

const { aVisible, aOpen, aClose } = modal()
</script>

<style lang="less" scoped>
h1 {
  font-size: 30px;
}
h2 {
  font-size: 26px;
  text-indent: 20px;
}
.h2-warp {
  text-indent: 20px;
}
h3 {
  font-size: 22px;
  text-indent: 30px;
}
.h3-warp {
  text-indent: 30px;
}
h4  {
  font-size: 18px;
  text-indent: 40px;
}
.h4-warp {
  text-indent: 40px;
}
</style>