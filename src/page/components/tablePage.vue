<template>
  <div class="table-con">
    <template v-if="isTree">
      <n-data-table :min-height="tableHeight" :max-height="tableHeight" :loading="loading" :columns="columns" :data="data" :row-class-name="rowClassName" :row-key="rowKey" :default-expand-all="expandAll" :bordered="false" :single-line="false" :row-props="rowProps" ref="elTable">
      </n-data-table>
    </template>
    <template v-else>
      <n-data-table :min-height="showPage ? tableHeight - 50 : tableHeight" :max-height="showPage ? tableHeight - 50 : tableHeight" :loading="loading" :row-class-name="rowClassName" :columns="columns" :data="data" :bordered="false" :single-line="false" :row-props="rowProps" ref="elTable">
      </n-data-table>
    </template>
    <div class="page-con" v-if="showPage">
      <n-pagination :item-count="totalRows" v-model:page="currentPage" v-model:page-size="pageSizes" :page-sizes="pageSizeOpts" :on-update:page="changePage" :on-update:page-size="changePageSize" show-quick-jumper show-size-picker></n-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Util from '@/utils/index' // 工具类
import { ref, onMounted, PropType, reactive } from 'vue'
import common from '@/page/mixins/common' // 基本混入
import { ITableParams } from '@/page/interface/interface'
export default {
  props: {
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    // 表格高度
    tableHeight: {
      type: Number,
      default: 580
    },
    // 每页显示数
    pageSize: {
      type: Number,
      default: 10
    },
    // 每页条数配置
    pageSizeOpts: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    // 表头
    columns: Array as PropType<any[]>,
    // 数据总数
    totalRows: {
      type: Number,
      default: 0
    },
    // 是否立即加载
    firstLoad: {
      type: Boolean,
      default: true
    },
    // 是否要分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 树形表格
    isTree: {
      type: Boolean,
      default: false
    },
    treeID: String, // 树主键
    // 展开树
    expandAll: {
      type: Boolean,
      default: true
    },
    selectRow: { // 选中数据
      type: Object as any
    },
    IDText: { // 主键
      type: String,
      default: ''
    },
    data: Array // 表格数据
  },
  emits: {
    'change-page': null,
    'row-click': null
  },
  setup (props: any, { emit }: any) {
    const { checkEmpty } = common()
    const currentPage = ref(1) // 当前页码
    const pageSizes = ref(10)
    let selectedRow = ref({})
    const rowProps = (row: any) => {
      return {
        onClick: () => {
          selectedRow.value = row
          emit('row-click', row)
        }
      }
    }
    const rowKey = (row: any) => {
      return row[props.treeID]
    }
    /**
    * @desc 改变页码
    * @param {Number} current 页码
    */
    function changePage (current: number = currentPage.value) {
      currentPage.value = current
      emit('change-page', currentPage.value, pageSizes.value)
    }
    /**
    * @desc 改变每页显示数
    * @param {Number} size 每页显示数
    */
    function changePageSize (size: number) {
      pageSizes.value = size
      emit('change-page', currentPage.value, pageSizes.value)
    }
    /**
    * @desc 行样式
    * @param {Object} row 行数据
    * @param {Number} index 行的索引
    */
    function rowClassName (row: any, index: number) {
      let temp = ''
      if (!Util.isEmpty(props.IDText) && !Util.isEmpty(props.selectRow[props.IDText])) {
        if (row[props.IDText] === props.selectRow[props.IDText]) {
          temp = 'table-select-row'
        }
      }
      if (row === selectedRow.value) {
        temp = 'table-select-row'
      }
      return temp
    }
    onMounted(()=>{
      pageSizes.value = props.pageSize
      if (props.firstLoad) {
        emit('change-page', currentPage.value, pageSizes.value)
      }
    })
    return {
      currentPage, pageSizes, rowProps, rowKey, changePage, changePageSize, rowClassName, checkEmpty
    }
  }
}
</script>
