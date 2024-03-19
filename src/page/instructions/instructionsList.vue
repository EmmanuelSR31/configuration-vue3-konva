<template>
<div class="flex-con">
  <div class="box instructions-left" style="width: 300px;" :style="{height: tableHeight + 180 + 'px'}">
    <n-tree :data="data" key-field="richTextId" label-field="richTextTitle" block-line selectable :on-update:selected-keys="selectLeft"></n-tree>
  </div>
  <div class="box" style="width: calc(100% - 320px);">
    <div v-html="content" :style="{height: tableHeight + 140 + 'px'}" style="overflow: auto;"></div>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, onMounted } from 'vue'
export default {
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, arrRemoveEmptyChildren } = common()
    let { data, tableHeight } = table()
    let content = ref('')
    let richTextId = ref('')
    function selectLeft (row: any) {
      richTextId.value = row
      getRichTextData()
    }
    function getRichTextData () {
      content.value = ''
      proxy.$api.get('commonRoot', '/module/richText/one', { richTextId: richTextId.value }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (!util.value.isEmpty(r.data.data.richTextContent)) {
            content.value = r.data.data.richTextContent
          }
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    onMounted(() => {
      proxy.$api.get('commonRoot', '/module/instructions/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = arrRemoveEmptyChildren(r.data.data)
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    })
    return {
      selectLeft, data, tableHeight, content
    }
  }
}
</script>
<style lang="scss">
.instructions-left {
  .n-tree-node {
    font-size: 16px;
    padding: 10px 0;
  }
  .n-base-icon {
    font-size: 18px;
  }
}
</style>
