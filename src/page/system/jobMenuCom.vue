<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="职位" path="positionId">
        <n-select v-model:value="dataObj.positionId" placeholder="请选择职位" :options="jobList" value-field="positionId" label-field="positionName" :on-update:value="selectJob" :disabled="method === 'view'"></n-select>
      </n-form-item>
      <n-form-item label="菜单" path="menuStructId">
        <n-tree-select v-model:value="dataObj.menuStructId" placeholder="请选择菜单" :options="menuList" key-field="menuStructId" label-field="menuStructName" :on-update:value="selectMenu" />
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="dataObj.sort" placeholder="请输入排序" />
      </n-form-item>
      <n-form-item label="有无权限">
        <n-switch v-model:value="dataObj.isAuthorize" />
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
import { IInterfaceData, IMenu, IPosition } from '@/page/interface/interface'
import { getCurrentInstance, ref, reactive, inject } from 'vue'
import { FormInst } from 'naive-ui'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    leftObj: Object,
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, arrRemoveEmptyChildren } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ positionId: '', positionName: '', menuStructId: '', menuStructPid: '', menuStructName: '', menuStructUrl: '', menuStructIcon: '', sort: null, isAuthorize: false, authorize: false }) // 数据对象
    const ruleValidate = reactive({ // 表单验证
      positionId: [
        { required: true, message: '请选择职位', trigger: 'change' }
      ],
      menuStructId: [
        { required: true, message: '请选择菜单', trigger: 'change' }
      ],
      sort: [
        { required: true, type: 'number', message: '请填写排序', trigger: 'blur' }
      ]
    })
    const jobList = ref<IPosition[]>([])
    const menuList = ref([])
    let menuListAll: IMenu[] = reactive([])
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      proxy.$api.get('commonRoot', '/module/position/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          jobList.value = r.data.data
        }
      })
      proxy.$api.get('commonRoot', '/module/framework/menu/struct/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          menuList.value = arrRemoveEmptyChildren(r.data.data)
          menuListAll = util.value.arrayFlatten(menuList.value)
        }
      })
      dataObj.value = util.value.deepClone(props.obj)
      if (props.method !== 'add') {
        dataObj.value.isAuthorize = dataObj.value.authorize
      } else {
        dataObj.value.positionId = props.leftObj!.positionId
        dataObj.value.positionName = props.leftObj!.positionName
      }
    }
    init()
    function selectJob (val: string) {
      dataObj.value.positionId = val
      dataObj.value.positionName = jobList.value.find((ele: any) => ele.positionId === val)!.positionName
    }
    function selectMenu (val: string) {
      dataObj.value.menuStructId = val
      let obj = menuListAll.find((ele: any) => ele.menuStructId === val)
      dataObj.value.menuStructPid = obj!.menuStructPid
      dataObj.value.menuStructName = obj!.menuStructName
      dataObj.value.menuStructUrl = obj!.menuStructUrl
      dataObj.value.menuStructIcon = obj!.menuStructIcon
    }
    /**
    * @desc 保存
    */
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/module/framework/menu/position/insert', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage(1, 10)
                proxy.onClose()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
              proxy.$myLoading.close()
            })
          } else if (props.method === 'edit') {
            proxy.$api.post('commonRoot', '/module/framework/menu/position/update', dataObj.value, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('保存成功')
                parentChangePage(1, 10)
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
    return { showModel, formValidate, dataObj, ruleValidate, jobList, menuList, selectJob, selectMenu, init, save }
  }
}
</script>
