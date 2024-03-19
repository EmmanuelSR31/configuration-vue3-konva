<template>
<div class="login" @keydown.enter="login" :style="getStyle()">
  <div class="login-bg">
    <div class="login-div">
      <div class="login-title">{{systemObj.loginSystemName}}</div>
      <div class="login-con">
        <!-- <div class="login-top"></div> -->
        <div class="login-form">
          <n-form ref="loginForm" :model="loginObj" :rules="rules" label-position="top">
            <n-form-item label="用户名 User name" path="userName">
              <n-input type="text" v-model:value="loginObj.userName" placeholder="请输入用户名"></n-input>
            </n-form-item>
            <n-form-item label="密码 Password" path="password">
              <n-input type="text" v-model:value="loginObj.password" placeholder="请输入密码"></n-input>
            </n-form-item>
          </n-form>
          <n-button text class="login-btn" @click="login" :disabled="loading"><img src="/assets/img/login-btn.png"></n-button>
        </div>
      </div>
    </div>
  </div>
  <div class="login-bottom"></div>
</div>
</template>
<script lang="ts" setup>
import common from '@/page/mixins/common' // 基本混入
import { getCurrentInstance, reactive, ref } from 'vue'
import { FormInst } from 'naive-ui'
import { IInterfaceData } from '@/page/interface/interface'
const proxy: any = getCurrentInstance()!.proxy
let { util, uploadRoot } = common()
const loginForm = ref<FormInst | null>(null)
const loginObj = ref({ // 登录用户对象
  userName: '',
  password: ''
})
const loading = ref(false)
const rules = reactive({ // 验证规则
  userName: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})
let systemObj = ref<any>({})
proxy.$api.get('commonRoot', '/module/skin/get', {}, (r: IInterfaceData) => {
  if (r.data.code === 0) {
    systemObj.value = r.data.data
    document.title = systemObj.value.loginSystemName
  } else {
    proxy.$myMessage.error(r.data.msg)
  }
})
function getStyle () {
  let temp = ''
  if (!util.value.isEmpty(systemObj.value.loginBackgroundRelativePath)) {
    temp += 'background: url(' + uploadRoot.value + '/oss/' + systemObj.value.loginBackgroundRelativePath + ');background-size: 100% 100%'
  }
  return temp
}
/**
* @desc 登录
*/
function login (): void {
  loginForm.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true
      proxy.$api.get('commonRoot', '/module/user/login', { userName: loginObj.value.userName, userPassword: loginObj.value.password }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          const user = r.data.data.user
          sessionStorage.user = JSON.stringify(user)
          sessionStorage.token = r.data.data.token
          proxy.$router.push({
            path: '/home'
          })
        } else {
          proxy.$myMessage.error(r.data.msg)
        }
        loading.value = false
      })
    }
  })
}
</script>
<style lang="scss">
@import "../style/login";
</style>
