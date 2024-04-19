<template>
<div class="flex-con">
  <div class="box" style="width: 400px;">
    <div class="fun-btn">
      <n-button type="primary" @click="addLeft">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增
      </n-button>
    </div>
    <table-page :tableHeight="tableHeight + 50" :showPage="false" :columns="columnsLeft" :data="leftData" @change-page="getLeftData" @row-click="selectLeft" ref="leftTablePage"></table-page>
  </div>
  <div class="box" style="width: calc(100% - 420px);">
    <table-search :searchArr="searchArr" labelWidth="100px" :itemNumber="4" @search="search" ref="tebleSearch"></table-search>
    <div class="fun-btn">
      <n-button type="primary" @click="add">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增
      </n-button>
    </div>
    <table-page :loading="loading" :tableHeight="tableHeight + 50" :showPage="false" :firstLoad="false" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import updateCom from './updateCom.vue' // 角色弹窗组件
import versionCom from './versionCom.vue'
import { tablePage, tableSearch } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, onMounted, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  components: { tablePage, tableSearch, Add },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight, search } = table()
    // 表格表头
    const columns = ref([
      {
        title: '条目内容',
        key: 'content'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
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
    const leftData = ref([])
    const columnsLeft = ref([
      {
        title: '日期',
        key: 'ymd'
      },
      {
        title: '版本号',
        key: 'version'
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
    let currentObj = ref({ updateLogId: '' })
    /**
    * @desc 初始化
    */
    function init () {
    }
    function getLeftData () {
      proxy.$api.get('commonRoot', '/module/updatelog/web/all', {}, (r: IInterfaceData) => {
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
      obj.updateLogId = currentObj.value.updateLogId
      proxy.$api.get('commonRoot', '/module/updatelog/item/web/list', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          // this.totalRows = r.data.data.totalRows
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    provide('parentChangePageLeft', getLeftData)
    const myDialog = useCommandComponent(updateCom)
    const myDialogLeft = useCommandComponent(versionCom)
    /**
    * @desc 新增
    */
    function addLeft () {
      myDialogLeft({ title: '新增版本', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function editLeft (row: any) {
      myDialogLeft({ title: '修改版本', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function delLeft (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此版本？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/updatelog/web/delete', { id: row.updateLogId }, (r: IInterfaceData) => {
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
      if (util.value.isEmpty(currentObj.value.updateLogId)) {
        proxy.$myMessage.error1('请选择版本')
        return false
      }
      myDialog({ title: '新增日志条目', method: 'add', visible: true, obj: {}, leftObj: currentObj.value })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改日志条目', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此日志条目？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/updatelog/item/web/delete', { id: row.updateLogItemId }, (r: IInterfaceData) => {
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
    onMounted(() => {
      init()
    })
    return {
      columns, leftData, columnsLeft, currentObj, getLeftData, selectLeft, changePage, addLeft, add, loading, totalRows, data, searchArr, tableHeight, search
    }
  }
}
</script>
