<template>
<div class="box">
  <table-search :searchArr="searchArr" labelWidth="68px" :itemNumber="6" @search="search" ref="tebleSearch"></table-search>
  <table-page :loading="loading" :tableHeight="tableHeight + 50" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
  <n-modal title="查看响应" v-model:show="responseModal" preset="dialog" style="width: 800px;">
    <div class="response-div">{{response}}</div>
  </n-modal>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, reactive, onMounted, h } from 'vue'
export default {
  components: { tablePage, tableSearch },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    // 表格表头
    const columns = ref([
      {
        title: '用户名',
        key: 'userName',
        width: 120,
        headerAlign: 'center'
      },
      {
        title: 'IP',
        key: 'ip',
        width: 140,
        headerAlign: 'center'
      },
      {
        title: 'Url地址',
        key: 'url',
        minWidth: 120,
        headerAlign: 'center'
      },
      {
        title: '请求方法',
        key: 'method',
        width: 100,
        headerAlign: 'center'
      },
      {
        title: '请求参数',
        key: 'parameter',
        minWidth: 120,
        headerAlign: 'center',
        tooltip: true
      },
      {
        title: '响应',
        key: 'response',
        width: 80,
        headerAlign: 'center',
        render: (row: any) => {
          return h('a', {
            href: 'javascript:void(0)',
            class: 'view',
            onClick: () => view(row)
          }, '查看')
        }
      },
      {
        title: '耗时(毫秒)',
        key: 'millisecond',
        width: 120,
        headerAlign: 'center'
      },
      {
        title: '请求时间',
        key: 'updateDate',
        width: 170,
        headerAlign: 'center'
      }
    ])
    let responseModal = ref(false)
    let response = ref('')
    /**
    * @desc 初始化
    */
    function init () {
      // 定义搜索栏
      searchArr.value = [
        {
          name: '用户名',
          type: 'text',
          text: 'userName'
        },
        {
          name: 'IP',
          type: 'text',
          text: 'ip'
        },
        {
          name: 'Url地址',
          type: 'text',
          text: 'url'
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
      proxy.$api.get('commonRoot', '/module/log/page', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          totalRows.value = r.data.data.totalRows
          data.value = r.data.data.list
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        loading.value = false
      })
    }
    function view (row: any) {
      response.value = row.response
      responseModal.value = true
    }
    onMounted(() => {
      init()
    })
    return {
      loading, totalRows, data, searchArr, tableHeight, search, columns, responseModal, response, changePage, view
    }
  }
}
</script>
<style lang="scss" scoped>
.response-div {
  max-height: 600px;
  overflow-y: auto;
  word-break: break-all;
}
</style>
