<template>
  <gm-modal :visible="visible" v-bind="modalProps" ref="modalRef" @cancel="close">
    <gm-form v-bind="attrs" :schemas="schemas" :rules="rules"  ref="formRef">
      <template v-for="name in Object.keys(slots)" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </gm-form>
  </gm-modal>
</template>

<script>
export default {
  name: "gm-modal-form",
  inheritAttrs: false
}
</script>
<script setup>
import { ref, computed, useAttrs, useSlots, defineExpose, defineEmits, defineProps } from 'vue'
import { gmModal } from '../../gm-modal'
import gmForm from './form.vue'


const props = defineProps({
  visible: false,
  schemas: {
    type: Array,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => null
  }
})

const attrs = useAttrs()
const slots = useSlots()
const formRef = ref(null)
const modalRef = ref(null)

const emits = defineEmits(['update:visible', 'cancel'])

const modelDefaultProps = {
  mask: true,
  maskClosable: true,
  btns: [{
    text: '确定',
    props: {
      type: 'primary'
    }
  }, {
    text: '取消',
    props: {
      class: 'ml-16'
    },
    onClick: () => close()
  }]
}

function close() {
  resetForm()
  emits('update:visible', false)
}

function resetForm() {
  formRef.value.resetFields()
  formRef.value.clearValidate()
}

function assignBtns(){
  const btns = [{
    text: '确定',
    props: {
      type: 'primary'
    },
  }, {
    text: '取消',
    props: {
      class: 'ml-16'
    },
    onClick: () => close()
  }]

  attrs.btns && attrs.btns.length && attrs.btns.forEach((item, index) => {
    const click = item.onClick
    btns[index] = {...btns[index], ...item, onClick: () => {
        click(formRef.value)
      }}
  })

  return btns

}

const modalProps = computed(()=>{
  const { schema, rules, ...data} = attrs
  return {
    ...modelDefaultProps,
    ...data,
    btns: assignBtns()
  }
})

function handleSubmit() {
  emits('submit', formRef.value)
}

defineExpose({
  getForm: () => formRef.value,
  getModal: () => modalRef.value
})

</script>

<style scoped>

</style>