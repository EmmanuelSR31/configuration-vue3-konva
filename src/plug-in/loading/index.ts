import { createVNode, render } from 'vue'
import LoadingConstructor from './loading.vue'

export default {
  install (app:any) {
    const vnode = createVNode(LoadingConstructor)
    //render 把我们的Vnode 生成真实DOM 并且挂载到指定节点
    render(vnode, document.body)
    // Vue 提供的全局配置 可以自定义
    app.config.globalProperties.$myLoading = {
        show: (str:string) => vnode.component?.exposed?.show(str),
        close: () => vnode.component?.exposed?.close()
    }
  }
}