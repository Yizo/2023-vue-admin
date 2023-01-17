<template>
<div class="login-warp">
  <div class="login-form">
    <a-form :model="state">
      <a-form-item name="username">
        <a-input  size="large" v-model:value="state.username">
          <template #prefix>
            <svg-icon class-name="icon" icon="user"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password  size="large" v-model:value="state.password">
          <template #prefix>
            <svg-icon  class-name="icon" icon="password"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" block class="submit" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script setup>
import { reactive } from 'vue'
import { fetchLogin } from '@/api/user'
import { userStore } from '@/store'
import { useRouter } from 'vue-router'

const store = userStore()
const router = useRouter()

const state = reactive({
  username: 'admin',
  password: '123456'
})
function handleLogin(){
  store.login(state).then(()=>{
    router.push({name: 'dashboard'})
  })
}
</script>

<style lang="scss" scoped>
.login-warp {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 500px;
    .submit {

    }
  }
  :deep(.ant-input) {
    padding-left: 6px;
  }
  .icon {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4)
  }
}
</style>