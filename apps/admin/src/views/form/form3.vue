<template>
  <div>
    <div>
      <a-form :model="formModel" :rules="rules" ref="formRef">
        <a-form-item label="姓名" name="name">
          <a-input :value="formModel.name" @change="handleChange"></a-input>
        </a-form-item>
      </a-form>
    </div>
    <div class="mt-16">
      <a-button @click="resetForm">重置表单</a-button>
      <a-button html-type="submit" @click="validateForm">验证表单</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "form3"
}
</script>
<script setup>
import {ref} from 'vue'
const formRef = ref(null)
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

const handleChange = (e) => {
  console.log(e)
  formModel.value.name = e.target.value
}
const resetForm = () => {
  formRef.value.resetFields()
}

const validateForm = () => {
  formRef.value.validate()
}
</script>
<style scoped>

</style>