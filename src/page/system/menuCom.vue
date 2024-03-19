<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="菜单名称" path="menuStructName">
        <n-input v-model:value="dataObj.menuStructName" placeholder="请输入菜单名称" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="上级菜单">
        <n-tree-select v-model:value="dataObj.menuStructPid" placeholder="请选择菜单" :options="menuList" key-field="menuStructId" label-field="menuStructName" />
      </n-form-item>
      <n-form-item label="菜单URL">
        <n-input v-model:value="dataObj.menuStructUrl" placeholder="请输入菜单URL" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="菜单图标">
        <n-input v-model:value="dataObj.menuStructIcon" placeholder="请输入菜单图标" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="菜单排序" path="sort">
        <n-input-number v-model:value="dataObj.sort" placeholder="请输入菜单排序" />
      </n-form-item>
    </n-form>
    <div class="modal-btn">
      <n-button type="primary" @click="save()" v-if="method !== 'view'">保存</n-button>
    </div>
  </div>
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, reactive, inject } from 'vue'
import { FormInst } from 'naive-ui'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, arrRemoveEmptyChildren } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ menuStructName: '', menuStructPid: '', menuStructUrl: '', menuStructIcon: '', sort: null }) // 数据对象
    const ruleValidate = reactive({ // 表单验证
      menuStructName: [
        { required: true, message: '请填写菜单名称', trigger: 'blur' }
      ],
      sort: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' }
      ]
    })
    let menuList = ref([])
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      proxy.$api.get('commonRoot', '/module/framework/menu/struct/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          menuList.value = arrRemoveEmptyChildren(r.data.data)
        }
      })
      dataObj.value = util.value.deepClone(props.obj)
    }
    init()
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/module/framework/menu/struct/insert', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage()
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          } else if (props.method === 'edit') {
            proxy.$api.post('commonRoot', '/module/framework/menu/struct/update', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage()
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          }
        }
      })
    }
    return { showModel, formValidate, dataObj, ruleValidate, menuList, init, save }
  }
}
</script>
