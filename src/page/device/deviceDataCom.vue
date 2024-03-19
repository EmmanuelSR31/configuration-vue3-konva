<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 1100px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form-2">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="参数名称" path="dataName">
        <n-input v-model:value="dataObj.dataName" placeholder="请输入参数名称" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="参数描述">
        <n-input v-model:value="dataObj.dataNote" placeholder="请输入参数描述" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="参数单位">
        <n-input v-model:value="dataObj.dataUnit" placeholder="请输入参数单位" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="数据类型">
        <n-select v-model:value="dataObj.dataType" placeholder="请选择数据类型" :options="deviceDataTypeList" value-field="id" label-field="text"></n-select>
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input v-model:value="dataObj.sort" placeholder="请输入排序" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="数采终端" path="dtuId">
        <n-select v-model:value="dataObj.dtuId" @update:value="selectDtu" placeholder="请选择数采终端" filterable :options="dtuList" value-field="dtuId" label-field="dtuName"></n-select>
      </n-form-item>
      <n-form-item label="子设备" path="dtuChildId">
        <n-select v-model:value="dataObj.dtuChildId" @update:value="selectDtuChild" placeholder="请选择子设备" filterable :options="dtuChildList" value-field="dtuChildId" label-field="dtuChildName"></n-select>
      </n-form-item>
      <n-form-item label="寄存器" path="dtuChildDataId">
        <n-select v-model:value="dataObj.dtuChildDataId" @update:value="selectDtuChildData" placeholder="请选择寄存器" filterable :options="dtuChildDataList" value-field="dtuChildDataId" label-field="dtuChildDataName"></n-select>
      </n-form-item>
      <n-form-item label=" ">
        实时值：{{dataVal}}
      </n-form-item>
      <n-form-item label="变换公式" style="width: 100%;">
        <codemirror :modelValue="dataObj.formula" @change="codemirrorChange" :indent-with-tab="true" :tab-size="2" ref="coder" />
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
import { Codemirror } from 'vue-codemirror'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    deviceId: String,
    method: String // 方法
  },
  components: { Codemirror },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ dataName: '', dataNote: '', dataUnit: '', dataType: '', dtuId: '', dtuChildId: '', dtuChildDataId: '', sort: null, deviceId: '', formula: '' }) // 数据对象
    const ruleValidate = reactive({ // 表单验证
      dataName: [
        { required: true, message: '请填写参数名称', trigger: 'blur' }
      ],
      sort: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' }
      ],
      dtuId: [
        { required: true, message: '请选择数采终端', trigger: 'change' }
      ],
      dtuChildId: [
        { required: true, message: '请选择子设备', trigger: 'change' }
      ],
      dtuChildDataId: [
        { required: true, message: '请选择寄存器', trigger: 'change' }
      ]
    })
    let deviceDataTypeList = ref<Array<{ id: string, text: string }>>([])
    let dtuAllList = ref<Array<any>>([])
    let dtuList = ref<Array<any>>([])
    let dtuChildList = ref<Array<any>>([])
    let dtuChildDataList = ref<Array<any>>([])
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
      proxy.$api.get('commonRoot', '/dsa/api/dtu/web/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuAllList.value = r.data.data
          for (const iterator of dtuAllList.value) {
            dtuList.value.push({ dtuId: iterator.dtuId, dtuName: iterator.dtuName })
          }
          if (props.method !== 'add') {
            if (!util.value.isEmpty(dataObj.value.dtuId) && dtuList.value.length > 0) {
              selectDtu(dataObj.value.dtuId)
            }
            if (!util.value.isEmpty(dataObj.value.dtuChildId)) {
              selectDtuChild(dataObj.value.dtuChildId, {}, true)
            }
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      showModel.value = true
      if (props.method === 'add') {
        dataObj.value = util.value.deepClone(props.obj)
      } else {
        proxy.$api.get('commonRoot', '/mes/device/data/web/one', { id: props.obj.deviceDataId }, (r: IInterfaceData) => {
          if (r.data.code === 0) {
            dataObj.value = r.data.data
            dataObj.value.dtuId = r.data.data.dtuDataLinker.dtuChildData.dtuId
            dataObj.value.dtuChildId = r.data.data.dtuDataLinker.dtuChildData.dtuChildId
            dataObj.value.dtuChildDataId = r.data.data.dtuDataLinker.dtuChildDataId
            if (!util.value.isEmpty(dataObj.value.dtuId) && dtuList.value.length > 0) {
              selectDtu(dataObj.value.dtuId)
            }
            if (!util.value.isEmpty(dataObj.value.dtuChildId)) {
              selectDtuChild(dataObj.value.dtuChildId, {}, true)
            }
          } else {
            proxy.$myMessage.error1(r.data.msg)
          }
        })
      }
    }
    init()
    function selectDtu (value: string) {
      dtuChildList.value = dtuAllList.value.find((ele: any) => ele.dtuId === value).children
      dataObj.value.dtuChildId = ''
      dataObj.value.dtuChildDataId = ''
    }
    function selectDtuChild (value: string, option: any, flag = false) {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/child/data/web/list', { dtuChildId: value }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuChildDataList.value = r.data.data
          if (flag && !util.value.isEmpty(dataObj.value.dtuChildDataId)) {
            selectDtuChildData(dataObj.value.dtuChildDataId)
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    let dataVal = ref('')
    function selectDtuChildData (value: string) {
      dataVal.value = dtuChildDataList.value.find(ele => ele.dtuChildDataId === value).dtuChildDataValue
    }
    function codemirrorChange (e) {
      dataObj.value.formula = e
    }
    /**
    * @desc 保存
    */
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/mes/device/data/web/insert', dataObj.value, (r: IInterfaceData) => {
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
            proxy.$api.post('commonRoot', '/mes/device/data/web/update', dataObj.value, (r: IInterfaceData) => {
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
    return { showModel, formValidate, dataObj, ruleValidate, deviceDataTypeList, dtuList, dtuChildList, dtuChildDataList, selectDtu, selectDtuChild, selectDtuChildData,
      dataVal, codemirrorChange, init, save }
  }
}
</script>
