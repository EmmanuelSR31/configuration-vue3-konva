<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 550px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form">
    <n-form ref="formValidate" :model="dataObj" :rules="ruleValidate" label-placement="left" label-width="80px" require-mark-placement="left">
      <div class="form-title">
        <span>基本信息</span>
      </div>
      <n-form-item label="账户名称" path="userName">
        <n-input v-model:value="dataObj.userName" placeholder="请输入账户名称" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="密码" path="userPassword">
        <n-input v-model:value="dataObj.userPassword" placeholder="请输入密码" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="真实姓名">
        <n-input v-model:value="dataObj.userActualname" placeholder="请输入真实姓名" :disabled="method === 'view'"></n-input>
      </n-form-item>
      <n-form-item label="职位">
        <n-select v-model:value="dataObj.positionId" placeholder="请选择职位" :options="jobList" value-field="positionId" label-field="positionName" :on-update:value="selectJob" :disabled="method === 'view'">
        </n-select>
      </n-form-item>
      <n-form-item label="部门" path="departmentId">
        <n-tree-select v-model:value="dataObj.departmentId" placeholder="请选择部门" :options="departmentList" key-field="departmentId" label-field="departmentName" :disabled="method === 'view'" />
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
    leftObj: Object,
    method: String // 方法
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel, arrRemoveEmptyChildren } = common()
    const parentChangePage:any = inject('parentChangePage')
    const formValidate = ref<FormInst | null>(null)
    let dataObj = ref({ userName: '', userPassword: '', userActualname: '', positionId: '', positionName: '', departmentId: '', departmentName: '' }) // 数据对象
    const ruleValidate = reactive({ // 表单验证
      userName: [
        { required: true, message: '请填写账号名称', trigger: 'blur' }
      ],
      userPassword: [
        { required: true, message: '请填写密码', trigger: 'blur' }
      ],
      departmentId: [
        { required: true, message: '请选择部门', trigger: 'change' }
      ]
    })
    const jobList = ref<{positionId: string, positionName: string}[]>([])
    const departmentList = ref([])
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
      proxy.$api.get('commonRoot', '/module/department/tree', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          departmentList.value = arrRemoveEmptyChildren(r.data.data)
        }
      })
      dataObj.value = util.value.deepClone(props.obj)
      if (props.method === 'add') {
        dataObj.value.departmentId = props.leftObj!.departmentId
        dataObj.value.departmentName = props.leftObj!.departmentName
      }
    }
    init()
    function selectJob (val: string) {
      dataObj.value.positionId = val
      dataObj.value.positionName = jobList.value.find((ele: any) => ele.positionId === val)!.positionName
    }
    /**
    * @desc 选择人员部门
    * @param {Object} node 部门数据
    */
    function selectUserDept (node: any) {
      dataObj.value.departmentName = node.title
    }
    /**
    * @desc 保存
    */
    function save () {
      formValidate.value?.validate((errors: any) => {
        if (!errors) {
          proxy.$myLoading.show()
          if (props.method === 'add') {
            proxy.$api.post('commonRoot', '/module/user/registe', dataObj.value, (r: IInterfaceData) => {
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
            proxy.$api.post('commonRoot', '/module/user/edit', { data: JSON.stringify(dataObj.value), token: sessionStorage.token }, (r: IInterfaceData) => {
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
    return { showModel, formValidate, dataObj, ruleValidate, jobList, departmentList, init, selectJob, selectUserDept, save }
  }
}
</script>
