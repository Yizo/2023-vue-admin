<template>
  <div>
    <a-button @click="addForm">新建表单</a-button>
    <a-button @click="editForm">编辑表单</a-button>
      <gm-modal-form title="表单弹窗" v-model:visible="visible" :rules="rules" :schemas="schemas" :btns="btns"/>
  </div>
</template>

<script lang="ts">
export default {
  name: "template2"
}
</script>
<script lang="ts"  setup>
import { ref } from "vue";
import type { RenderCallbackParams, FormActionType } from '@gm/components'
import { useVisible } from '@gm/hook'
const { visible, open, close } = useVisible()
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
    component: 'a-input'
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
const newFields = schemas.value.map(item => item.value)

function addForm() {
  schemas.value.forEach((schema, index) => {
    schema['value'] = newFields[index]
  })
  open()
}
function editForm(){
  const fields = ['name', 'email', 'nanjing', '30', true, '2023-03-01', undefined, 'aliPay']
  schemas.value.forEach((schema, index) => {
    schema['value'] = fields[index]
  })
  open()
  console.log(schemas.value.length)
  schemas.value[7].componentProps.options.push({label: '京东支付', value: 'jdPay'})
}

const btns = [{
  onClick: (formRef: FormActionType) => {
    formRef.validate().then((valid: Record<string, any>) => {
      console.log(valid)
    })
  },
}]

</script>

<style scoped>

</style>