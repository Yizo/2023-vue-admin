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
  <a-form-item v-if="attrs.search !== undefined">
    <gm-form-search :onSubmit="formActions.validate" :onRest="formActions.resetFields" :model="formModel"></gm-form-search>
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
import { FormSchemaProps } from '../types/Form'
import { RuleItem } from '../types/Rule'
import {formEvent} from '../hook/form'
import Item from './form-item'
import gmFormFooter from './form-search.vue'
import GmFormSearch from "./form-search.vue";

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

<style scoped>

</style>