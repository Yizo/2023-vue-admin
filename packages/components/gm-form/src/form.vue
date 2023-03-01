<template>
<a-form ref="formRef" :model="formModel" v-bind="attrs"
        @submit="handleSubmit"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        @validate="handleFieldValidate"
>
  <item
      v-for="schema in schemas"
      :key="schema.field"
      :slot="slots[schema.field] ? slots[schema.field] : null"
      :schema="schema"
      :model="formModel"
      :actions="formActions"
      :rules="rules && rules[schema.field]"
  ></item>
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
import {ref, defineProps, useAttrs, useSlots, defineEmits, defineExpose, onBeforeMount, unref} from "vue";
import { FormSchemaProps } from '../types/Form'
import { RuleItem } from '../types/Rule'
import {formEvent} from '../hook/form'
import Item from './form-item'

const attrs = useAttrs();
const slots = useSlots();
const emits = defineEmits(['submit', 'finish', 'finishFailed', 'validate']);

console.group('gm-form')

console.log('attrs', attrs)
console.log('slots', slots)

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
      formRef.value?.resetFields(nameList);
    } else {
      formRef.value?.resetFields();
    }
  },
  validate(nameList = []): Promise<any> {
    if(nameList.length) {
      formRef.value?.validate(nameList);
    } else {
      formRef.value?.validate();
    }
  },
  validateFields(nameList = []): Promise<any> {
    if(nameList.length) {
      formRef.value?.validateFields(nameList);
    } else {
      formRef.value?.validateFields();
    }
  },
  scrollToField(name: string, options?: any[]) {
    formRef.value?.scrollToField(name, options);
  },
  clearValidate(nameList = []) {
    if(nameList.length) {
      formRef.value?.clearValidate(nameList);
    } else {
      formRef.value?.clearValidate();
    }
  }
}

function initSchemas() {
  const data = {}
  if(props.schemas) {
    props.schemas.forEach(schema => {
      data[schema.field] = schema.value;
    })
  }
  formModel.value = {
    ...data
  }
}

onBeforeMount(initSchemas)

defineExpose({
  ...formActions,
})

console.groupEnd()

</script>

<style scoped>

</style>