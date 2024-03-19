import { createVNode, render } from 'vue'
import MessageConstructor from './message.vue'

let nId = 1
const Message:any = function(options:any){
  if (JSON.stringify(options) == undefined) {
    return false
  }
  let id = 'notice-' + nId++
  options = options || {}
  if (typeof options === 'string') {
    options = {
      MessageTitle: options
    }
  }
  if (options.submit === undefined) {
    options.submit = function () {}
  }
  if (options.cancel === undefined) {
    options.cancel = function () {}
  }
  const container = document.createElement('div')
  container.id = id
  const vm:any = createVNode(
    MessageConstructor,
    options,
  )
  vm.visible = true
  render(vm, container)
  document.body.appendChild(container)
}
let arr = ['success', 'warning', 'info', 'error', 'login', 'error1']
arr.forEach(type => {
  Message[type] = (options:any) => {
    if (typeof options === 'string') {
      options = {
        MessageTitle: options
      }
    }
    options.type = type
    return Message(options)
  }
})
export default {
  install (app:any) {
    app.config.globalProperties.$myMessage = Message
  }
}