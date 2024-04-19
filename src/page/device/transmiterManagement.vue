<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 1300px;" :mask-closable="false" :close-on-esc="false">
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
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import transmiterCom from './transmiterCom.vue' // 弹窗组件
import { tablePage } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any // 数据
  },
  components: { tablePage, Add },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    let deviceDataTransmitTypeList = ref<{ [key: string]: string }>({})
    type RowData = {
      deviceDataTransmitType: string
      targetUrl: string
    }
    // 表格表头
    const columns = ref([
      {
        title: '转发方式',
        key: 'deviceDataTransmitType',
        width: 200,
        render: (row: RowData) => {
          return h('div', deviceDataTransmitTypeList.value[row.deviceDataTransmitType])
        }
      },
      {
        title: '转发参数',
        key: 'targetUrl',
        minWidth: 140
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
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceDataTransmitType', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceDataTransmitTypeList.value = r.data.data
        }
      })
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
      let obj = { page: current, limit: pageSize, deviceDataId: props.obj.deviceDataId }
      proxy.$api.get('commonRoot', '/mes/device/data/transmiter/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(transmiterCom)
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增数据转发', method: 'add', visible: true, obj: { deviceDataId: props.obj.deviceDataId } })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此数据转发？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/mes/device/data/transmiter/web/delete', { id: row.deviceDataTransmiterId }, (r: IInterfaceData) => {
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
    return { showModel, loading, totalRows, data, searchArr, tableHeight, search, columns, init, changePage, add }
  }
}
</script>
