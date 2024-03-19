import Main from '@/page/main.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/page/login.vue')
}

export const page404 = {
  path: '/*',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/page/error-page/404.vue')
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  component: () => import('@/page/error-page/403.vue')
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  component: () => import('@/page/error-page/500.vue')
}

export const viewConfig = {
  path: '/viewConfig/:id',
  meta: {
    title: '查看组态'
  },
  component: () => import('@/page/configurationManage/viewConfiguration.vue')
}

export const bi = {
  path: '/bi',
  meta: {
    title: 'bi'
  },
  component: () => import('@/page/bi/bi.vue')
}

// 没有权限控制的路由
export const noRuleRouter = {
  path: '/',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', component: () => import('@/page/home/home.vue') }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/',
    redirect: '/home',
    component: Main,
    children: [
      // 系统管理
      { path: '/systemUserManagement', title: '用户管理', component: () => import('@/page/system/systemUserManagement.vue') },
      { path: '/jobMenuManagement', title: '职位部门管理', component: () => import('@/page/system/jobMenuManagement.vue') },
      { path: '/menuManagement', title: '菜单管理', component: () => import('@/page/system/menuManagement.vue') },
      { path: '/logManagement', title: '日志记录', component: () => import('@/page/system/logManagement.vue') },
      { path: '/systemSetting', title: '系统设置', component: () => import('@/page/system/systemSetting.vue') },
      { path: '/instructionsManagement', title: '教程管理', component: () => import('@/page/instructions/instructionsManagement.vue') },
      { path: '/instructionsList', title: '教程列表', component: () => import('@/page/instructions/instructionsList.vue') },
      { path: '/configurationManage', title: '组态管理', component: () => import('@/page/configurationManage/configurationManage.vue') },
      { path: '/dtuManagement', title: '数采终端管理', component: () => import('@/page/dtu/dtuManagement.vue') },
      { path: '/deviceManagement', title: '设备管理', component: () => import('@/page/device/deviceManagement.vue') },
      { path: '/alarmList', title: '报警管理', component: () => import('@/page/device/alarmList.vue') }
    ]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  noRuleRouter,
  ...appRouter,
  page500,
  page403,
  page404,
  viewConfig,
  bi
]
