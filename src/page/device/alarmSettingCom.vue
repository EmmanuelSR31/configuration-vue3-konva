<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 600px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="110px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="报警描述" path="alarmNote">
        <n-input v-model:value="dataObj.alarmNote" placeholder="请输入报警描述" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="设备数据" path="dataId">
        <n-select v-model:value="dataObj.dataId" placeholder="请选择设备数据" filterable clearable :options="deviceDataList" value-field="deviceDataId" label-field="dataName"></n-select>
      </n-form-item>
      <n-form-item label="报警级别">
        <n-select v-model:value="dataObj.deviceAlarmLevel" placeholder="请选择报警级别" filterable clearable :options="deviceAlarmLevelList" value-field="id" label-field="text"></n-select>
      </n-form-item>
      <n-form-item label="报警触发模式">
        <n-select v-model:value="dataObj.deviceAlarmTigMode" placeholder="请选择报警触发模式" filterable clearable :options="deviceAlarmTigModeList" value-field="id" label-field="text"></n-select>
      </n-form-item>
      <n-form-item label="X值" v-show="['BigegrThanX', 'BiggerThanXAndLessThanY', 'LessThanXOrBiggerThanY', 'EqualX', 'EqualXTimeoutS'].includes(dataObj.deviceAlarmTigMode)">
        <n-input v-model:value="dataObj.x" placeholder="请输入X值" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="Y值" v-show="['LessThanY', 'BiggerThanXAndLessThanY', 'LessThanXOrBiggerThanY'].includes(dataObj.deviceAlarmTigMode)">
        <n-input v-model:value="dataObj.y" placeholder="请输入Y值" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="秒数" v-show="['EqualXTimeoutS'].includes(dataObj.deviceAlarmTigMode)">
        <n-input v-model:value="dataObj.second" placeholder="请输入秒数" :disabled="method === 'view'"></n-input>
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
    let dataObj = ref({ alarmNote: '', dataId: '', deviceAlarmLevel: '', deviceAlarmTigMode: '', x: '', y: '', second: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
      alarmNote: [
        { required: true, message: '请填写报警描述', trigger: 'blur' }
      ],
      dataId: [
        { required: true, message: '请选择设备数据', trigger: 'change' }
      ]
    })
    let deviceAlarmLevelList = ref<Array<{ id: string, text: string }>>([])
    let deviceAlarmTigModeList = ref<Array<{ id: string, text: string }>>([])
    let deviceDataList = ref<Array<any>>([])
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceAlarmLevel', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceAlarmLevelList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        }
      })
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceAlarmTigMode', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceAlarmTigModeList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        }
      })
      proxy.$api.get('commonRoot', '/mes/device/data/web/list', { deviceId: props.obj.deviceId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceDataList.value = r.data.data
        } else {
          proxy.$myMessage.error1(r.data.msg)
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
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/mes/device/alarm/setting/web/insert', dataObj.value, (r: IInterfaceData) => {
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
            proxy.$api.post('commonRoot', '/mes/device/alarm/setting/web/update', dataObj.value, (r: IInterfaceData) => {
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
    return { showModel, formValidate, dataObj, ruleValidate, deviceAlarmLevelList, deviceAlarmTigModeList, deviceDataList, init, save }
  }
}
</script>
