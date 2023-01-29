<template>
  <div class="tabs-view">
    <a-tabs v-model:activeKey="currentTag" type="editable-card" :hideAdd="true" size="small" @edit="onClose" @tabClick="onClick">
      <a-tab-pane v-for="(pane, index) in list" :key="pane.key">
        <template #closeIcon>
          <close-outlined v-if="currentTag !== pane.key"/>
          <span v-else style="width: 12px;display: inline-block"></span>
        </template>
        <template #tab>
          <span class="pane-title" @contextmenu.prevent="openMenu($event, index)">{{ pane.value }}</span>
        </template>
      </a-tab-pane>
    </a-tabs>
    <ContentMenu
        v-model:value="visible"
        :style="menuStyle"
        :index="selectIndex"
        :data="list"
    ></ContentMenu>
  </div>
</template>

<script setup>
import { watch, computed, ref, reactive } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { CloseOutlined } from '@ant-design/icons-vue'
import ContentMenu from './ContentMenu.vue'
import { tagViewStore } from '@/store'

const route = useRoute()
const router = useRouter()
const store = tagViewStore()
const list = computed(()=> {
  const keys = Object.keys(store.$state.tagsViewObj)
  return keys.map(key=>({
    key,
    value: store.$state.tagsViewObj[key].meta.name
  }))
})

const currentTag = computed(()=>store.$state.currentTag)
const onClick = (key) => {
  router.push({
    path: key,
    query: {
      ...store.$state.tagsViewObj[key].query
    },
    params: {
      ...store.$state.tagsViewObj[key].params
    }
  })
  store.setCurrentTag(key)
  closeMenu()
}
const onClose = (key) => {
  store.removeTagsView(key)
}

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
/**
 * 展示 menu
 */
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭 menu
 */
const closeMenu = (e) => {
  visible.value = false
}

watch(()=>route, (route)=>{
  store.addTagsViewList(route)
}, {
  immediate: true,
  deep: true
})

/**
 * 监听变化
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

</script>

<style lang="less" scoped>
.tabs-view {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  // box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  :deep(.ant-tabs-nav) {
    margin: 0;
    padding: 6px 16px;
    .pane-title {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: -6px;
        right: -16px;
        bottom: -6px;
        left: -16px;
      }
    }
  }
}
</style>