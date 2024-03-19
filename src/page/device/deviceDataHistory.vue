<template>
<div>
  <div class="flex-con">
    <div style="width: calc(100% - 170px);">
      <table-search :searchArr="searchArr" labelWidth="68px" :itemNumber="5" @search="search" ref="tebleSearch"></table-search>
    </div>
    <div style="width: 110px;justify-content: right;align-items: center;" class="searchTemplate">
      <n-checkbox v-model:checked="refreshFlag" @update:checked="changeRefreshFlag">
        10秒刷新
      </n-checkbox>
    </div>
  </div>
  <table-page :loading="loading" :tableHeight="520" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  props: {
    obj: Object as any // 数据
  },
  components: { tablePage, tableSearch },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    // 表格表头
    const columns = ref([
      {
        type: 'index',
        title: '序列',
        width: 70,
        align: 'center'
      },
      {
        title: '数据时间',
        key: 'date',
        width: 180
      }
    ])
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/dsa/api/data/storageModel/web/list', { deviceId: props.obj.deviceId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            for (const iterator of r.data.data) {
              let temp = {
                title: iterator.dataName,
                key: iterator.deviceDataId,
                width: 110
              }
              if (iterator.dataName.length > 4) {
                temp.width = iterator.dataName.length * 15 + 45
              }
              columns.value.push(temp)
            }
          }
        }
      })
      searchArr.value = [
        {
          name: '数据时间',
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
      obj.deviceId = props.obj.deviceId
      proxy.$api.get('commonRoot', '/dsa/api/data/history/page/device/all', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          totalRows.value = r.data.data.totalRows
          data.value = r.data.data.list
        }
        loading.value = false
      })
    }
    let refreshFlag = ref(true)
    let refreshTimer = ref<any>(null)
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
    onMounted(() => {
      init()
      changeRefreshFlag()
    })
    onBeforeUnmount(() => {
      if (refreshTimer.value !== null) {
        clearInterval(refreshTimer.value)
        refreshTimer.value = null
      }
    })
    return { loading, totalRows, data, searchArr, tableHeight, search, columns, init, changePage, refreshFlag, changeRefreshFlag }
  }
}
</script>
