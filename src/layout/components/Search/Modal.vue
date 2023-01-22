<template>
  <a-modal class="s-modal" v-model:visible="visible" :width="620" :footer="null" :closable="false" @cancel="onCancel">
    <a-input allow-clear ref="inputRef" size="large" placeholder="搜索" class="s-input" @change="handleSearch">
      <template #prefix>
        <search-outlined style="font-size: 24px"/>
      </template>
    </a-input>
    <div class="list-warp" :style="`--search-primay: ${primary}`">
      <div class="list" v-if="list.length > 0">
        <ul>
          <li
              v-for="data in list"
              :key="data.refIndex"
              @click="()=>onClick(data)"
          >
            <div class="left">
              <span v-for="(name, index2) in data.item.name" :key="`${name}-${index2}`">
                <svg-icon v-if="data.item.icon && index2 === 0" class-name="icon" :icon="data.item.icon" />
                {{ name }}
                <right-outlined style="margin-right: 5px" v-if="index2 !== data.item.name.length - 1"/>
              </span>
            </div>
            <div class="right">
              <enter-outlined />
            </div>
          </li>
        </ul>
      </div>
      <span class="no-data" v-else>暂无搜索结果</span>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<script setup>
import { ref, defineExpose, computed } from "vue";
import { useRouter} from "vue-router";
import { SearchOutlined, EnterOutlined, RightOutlined } from '@ant-design/icons-vue'
import { themeStore } from '@/store'
import userSearch from './useSearch'

const router = useRouter()
const store = themeStore()
const primary = computed(()=>store.$state.primary)
const visible = ref(false)
const inputRef = ref(null)
const {list, handleSearch} = userSearch(inputRef)

const open = () => {
  visible.value = true
}
const onCancel = () => {
  inputRef.value.stateValue = ''
  list.value = []
  visible.value = false
}

const onClick = (data) => {
  onCancel()
  router.push(data.item.path)
}

defineExpose({
  open
})
</script>

<style lang="less" scoped>
.s-modal {
  .ant-modal-content {
    border-radius: 8px;
    .s-input {
      padding: 11.5px 11px;
    }
    input {
      font-size: 20px;
      text-indent: 10px;
    }
    .list-warp {
      overflow-y: hidden;
      .list {
        max-height: 70vh;
        overflow: auto;
        ul {
          margin: 0;
          padding: 16px 3px;
          li {
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 100%;
            height: 56px;
            margin-top: 8px;
            font-size: 14px;
            color: #000000d9;
            cursor: pointer;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 3px #d4d9e1;
            &:hover {
              background-color: var(--search-primay);
              color: #fff;
              :deep(.icon) {
                color: #fff;
              }
            }
            .left {
              display: flex;
            }
          }
        }
      }
      .no-data {
        height: 300px;
        line-height: 300px;
        display: block;
        text-align: center;
        user-select: none;
        font-size: 20px;
        color: #969faf
      }
    }
  }
}

</style>