<template>
  <div class="modal-form-2">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="100px" require-mark-placement="left">
      <div class="form-title">
        <span>运行状态数据绑定</span>
      </div>
      <n-form-item label="数采终端">
        <n-select v-model:value="dataObj.dtuId" @update:value="selectDtu" placeholder="请选择数采终端" filterable clearable :options="dtuList" value-field="dtuId" label-field="dtuName"></n-select>
      </n-form-item>
      <n-form-item label="子设备别名">
        <n-select v-model:value="dataObj.dtuChildId" @update:value="selectDtuChild" placeholder="请选择子设备" filterable clearable :options="dtuChildList" value-field="dtuChildId" label-field="dtuChildName"></n-select>
      </n-form-item>
      <n-form-item label=" " style="width: 100%;">
        <div class="form-tip">
          <n-icon size="24"><info-circle-outlined /></n-icon>采集值 = 设定值时，表示该设备的状态切换到设定值代表的状态
        </div>
      </n-form-item>
      <n-form-item label="停止寄存器" style="width: 100%;">
        <n-select v-model:value="dataObj.powerOnDtuChildDataId" placeholder="请选择停止寄存器" filterable clearable :options="dtuChildDataList" value-field="dtuChildDataId" label-field="dtuChildDataName" style="width: 35%;margin-right: 3%;"></n-select>
        <n-select v-model:value="dataObj.startupCompareEnum" placeholder="请选择条件" clearable :options="deviceStateCompareEnumList" value-field="id" label-field="text" style="width: 25%;margin-right: 3%;"></n-select>
        <n-input v-model:value="dataObj.powerOnValue" placeholder="请输入值" style="width: 33%;"></n-input>
      </n-form-item>
      <n-form-item label="工作寄存器" style="width: 100%;">
        <n-select v-model:value="dataObj.powerOffDtuChildDataId" placeholder="请选择工作寄存器" filterable clearable :options="dtuChildDataList" value-field="dtuChildDataId" label-field="dtuChildDataName" style="width: 35%;margin-right: 3%;"></n-select>
        <n-select v-model:value="dataObj.workCompareEnum" placeholder="请选择条件" clearable :options="deviceStateCompareEnumList" value-field="id" label-field="text" style="width: 25%;margin-right: 3%;"></n-select>
        <n-input v-model:value="dataObj.powerOffValue" placeholder="请输入值" style="width: 33%;"></n-input>
      </n-form-item>
      <n-form-item label="报警寄存器" style="width: 100%;">
        <n-select v-model:value="dataObj.workDtuChildDataId" placeholder="请选择报警寄存器" filterable clearable :options="dtuChildDataList" value-field="dtuChildDataId" label-field="dtuChildDataName" style="width: 35%;margin-right: 3%;"></n-select>
        <n-select v-model:value="dataObj.alarmCompareEnum" placeholder="请选择条件" clearable :options="deviceStateCompareEnumList" value-field="id" label-field="text" style="width: 25%;margin-right: 3%;"></n-select>
        <n-input v-model:value="dataObj.workValue" placeholder="请输入值" style="width: 33%;"></n-input>
      </n-form-item>
    </n-form>
    <div class="modal-btn">
      <n-button type="primary" @click="save()">保存</n-button>
    </div>
  </div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref } from 'vue'
import { FormInst } from 'naive-ui'
import { InfoCircleOutlined } from '@vicons/antd'
export default {
  props: {
    deviceId: String
  },
  components: { InfoCircleOutlined },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ deviceId: '', dtuId: '', dtuChildId: '', powerOnDtuChildDataId: '', startupCompareEnum: '', powerOnValue: '', powerOffDtuChildDataId: '', workCompareEnum: '', powerOffValue: '', workDtuChildDataId: '', alarmCompareEnum: '', workValue: '' }) // 数据对象
    const ruleValidate = ref({ // 表单验证
    })
    let deviceStateCompareEnumList = ref<Array<{ id: string, text: string }>>([])
    let dtuAllList = ref<Array<any>>([])
    let dtuList = ref<Array<any>>([])
    let dtuChildList = ref<Array<any>>([])
    let dtuChildDataList = ref<Array<any>>([])
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/dsa/api/linker/enum/DeviceStateCompareEnum', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceStateCompareEnumList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      proxy.$api.get('commonRoot', '/dsa/api/dtu/web/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuAllList.value = r.data.data
          for (const iterator of dtuAllList.value) {
            dtuList.value.push({ dtuId: iterator.dtuId, dtuName: iterator.dtuName })
          }
          proxy.$api.get('commonRoot', '/dsa/api/linker/state/web/oneByDeviceId', { deviceId: props.deviceId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              if (!util.value.isEmpty(r.data.data)) {
                dataObj.value = r.data.data
                if (!util.value.isEmpty(dataObj.value.dtuId) && dtuList.value.length > 0) {
                  selectDtu(dataObj.value.dtuId)
                }
                if (!util.value.isEmpty(dataObj.value.dtuChildId)) {
                  selectDtuChild(dataObj.value.dtuChildId)
                }
              }
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
          })
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    init()
    function selectDtu (value: string) {
      dtuChildList.value = dtuAllList.value.find((ele: any) => ele.dtuId === value).children
    }
    function selectDtuChild (value: string) {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/child/data/web/list', { dtuChildId: value }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuChildDataList.value = r.data.data
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    /**
    * @desc 保存
    */
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          dataObj.value.deviceId = props.deviceId || ''
          proxy.$api.post('commonRoot', '/dsa/api/linker/state/web/insertOrUpdate', dataObj.value, (r: IInterfaceData) => {
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
    return { formValidate, dataObj, ruleValidate, deviceStateCompareEnumList, dtuList, dtuChildList, dtuChildDataList, selectDtu, selectDtuChild,
      init, save }
  }
}
</script>
