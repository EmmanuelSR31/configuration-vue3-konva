<template>
<div class="flex-con">
  <div class="box" style="width: 400px;">
    <div class="fun-btn">
      <n-button type="primary" @click="addLeft">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增部门
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
        </template>新增用户
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
import systemUserCom from './systemUserCom.vue' // 角色弹窗组件
import organizationCom from './organizationCom.vue'
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
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
        title: '账号名称',
        key: 'userName'
      },
      {
        title: '真实姓名',
        key: 'userActualname'
      },
      {
        title: '职位',
        key: 'positionName',
        render: (row: any): any => {
          return h('span', util.value.getNameFromArrayById(row.positionId, jobList.value, 'positionId', 'positionName'))
        }
      },
      {
        title: '是否部门领导',
        key: 'isDepartmentLeader',
        width: 150,
        align: 'center',
        render: (row: any) => {
          return h('a', {
            href: 'javascript:void(0)',
            onClick: () => {
              let temp = row.isDepartmentLeader ? '确定取消该部门领导' : '确定设置该人员为部门领导？'
              proxy.$myMessage({
                type: 'info',
                MessageTitle: temp,
                submit: () => {
                  proxy.$api.post('commonRoot', '/module/user/web/isDepartmentLeader/update', { userId: row.userId, isDepartmentLeader: !row.isDepartmentLeader }, (r: IInterfaceData) => {
                    if (r.data.code === 0) {
                      proxy.$myMessage.success('操作成功')
                      proxy.$refs.tablePage.changePage()
                    } else {
                      proxy.$myMessage.error1(r.data.msg)
                    }
                  })
                }
              })
            }
          }, row.isDepartmentLeader ? '是' : '否')
        }
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
    const jobList = ref([])
    const leftData = ref([])
    const columnsLeft = ref([
      {
        title: '部门名称',
        key: 'departmentName',
        tree: true
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
    let currentObj = ref({ departmentId: '' })
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/module/position/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          jobList.value = r.data.data
        }
      })
    }
    function getLeftData () {
      proxy.$api.get('commonRoot', '/module/department/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          for (const iterator of r.data.data) {
            iterator._showChildren = true
            for (const s of iterator.children) {
              s._showChildren = true
            }
          }
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
      obj.departmentId = currentObj.value.departmentId
      proxy.$api.get('commonRoot', '/module/user/listByDepartment', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          // this.totalRows = r.data.data.totalRows
          data.value = r.data.data
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    provide('parentChangePageLeft', getLeftData)
    const myDialog = useCommandComponent(systemUserCom)
    const myDialogLeft = useCommandComponent(organizationCom)
    /**
    * @desc 新增
    */
    function addLeft () {
      myDialogLeft({ title: '新增部门', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function editLeft (row: any) {
      myDialogLeft({ title: '修改部门', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function delLeft (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此部门？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/department/delete', { departmentId: row.departmentId }, (r: IInterfaceData) => {
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
      myDialog({ title: '新增用户', method: 'add', visible: true, obj: {}, leftObj: currentObj.value })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改用户', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此用户？',
        submit: () => {
          proxy.$myLoading.show()
          proxy.$api.post('commonRoot', '/module/user/web/delete', { userId: row.userId }, (r: IInterfaceData) => {
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
