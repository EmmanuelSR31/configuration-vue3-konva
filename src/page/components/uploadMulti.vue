<template>
  <div class="upload-com">
    <n-upload v-if="editable" :disabled="uploadFlag" :action="actionUrl" :accept="accept" :headers="{token: token}" :custom-request="customRequest" :on-before-upload="beforeUpload" :on-progress="uploadProgress" :on-finish="upfileSuccess" :on-error="upfileError" :show-file-list="false" ref="upload">
      <n-button class="uploadStyle_list_btn">点击选择</n-button>
    </n-upload>
    <div class="upload-list">
      <div class="upload-li" v-for="(item, index) in fileData" :key="item.ossId">
        <template v-if="isImg">
          <n-image :style="{height: imgHeight + 'px'}" :src="uploadRoot + '/oss/' + item.relativePath"></n-image>
        </template>
        <template v-if="!isImg">
          <div class="upload-li-name"><a :href="uploadRoot + '/oss/' + item.relativePath" target="_blank">
            {{item.fileName !== null && item.fileName !== undefined ? item.fileName : '文件'}}
          </a></div>
        </template>
        <n-icon v-if="editable" class="upload-li-del" @click="delFile(index)" title="删除" size="20"><close-circle-outline /></n-icon>
      </div>
    </div>
    <div class="upload-progress" v-if="uploadFlag">
      <div class="upload-progress-text">
        <!-- <el-icon size="18" class="upload-spin-icon-load"><Loading /></el-icon> -->
        上传中...
      </div>
      <n-progress :percentage="percent" type="line" :stroke-width="20" text-inside />
    </div>
    <div>{{tips}}</div>
  </div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { ref, getCurrentInstance, reactive, watch, onMounted } from 'vue'
import { IInterfaceData, IUploadResData } from '@/page/interface/interface'
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
    fileList: Array as any // 附件数据
  },
  components: { CloseCircleOutline },
  setup (props, { emit }) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let fileData = ref<IUploadResData[]>([])
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
        let obj = {
          ossId: res.data.ossId,
          fileName: res.data.fileName,
          relativePath: res.data.relativePath
        }
        fileData.value.push(obj)
        emit('upload-success', fileData.value)
      } else {
        proxy.$myMessage.error1(res.msg)
      }
      uploadFlag.value = false
      // 防止之前上传文件再次上传
      proxy.$refs.upload.clear()
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
    function upfileError () {
      proxy.$myMessage.error1('上传失败')
      uploadFlag.value = false
    }
    function delFile (index: number) {
      fileData.value.splice(index, 1)
      emit('upload-success', fileData.value)
    }
    watch(() => props.fileList, (newVal, oldVal) => {
      fileData.value = newVal
    }, {
      deep: true
    })
    onMounted(() => {
      if (!util.value.isEmpty(props.fileList)) {
        fileData.value = props.fileList
      }
      if (props.action !== null && props.action !== undefined) {
        actionUrl.value = props.action
      } else {
        actionUrl.value = uploadRoot + '/module/oss/upload'
      }
    })
    return { uploadRoot, fileData, actionUrl, uploadFlag, percent, domNumber, token, customRequest, beforeUpload, uploadProgress, upfileSuccess, upfileError, delFile }
  }
}
</script>
<style lang="scss">
.upload-com {
  width: 100%;
}
.upload-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 10px;
}
.upload-li {
  margin: 0 10px 15px 10px;
  position: relative;
  background-color: #f4f5f7;
}
.upload-li-name {
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  word-break: break-all;
}
.upload-li-del {
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 18px;
  cursor: pointer;
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
</style>
