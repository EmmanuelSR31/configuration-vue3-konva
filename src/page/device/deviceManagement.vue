<template>
<div class="flex-con">
  <div class="box" style="width: 400px;">
    <div class="fun-btn">
      <n-button type="primary" @click="addLeft">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增车间
      </n-button>
    </div>
    <table-page :tableHeight="tableHeight + 50" :showPage="false" isTree treeID="departmentId" :columns="columnsLeft" :data="leftData" @change-page="getLeftData" @row-click="selectLeft" ref="leftTablePage"></table-page>
  </div>
  <div class="box" style="width: calc(100% - 420px);">
    <table-search :searchArr="searchArr" labelWidth="100px" :itemNumber="4" @search="search" ref="tebleSearch"></table-search>
    <div class="fun-btn">
      <n-button type="primary" @click="add">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增设备
      </n-button>
      <div style="float: right;display: flex;align-items: center;">
        <n-checkbox v-model:checked="refreshFlag" @update:checked="changeRefreshFlag"></n-checkbox>&nbsp;&nbsp;
        <n-input-number v-model:value="refreshTime" @update:value="changeRefreshFlag" :min="1" :show-button="false" style="width: 60px;" />&nbsp;秒刷新
      </div>
    </div>
    <table-page :loading="loading" :tableHeight="tableHeight + 50" :showPage="false" :firstLoad="false" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import deviceCom from './deviceCom.vue' // 弹窗组件
import deviceLeftCom from './deviceLeftCom.vue'
import deviceDataManagement from './deviceDataManagement.vue'
import runTimeCom from './runTimeCom.vue'
import { tablePage, tableSearch } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, onMounted, onBeforeUnmount, h, provide } from 'vue'
import { NDropdown, NIcon } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { DownOutlined } from '@vicons/antd'
export default {
  components: { tablePage, tableSearch, Add, DownOutlined },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    let deviceStateList = ref<{ [key: string]: string }>({})
    type RowData = {
      deviceCode: string
      deviceName: string
      deviceState: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '设备编号',
        key: 'deviceCode',
        width: 140,
        align: 'center'
      },
      {
        title: '设备名称',
        key: 'deviceName',
        minWidth: 140
      },
      {
        title: '设备状态',
        key: 'deviceState',
        width: 120,
        align: 'center',
        render: (row: RowData) => {
          let colors = ref<{ [key: string]: string }>({ 'Startup': '#FFFF66', 'Work': '#00CC33', 'OffLine': '#CC0033' })
          let color = colors.value[row.deviceState]
          return h('div', {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }, [
            h('span', deviceStateList.value[row.deviceState]),
            h('span', {
              style: {
                display: 'inline-block',
                width: '14px',
                height: '14px',
                marginLeft: '8px',
                backgroundColor: color
              }
            }, '')
          ])
        }
      },
      {
        title: '设备数据',
        key: 'intoFactoryDate',
        width: 120,
        align: 'center',
        render: (row: any) => {
          return h('a', {
            href: 'javascript:void(0)',
            onClick: () => {
              showData(row)
            }
          }, '操作')
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 170,
        align: 'center',
        render: (row: any) => {
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
                marginRight: '20px'
              },
              class: 'del',
              onClick: () => del(row)
            }, '删除'),
            h(NDropdown, {
              options: dropdownOptions.value,
              'on-select': (key: string) => selectDropdown(key, row)
            },  { default: () => h('a', {
              href: 'javascript:void(0)',
              style: {
                display: 'inline-flex',
                alignItems: 'center'
              }
            }, [
              h('span', '更多'),
              h(NIcon, null, { default: () => h(DownOutlined) })
            ]) })
          ])
        }
      }
    ])
    const leftData = ref([])
    const columnsLeft = ref([
      {
        title: '车间编号',
        key: 'workStationCode',
        align: 'center'
      },
      {
        title: '车间名称',
        key: 'workStationName'
      },
      {
        title: '操作',
        key: 'action',
        width: 120,
        align: 'center',
        render: (row: any) => {
          return h('div', [
            h('a', {
              href: 'javascript:void(0)',
              style: {
                marginRight: '20px'
              },
              class: 'edit',
              onClick: () => editLeft(row)
            }, '修改'),
            h('a', {
              href: 'javascript:void(0)',
              style: {
              },
              class: 'del',
              onClick: () => delLeft(row)
            }, '删除')
          ])
        }
      }
    ])
    let currentObj = ref({ workStationId: '' })
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceState', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceStateList.value = r.data.data
        }
      })
    }
    function getLeftData () {
      proxy.$api.get('commonRoot', '/mes/device/workstation/web/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          leftData.value = r.data.data
        }
      })
    }
    function selectLeft (row: any) {
      currentObj.value = row
      proxy.$refs.tablePage.changePage()
    }
    /**
    * @desc 改变页码
    * @param {Number} current 当前页码
    * @param {Number} pageSize 每页显示数
    */
    function changePage (current: number, pageSize: number) {
      loading.value = true
      let obj = proxy.$refs.tebleSearch.searchObj
      obj.page = current
      obj.limit = pageSize
      obj.workStationId = currentObj.value.workStationId
      proxy.$api.get('commonRoot', '/mes/device/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          // this.totalRows = r.data.data.totalRows
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    provide('parentChangePageLeft', getLeftData)
    const myDialog = useCommandComponent(deviceCom)
    const myDialogLeft = useCommandComponent(deviceLeftCom)
    /**
    * @desc 新增
    */
    function addLeft () {
      myDialogLeft({ title: '新增车间', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function editLeft (row: any) {
      myDialogLeft({ title: '修改车间', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function delLeft (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此车间？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/mes/device/workstation/web/delete', { id: row.workStationId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              getLeftData()
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
            proxy.$myLoading.close()
          })
        }
      })
    }
    /**
    * @desc 新增
    */
    function add () {
      if (util.value.isEmpty(currentObj.value.workStationId)) {
        proxy.$myMessage.error1('请选择车间')
        return false
      }
      myDialog({ title: '新增设备', method: 'add', visible: true, obj: {}, leftObj: currentObj.value })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改设备', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此设备？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/mes/device/web/delete', { id: row.deviceId }, (r: IInterfaceData) => {
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
    const myDialogData = useCommandComponent(deviceDataManagement)
    function showData (row: any) {
      myDialogData({ title: '设备数据管理', visible: true, obj: row })
    }
    // 下拉选项
    let dropdownOptions = ref([
      { label: '运行时长', key: 'runTime' }
    ])
    function selectDropdown (key: string, row: any) {
      if (key === 'runTime') {
        myDialogRunTime({ title: '运行时长', visible: true, obj: row })
      }
    }
    const myDialogRunTime = useCommandComponent(runTimeCom)
    // 刷新
    let refreshFlag = ref(false)
    let refreshTimer = ref<any>(null)
    let refreshTime = ref(10)
    function changeRefreshFlag () {
      if (refreshFlag.value) {
        if (refreshTimer.value !== null) {
          clearInterval(refreshTimer.value)
          refreshTimer.value = null
        }
        refreshTimer.value = setInterval(() => {
          proxy.$refs.tablePage.changePage()
        }, refreshTime.value * 1000)
      } else {
        if (refreshTimer.value !== null) {
          clearInterval(refreshTimer.value)
          refreshTimer.value = null
        }
      }
    }
    let websocket = ref<any>(null)
    let exitFlag = ref(false)
    function initSocket () {
      websocket.value = new WebSocket(uploadRoot.value.replace('http://', 'ws://') + '/dsa/api/deviceState/websocket/' + sessionStorage.token)
      websocket.value.onopen = (e: any) => {
        console.log('dtuonopen')
      }
      websocket.value.onerror = (e: any) => {
        console.log('onerror')
        console.log(e)
      }
      websocket.value.onmessage = (e: any) => {
        if (!util.value.isEmpty(e.data)) {
          let obj = JSON.parse(e.data)
          let i = data.value.findIndex(ele => ele.deviceId === obj.deviceId)
          if (i !== -1) {
            data.value[i].deviceState = obj.deviceState
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
    initSocket()
    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      exitFlag.value = true
      websocket.value.close()
    })
    return {
      columns, leftData, columnsLeft, currentObj, getLeftData, selectLeft, changePage, addLeft, add, loading, totalRows, data, searchArr, tableHeight, search,
      refreshFlag, refreshTime, changeRefreshFlag
    }
  }
}
</script>
