import Util from '@/utils/index'
import { getCurrentInstance, ref, computed } from 'vue'

export default function () {
  const proxy: any = getCurrentInstance()!.proxy
  let user = ref({ userName: '', userActualname: '', userPassword: '' }) // 登录用户
  const uploadRoot = ref(window.webConfig.uploadRoot)
  let showModel = ref(false)
  let token = sessionStorage.token
  const util = computed(() => Util)
  /**
  * @desc 上传失败的回调
  */
  function upfileError () {
    proxy.$myMessage.error1('上传失败！')
  }
  /**
   * @desc 关闭对话框
   */
  function closeDialog () {
    showModel.value = false
    proxy.$emit('update:show', false)
  }
  /**
  * @desc 检查空值
  */
  function checkEmpty (str: string) {
    return Util.isEmpty(str) ? '' : str
  }
  /**
   * @desc 去除空子集
   */
  function arrRemoveEmptyChildren (arr: Array<any>) {
    let temp = JSON.stringify(arr)
    temp = temp.replace(/"children":\[\],/g, '')
    return JSON.parse(temp)
  }
  if (!Util.isEmpty(sessionStorage.user)) {
    user.value = JSON.parse(sessionStorage.user)
  }
  return {
    user, uploadRoot, showModel, token, util, upfileError, closeDialog, checkEmpty, arrRemoveEmptyChildren
  }
}