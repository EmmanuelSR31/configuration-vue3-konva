import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { routers } from './router'
import Util from '@/utils/index'
import { createDiscreteApi } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    loadingBarStyle: {
      loading: {
        background: '#1890ff'
      }
    }
  }
})
const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  // 登录判断
  if (to.path === '/bi' || to.path.includes('/viewConfig')) {
    next()
  } else {
    if (Util.isEmpty(sessionStorage.user) && to.path !== '/login') { // 判断是否已经登录且前往的页面不是登录页
      next({
        path: '/login'
      })
    } else if (!Util.isEmpty(sessionStorage.user) && to.path === '/login') { // 判断是否已经登录且前往的是登录页
      next({
        path: '/home'
      })
    } else { // 没有配置权限的路由, 直接通过
      next()
    }
  }
})

router.afterEach(() => {
  loadingBar.finish()
})

export default router
