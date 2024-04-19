<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="设备编号" path="deviceCode">
        <n-input v-model:value="dataObj.deviceCode" placeholder="请输入设备编号" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="设备名称" path="deviceName">
        <n-input v-model:value="dataObj.deviceName" placeholder="请输入设备名称" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="设备厂家">
        <n-input v-model:value="dataObj.manufacturer" placeholder="请输入设备厂家" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="进厂时间">
        <n-input v-model:value="dataObj.intoFactoryDate" placeholder="请输入进厂时间" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="设备型号">
        <n-input v-model:value="dataObj.deviceModel" placeholder="请输入设备型号" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="dataObj.sort" placeholder="请输入排序" :disabled="method === 'view'"></n-input-number>
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
    leftObj: Object,
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, arrRemoveEmptyChildren } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ deviceCode: '', deviceName: '', manufacturer: '', intoFactoryDate: '', deviceModel: '', sort: null, workStationId: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
      deviceCode: [
        { required: true, message: '请填写设备编号', trigger: 'blur' }
      ],
      deviceName: [
        { required: true, message: '请填写设备名称', trigger: 'blur' }
      ],
      sort: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' }
      ]
    })
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      dataObj.value = util.value.deepClone(props.obj)
      if (props.method === 'add') {
        dataObj.value.workStationId = props.leftObj!.workStationId
      }
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
            proxy.$api.post('commonRoot', '/mes/device/web/insert', dataObj.value, (r: IInterfaceData) => {
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
            proxy.$api.post('commonRoot', '/mes/device/web/update', dataObj.value, (r: IInterfaceData) => {
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
    return { showModel, formValidate, dataObj, ruleValidate, init, save }
  }
}
</script>
