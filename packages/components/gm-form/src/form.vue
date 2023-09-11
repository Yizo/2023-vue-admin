<template>
<a-form ref="formRef" :model="formModel" v-bind="_attrs"
        @submit="handleSubmit"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        @validate="handleFieldValidate"
>
  <item
      v-for="schema in _schemas"
      :key="schema.field"
      :slot="slots[schema.field] ? slots[schema.field] : null"
      :schema="schema"
      :model="formModel"
      :actions="formActions"
      :rules="_rules && _rules[schema.field] ? _rules[schema.field] : []"
  ></item>
  <a-form-item>
    <template v-for="name in Object.keys(slots)">
      <a-form-item>
        <slot :name="name" v-bind="{ ...formActions }"></slot>
      </a-form-item>
    </template>
    <a-form-item v-if="attrs.search !== undefined">
      <a-button @click="formActions.resetFields">
        <template #icon>
          <sync-outlined />
        </template>
        {{ $attrs.resetText || '重置' }}
      </a-button>
      <a-button @click="formActions.validate" class="ml-16" type="primary">
        <template #icon>
          <search-outlined />
        </template>
        {{ $attrs.submitText || '查询' }}
      </a-button>
    </a-form-item>
  </a-form-item>
</a-form>
</template>

<script lang="ts">
export default {
  name: "gm-form",
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'
import {ref, defineProps, useAttrs, useSlots, defineEmits, defineExpose, onBeforeMount, unref, watch } from "vue";
import { SearchOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { FormSchemaProps } from '../types/Form'
import { RuleItem } from '../types/Rule'
import {formEvent} from '../hook/form'
import Item from './form-item'
import { isEmpty, isArray } from '@gm/utils'

const attrs = useAttrs();
const slots = useSlots();
const emits = defineEmits(['submit', 'finish', 'finishFailed', 'validate']);

const props = defineProps({
  schemas: {
    type: Array as PropType<FormSchemaProps[]>,
    required: true
  },
  rules: {
    type: Object as PropType<{[key: string]: RuleItem[]}>,
    default: () => ({})
  }
})

const formRef = ref(null);
const formModel = ref({})
const _schemas = ref([]);
const _rules = ref([]);
const _attrs = ref({});

const { handleFinish, handleFieldValidate, handleSubmit, handleFinishFailed } = formEvent(emits)
const formActions = {
  getFieldValue: (key: string) => unref(formModel)[key],
  getFieldsValue: () => unref(formModel),
  setFieldValue: (key: string, value) => {
    formModel.value[key] = value;
  },
  setFieldsValue: (value) => {
    Object.keys(formModel.value).map((key) => {
      formModel.value[key] = value;
    });
  },
  resetFields: (nameList = []) => {
    if(nameList.length) {
      formRef.value.resetFields(nameList);
    } else {
      formRef.value.resetFields();
    }
    // 重置dataRange组件时，会出现[undefind]的情况，表单验证不通过，需要手动重置
    const keys = Object.keys(formModel.value)
    keys.forEach((key) =>{
      if(formModel.value[key] && isArray(formModel.value[key])){
        if(formModel.value[key].filter(item =>!isEmpty(item)).length === 0){
          formModel.value[key] = undefined
        }
      }
    })
  },
  validate(nameList = []): Promise<any> {
    formActions.clearValidate()
    if(nameList.length) {
      return formRef.value.validate(nameList);
    } else {
      return formRef.value.validate();
    }
  },
  validateFields(nameList = []): Promise<any> {
    formActions.clearValidate()
    if(nameList.length) {
      return formRef.value.validateFields(nameList);
    } else {
      return formRef.value.validateFields();
    }
  },
  scrollToField(name: string, options?: any[]) {
    formRef.value.scrollToField(name, options);
  },
  clearValidate(nameList = []) {
    if(nameList.length) {
      formRef.value.clearValidate(nameList);
    } else {
      formRef.value.clearValidate();
    }
  }
}

function initSchemas(props) {
  const data = {}
  if(props.schemas) {
    props.schemas.forEach(schema => {
      data[schema.field] = schema.value;
      if(schema.value == null) {
        data[schema.field] = ''
      } else {
        data[schema.field] = schema.value;
      }
    })
  }
  formModel.value = {
    ...data
  }
}

function submit(){
  formActions.validate().then(res=>{
    emits('submit', res)
  })
}

onBeforeMount(()=>initSchemas(props))

defineExpose({
  ...formActions,
})

watch(() => props, (newProps: Record<string, any>) => {
  initSchemas(newProps)
  _rules.value = newProps.rules
  _schemas.value = newProps.schemas
}, {deep: true, immediate: true})

watch(() => attrs, (newProps: Record<string, any>) => {
  _attrs.value = newProps
}, {deep: true, immediate: true})

</script>

<style lang="less" scoped>
.ant-form-inline {
  padding-top: 16px;
  transform: translateY(-16px);
  .ant-form-item {
    margin-bottom: 16px
  }
}
</style>