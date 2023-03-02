<template>
  <a-modal v-model:visible="visible" :class="['my-model', isFull && 'full-model']" @cancel="onCancel" v-bind="modelProps">
    <template #title>
      <div v-if="modelProps.type === 'error'" style="display: flex;align-items: center;">
        <close-circle-outlined style="color: #ff4d4f; font-size: 20px; margin-right: 5px" /> {{ modelProps._title }}
      </div>
      <div  v-else-if="modelProps.type === 'success'"  style="display: flex;align-items: center;">
       <check-circle-outlined  style="color: #52c41a; font-size: 20px; margin-right: 5px"/> {{ modelProps._title }}
      </div>
      <div  v-else-if="modelProps.type === 'warning'"  style="display: flex;align-items: center;">
        <InfoCircleOutlined style="color: #faad14; font-size: 20px; margin-right: 5px"/>{{ modelProps._title }}
      </div>
      <div v-else class="inline-block">
        {{modelProps._title}}
      </div>
      <div v-if="modelProps.titleTips" class="inline-block ml-4">
        <a-tooltip :title="modelProps.titleTips" :arrowPointAtCenter="true" placement="right">
          <InfoCircleOutlined/>
        </a-tooltip>
      </div>
    </template>
    <template #closeIcon>
      <div class="close-icon-warp">
        <a-tooltip title="最大化" :arrowPointAtCenter="true" placement="bottom">
          <FullscreenOutlined  v-show="!isFull" class="close-icon ci-1" @click.stop="handleIcnClick"/>
        </a-tooltip>
        <a-tooltip title="还原" :arrowPointAtCenter="true" placement="bottom">
          <FullscreenExitOutlined v-show="isFull"  class="close-icon ci-2" @click.stop="handleIcnClick"/>
        </a-tooltip>
        <a-tooltip title="关闭" :arrowPointAtCenter="true" placement="bottom"  v-if="modelProps.closable">
          <CloseOutlined  class="close-icon ci-3"/>
        </a-tooltip>
      </div>
    </template>
    <template #footer v-if="showFooter">
      <a-button v-bind="btn.props" :loading="loadingIndex === index && loading" :key="index" v-for="(btn, index) in modelProps.btns" @click="()=>handleBtnClick(index, btn)">
        {{ btn.text }}
      </a-button>
    </template>
    <div class="content">
      <template v-if="isFunctional">
        <render-content :content="modelProps.content"></render-content>
      </template>
      <template v-if="!isFunctional">
        <slot></slot>
      </template>
    </div>
  </a-modal>
</template>
<script lang="ts">
export default {
  name: 'gmModal'
}
</script>
<script lang="ts" setup>
import { ref, useSlots, useAttrs, defineProps, PropType, computed, h } from 'vue'
import { InfoCircleOutlined, CloseCircleOutlined, CheckCircleOutlined, CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import renderContent from './renderContent'
import type { ModalProps as Props } from '../types'
import { useLoading } from '../hook'

const props = defineProps({
  _functional: {
    type: Boolean,
    default: false
  },
  afterClose: Function as PropType<Props['afterClose']>,
  bodyStyle: Object as PropType<Props['bodyStyle']>,
  cancelText:  {
    type: String as PropType<Props['cancelText']>,
    default: '取消'
  },
  centered: Boolean as PropType<Props['centered']>,
  closable: {
    type: Boolean as PropType<Props['closable']>,
    default: true
  },
  confirmLoading: {
    type: Boolean as PropType<Props['confirmLoading']>,
    default: true
  },
  destroyOnClose: {
    type: Boolean as PropType<Props['destroyOnClose']>,
    default: false
  },
  footer: (Object || null) as PropType<Props['footer']>,
  forceRender: Boolean as PropType<Props['forceRender']>,
  getContainer: Object as PropType<Props['getContainer']>,
  keyboard: Boolean as PropType<Props['keyboard']>,
  mask: Boolean as PropType<Props['mask']>,
  maskClosable: Boolean as PropType<Props['maskClosable']>,
  maskStyle: Object as PropType<Props['maskStyle']>,
  okText: {
    type: String as PropType<Props['okText']>,
    default: '确定'
  },
  okType: {
    type: String as PropType<Props['okType']>,
    default: 'primary'
  },
  okButtonProps: Object as PropType<Props['okButtonProps']>,
  cancelButtonProps: Object as PropType<Props['cancelButtonProps']>,
  title: String as PropType<Props['title']>,
  titleTips: String,
  width: (String||Number) as PropType<Props['width']>,
  wrapClassName: String as PropType<Props['wrapClassName']>,
  zIndex: Number as PropType<Props['zIndex']>,
  visible: {
    type: Boolean as PropType<Props['visible']>,
    default: false
  },
  'onUpdate:visible': Object as PropType<Props['onUpdate:visible']>,
  onChange: Function as PropType<Props['onChange']>
})
const attributes = useAttrs()
const slots = useSlots()
const isFull = ref(false)
const visible = ref(props.visible)
const isFunctional = computed(() => !!(attributes.props && attributes.props._functional))
/**
 * 如果是函数式组件，则取attributes.props
 * 否则是普通组件, 以组件props为主, attrs为辅进行属性合并
 * */
const modelProps = computed(()=>{
  // 原始的弹窗以title属性为主，我这边以slot为主，所以要删除title属性
  const data = isFunctional.value ? {
    ...attributes.props,
    _title: attributes.props.title,
  } : {
    ...attributes.attrs,
    ...props,
    _title: props.title
  }
  Reflect.deleteProperty(data, 'title')
  return data
})

const {loading, loadingIndex, closeLoading, openLoading} = useLoading()

// 是否显示footer
const showFooter = computed(() => modelProps.value.footer !== null)

function handleIcnClick(e: PointerEvent) {
  isFull.value =!isFull.value
}

function handleBtnClick(index, btn) {
  if(!btn.onClick) {
    return onCancel()
  }
  if(loading.value && loadingIndex.value !== -1) return
  try{
    openLoading(index)
    // 返回为真时不关闭弹窗
    const data = btn.onClick(onCancel)
    if(data instanceof Promise) {
      data.then(res=>{
        closeLoading()
        if(!res) {
          onCancel()
        }
      }).catch(()=>{
        closeLoading()
      })
    } else {
      closeLoading()
      if(!data) {
        onCancel()
      }
    }
  }catch (e) {
    closeLoading()
    new Error(e)
  }
}

function onCancel(){
  if(loading.value && loadingIndex.value !== -1) return
  closeLoading()
  visible.value = false
  if(isFunctional.value) {
    modelProps.value.destroy()
  }
}

</script>

<style lang="less" scoped>
.my-model {
  .content {
    word-wrap:break-word;
    max-width: 100%;
  }
  .close-icon-warp {
    position: relative;
    height: 56px;
    .close-icon {

      position: absolute;
      top: 50%;
      z-index: 11;
    }
    .ci-1,.ci-2 {
      left: -25px;
      font-size: 14px;
      transform: translateY(-50%);
    }
    .ci-3 {
      left: 50%;
      font-size: 15px;
      transform: translateX(-75%) translateY(-50%);
    }
  }
}
</style>
<style lang="less">
.my-model {
  .ant-modal-close-x {
    width: 40px !important;
  }
}
.full-model {
  width: 100vw !important;
  height: 100vh !important;
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  margin: 0;
  padding: 0;
  top: 0 !important;
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
    overflow: auto;
    padding: 0;
    margin: 24px;
    .content {
      overflow: auto;
    }
  }
}
</style>