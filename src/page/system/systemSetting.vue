<template>
<div class="flex-con" style="justify-content: center;">
  <div class="modal-form" style="width: 600px;">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="120px" require-mark-placement="left">
      <div class="form-title">
        <span>系统信息</span>
      </div>
      <n-form-item label="登录系统名称">
        <n-input v-model:value="dataObj.loginSystemName" placeholder="请输入登录系统名称"></n-input>
      </n-form-item>
      <n-form-item label="登录背景图">
        <upload-single :action="uploadRoot + '/module/oss/upload'" :fileObj="{ossId: dataObj.loginBackgroundOssId, fileName: dataObj.loginBackgroundFileName, relativePath:  dataObj.loginBackgroundRelativePath}" @upload-success="upfileSuccess" isImg accept="image/*" :isPreview="true"></upload-single>
      </n-form-item>
      <n-form-item label="顶栏系统名称">
        <n-input v-model:value="dataObj.headerSystemName" placeholder="请输入顶栏系统名称"></n-input>
      </n-form-item>
      <n-form-item label="顶栏LOGO图">
        <upload-single :action="uploadRoot + '/module/oss/upload'" :fileObj="{ossId: dataObj.headerIconOssId, fileName: dataObj.headerIconFileName, relativePath:  dataObj.headerIconRelativePath}" @upload-success="upfileSuccessIcon" isImg accept="image/*" :isPreview="true"></upload-single>
      </n-form-item>
    </n-form>
    <div class="modal-btn">
      <n-button type="primary" @click="save()">保存</n-button>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IUploadResData, IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref } from 'vue'
import { FormInst } from 'naive-ui'
import uploadSingle from '@/page/components/uploadSingle.vue'
export default {
  components: { uploadSingle },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ loginSystemName: '', loginBackgroundOssId: '', loginBackgroundFileName: '', loginBackgroundRelativePath: '', headerSystemName: '', headerIconOssId: '', headerIconFileName: '', headerIconRelativePath: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
    })
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/module/skin/get', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            dataObj.value = r.data.data
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    init()
    function upfileSuccess (obj: IUploadResData) {
      dataObj.value.loginBackgroundOssId = obj.ossId
      dataObj.value.loginBackgroundFileName = obj.fileName
      dataObj.value.loginBackgroundRelativePath = obj.relativePath
    }
    function upfileSuccessIcon (obj: IUploadResData) {
      dataObj.value.headerIconOssId = obj.ossId
      dataObj.value.headerIconFileName = obj.fileName
      dataObj.value.headerIconRelativePath = obj.relativePath
    }
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/skin/web/saveOrUpdate', dataObj.value, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('保存成功')
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
            proxy.$myLoading.close()
          })
        }
      })
    }
    return {
      uploadRoot, formValidate, dataObj, ruleValidate, init, upfileSuccess, upfileSuccessIcon, save
    }
  }
}
</script>
