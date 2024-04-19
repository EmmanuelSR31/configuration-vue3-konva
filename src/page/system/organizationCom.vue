<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="100px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="部门名称" path="departmentName">
        <n-input v-model:value="dataObj.departmentName" placeholder="请输入部门名称" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="上级部门" path="pid">
        <n-tree-select v-model:value="dataObj.pid" placeholder="请选择上级部门" :options="departmentList" key-field="departmentId" label-field="departmentName" :disabled="method === 'view'" />
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
import { getCurrentInstance, ref, inject } from 'vue'
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
    let { util, showModel, arrRemoveEmptyChildren } = common()
    const parentChangePageLeft:any = inject('parentChangePageLeft')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ departmentName: '', pid: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
      departmentName: [
        { required: true, message: '请填写部门名称', trigger: 'blur' }
      ]
    })
    const departmentList = ref([])
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      proxy.$api.get('commonRoot', '/module/department/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          departmentList.value = arrRemoveEmptyChildren(r.data.data)
        }
      })
      dataObj.value = util.value.deepClone(props.obj)
    }
    init()
    /**
    * @desc 保存
    */
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/module/department/insert', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePageLeft()
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          } else if (props.method === 'edit') {
            proxy.$api.post('commonRoot', '/module/department/update', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePageLeft()
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
    return { showModel, formValidate, dataObj, ruleValidate, departmentList, init, save }
  }
}
</script>
