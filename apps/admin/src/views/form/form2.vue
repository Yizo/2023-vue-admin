<template>
  <div>
    <h1>使用自定义插槽</h1>
    <gm-form width="120" layout="inline" :schemas="schemas" :rules="rules" ref="formRef">
      <template #name="{ field, model, actions }">
        <div>
          <a-input type="text" v-if="model" v-model:value="model['name']" @change="handleChange(actions)"/>
        </div>
      </template>
    </gm-form>
    <div class="mt-16">
      <a-button @click="resetForm">重置表单</a-button>
      <a-button @click="validateForm">验证表单</a-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "form1"
}
</script>

<script lang="ts" setup>
import  {ref, Ref} from 'vue'
import { FormActionType } from '@gm/components'

const rules = ref({
  name: [{
    required: true,
    message: 'input不能为空',
    trigger: ['blur', 'change']
  }]
})
const schemas = ref([
  {
    field: 'name',
    label: 'Name',
    value: '',
    itemProps: {
      width: '120'
    }
  }
])

const formRef = ref(null) as Ref<FormActionType>

const resetForm = () => {
  console.log('resetForm')
  formRef.value.resetFields()
}

const validateForm = () => {
  formRef.value.validate()
  console.log('validateForm', formRef.value)
}

function handleChange(actions: any) {
  console.log(actions)
}

</script>

<style lang="less" scoped>
code {
  padding: 10px;
  margin: 10px;
  background-color: #000;
  color: #fff;
}
</style>