<template>
<div class="bi-index-baojing-table">
  <n-data-table :min-height="height" :max-height="height" :columns="columns" :data="data" :bordered="false" :single-line="false" ref="elTable">
  </n-data-table>
  <div v-if="showPage" style="display: flex;justify-content: flex-end;padding-top: 3px;padding-right: 20px;">
    <n-pagination :item-count="totalRows" v-model:page="currentPage" :page-size="pageSize" :on-update:page="changePage"></n-pagination>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import { getCurrentInstance, ref, onMounted } from 'vue'
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    columns: Array,
    data: Array,
    totalRows: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 5
    },
    showPage: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }: any) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let currentPage = ref(1)
    /**
    * @desc 初始化
    */
    function init () {
      changePage(1)
    }
    /**
    * @desc 改变页码
    * @param {Number} current 当前页码
    */
    function changePage (current: number) {
      currentPage.value = current
      emit('change-page', current, props.pageSize)
    }
    onMounted(() => {
      init()
    })
    return { currentPage, changePage }
  }
}
</script>
