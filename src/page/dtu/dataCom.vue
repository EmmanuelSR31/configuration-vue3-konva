<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="100px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="寄存器地址" path="dtuChildDataName">
        <n-input v-model:value="dataObj.dtuChildDataName" placeholder="请输入寄存器地址" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="数据描述">
        <n-input v-model:value="dataObj.dtuChildDataNote" placeholder="请输入数据描述" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="数据类型">
        <n-select v-model:value="dataObj.deviceDataType" placeholder="请选择数据类型" :options="deviceDataTypeList" value-field="id" label-field="text"></n-select>
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
    let { util, showModel } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ dtuChildDataName: '', dtuChildDataNote: '', deviceDataType: '' }) // 数据对象
    let deviceDataTypeList = ref<Array<{ id: string, text: string }>>([])
    const ruleValidate = ref({ // 表单验证
      dtuChildDataName: [
        { required: true, message: '请填写寄存器地址', trigger: 'blur' }
      ]
    })
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceDataType', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceDataTypeList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      showModel.value = true
      dataObj.value = util.value.deepClone(props.obj)
    }
    init()
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/dsa/api/dtu/child/data/web/insert', dataObj.value, (r: IInterfaceData) => {
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
            proxy.$api.post('commonRoot', '/dsa/api/dtu/child/data/web/update', dataObj.value, (r: IInterfaceData) => {
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
      showModel, formValidate, dataObj, deviceDataTypeList, ruleValidate, init, save
    }
  }
}
</script>
