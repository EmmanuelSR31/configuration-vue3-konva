<template>
  <div>
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <Editor style="overflow-y: hidden;" :style="{height: editorHeight + 'px'}" v-model="editorContent" :defaultConfig="editorConfig" @onCreated="handleCreated" />
  </div>
</template>
<script lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, shallowRef, watch, onMounted, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'
export default {
  name: 'editor',
  props: {
    content: String, // 编辑器内容
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    editorHeight: {
      type: Number,
      default: 300
    }
  },
  components: { Editor, Toolbar },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { uploadRoot } = common()
    const editorRef = shallowRef()
    type InsertFnType = (url: string, alt: string, href: string) => void
    type InsertVideoFnType = (url: string, poster: string) => void
    const toolbarConfig = ref({})
    const editorConfig:Partial<IEditorConfig> = {
      MENU_CONF: {
        uploadImage: {
          async customUpload(file: File, insertFn: InsertFnType) {
            let formData = new FormData()
            formData.append('file', file)
            proxy.$api.post('commonRoot', '/module/oss/upload', formData, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                insertFn(uploadRoot.value + '/oss/' + r.data.data.relativePath, r.data.data.fileName, '')
              } else {
                proxy.$myMessage.error1('上传失败')
              }
            })
          }
        },
        uploadVideo: {
          async customUpload(file: File, insertFn: InsertVideoFnType) {
            let formData = new FormData()
            formData.append('file', file)
            proxy.$api.post('commonRoot', '/module/oss/upload', formData, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                insertFn(uploadRoot.value + '/oss/' + r.data.data.relativePath, '')
              } else {
                proxy.$myMessage.error1('上传失败')
              }
            })
          }
        }
      }
    }
    if (props.disabled) {
      editorConfig.readOnly = true
    }
    let editorContent = ref<string | undefined>('') // 编辑器内容
    /**
    * @desc 初始化
    */
    function init () {
    }
    /**
    * @desc 获取内容
    */
    function getContent () {
      return editorRef.value.getHtml()
    }
    function handleCreated  (editor:any) {
      editorRef.value = editor
      init()
      editorRef.value.setHtml(props.content)
    }
    watch(() => props.content, (newVal, oldVal) => {
      editorRef.value.setHtml(newVal)
    })
    onMounted(() => {
      
    })
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    return { editorRef, toolbarConfig, editorConfig, editorContent, getContent, handleCreated }
  }
}
</script>
