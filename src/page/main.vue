<template>
<div class="main-con">
  <div class="top-menu-con">
    <div class="top-menu-con-logo"><img v-if="systemObj.headerIconRelativePath !==null && systemObj.headerIconRelativePath !== undefined && systemObj.headerIconRelativePath !== ''" :src="uploadRoot + '/oss/' + systemObj.headerIconRelativePath"><span>{{systemObj.headerSystemName}}</span></div>
    <div class="menu-toggle" @click="toggleMenu()">
      <n-icon size="22" v-show="!menuToggle"><menu-fold-outlined /></n-icon>
      <n-icon size="22" v-show="menuToggle"><menu-unfold-outlined /></n-icon>
    </div>
    <div class="top-menu-con-breadcrumb">
      <n-breadcrumb>
        <n-breadcrumb-item v-for="item in breadcrumblist" :clickable="false" :key="item">{{item}}</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="top-menu-link-con">
      <div @click="openBi('/bi')" class="top-menu-link"><img src="/assets/img/dashboard.png">BI看板</div>
    </div>
    <ul class="top-menu-con-btn">
      <!-- <li class="top-menu-con-btn-lis"><Icon type="md-apps" />快捷入口</li> -->
      <li class="top-menu-con-btn-lis">
        <n-dropdown :options="dropdownOptions" @select="handleClickUserDropdown">
          <span class="top-menu-dropdown-link">
            {{user.userActualname}}
            <n-icon size="20">
              <chevron-down />
            </n-icon>
          </span>
        </n-dropdown>
      </li>
      <li class="top-menu-con-btn-lis top-menu-con-btn-exit" @click="exit">
        <n-icon size="20">
          <exit-outline />
        </n-icon>
        退出
      </li>
    </ul>
  </div>
  <div class="main-con-con">
    <div class="left-menu-con" :style="{width: leftMenuWidth + 'px'}">
      <!-- <div class="left-menu-con-title">
        <i class="el-icon-tickets"></i>
        功能模块
      </div> -->
      <n-menu v-model:value="currentMenuId" :options="menuOptions" key-field="menuStructId" label-field="menuStructName" @update:value="routeTo" inverted :collapsed="menuToggle" :root-indent="20" :collapsed-width="64">
      </n-menu>
    </div>
    <div class="right-view-con" :style="{width: 'calc(100% - ' + leftMenuWidth + 'px)'}">
      <div class="tags-con">
        <opened-page-tags :pageTagsList="pageTagsList" @clickTag="clickTag"></opened-page-tags>
      </div>
      <div class="single-page-con">
        <!-- <transition> -->
          <router-view></router-view>
        <!-- </transition> -->
      </div>
    </div>
  </div>
  <n-modal v-model:show="modalUser" title="个人资料" preset="card" style="width: 450px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-field-con">
      <div class="modal-form">
        <n-form ref="userForm" :model="user" :rules="userValidate" label-width="80px">
          <n-form-item label="账号">
            <n-input v-model:value="user.userName" disabled></n-input>
          </n-form-item>
          <n-form-item label="密码">
            <n-input v-model:value="user.userPassword" type="password" show-password-on="click"></n-input>
          </n-form-item>
          <n-form-item label="真实姓名">
            <n-input v-model:value="user.userActualname"></n-input>
          </n-form-item>
        </n-form>
        <div class="modal-btn">
          <n-button type="primary" @click="saveUser()">保存</n-button>
        </div>
      </div>
    </div>
  </n-modal>
  <n-modal v-model:show="modalPassword" title="修改密码" preset="card" style="width: 450px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-field-con">
      <div class="modal_form1">
        <n-form ref="passForm" :model="passwordObj" :rules="passValidate" label-width="110px">
          <n-form-item label="旧密码" prop="oldPass">
            <n-input v-model:value="passwordObj.oldPass" type="password"></n-input>
          </n-form-item>
          <n-form-item label="新密码" prop="newPass">
            <n-input v-model:value="passwordObj.newPass" type="password"></n-input>
          </n-form-item>
          <n-form-item label="确认新密码" prop="newPass1">
            <n-input v-model:value="passwordObj.newPass1" type="password"></n-input>
          </n-form-item>
        </n-form>
        <div class="modal-btn">
          <n-button type="primary" @click="savePassword()">保存</n-button>
        </div>
      </div>
    </div>
  </n-modal>
</div>
</template>
<script lang="ts" setup>
import common from '@/page/mixins/common' // 基本混入
import openedPageTags from './components/opened-page-tags.vue'
import { getCurrentInstance, reactive, ref, computed, onMounted, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import { ChevronDown, SettingsOutline, ExitOutline, PersonCircleOutline, LogOutOutline } from '@vicons/ionicons5'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import { IMenu, IInterfaceData } from '@/page/interface/interface'
const proxy: any = getCurrentInstance()!.proxy
let { util, uploadRoot, arrRemoveEmptyChildren, user } = common()
let menuOptions = ref([])
const menuList = ref([]) // 左侧菜单
let leftMenuWidth = ref(260) // 左侧菜单宽度
let menuToggle = ref(false) // 菜单显示状态
let currentMenuId = ref('') // 当前页面id
currentMenuId.value = proxy.$store.state.currentPageObj.id
/* const currentMenuId = computed(() => { // 当前页面id
  return proxy.$store.state.currentPageObj.id
}) */
const breadcrumblist = ref(['首页']) // 面包屑
const message = ref(0) // 顶部消息
const taskNum = ref(0) // 任务数
const dropdownOptions = ref([
  {
    label: '个人资料',
    key: 'ownSpace',
    icon: renderIcon(PersonCircleOutline)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutOutline)
  }
])
const modalUser = ref(false) // 个人资料对话框是否显示
const modalPassword = ref(false) // 修改密码对话框是否显示
const userValidate = reactive({ // 表单验证
  /* realName: [
    { required: true, message: '请填写真实名称', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'change' }
  ],
  email: [
    { type: 'email', message: '请填写正确的邮箱', trigger: 'change' }
  ] */
  userPassword: [
    { required: true, message: '请填写密码', trigger: 'blur' }
  ]
})
let passwordObj = reactive({ oldPass: '', newPass: '', newPass1: '' }) // 密码对象
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入新密码'))
  } else if (value !== passwordObj.newPass) {
    callback(new Error('2次密码输入不一致'))
  } else {
    callback()
  }
}
const passValidate = reactive({ // 密码表单验证
  oldPass: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
  ],
  newPass1: [
    { validator: validatePass, trigger: 'blur' }
  ]
})
let systemObj = reactive({ headerIconRelativePath: '', headerSystemName: '' }) // 系统名称对象
let menuListAll: IMenu[] = reactive([]) // 全部菜单
let menuHeight = computed(() => document.body.clientHeight) // 表格高度
let pageTagsList = computed(() => proxy.$store.state.pageOpenedList) // 打开的页面列表
/**
* @desc 初始化
*/
function init () {
  proxy.$api.get('commonRoot', '/module/skin/get', {}, (r: IInterfaceData) => {
    if (r.data.code === 0) {
      systemObj = r.data.data
      document.title = systemObj.headerSystemName
    } else {
      proxy.$myMessage.error1(r.data.msg)
    }
  })
  proxy.$api.get('commonRoot', '/module/framework/menu/position/tree', { token: sessionStorage.token }, (r: IInterfaceData) => {
    if (r.data.code === 0) {
      let arr = arrRemoveEmptyChildren(r.data.data)
      for (const iterator of arr) {
        iterator.icon = renderIcon(SettingsOutline)
      }
      menuList.value = arr
      menuOptions.value = arr
      menuListAll = util.value.arrayFlatten(menuList.value)
    } else {
      proxy.$myMessage.error1(r.data.msg)
      sessionStorage.user = ''
      sessionStorage.token = ''
      proxy.$router.push({
        path: '/login'
      })
    }
  })
}
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// 切换菜单
function toggleMenu () {
  menuToggle.value = !menuToggle.value
  leftMenuWidth.value = menuToggle.value ? 65 : 260
}
/**
* @desc 用户菜单点击
* @param {String} name 菜单名
*/
function handleClickUserDropdown (name: string) {
  if (name === 'ownSpace') {
    modalUser.value = true
  } else if (name === 'editPassword') {
    passwordObj = { oldPass: '', newPass: '', newPass1: '' }
    modalPassword.value = true
  } else if (name === 'logout') {
    exit()
  }
}
/**
* @desc 退出
*/
function exit () {
  proxy.$api.get('commonRoot', '/module/user/logout', { token: sessionStorage.token }, (r: IInterfaceData) => {
    sessionStorage.user = ''
    sessionStorage.breadcrumblist = []
    sessionStorage.token = ''
    proxy.$router.push({
      path: '/login'
    })
  })
}
/**
* @desc 保存密码
*/
function savePassword () {
  proxy.$refs.passForm.validate((errors: any) => {
    if (!errors) {
      proxy.$api.get('commonRoot', '/module/user/editPassword', { oldPassword: passwordObj.oldPass, newPassword: passwordObj.newPass, token: sessionStorage.token }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('密码修改成功')
          modalPassword.value = false
          exit()
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
  })
}
/**
* @desc 保存个人资料
*/
function saveUser () {
  proxy.$refs.userForm.validate((errors: any) => {
    if (!errors) {
      proxy.$api.put('commonRoot', '/module/user/edit', { data: JSON.stringify(user), token: sessionStorage.token }, (r: IInterfaceData) => {
        if (r.data.code === 0){
          proxy.$myMessage.success('修改成功')
          modalUser.value = false
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
  })
}
/**
* @desc 取面包屑数据
* @param {Object} obj 面包屑对象
*/
function getBreadcrumbName (obj: IMenu) {
  if (!util.value.isEmpty(obj.menuStructPid) && obj.menuStructPid !== 'topMenu') {
    breadcrumblist.value.push(obj.menuStructName)
    const temp = menuListAll.find(ele => ele.menuStructId === obj.menuStructPid) as IMenu
    getBreadcrumbName(temp)
  } else {
    breadcrumblist.value.push(obj.menuStructName)
  }
}
/**
* @desc 路由跳转
* @param {String} url 链接对象
*/
function routeTo (url: string) {
  let temp = menuListAll.find(ele => ele.menuStructId === url) as IMenu
  let obj = { text: temp.menuStructName, url: temp.menuStructUrl, id: temp.menuStructId, pid: temp.menuStructPid }
  breadcrumblist.value = []
  getBreadcrumbName(temp)
  breadcrumblist.value.reverse()
  proxy.$store.commit('increateTag', obj)
  proxy.$router.push({
    path: obj.url
  })
}
function openBi (url: string) {
  let routeData = proxy.$router.resolve({
      path: url,
      params: {}
  })
  window.open(routeData.href, '_blank')
}
function clickTag (obj: any) {
  breadcrumblist.value = []
  getBreadcrumbName({ menuStructName: obj.text, menuStructUrl: obj.url, menuStructId: obj.id, menuStructPid: obj.pid, menuStructIcon: '' })
  breadcrumblist.value.reverse()
}
onMounted(() => {
  init()
  if (!util.value.isEmpty(sessionStorage.breadcrumblist)) {
    breadcrumblist.value = JSON.parse(sessionStorage.breadcrumblist)
  }
})
</script>
<style lang="scss">
@import "../style/style";
</style>
