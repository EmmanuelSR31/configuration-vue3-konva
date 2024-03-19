<template>
<div class="flex-con">
  <div class="box" style="width: 400px;">
    <table-search :searchArr="searchArr" labelWidth="68px" :itemNumber="6" @search="search" ref="tebleSearch"></table-search>
    <div class="fun-btn">
      <n-button type="primary" @click="add">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增教程
      </n-button>
    </div>
    <table-page :loading="loading" :tableHeight="tableHeight + 50" :totalRows="totalRows" :columns="columns" :data="data" :isTree="true" treeID="id" @change-page="changePage" :showPage="false" @row-click="selectLeft" ref="tablePage"></table-page>
  </div>
  <div class="box" style="width: calc(100% - 420px);">
    <template v-if="selectObj.richTextId !== undefined">
      <editor :content="content" ref="editor"></editor>
      <div class="modal-btn">
        <n-button type="primary" @click="save()">保存</n-button>
      </div>
    </template>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import instructionsCom from './instructionsCom.vue' // 弹窗组件
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, provide } from 'vue'
import { Add } from '@vicons/ionicons5'
import editor from '@/page/components/editor.vue'
export default {
  components: { tablePage, tableSearch, Add, editor },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let { loading, totalRows, data, selectObj, searchArr, tableHeight, search } = table()
    // 表格表头
    const columns = ref([
      {
        title: '名称',
        key: 'richTextTitle',
        tree: true
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
    let content = ref('')
    function selectLeft (row: any) {
      selectObj.value = row
      getRichTextData()
    }
    /**
    * @desc 改变页码
    */
    function changePage (current: number, pageSize: number) {
      loading.value = true
      let obj = proxy.$refs.tebleSearch.searchObj
      obj.page = current
      obj.limit = pageSize
      proxy.$api.get('commonRoot', '/module/instructions/tree', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          // totalRows.value = r.data.data.totalRows
          data.value = r.data.data
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        loading.value = false
      })
    }
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(instructionsCom)
    function getRichTextData () {
      content.value = ''
      proxy.$api.get('commonRoot', '/module/richText/one', { richTextId: selectObj.value.richTextId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (!util.value.isEmpty(r.data.data.richTextContent)) {
            content.value = r.data.data.richTextContent
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    /**
    * @desc 新增
    */
    function add () {
      myDialog({ title: '新增教程', method: 'add', visible: true, obj: {} })
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      myDialog({ title: '修改教程', method: 'edit', visible: true, obj: row })
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此教程？',
        submit: () => {
          proxy.$api.post('commonRoot', '/module/instructions/delete', { id: row.id }, (r: IInterfaceData) => {
            if (r.data.code === 0) {
              proxy.$myMessage.success('删除成功')
              proxy.$refs.tablePage.changePage()
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
          })
        }
      })
    }
    function save () {
      let obj = {
        richTextId: selectObj.value.richTextId,
        richTextContent: proxy.$refs.editor.getContent()
      }
      proxy.$myLoading.show()
      proxy.$api.post('commonRoot', '/module/richText/update', obj, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('保存成功')
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        proxy.$myLoading.close()
      })
    }
    return {
      columns, selectLeft, changePage, add, loading, totalRows, data, searchArr, tableHeight, search, content, save, selectObj
    }
  }
}
</script>
