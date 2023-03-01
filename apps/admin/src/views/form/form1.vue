<template>
  <div>
    <h1 class="m-16">基本的使用</h1>
     <gm-form layout="inline" :schemas="schemas" :rules="rules" ref="formRef" :search="true"></gm-form>
  </div>
</template>

<script lang="ts">
export default {
  name: "form1"
}
</script>

<script lang="ts" setup>
import {ref, onMounted, Ref} from 'vue'
import { FormActionType } from '@gm/components'

const checkedList = ref(['Apple', 'Orange'])
const plainOptions = ['Apple', 'Pear', 'Orange'];

const formModel = ref({
  name: ''
})

const rules = ref({
  name: [{
    required: true,
    message: 'name不能为空'
  }],
  email: [{
    required: true,
    message: 'email不能为空'
  }]
})
const schemas = ref([
  {
    field: 'name',
    label: 'Name',
    itemProps: {
      width: '120'
    },
    component: 'a-input',
    componentProps: {
      onChange: (...args: any[]) => {
        console.log(args)
      },
    }
  },
  {
    field: 'email',
    label: 'Email',
    component: 'a-select',
    componentProps: {
      style: {
        width: '200px'
      },
      options: [{
        label: '北京',
        value: 'beijing'
      }],
      onChange: (...args: any[]) => {
        console.log(args)
      },
    }
  },
  {
    field: 'size',
    label: 'size',
    slot: 'size',
    component: 'a-checkbox-group',
    componentProps: {
      style: {
        display: 'flex'
      },
      options: [{
        label: '北京',
        value: 'beijing'
      }],
      onChange: (...args: any[]) => {
        console.log(args)
      },
    }
  }
])

const formRef = ref(null) as Ref<FormActionType>

onMounted(() => {
  setTimeout(() => {
    schemas.value[2].componentProps.options = [{
      label: '南京',
      value: 'nanjing'
    },{
      label: '上海',
      value: 'shanghai'
    },{
      label: '上海',
      value: 'shenzhen'
    },{
      label: '北京',
      value: 'beijing'
    },{
      label: '沈阳',
      value: 'shengyang'
    }]
  }, 3000)
})
</script>

<style scoped>

</style>