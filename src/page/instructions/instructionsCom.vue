<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="名称" path="richTextTitle">
        <n-input v-model:value="dataObj.richTextTitle" placeholder="请输入名称"></n-input>
      </n-form-item>
      <n-form-item label="上级">
        <n-tree-select v-model:value="dataObj.pid" placeholder="请选择上级" :options="instructionsList" key-field="id" label-field="richTextTitle" />
      </n-form-item>
    </n-form>
    <div class="modal-btn">
      <n-button type="primary" @click="save()" v-if="method !== 'view'">保存</n-button>
    </div>
  </div>
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, reactive, inject } from 'vue'
import { FormInst } from 'naive-ui'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, uploadRoot, arrRemoveEmptyChildren } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ richTextTitle: '', pid: '' }) // 数据对象
    const ruleValidate = reactive({ // 表单验证
      newsTitle: [
        { required: true, message: '请填写名称', trigger: 'blur' }
      ]
    })
    let instructionsList = ref([])
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      dataObj.value = util.value.deepClone(props.obj)
      proxy.$api.get('commonRoot', '/module/instructions/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          instructionsList.value = arrRemoveEmptyChildren(r.data.data)
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    init()
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          let obj = util.value.deepClone(dataObj.value)
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/module/instructions/insert', obj, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage(1, 10)
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          } else if (props.method === 'edit') {
            proxy.$api.post('commonRoot', '/module/instructions/update', obj, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage(1, 10)
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          }
        }
      })
    }
    return {
      showModel, uploadRoot, formValidate, dataObj, ruleValidate, instructionsList, init, save
    }
  }
}
</script>
