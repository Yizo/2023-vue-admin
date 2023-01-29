<template>
  <transition name="collapse" mode="out-in">
    <div class="context-menu-container" v-show="visible">
      <a-menu :selectable="false">
        <a-menu-item :disabled="data[index] && currentTag !== data[index].key" @click="onRefreshClick">
          <redo-outlined />重新加载
        </a-menu-item>
        <a-divider />
        <a-menu-item :disabled="index === 0" @click="onCloseLeftClick">
          <vertical-right-outlined />关闭左侧标签页
        </a-menu-item>
        <a-menu-item :disabled="index === data.length - 1" @click="onCloseRightClick">
          <vertical-left-outlined />关闭右侧标签页
        </a-menu-item>
        <a-divider />
        <a-menu-item :disabled="data.length <= 1" @click="onCloseOtherClick">
          <swap-outlined />关闭其他标签页
        </a-menu-item>
      </a-menu>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ContentMenu'
}
</script>
<script setup>
import { defineProps, computed } from 'vue'
import { VerticalLeftOutlined, VerticalRightOutlined, RedoOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { tagViewStore } from '@/store'
import { useRouter} from 'vue-router'
const router = useRouter()

const store = tagViewStore()

const currentTag = computed(()=>store.$state.currentTag)
const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  index: {
    type: Number,
    required: true
  }
})

const visible = computed(()=>props.value)

function setCurrent(){
  const path = props.data[props.index].key
  store.setCurrentTag(path)
}
const onRefreshClick = () => {
  router.go(0)
}

const onCloseRightClick = () => {
  const data = props.data.slice(props.index + 1, props.data.length)
  setCurrent()
  store.batchRemoveTagsView(data.map(({ key}) => key))
}
const onCloseLeftClick = () => {
  const data = props.data.slice(0, props.index)
  setCurrent()
  store.batchRemoveTagsView(data.map(({ key}) => key))
}
const onCloseOtherClick = () => {
  const data = [...props.data]
  data.splice(props.index, 1)
  store.batchRemoveTagsView(data.map(({ key}) => key))
}
</script>

<style lang="less" scoped>
@import '@gm/styles/transition.less';
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  :deep(.ant-menu-item) {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom:0;
    }
    svg {
      margin-right: 8px;
    }
  }
  .ant-divider-horizontal {
    margin: 0;
  }
}
</style>

