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
        render: (row: any) => {
          let temp = ''
          if (!util.value.isEmpty(row.updateDate)) {
            temp = row.updateDate.substring(0, 19)
          }
          return h('div', temp)
        }
      },
      {
        title: '数据持久化',
        key: 'isStorage',
        width: 110,
        align: 'center',
        render: (row: any) => {
          return h('a', {
            props: {
              href: 'javascript:void()'
            },
            style: {
              color: row.isStorage ? '#00CC33' : '#CC3333'
            },
            on: {
              click: () => {
                setStorage(row)
              }
            }
          }, row.isStorage ? '是' : '否')
        }
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
      showModel.value = true
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
    * @desc 数据持久化
    */
    function setStorage (row: any) {
      if (row.isStorage) {
        proxy.$myMessage({
          type: 'info',
          submitText: '确定关闭',
          MessageTitle: '为了防止您误删除历史数据，系统将不会删除数据库中的数据，只会停止数据存储入磁盘。',
          submit: () => {
            proxy.$myLoading.show()
            proxy.$api.post('commonRoot', '/dsa/api/data/storageModel/web/disable', { id: row.deviceDataId }, (r: IInterfaceData) => {
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
        proxy.$myMessage({
          type: 'info',
          submitText: '确定开启',
          MessageTitle: '开启数据持久化后，历史数据将会写入数据库中，请注意数据存储盘剩余空间大小。',
          submit: () => {
            proxy.$myLoading.show()
            proxy.$api.post('commonRoot', '/dsa/api/data/storageModel/web/disable', { id: row.deviceDataId }, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('开启成功')
                proxy.$refs.tablePage.changePage()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          }
        })
      }
    }
    return { showModel, loading, totalRows, data, searchArr, tableHeight, search, columns, init, changePage, add }
  }
}
</script>
