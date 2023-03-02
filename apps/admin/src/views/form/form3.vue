<template>
  <div class="page-main">
    <h1 class="m-16">动态显示，动态禁用，动态验证</h1>
    <gm-form :label-col="{ style: {width: '80px'} }" layout="horizontal" :schemas="schemas" :rules="rules" ref="formRef">
      <template #search>
        <div class="mt-16">
          <a-button @click="resetForm">重置表单</a-button>
          <a-button html-type="submit" @click="validateForm">验证表单</a-button>
        </div>
      </template>
    </gm-form>
  </div>
</template>

<script lang="ts">
export default {
  name: "form1"
}
</script>

<script lang="ts" setup>
import {ref, Ref} from 'vue'
import { FormActionType, RenderCallbackParams } from '@gm/components'

const rules = ref({
  name: [{
    required: true,
    message: 'name不能为空',
  }, {
    max: 20,
    message: '长度必须小于20'
  }],
  email: [{
    required: true,
    message: 'email不能为空'
  }],
  address: [{
    required: true,
    message: '地址不能为空'
  }],
  age: [{
    required: true,
    message: 'Age不能为空'
  }],
  switch: [{
    required: true,
    message: '日期类型不能为空'
  }],
  date: [{
    required: true,
    message: '日期不能为空'
  }],
  'date-range': [{
    required: true,
    message: '时间段不能为空'
  }]
})
const schemas = ref([
  {
    field: 'name',
    label: 'Name',
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
      options: [{
        label: '126',
        value: '126'
      }, {
        label: 'qq',
        value: 'qq'
      },{
        label: 'gmail',
        value: 'gmail'
      }],
      onChange: (...args: any[]) => {
        console.log(args)
      },
    }
  },
  {
    field: 'address',
    label: '地址',
    slot: 'address',
    component: 'a-checkbox-group',
    componentProps: ({ field, model, actions, schema }: RenderCallbackParams) => {
      return {
        style: {
          display: 'flex'
        },
        options: [{
          label: '南京',
          value: 'nanjing'
        },{
          label: '上海',
          value: 'shanghai',
          disabled: model['email'] === '126'
        },{
          label: '深圳',
          value: 'shenzhen',
          disabled: model['email'] === 'qq'
        },{
          label: '北京',
          value: 'beijing',
          disabled: model['email'] === 'gmail'
        },{
          label: '沈阳',
          value: 'shengyang'
        }],
        onChange: (...args: any[]) => {
          console.log(args)
        },
      }
    }
  },
  {
    field: 'age',
    label: 'Age',
    value: '18',
    component: 'a-radio-group',
    componentProps: {
      options: [{
        label: '18岁',
        value: '18'
      }, {
        label: '20岁',
        value: '20'
      },{
        label: '30岁',
        value: '30'
      }]
    }
  },
  {
    field: 'switch',
    value: false,
    label: '日期类型',
    component: 'a-switch',
  },
  {
    field: 'date',
    label: '日期',
    component: 'a-date-picker',
    ifShow: ({ field, model, actions, schema }: RenderCallbackParams) => {
      console.log('model:field', model)
      return model['switch'] === true
    }
  },
  {
    field: 'date-range',
    label: '时间段',
    component: 'a-range-picker',
    ifShow: ({ field, model, actions, schema }: RenderCallbackParams) => {
      console.log('model: date-range', model)
      return model['switch'] !== true
    }
  },
  {
    field: 'pay',
    label: '支付方式',
    component: 'a-checkbox-group',
    componentProps: {
      options: [{
        label: '支付宝',
        value: 'aliPay'
      }, {
        label: '微信',
        value: 'wechat'
      }]
    },
    dynamicRules: ({ field, model, actions, schema }: RenderCallbackParams) => {
      if(model['age'] && parseInt(model['age']) > 18) {
        return []
      } else {
        return [{
          required: true,
          message: '支付方式不能为空'
        }]
      }
    }
  }
])

const formRef = ref(null) as Ref<FormActionType>

const resetForm = () => {
  formRef.value.resetFields()
}

const validateForm = () => {
  formRef.value.validate().then((values: Record<string, any>) => {
    console.log(values)
  })
}
</script>

<style scoped>

</style>