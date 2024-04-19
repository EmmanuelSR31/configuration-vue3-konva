<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 1300px;" :mask-closable="false" :close-on-esc="false">
  <div class="child-device-con">
    <div class="child-device" @click="selectChild(item, index)" v-for="(item, index) in childData" :key="item.dtuChildId">
      <div class="child-device-img">
        <img v-if="item.relativePath !== null && item.relativePath !== undefined" :src="uploadRoot + '/' + item.relativePath">
        <div v-else class="child-device-empty"></div>
      </div>
      <div class="child-device-name">{{item.dtuChildName}}</div>
      <div class="child-device-selected" v-if="dataObj.dtuChildId === item.dtuChildId">
        <n-icon size="24"><check-outlined /></n-icon>
      </div>
    </div>
    <template v-if="childData.length < 6">
      <div class="child-device" @click="selectEmptyChild(i + childData.length)" v-for="i in (6 - childData.length)" :key="i">
        <div class="child-device-img">
          <div class="child-device-empty">未定义</div>
        </div>
        <div class="child-device-name">设备{{i + childData.length}}</div>
        <div class="child-device-selected" v-if="childIndex === (i + childData.length - 1)">
          <n-icon size="24"><check-outlined /></n-icon>
        </div>
      </div>
    </template>
  </div>
  <div class="modal-form-3">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <n-form-item label="设备型号" path="dtuChildTypeEnum">
        <n-select v-model:value="dataObj.dtuChildTypeEnum" placeholder="请选择设备型号" :options="dtuChildTypeArr" value-field="id" label-field="text"></n-select>
      </n-form-item>
      <n-form-item label="别名" path="dtuChildName">
        <n-input v-model:value="dataObj.dtuChildName" placeholder="请输入别名"></n-input>
      </n-form-item>
      <n-form-item label="采集周期">
        <n-input-number v-model:value="dataObj.cycleSecond" :min="1" placeholder="请输入采集周期" style="width: 120px;" />
      </n-form-item>
      <n-form-item label="串口号" v-if="typeIncludes('WEIGH')" style="width: 100%;">
        <div style="width: 100%;display: flex;align-items: center;">
          <n-select v-model:value="dataObj.serialPort" placeholder="请选择串口号" :options="portList" value-field="id" label-field="text" style="width: 140px;"></n-select>
          <div style="display: flex;font-size: 14px;align-items: center;margin-left: 20px;color: #999;"><n-icon size="22"><info-circle-outlined /></n-icon>提示：腾飞T1000默认波特率为1200</div>
          <div style="width: 140px;margin-left: 190px;text-align: right;">
            <n-button type="primary" @click="save">保存</n-button>
            <n-button v-if="dataObj.dtuChildId !== null && dataObj.dtuChildId !== undefined && dataObj.dtuChildId !== ''" type="warning" style="margin-left: 20px;" @click="delChild">删除</n-button>
          </div>
        </div>
      </n-form-item>
      <n-form-item label="子设备IP" v-else style="width: 100%;">
        <div style="display: flex;align-items: center;">
          <n-input v-model:value="dataObj.dtuChildIp" placeholder="请输入IP" style="width: 180px;"></n-input>&nbsp;&nbsp;&nbsp;
          <n-input-number v-model:value="dataObj.dtuChildPort" placeholder="请输入端口" style="width: 100px;"></n-input-number>&nbsp;&nbsp;&nbsp;
          <n-button type="primary" v-show="method === 'edit'" @click="connectTest">连接测试</n-button>
        </div>
        <template v-if="typeIncludes('PLC_DELTA') || typeIncludes('PLC_FATEK')">
          &nbsp;&nbsp;&nbsp;站号&nbsp;<n-input v-model:value="dataObj.stationId" style="width: 100px;"></n-input>&nbsp;&nbsp;&nbsp;
        </template>
        <div style="display: flex;font-size: 14px;align-items: center;margin-left: 20px;color: #999;"><n-icon size="22"><info-circle-outlined /></n-icon>示例：192.168.1.1&nbsp;&nbsp;101</div>
        <div style="width: 140px;margin-left: 50px;text-align: right;">
          <n-button type="primary" @click="save">保存</n-button>
          <n-button v-if="dataObj.dtuChildId !== null && dataObj.dtuChildId !== undefined && dataObj.dtuChildId !== ''" type="warning" style="margin-left: 20px;" @click="delChild">删除</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
  <n-divider />
  <div>
    <div class="fun-btn">
      <n-button type="primary" @click="add" v-if="!typeIncludes('TENGFEI')">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增
      </n-button>
      <div style="float: right;font-size: 16px;">数据：{{data.length}}个</div>
    </div>
    <table-page :loading="loading" :tableHeight="200" :showPage="false" :firstLoad="false" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
    <div class="modal-btn" style="position: relative;">
      <n-button type="primary" @click="paraSet">参数下发</n-button>
      <div class="table-tip" style="position: absolute;left: 56%;top: 7px;margin-bottom: 0;display: flex;align-items: center;">
        <n-icon size="22"><info-circle-outlined /></n-icon>参数设定后，通过参数下发按钮将设置参数下发至采集器。
      </div>
    </div>
  </div>
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import dataCom from './dataCom.vue' // 弹窗组件
import { tablePage } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide, inject, onBeforeUnmount } from 'vue'
import { FormInst } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { InfoCircleOutlined, CheckOutlined } from '@vicons/antd'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any // 数据
  },
  components: { tablePage, Add, InfoCircleOutlined, CheckOutlined },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, uploadRoot } = common()
    let { loading, totalRows, data } = table()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    type IDataObj = {
      dtuId?: string
      dtuChildId: string
      dtuChildName?: string
      dtuChildTypeEnum?: string
      cycleSecond: number | null
      serialPort?: string
      dtuChildIp?: string
      dtuChildPort?: number | null
      stationId?: string
    }
    let dataObj = ref<IDataObj>({ dtuChildId: '', cycleSecond: null, dtuChildPort: null }) // 数据对象
    let method = ref('')
    const ruleValidate = ref({ // 表单验证
      dtuChildTypeEnum: [
        { required: true, message: '请选择设备型号', trigger: 'change' }
      ],
      dtuChildName: [
        { required: true, message: '请填写别名', trigger: 'blur' }
      ]
    })
    let dtuChildTypeList = ref<any>({})
    let dtuChildTypeArr = ref<Array<{ id: string, text: string }>>([])
    let portList = ref([{ id: 'COM1', text: 'COM1' }, { id: 'COM1', text: 'COM1' }])
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/enum/DtuChildTypeEnum', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuChildTypeList.value = r.data.data
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              dtuChildTypeArr.value.push({ id: key, text: r.data.data[key] })
            }
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      showModel.value = true
      getChildData(true)
    }
    init()
    let childData = ref<Array<any>>([])
    let childIndex = ref<number | null>(null)
    function getChildData (firstFlag: boolean) {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/child/web/list', { dtuId: props.obj.dtuId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          childData.value = r.data.data
          if (firstFlag) {
            if (childData.value.length > 0) {
              dataObj.value = childData.value[0]
              childIndex.value = 0
              proxy.$refs.tablePage.changePage()
              method.value = 'edit'
              initSocket()
            } else {
              dataObj.value = { dtuChildId: '', cycleSecond: null, dtuChildPort: null }
              childIndex.value = 0
              method.value = 'add'
            }
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    function selectChild (item: any, index: number) {
      if (dataObj.value.dtuChildId !== item.dtuChildId) {
        dataObj.value = item
        childIndex.value = index
        proxy.$refs.tablePage.changePage()
        method.value = 'edit'
        exitFlag.value = true
        if (websocket.value !== null) {
          websocket.value.close()
          websocket.value = null
        }
        setTimeout(() => {
          exitFlag.value = false
          initSocket()
        }, 5000)
      }
    }
    function selectEmptyChild (i: number) {
      if (childIndex.value !== (i - 1)) {
        dataObj.value = { dtuId: '', dtuChildId: '', dtuChildName: '', dtuChildTypeEnum: '', cycleSecond: null, serialPort: '', dtuChildIp: '', dtuChildPort: null, stationId: '' }
        childIndex.value = i - 1
        data.value = []
        method.value = 'add'
      }
    }
    let websocket = ref<any>(null)
    let exitFlag = ref(false)
    function initSocket () {
      websocket.value = new WebSocket(uploadRoot.value.replace('http://', 'ws://') + '/websocket/das/web/dtu/' + sessionStorage.token)
      websocket.value.onopen = (e: any) => {
        console.log('dtuonopen')
      }
      websocket.value.onerror = (e: any) => {
        console.log('onerror')
        console.log(e)
      }
      websocket.value.onmessage = (e: any) => {
        // console.log('onmessage')
        // console.log(e.data)
        if (!util.value.isEmpty(e.data)) {
          let temp = JSON.parse(e.data).data
          if (util.value.isType(temp, 'array')) {
            data.value = temp
          } else if (util.value.isType(temp, 'object')) {
            let i = data.value.findIndex(ele => ele.dtuId === temp.dtuId)
            if (i !== -1) {
              data.value.splice(i, 1, temp)
            }
          }
        }
      }
      websocket.value.onclose = (e: any) => {
        console.log('dtuonclose')
        if (!exitFlag.value) {
          setTimeout(() => {
            initSocket()
          }, 5000)
        }
      }
    }
    function connectTest () {
      proxy.$api.post('commonRoot', '/dsa/api/dtu/child/connectTest', { dtuChildId: dataObj.value.dtuChildId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success(r.data.msg)
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (method.value === 'add') {
            dataObj.value.dtuId = props.obj.dtuId
            proxy.$api.post('commonRoot', '/dsa/api/dtu/child/web/insert', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                dataObj.value = r.data.data
                method.value = 'edit'
                getChildData(false)
                proxy.$refs.tablePage.changePage()
                parentChangePage()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          } else if (method.value === 'edit') {
            proxy.$api.post('commonRoot', '/dsa/api/dtu/child/web/update', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                proxy.$refs.tablePage.changePage()
                parentChangePage()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          }
        }
      })
    }
    function delChild () {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此子设备？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/dsa/api/dtu/child/web/delete', { id: dataObj.value.dtuChildId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              getChildData(true)
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
            proxy.$myLoading.close()
          })
        }
      })
    }
    type RowData = {
      dtuChildDataId: string
      dtuChildDataName: string
      dtuChildDataNote: string
      deviceDataType: string
      dtuChildDataValue: string
      updateDate: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '数据ID',
        key: 'dtuChildDataId',
        width: 200
      },
      {
        title: '寄存器地址',
        key: 'dtuChildDataName'
      },
      {
        title: '数据描述',
        key: 'dtuChildDataNote',
        tooltip: true
      },
      {
        title: '数据类型',
        key: 'deviceDataType',
        width: 110,
        align: 'center'
      },
      {
        title: '当前值',
        key: 'dtuChildDataValue',
        width: 100,
        align: 'center'
      },
      {
        title: '值时间',
        key: 'updateDate',
        render: (row: RowData): any => {
          let temp = ''
          if (!util.value.isEmpty(row.updateDate)) {
            temp = row.updateDate.substring(0, 19)
          }
          return h('div', temp)
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 140,
        align: 'center',
        render: (row: RowData): any => {
          return h('div', [
            h('a', {
              href: 'javascript:void(0)',
              style: {
                marginRight: '20px'
              },
              class: 'edit',
              onClick: () => edit(row)
            }, '修改'),
            h('a', {
              href: 'javascript:void(0)',
              style: {
              },
              class: 'del',
              onClick: () => del(row)
            }, '删除')
          ])
        }
      }
    ])
    /**
    * @desc 改变页码
    * @param {Number} current 当前页码
    * @param {Number} pageSize 每页显示数
    */
    function changePage (current: number, pageSize: number) {
      loading.value = true
      let obj = { page: current, limit: pageSize, dtuChildId: dataObj.value.dtuChildId }
      proxy.$api.get('commonRoot', '/dsa/api/dtu/child/data/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(dataCom)
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增数据', method: 'add', visible: true, obj: { dtuChildId: dataObj.value.dtuChildId } })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改数据', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此数据？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/dsa/api/dtu/child/data/web/delete', { id: row.dtuChildDataId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              proxy.$refs.tablePage.changePage()
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
            proxy.$myLoading.close()
          })
        }
      })
    }
    function paraSet () {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定参数下发？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/dsa/api/dtu/paraSet', { dtuId: props.obj.dtuId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('操作成功')
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
            proxy.$myLoading.close()
          })
        }
      })
    }
    function typeIncludes (str: string) {
      let temp = false
      if (!util.value.isEmpty(dataObj.value.dtuChildTypeEnum)) {
        if (dataObj.value.dtuChildTypeEnum?.includes(str)) {
          temp = true
        }
      }
      return temp
    }
    onBeforeUnmount(() => {
      exitFlag.value = true
      if (websocket.value !== null) {
        websocket.value.close()
      }
    })
    return {
      showModel, uploadRoot, formValidate, dataObj, ruleValidate, loading, totalRows, data, method, dtuChildTypeList, dtuChildTypeArr, portList,
      childData, childIndex, init, selectChild, selectEmptyChild, connectTest, save, delChild, columns, changePage, add, paraSet, typeIncludes
    }
  }
}
</script>
<style lang="scss">
@import "../../style/dtu";
</style>
