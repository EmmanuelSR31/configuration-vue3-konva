<template>
<div>
  <div class="flex-con">
    <div class="box" style="width: 400px;">
      <div class="fun-btn">
        <n-button type="primary" @click="addLeft">
          <template #icon>
            <n-icon size="17">
              <add />
            </n-icon>
          </template>新增职位
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
          </template>新增职位菜单
        </n-button>
      </div>
      <table-page :loading="loading" :tableHeight="tableHeight + 50" :showPage="false" :firstLoad="false" treeID="menuStructId" :totalRows="totalRows" :columns="columns" :data="data" @change-page="changePage" ref="tablePage"></table-page>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import jobCom from './jobCom.vue' // 角色弹窗组件
import jobMenuCom from './jobMenuCom.vue' // 角色弹窗组件
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  components: { tablePage, tableSearch, Add },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, showCom, method, title, comObj, showLeftCom, leftMethod, leftTitle, leftComObj, tableHeight, search } = table()
    // 表格表头
    const columnsLeft = ref([
      {
        title: '职位名称',
        key: 'positionName'
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        render: (row: any) => {
          return h('div', [
            h('a', {
              href: 'javascript:void(0)',
              style: {
                marginRight: '10px'
              },
              class: 'edit',
              onClick: () => editLeft(row)
            }, '修改'),
            h('a', {
              href: 'javascript:void(0)',
              style: {
                marginRight: '10px'
              },
              class: 'del',
              onClick: () => delLeft(row)
            }, '删除'),
            h('a', {
              href: 'javascript:void(0)',
              style: {
              },
              onClick: () => selectLeft(row)
            }, '查看权限')
          ])
        }
      }
    ])
    const leftData = ref([])
    let currentObj = ref({ positionId: '' })
    const columns = ref([
      {
        title: '菜单名称',
        key: 'menuStructName',
        tree: true
      },
      {
        title: '菜单URL',
        key: 'menuStructUrl'
      },
      {
        title: '菜单图标',
        key: 'menuStructIcon'
      },
      {
        title: '排序',
        key: 'sort',
        width: 80,
        align: 'center'
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
                marginRight: '10px'
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
    function getLeftData () {
      proxy.$api.get('commonRoot', '/module/position/list', {}, (r: IInterfaceData) => {
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
      obj.positionId = currentObj.value.positionId
      proxy.$api.get('commonRoot', '/module/framework/menu/position/treeByPosition', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          // this.totalRows = r.data.data.totalRows
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    provide('parentChangePageLeft', getLeftData)
    const myDialog = useCommandComponent(jobMenuCom)
    const myDialogLeft = useCommandComponent(jobCom)
    /**
    * @desc 新增
    */
    function addLeft () {
      myDialogLeft({ title: '新增职位', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function editLeft (row: any) {
      myDialogLeft({ title: '修改职位', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function delLeft (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此职位？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/position/delete', { positionId: row.positionId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              getLeftData()
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
          })
          proxy.$myLoading.close()
        }
      })
    }
    /**
    * @desc 新增
    */
    function add () {
      if (util.value.isEmpty(currentObj.value.positionId)) {
        proxy.$myMessage({
          type: 'warning',
          MessageTitle: '请选择职位'
        })
        return false
      }
      myDialog({ title: '新增职位菜单', method: 'add', visible: true, obj: { isAuthorize: true }, leftObj: currentObj.value })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改职位菜单', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此菜单？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/framework/menu/position/delete', { positionMenuId: row.positionMenuId }, (r: IInterfaceData) => {
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
    return {
      columns, leftData, columnsLeft, currentObj, getLeftData, selectLeft, changePage, addLeft, add, loading, totalRows, data, searchArr, showCom, method, title, comObj, showLeftCom, leftMethod, leftTitle, leftComObj, tableHeight, search
    }
  }
}
</script>
