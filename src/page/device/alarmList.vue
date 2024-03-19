<template>
<div class="box">
  <div class="flex-con">
    <div style="width: 60px;justify-content: center;align-items: center;" class="searchTemplate">
      <n-checkbox v-model:checked="isRealTime">
        实时
      </n-checkbox>
    </div>
    <div style="width: calc(100% - 170px);">
      <table-search :searchArr="searchArr" labelWidth="68px" :itemNumber="8" @search="search" ref="tebleSearch"></table-search>
    </div>
    <div style="width: 110px;justify-content: right;align-items: center;" class="searchTemplate">
      <n-checkbox v-model:checked="refreshFlag" @update:checked="changeRefreshFlag">
        10秒刷新
      </n-checkbox>
    </div>
  </div>
  <table-page :loading="loading" :tableHeight="tableHeight + 50" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, onMounted, h, onBeforeUnmount } from 'vue'
export default {
  components: { tablePage, tableSearch },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    type RowData = {
      deviceName: string
      alarmNote: string
      deviceAlarmLevel: string
      value: string
      beginDate: string
      endDate: string
      parameter: string
      deviceAlarmTigMode: string
      x: string
      y: string
      second: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '设备名称',
        key: 'deviceName',
        minWidth: 180
      },
      {
        title: '报警描述',
        key: 'alarmNote',
        minWidth: 180
      },
      {
        title: '报警等级',
        key: 'deviceAlarmLevel',
        width: 110,
        align: 'center'
      },
      {
        title: '报警实时值',
        key: 'value',
        width: 120,
        align: 'center'
      },
      {
        title: '报警开始时间',
        key: 'beginDate',
        width: 180,
        align: 'center'
      },
      {
        title: '报警消除时间',
        key: 'endDate',
        width: 180,
        align: 'center'
      },
      {
        title: '请求参数',
        key: 'parameter',
        minWidth: 120,
        align: 'center',
        tooltip: true
      },
      {
        title: '触发模式',
        key: 'deviceAlarmTigMode',
        width: 150,
        align: 'center',
        render: (row: RowData) => {
          let temp = ''
          if (!util.value.isEmpty(row.deviceAlarmTigMode)) {
            temp = deviceAlarmTigModeList.value[row.deviceAlarmTigMode]
          }
          return h('div', temp)
        }
      },
      {
        title: '设定x值',
        key: 'x',
        width: 110,
        align: 'center'
      },
      {
        title: '设定y值',
        key: 'y',
        width: 110,
        align: 'center'
      },
      {
        title: '设定时长(秒)',
        key: 'second',
        width: 120,
        align: 'center'
      }
    ])
    let deviceAlarmTigModeList = ref<{ [key: string]: string }>({})
    type DeviceAlarmLevel = {
      id: string
      text: string
    }
    let deviceAlarmLevelList = ref<Array<DeviceAlarmLevel>>([])
    type Workstation = {
      workStationId: string
      workStationName: string
    }
    let workstationList = ref<Array<Workstation>>([])
    let deviceList = ref([])
    let isRealTime = ref(true)
    let refreshFlag = ref(true)
    let refreshTimer = ref<any>(null)
    /**
    * @desc 初始化
    */
    async function init () {
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceAlarmTigMode', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceAlarmTigModeList.value = r.data.data
        }
      })
      let arr = [
        {
          rootName: 'commonRoot',
          method: 'get',
          url: '/mes/device/enum/DeviceAlarmLevel',
          params: {},
          callback: (r: IInterfaceData) => {
            if (r.data.code === 0) {
              for (const key in r.data.data) {
                if (Object.hasOwnProperty.call(r.data.data, key)) {
                  deviceAlarmLevelList.value.push({ id: key, text: key })
                }
              }
            }
          }
        },
        {
          rootName: 'commonRoot',
          method: 'get',
          url: '/mes/device/workstation/web/list',
          params: {},
          callback: (r: IInterfaceData) => {
            if (r.data.code === 0) {
              workstationList.value = r.data.data
            }
          }
        }
      ]
      let flag = await proxy.$api.all(arr)
      // 定义搜索栏
      searchArr.value = [
      {
          name: '车间',
          type: 'select',
          text: 'workStationId',
          selectData: workstationList.value,
          valueName: 'workStationId',
          textName: 'workStationName',
          onChange: true, // 类型为select时是否级联改变其他下拉数据
          changeAjax: {
              changeDataText: 'deviceId', // 要改变的下拉字段名
              rootName: 'commonRoot', // root地址
              method: 'get', // 请求方法
              url: '/mes/device/web/list', // 接口地址
              paramsName: 'workStationId', // 传输参数名
              callback: (r: IInterfaceData) => { // 返回值处理，固定写法
                  return r.data.data
              }
          }
        },
        {
          name: '设备',
          type: 'select',
          text: 'deviceId',
          selectData: deviceList.value,
          valueName: 'deviceId',
          textName: 'deviceName'
        },
        {
          name: '报警级别',
          type: 'select',
          text: 'deviceAlarmLevel',
          selectData: deviceAlarmLevelList.value,
          valueName: 'id',
          textName: 'text'
        },
        {
          name: '报警时间',
          type: 'dateType',
          text: 'date',
          startDateText: 'beginDate',
          endDateText: 'endDate'
        }
      ]
      proxy.$refs.tebleSearch.init(searchArr.value)
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
      obj.isRealTime = isRealTime.value
      proxy.$api.get('commonRoot', '/mes/device/alarm/web/page', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          totalRows.value = r.data.data.totalRows
          data.value = r.data.data.list
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        loading.value = false
      })
    }
    function changeRefreshFlag () {
      if (refreshFlag.value) {
        if (refreshTimer.value !== null) {
          clearInterval(refreshTimer.value)
          refreshTimer.value = null
        }
        refreshTimer.value = setInterval(() => {
          proxy.$refs.tablePage.changePage()
        }, 10 * 1000)
      } else {
        if (refreshTimer.value !== null) {
          clearInterval(refreshTimer.value)
          refreshTimer.value = null
        }
      }
    }
    changeRefreshFlag()
    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      if (refreshTimer.value !== null) {
        clearInterval(refreshTimer.value)
        refreshTimer.value = null
      }
    })
    return {
      loading, totalRows, data, searchArr, tableHeight, search, columns, isRealTime, refreshFlag, changePage, changeRefreshFlag
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
