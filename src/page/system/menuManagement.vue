<template>
<div class="box">
  <div class="fun-btn">
    <n-button type="primary" @click="add">
      <template #icon>
        <n-icon size="17">
          <add />
        </n-icon>
      </template>新增菜单
    </n-button>
  </div>
  <table-page :loading="loading" :tableHeight="tableHeight + 50" :totalRows="totalRows" :columns="columns" :data="data" :isTree="true" treeID="menuStructId" :showPage="false" @change-page="changePage" ref="tablePage"></table-page>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import menuCom from './menuCom.vue' // 弹窗组件
import { tablePage } from '@/page/components/index'
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
export default {
  components: { tablePage, Add },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, searchArr, tableHeight } = table()
    // 表格表头
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
        width: '80px',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        width: '120px',
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
              class: 'del',
              onClick: () => del(row)
            }, '删除')
          ])
        }
      }
    ])
    /**
    * @desc 改变页码
    */
    function changePage () {
      loading.value = true
      proxy.$api.get('commonRoot', '/module/framework/menu/struct/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(menuCom)
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增菜单', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改菜单', method: 'edit', visible: true, obj: row })
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
          proxy.$api.post('commonRoot', '/module/framework/menu/struct/delete', { menuStructId: row.menuStructId }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              changePage()
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
          })
        }
      })
    }
    return {
      columns, changePage, add, loading, totalRows, data, searchArr, tableHeight
    }
  }
}
</script>
