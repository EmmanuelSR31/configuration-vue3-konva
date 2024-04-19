<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 600px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="110px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="转发方式" path="deviceDataTransmitType">
        <n-select v-model:value="dataObj.deviceDataTransmitType" placeholder="请选择转发方式" filterable clearable :options="deviceDataTransmitTypeList" value-field="id" label-field="text"></n-select>
      </n-form-item>
      <n-form-item label="目标地址" v-show="['HTTP_POST', 'UDP'].includes(dataObj.deviceDataTransmitType)">
        <n-input v-model:value="dataObj.targetUrl" v-if="['HTTP_POST'].includes(dataObj.deviceDataTransmitType)" placeholder="示例：http://目标IP:目标端口/接口路径" :disabled="method === 'view'"></n-input>
        <n-input v-model:value="dataObj.targetUrl" v-if="['UDP'].includes(dataObj.deviceDataTransmitType)" placeholder="示例：127.0.0.1:8080" :disabled="method === 'view'"></n-input>
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
    deviceId: String,
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ deviceDataTransmitType: '', targetUrl: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
      deviceDataTransmitType: [
        { required: true, message: '请选择转发方式', trigger: 'change' }
      ]
    })
    let deviceDataTransmitTypeList = ref<Array<{ id: string, text: string }>>([])
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceDataTransmitType', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceDataTransmitTypeList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        }
      })
      showModel.value = true
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
          proxy.$api.post('commonRoot', '/mes/device/data/transmiter/web/insert', dataObj.value, (r: IInterfaceData) => {
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
      })
    }
    return { showModel, formValidate, dataObj, ruleValidate, deviceDataTransmitTypeList, init, save }
  }
}
</script>
