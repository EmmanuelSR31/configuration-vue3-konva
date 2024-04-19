<template>
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
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import alarmSettingCom from './alarmSettingCom.vue' // 弹窗组件
import { tablePage } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  props: {
    obj: Object as any // 数据
  },
  components: { tablePage, Add },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    let deviceAlarmLevelList = ref<{ [key: string]: string }>({})
    let deviceAlarmTigModeList = ref<{ [key: string]: string }>({})
    type RowData = {
      deviceAlarmLevel: string
      deviceAlarmTigMode: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '报警描述',
        key: 'alarmNote',
        minWidth: 150,
        tooltip: true
      },
      {
        title: '报警级别',
        key: 'deviceAlarmLevel',
        width: 110,
        render: (row: RowData) => {
          return h('div', deviceAlarmLevelList.value[row.deviceAlarmLevel])
        }
      },
      {
        title: '报警触发模式',
        key: 'deviceAlarmTigMode',
        width: 170,
        render: (row: RowData) => {
          return h('div', deviceAlarmTigModeList.value[row.deviceAlarmTigMode])
        }
      },
      {
        title: 'X值',
        key: 'x',
        width: 80
      },
      {
        title: 'Y值',
        key: 'y',
        width: 80
      },
      {
        title: '秒数',
        key: 'second',
        width: 80
      },
      {
        title: '数据名称',
        key: 'dataName',
        minWidth: 130
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
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceAlarmLevel', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceAlarmLevelList.value = r.data.data
        }
      })
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceAlarmTigMode', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceAlarmTigModeList.value = r.data.data
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
      proxy.$api.get('commonRoot', '/mes/device/alarm/setting/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(alarmSettingCom)
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增设备报警设置', method: 'add', visible: true, obj: { deviceId: props.obj.deviceId } })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改设备报警设置', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此设备报警设置？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/mes/device/alarm/setting/web/delete', { id: row.id }, (r: IInterfaceData) => {
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
    return { loading, totalRows, data, searchArr, tableHeight, search, columns, init, changePage, add }
  }
}
</script>
