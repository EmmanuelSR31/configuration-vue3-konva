<template>
  <div class="upload-com">
    <div class="upload-li upload-li-single" v-if="dataObj.ossId !== null && dataObj.ossId !== undefined && dataObj.ossId !== ''">
      <n-image v-if="isImg" :style="{height: imgHeight + 'px'}" v-show="dataObj.ossId !== null && dataObj.ossId !== undefined && dataObj.ossId !== ''" :src="uploadRoot + '/oss/' + dataObj.relativePath"></n-image>
      <div v-if="!isImg" v-show="dataObj.ossId !== null && dataObj.ossId !== undefined && dataObj.ossId !== ''">
        <a :href="uploadRoot + '/oss/' + dataObj.relativePath" target="_blank">{{dataObj.fileName !== null && dataObj.fileName !== undefined ? dataObj.fileName : '文件'}}</a>
      </div>
      <n-icon v-if="editable" class="upload-li-del" @click="delFile()" title="删除" size="20"><close-circle-outline /></n-icon>
    </div>
    <n-upload v-if="editable" :disabled="uploadFlag" :action="actionUrl" :accept="accept" :headers="{token: token}" :custom-request="customRequest" :on-before-upload="beforeUpload" :on-finish="upfileSuccess" :on-error="upfileError" :show-file-list="false" ref="upload">
      <n-button class="uploadStyle_list_btn">
        {{buttonTitle}}
      </n-button>
    </n-upload>
    <div class="upload-progress" v-if="uploadFlag">
      <div class="upload-progress-text">
        <!-- <el-icon size="18" class="upload-spin-icon-load"><Loading /></el-icon> -->
        上传中...</div>
      <n-progress :percentage="percent" type="line" :stroke-width="20" text-inside />
    </div>
    <div>{{tips}}</div>
  </div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { ref, getCurrentInstance, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import { IUploadResData, IInterfaceData } from '@/page/interface/interface'
import { UploadCustomRequestOptions } from 'naive-ui'
import axios from 'axios'
import { CloseCircleOutline } from '@vicons/ionicons5'
export default {
  props: {
    // 是否可编辑
    editable: {
      type: Boolean,
      default: true
    },
    action: String,
    accept: {
      type: String,
      default: ''
    },
    isImg: {
      type: Boolean,
      default: false
    },
    imgHeight: {
      type: Number,
      default: 120
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    tips: String,
    buttonTitle: {
      type: String,
      default: '点击选择'
    },
    fileObj: Object as any // 附件数据
  },
  components: { CloseCircleOutline },
  setup (props, { emit }) {
    const proxy: any = getCurrentInstance()!.proxy
    let { uploadRoot } = common()
    let dataObj: Ref<IUploadResData> = ref({ ossId: '', relativePath: '', fileName: '' }) // 数据对象
    let actionUrl = ref('')
    let uploadFlag = ref(false)
    let percent = ref(0)
    let domNumber = ref(1) // DOMkey
    let token = sessionStorage.token
    function beforeUpload () {
      percent.value = 0
      uploadFlag.value = true
    }
    function uploadProgress (event: any) {
      percent.value = event.progress * 100 >> 0
    }
    /**
    * @desc 上传成功的回调
    * @param {Object} res 返回
    */
    function upfileSuccess (res: IInterfaceData) {
      if (res.code === 0) {
        proxy.$myMessage.success('上传成功')
        dataObj.value = {
          ossId: res.data.ossId,
          fileName: res.data.fileName,
          relativePath: res.data.relativePath
        }
        emit('upload-success', { ossId: res.data.ossId, fileName: res.data.fileName, relativePath: res.data.relativePath })
      } else {
        proxy.$myMessage.error1(res.msg)
      }
      uploadFlag.value = false
      // 防止之前上传文件再次上传
      proxy.$refs.upload.clear()
    }
    function upfileError () {
      proxy.$myMessage.error1('上传失败')
      uploadFlag.value = false
    }
    const customRequest = ({
      file,
      data,
      headers,
      withCredentials,
      action,
      onFinish,
      onError,
      onProgress
    }: UploadCustomRequestOptions) => {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions['data']]
          )
        })
      }
      formData.append('file', file.file as File)
      axios({
        method: 'post',
        url: action,
        data: formData,
        baseURL: '',
        headers: headers as Record<string, string>,
        onUploadProgress: (e: any) => {
          uploadProgress(e)
        }
      })
      .then(function (res: any) {
        upfileSuccess(res.data)
      })
      .catch(function (err: any) {
        console.log(err)
      })
    }
    function delFile () {
      dataObj.value = { ossId: '', fileName: '', relativePath: '' }
      emit('upload-success', { ossId: '', fileName: '', relativePath: '' })
    }
    watch(() => props.fileObj, (newVal) => {
      dataObj.value = newVal
    }, {
      deep: true
    })
    onMounted(() => {
      dataObj.value = props.fileObj
      if (props.action !== null && props.action !== undefined) {
        actionUrl.value = props.action
      } else {
        actionUrl.value = uploadRoot + '/module/oss/upload'
      }
    })
    return { uploadRoot, dataObj, actionUrl, uploadFlag, percent, domNumber, token, beforeUpload, uploadProgress, upfileSuccess, upfileError, customRequest, delFile }
  }
}
</script>
<style lang="scss">
.upload-com {
  width: 100%;
}
.upload-progress {
  padding: 8px 0;
  position: relative;
  line-height: 1.6;
  .ivu-progress-inner-text {
  }
}
.upload-progress-text {
  text-align: center;
  line-height: 2;
  i {
    margin-right: 5px;
  }
}
.upload-spin-icon-load{
  animation: ani-upload-spin-icon 1s linear infinite;
}
@keyframes ani-upload-spin-icon {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.upload-li-single {
  display: inline-block;
  position: relative;
  .upload-li-del {
    position: absolute;
    top: 0;
    right: -30px;
    font-size: 22px;
    cursor: pointer;
  }
}
</style>
