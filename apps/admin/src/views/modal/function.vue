<template>
  <div class="dashboard-container page-main">
    <h1>封装的服务式弹窗</h1>
    <div>
      <h2>组件弹窗</h2>
      <div>
        <a-button @click="aOpen">原始弹窗</a-button>
        <a-modal v-model:visible="aVisible" @cancel="aClose">
          <template #title>测试原始#</template>
          <div>原始弹窗1</div>
        </a-modal>
      </div>
    </div>
    <div class="mt-16">
      <h2>函数组件</h2>
      <div>
        <h3>消息类型</h3>
        <div class="h2-warp">
          <a-button @click="open1">成功函数弹窗</a-button>
          <a-button class="ml-16" @click="open2">失败函数弹窗</a-button>
          <a-button class="ml-16" @click="open3">警告函数弹窗</a-button>
          <a-button class="ml-16" @click="open4">普通函数弹窗</a-button>
          <a-button class="ml-16" @click="open5">自定义按钮弹窗</a-button>
        </div>
      </div>
      <div class="mt-16">
        <h3>按钮控制</h3>
        <div class="h2-warp">
          <a-button @click="open6">确定自动关闭</a-button>
          <a-button @click="open7" class="ml-16">确定不关闭</a-button>
          <a-button @click="open8" class="ml-16">异步自动关闭</a-button>
          <a-button @click="open9" class="ml-16">异步不关闭</a-button>
          <a-button @click="open10" class="ml-16">异步手动关闭</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '@/store'
import { useModal, successModal, errorModal, warningModal, infoModal } from '@gm/hook'
import type { ModalProps } from '@gm/hook'
const user = userStore()

const btns = [{
  text: '确定',
  props: {
    type: 'primary'
  },

  onClick: () => {
    const fn = (timeout: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, timeout)
      })
    }
    return new Promise(async (resolve) => {
      await fn(5000)
      resolve()
    })
  }

},{
  text: '取消'
}] as ModalProps['btns']

const { open } = useModal({ title: '测试', content: '测试通过!' + user.userInfo.userName, btns })

function open1() {
  successModal('成功','测试成功')
}
function open2() {
  errorModal('失败','测试失败')
}
function open3() {
  warningModal('警告','查看信息')
}

function open4() {
  infoModal('查看','查看信息',{ titleTips: '您有新消息'})
}

function open5() {
  infoModal('查看','查看信息',{ titleTips: '您有新消息', btns})
}

function open6() {
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },

    onClick: () => {
      console.log('自动关闭')
    }

  },{
    text: '取消'
  }] as ModalProps['btns']
  infoModal('确定自动关闭','查看信息',{ titleTips: '您有新消息', btns})
}
function open7() {
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },

    onClick: () => {
      console.log('不关闭')
      return true
    }

  },{
    text: '取消'
  }] as ModalProps['btns']
  infoModal('确定不关闭','查看信息',{ titleTips: '您有新消息', btns})
}
function open8() {
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },

    onClick: () => {
      const fn = (timeout: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, timeout)
        })
      }
      return new Promise(async (resolve) => {
        await fn(5000)
        resolve()
      })
    }

  },{
    text: '取消'
  }] as ModalProps['btns']
  infoModal('异步自动关闭','查看信息',{ titleTips: '您有新消息', btns})
}
function open9() {
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },
    onClick: () => {
      const fn = (timeout: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, timeout)
        })
      }
      return new Promise(async (resolve) => {
        await fn(5000)
        resolve(true as any)
      })
    }

  },{
    text: '取消'
  }] as ModalProps['btns']
  infoModal('异步不关闭','查看信息',{ titleTips: '您有新消息', btns})
}
function open10() {
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },

    onClick: (cancel) => {
      const fn = (timeout: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, timeout)
        })
      }
      return new Promise(async (resolve) => {
        await fn(5000)
        resolve(true as any)
        setTimeout(()=>{
          cancel()
        }, 4000)
      })
    }

  },{
    text: '取消'
  }] as ModalProps['btns']
  infoModal('异步手动关闭','loading完成4秒后手动关闭',{ titleTips: '您有新消息', btns})
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