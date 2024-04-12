<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 1400px;" :mask-closable="false" :close-on-esc="false">
  <n-tabs type="card">
    <n-tab-pane name="运行数据绑定">
      <div class="fun-btn">
        <n-button type="primary" @click="add">
          <template #icon>
            <n-icon size="17">
              <add />
            </n-icon>
          </template>新增
        </n-button>
      </div>
      <table-page :loading="loading" :tableHeight="520" :showPage="false" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
    </n-tab-pane>
    <n-tab-pane name="状态数据绑定">
      <device-data-from :deviceId="obj.deviceId"></device-data-from>
    </n-tab-pane>
    <n-tab-pane name="设备报警">
      <alarm-setting-list :obj="obj"></alarm-setting-list>
    </n-tab-pane>
    <n-tab-pane name="历史数据">
      <device-data-history :obj="obj"></device-data-history>
    </n-tab-pane>
  </n-tabs>
  <n-modal title="数据持久化" v-model:show="storageModal" preset="card" style="width: 600px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-form">
      <div class="table-tip">开启数据持久化后，历史数据将会写入数据库中，请注意数据存储盘剩余空间大小。</div>
      <n-form ref="formValidate" :model="storageObj" label-placement="left" label-width="90px" require-mark-placement="left">
        <n-form-item label="持久化方式">
          <n-select v-model:value="storageObj.deviceDataStorageType" placeholder="请选择设持久化方式" filterable clearable :options="deviceDataStorageTypeList" value-field="id" label-field="text"></n-select>
        </n-form-item>
        <n-form-item label="循环秒数" v-show="storageObj.deviceDataStorageType === 'Cycle'">
          <n-input-number v-model:value="storageObj.saveCycleSecond" :min="1" placeholder="请输入循环秒数"></n-input-number>
        </n-form-item>
      </n-form>
      <div class="modal-btn">
        <n-button type="primary" @click="saveStorage()">确定</n-button>
      </div>
    </div>
  </n-modal>
  <n-modal title="数据写入" v-model:show="setDataModal" preset="card" style="width: 400px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-form">
      <n-form ref="formValidate" :model="setDataObj" label-placement="left" label-width="60px" require-mark-placement="left">
        <n-form-item label="写入值">
          <n-input v-model:value="setDataObj.value" placeholder="请输入写入值"></n-input>
        </n-form-item>
      </n-form>
      <div class="modal-btn">
        <n-button type="primary" @click="setData()">确定</n-button>
      </div>
    </div>
  </n-modal>
  <n-modal title="二次授权" v-model:show="loginModal" preset="card" style="width: 400px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-form">
      <div class="table-tip">您不能向设备写入数据，请输入账号密码进行二次授权。<br>每次授权时长为10分钟。</div>
      <n-form ref="formValidate" :model="loginObj" label-placement="left" label-width="60px" require-mark-placement="left">
        <n-form-item label="用户名">
          <n-input v-model:value="loginObj.userName" placeholder="请输入用户名"></n-input>
        </n-form-item>
        <n-form-item label="密码">
          <n-input v-model:value="loginObj.userPassword" type="password" placeholder="请输入密码"></n-input>
        </n-form-item>
      </n-form>
      <div class="modal-btn">
        <n-button type="primary" @click="login()">确定</n-button>
      </div>
    </div>
  </n-modal>
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import deviceDataCom from './deviceDataCom.vue' // 弹窗组件
import deviceDataFrom from './deviceDataFrom.vue'
import alarmSettingList from './alarmSettingList.vue'
import deviceDataHistory from './deviceDataHistory.vue'
import transmiterManagement from './transmiterManagement.vue'
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    method: String // 方法
  },
  components: { deviceDataFrom, alarmSettingList, deviceDataHistory, tablePage, Add },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    type RowData = {
      sort: number
      dataName: string
      dataNote: string
      dataUnit: string
      value: string
      updateDate: string
      deviceDataStorageType: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '排序',
        key: 'sort',
        width: 70
      },
      {
        title: '参数名称',
        key: 'dataName',
        minWidth: 140
      },
      {
        title: '参数描述',
        key: 'dataNote',
        minWidth: 180,
        tooltip: true
      },
      {
        title: '参数单位',
        key: 'dataUnit',
        width: 120,
        align: 'center'
      },
      {
        title: '当前值',
        key: 'value',
        width: 120
      },
      {
        title: '值时间',
        key: 'updateDate',
        width: 170,
        render: (row: RowData): any => {
          let temp = ''
          if (!util.value.isEmpty(row.updateDate)) {
            temp = row.updateDate.substring(0, 19)
          }
          return h('div', temp)
        }
      },
      {
        title: '数据持久化',
        key: 'deviceDataStorageType',
        width: 110,
        align: 'center',
        render: (row: RowData): any => {
          return h('a', {
            href: 'javascript:void()',
            style: {
              color: row.deviceDataStorageType !== 'Disable' ? '#00CC33' : '#CC3333'
            },
            onClick: () => {
              setStorage(row)
            }
          }, row.deviceDataStorageType !== 'Disable' ? '是' : '否')
        }
      },
      {
        title: '写入',
        key: 'deviceDataStorageType',
        width: 90,
        align: 'center',
        render: (row: RowData): any => {
          return h('a', {
            href: 'javascript:void()',
            style: {
            },
            onClick: () => {
              openSetData(row)
            }
          }, '写入')
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        render: (row: RowData): any => {
          return h('div', [
            h('a', {
              href: 'javascript:void(0)',
              style: {
                marginRight: '20px'
              },
              class: 'edit',
              onClick: () => openTransmiter(row)
            }, '数据转发'),
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
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      proxy.$api.get('commonRoot', '/dsa/api/data/enum/DeviceDataStorageType', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const key in r.data.data) {
            if (Object.prototype.hasOwnProperty.call(r.data.data, key)) {
              deviceDataStorageTypeList.value.push({ id: key, text: r.data.data[key] })
            }
          }
        }
      })
    }
    init()
    /**
    * @desc 改变页码
    * @param {Number} current 当前页码
    * @param {Number} pageSize 每页显示数
    */
    function changePage (current: number, pageSize: number) {
      loading.value = true
      let obj = { page: current, limit: pageSize, deviceId: props.obj.deviceId }
      proxy.$api.get('commonRoot', '/mes/device/data/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(deviceDataCom)
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增设备数据', method: 'add', visible: true, obj: { deviceId: props.obj.deviceId } })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改设备数据', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此设备数据？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/mes/device/data/web/delete', { id: row.deviceDataId }, (r: IInterfaceData) => {
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
    /**
    * @desc 数据转发
    */
    const transmiterDialog = useCommandComponent(transmiterManagement)
    function openTransmiter (row: any) {
      transmiterDialog({ title: row.dataName + '数据转发管理', visible: true, obj: row })
    }
    let storageModal = ref(false)
    let storageObj = ref({ deviceDataStorageType: '', saveCycleSecond: null, deviceDataId: '' })
    let deviceDataStorageTypeList = ref<Array<{ id: string, text: string }>>([])
    /**
    * @desc 数据持久化
    */
    function setStorage (row: any) {
      if (row.deviceDataStorageType !== 'Disable') {
        proxy.$myMessage({
          type: 'info',
          submitText: '确定关闭',
          MessageTitle: '为了防止您误删除历史数据，系统将不会删除数据库中的数据，只会停止数据存储入磁盘。',
          submit: () => {
            proxy.$myLoading.show()
            proxy.$api.post('commonRoot', '/dsa/api/data/storageModel/web/disable', { deviceDataId: row.deviceDataId }, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('关闭成功')
                proxy.$refs.tablePage.changePage()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          }
        })
      } else {
        storageObj.value = { deviceDataStorageType: '', saveCycleSecond: null, deviceDataId: row.deviceDataId }
        storageModal.value = true
      }
    }
    function saveStorage () {
      if (util.value.isEmpty(storageObj.value.deviceDataStorageType)) {
        proxy.$myMessage.error1('请选择持久化方式')
        return false
      }
      if (util.value.isEmpty(storageObj.value.saveCycleSecond) && storageObj.value.deviceDataStorageType === 'Cycle') {
        proxy.$myMessage.error1('请填写秒数')
        return false
      }
      proxy.$myLoading.show()
      proxy.$api.post('commonRoot', '/dsa/api/data/storageModel/web/enable', storageObj.value, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('开启成功')
          proxy.$refs.tablePage.changePage()
          storageModal.value = false
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        proxy.$myLoading.close()
      })
    }
    let setDataModal = ref(false)
    let setDataObj = ref({ value: '', deviceDataId: '', twiceAuthToken: '' })
    let loginModal = ref(false)
    let loginObj = ref({ userName: '', userPassword: '' })
    function openSetData (row: any) {
      setDataObj.value = { value: '', deviceDataId: row.deviceDataId, twiceAuthToken: sessionStorage.token }
      setDataModal.value = true
    }
    function setData () {
      if (util.value.isEmpty(setDataObj.value.value)) {
        proxy.$myMessage.error1('请填写数值')
        return false
      }
      proxy.$myLoading.show()
      proxy.$api.post('commonRoot', '/mes/device/data/web/setData', setDataObj.value, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('操作成功')
          proxy.$refs.tablePage.changePage()
          setDataModal.value = false
        } else {
          proxy.$myMessage.error1(r.data.msg)
          if (r.data.msg.includes('二次授权')) {
            setDataModal.value = false
            loginObj.value = { userName: '', userPassword: '' }
            loginModal.value = true
          }
        }
        proxy.$myLoading.close()
      })
    }
    function login () {
      if (util.value.isEmpty(loginObj.value.userName)) {
        proxy.$myMessage.error1('请填写用户名')
        return false
      }
      if (util.value.isEmpty(loginObj.value.userPassword)) {
        proxy.$myMessage.error1('请填写密码')
        return false
      }
      proxy.$myLoading.show()
      proxy.$api.get('commonRoot', '/module/twiceAuth/create', loginObj.value, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('授权成功，授权时长为10分钟')
          sessionStorage.token = r.data.data.twiceAuthToken
          loginModal.value = false
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        proxy.$myLoading.close()
      })
    }
    return { showModel, loading, totalRows, data, searchArr, tableHeight, search, columns, init, changePage, add, storageModal, storageObj, deviceDataStorageTypeList,
      saveStorage, setDataModal, setDataObj, setData, loginModal, loginObj, login }
  }
}
</script>
