<template>
<div class="box">
  <div class="dtu-list">
    <div class="dtu-li" @click="view(item)" v-for="(item, index) in data" :key="index">
      <div class="dtu-li-top">
        <div class="dtu-li-name">
          <div>
            <span>{{item.dtuName}}</span>
            <n-icon size="22" @click="openEdit($event, item)" style="margin-left: 8px;" title="修改名称">
              <edit-outlined />
            </n-icon>
          </div>
          <div class="dtu-li-dropdown">
            <n-dropdown :options="dropdownOptions" @select="(key: string) => handleClickDropdown(key, item)">
              <a href="javascript:void(0)">
                操作
                <n-icon>
                  <down-outlined />
                </n-icon>
              </a>
            </n-dropdown>
          </div>
        </div>
        <div class="dtu-li-code">设备ID：{{item.dtuId}}</div>
      </div>
      <div class="dtu-li-list">
        <template v-if="item.children !== null && item.children !== undefined">
          <template v-for="(itm, index) in item.children">
            <div class="child-device" v-if="index < 4" :key="index">
              <div class="child-device-img">
                <img v-if="itm.relativePath !== null && itm.relativePath !== undefined" :src="uploadRoot + '/' + itm.relativePath">
                <div v-else class="child-device-empty"></div>
              </div>
              <div class="child-device-name">{{itm.dtuChildName}}</div>
            </div>
          </template>
          <template v-if="item.children.length < 4">
            <div class="child-device" v-for="i in (4 - item.children.length)" :key="i">
              <div class="child-device-img">
                <div class="child-device-empty"></div>
              </div>
              <div class="child-device-name">未定义</div>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="child-device" v-for="i in 4" :key="i">
            <div class="child-device-img">
              <div class="child-device-empty"></div>
            </div>
            <div class="child-device-name">未定义</div>
          </div>
        </template>
      </div>
      <div class="dtu-li-state">
        <div class="dtu-li-state-icon" :style="{backgroundColor: item.dtuState === 'OffLine' ? '#CC3333' : '#00CC33'}"></div>
        <span :style="{color: item.dtuState === 'OffLine' ? '#CC3333' : '#00CC33'}">{{dtuStateList[item.dtuState]}}</span>{{item.dtuIp}}
      </div>
    </div>
  </div>
  <n-modal v-model:show="modalEdit" title="修改名称" preset="card" style="width: 450px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-field-con">
      <div class="modal-form">
        <n-form ref="userForm" :model="editObj" label-width="80px">
          <n-form-item label="设备名称">
            <n-input v-model:value="editObj.dtuName"></n-input>
          </n-form-item>
        </n-form>
        <div class="modal-btn">
          <n-button type="primary" @click="editSave()">保存</n-button>
        </div>
      </div>
    </div>
  </n-modal>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import useCommandComponent from '@/hooks/useCommandComponent'
import dtuCom from './dtuCom.vue' // 弹窗组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, provide, onBeforeUnmount } from 'vue'
import { EditOutlined, DownOutlined } from '@vicons/antd'
export default {
  components: { EditOutlined, DownOutlined },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let { data } = table()
    let dtuStateList = ref<{ [key: string]: string }>({})
    /**
    * @desc 初始化
    */
    function init () {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/enum/DtuState', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dtuStateList.value = r.data.data
        }
      })
    }
    init()
    /**
    * @desc 改变页码
    */
    function changePage () {
      proxy.$api.get('commonRoot', '/dsa/api/dtu/web/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    changePage()
    provide('parentChangePage', changePage)
    const myDialog = useCommandComponent(dtuCom)
    /**
    * @desc 查看
    * @param {Object} row 数据对象
    */
    function view (row: any) {
      myDialog({ title: '采集子设备定义', visible: true, obj: row })
    }
    // 下拉选项
    let dropdownOptions = ref([
      { label: '重启', key: 'restart' },
      { label: '删除', key: 'del' }
    ])
    /**
    * @desc 下拉点击
    * @param {string} key 选项
    */
    function handleClickDropdown (key: string | number, item: any) {
      if (key === 'restart') {
        proxy.$myMessage({
          type: 'info',
          MessageTitle: '确定重启此设备？',
          submit: () => {
            proxy.$api.post('commonRoot', '/dsa/api/dtu/restart', { id: item.dtuId }, (r: IInterfaceData) => {
              if (r.data.code === 0) {
                proxy.$myMessage.success('操作成功')
                changePage()
              } else {
                proxy.$myMessage.error1(r.data.msg)
              }
            })
          }
        })
      } else if (key === 'del') {
        proxy.$myMessage({
          type: 'info',
          MessageTitle: '确定删除此设备？',
          submit: () => {
            proxy.$api.post('commonRoot', '/dsa/api/dtu/web/delete', { id: item.dtuId }, (r: IInterfaceData) => {
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
    }
    let modalEdit = ref(false) // 显示修改名称
    let editObj = ref({ dtuName: '' }) // 修改名称数据对象
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function openEdit (e: any, row: any) {
      editObj.value = util.value.deepClone(row)
      modalEdit.value = true
      e.stopPropagation()
    }
    /**
    * @desc 修改保存
    */
    function editSave () {
      if (util.value.isEmpty(editObj.value.dtuName)) {
        proxy.$myMessage.error1('请填写设备名称')
        return false
      }
      proxy.$myLoading.show()
      proxy.$api.post('commonRoot', '/dsa/api/dtu/updateName', editObj.value, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          proxy.$myMessage.success('保存成功')
          changePage()
          modalEdit.value = false
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
        proxy.$myLoading.close()
      })
    }
    let websocket = ref<any>(null)
    let exitFlag = ref(false)
    function initSocket () {
      websocket.value = new WebSocket(uploadRoot.value.replace('http://', 'ws://') + '/websocket/das/web/dtu/' + sessionStorage.token)
      websocket.value.onopen = (e: any) => {
        console.log('dtuonopen')
      }
      websocket.value.onerror = (e: any) => {
        console.log('onerror')
        console.log(e)
      }
      websocket.value.onmessage = (e: any) => {
        // console.log('onmessage')
        // console.log(e.data)
        if (!util.value.isEmpty(e.data)) {
          let temp = JSON.parse(e.data).data
          if (util.value.isType(temp, 'array')) {
            data.value = temp
          } else if (util.value.isType(temp, 'object')) {
            let i = data.value.findIndex(ele => ele.dtuId === temp.dtuId)
            if (i !== -1) {
              data.value.splice(i, 1, temp)
            }
          }
        }
      }
      websocket.value.onclose = (e: any) => {
        console.log('dtuonclose')
        if (!exitFlag.value) {
          setTimeout(() => {
            initSocket()
          }, 5000)
        }
      }
    }
    initSocket()
    onBeforeUnmount(() => {
      exitFlag.value = true
      websocket.value.close()
    })
    return {
      util, uploadRoot, dtuStateList, changePage, data, view, dropdownOptions, handleClickDropdown, modalEdit, editObj, openEdit, editSave
    }
  }
}
</script>
<style lang="scss">
@import "../../style/dtu";
</style>
