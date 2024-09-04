<template>
  <div :style="getBasicStyle">
    <v-stage :config="basicSettings">
      <v-layer ref="layer">
        <template v-for="(item ,index) in items">
          <template v-if="item.type === 'device'">
            <v-image :config="configImg(item)"></v-image>
          </template>
          <template v-else-if="item.type === 'text'">
            <v-label :config="configLabel(item)">
              <v-tag :config="configTag(item)"></v-tag>
              <v-text :config="configText(item)"></v-text>
            </v-label>
          </template>
          <template v-else-if="item.type === 'datetime'">
            <v-label :config="configLabel(item)">
              <v-tag :config="configTag(item)"></v-tag>
              <v-text :config="configDatetime(item)"></v-text>
            </v-label>
          </template>
          <template v-else-if="item.type === 'chart'">
            <template v-if="item.category === 'valve'">
              <v-image :config="configDeviceImg(item)"></v-image>
            </template>
            <template v-else-if="item.category === 'waterPump'">
              <v-image :config="configDeviceImg(item)"></v-image>
            </template>
            <template v-else-if="item.category === 'waterPumpHorizontal'">
              <v-image :config="configDeviceImg(item)"></v-image>
            </template>
            <template v-else-if="item.category === 'waterBox'">
              <v-group :config="configWaterBoxGroup(item)">
                <v-rect :config="configWaterBoxBack(item)"></v-rect>
                <v-rect :config="configWaterBoxWater(item)"></v-rect>
                <v-line :config="configWaterBoxLine(item)"></v-line>
              </v-group>
            </template>
            <template v-else-if="item.category === 'value'">
              <v-label :config="configLabel(item)" @click="showEdit(item)">
                <v-tag :config="configTag(item)"></v-tag>
                <v-text :config="configValue(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.category === 'status'">
              <v-circle :config="configStatus(item)"></v-circle>
            </template>
            <template v-else-if="item.category === 'simpleButton'">
              <v-label :config="configLabel(item)" @click="clickBut(item)" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <v-tag :config="configTag(item)"></v-tag>
                <v-text :config="configSimpleButtonText(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.category === 'button'">
              <v-label :config="configLabel(item)" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <v-tag :config="configButtunTag(item)"></v-tag>
                <v-text :config="configSimpleButtonText(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.category === 'line'">
              <v-group :config="configLineGroup(item)">
                <v-line :config="configLine(item)"></v-line>
              </v-group>
            </template>
          </template>
          <template v-else-if="item.type === 'pip-h'">
            <v-group :config="configLineGroup(item)">
              <v-line :config="configLine(item)"></v-line>
              <v-line :config="configLinePipe(item)" :ref="'linePipe' + item.id"></v-line>
            </v-group>
          </template>
          <template v-else-if="item.type === 'uploadImg'">
            <v-image :config="configUploadImg(item)"></v-image>
          </template>
        </template>
      </v-layer>
    </v-stage>
    <template v-for="(item ,index) in items">
      <template v-if="item.type === 'weather'">
        <div :style="itemStyle(item)">
          <template v-if="item.category === 1">
            <iframe :width="item.width * item.scaleX" scrolling="no" :height="item.height * item.scaleY" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&icon=1&num=1&site=12"></iframe>
          </template>
          <template v-else-if="item.category === 2">
            <iframe :width="item.width * item.scaleX" scrolling="no" :height="item.height * item.scaleY" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=1&icon=1&wind=1&num=1&site=12"></iframe>
          </template>
          <template v-else-if="item.category === 3">
            <iframe :width="item.width * item.scaleX" scrolling="no" :height="item.height * item.scaleY" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=19&icon=1&temp=1&num=1&site=12"></iframe>
          </template>
          <template v-else-if="item.category === 4">
            <iframe :width="item.width * item.scaleX" scrolling="no" :height="item.height * item.scaleY" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&icon=1&num=5&site=12"></iframe>
          </template>
        </div>
      </template>
      <template v-else-if="item.category === 'echart-line'">
        <echart-line :obj="item" :index="index"></echart-line>
      </template>
      <template v-else-if="item.type === 'progress'">
        <div :style="itemStyle(item)">
          <n-progress :color="item.color" :rail-color="item.backColor" :height="item.height" :percentage="item.val !== null && item.val !== undefined ? item.val/item.maxHeight*100 : 0" indicator-placement="inside"></n-progress>
        </div>
      </template>
      <template v-else-if="item.type === 'liquidfill'">
        <echart-liquidfill :obj="item" :index="index"></echart-liquidfill>
      </template>
    </template>
    <n-modal title="修改数值" v-model:show="modalEdit" preset="card" style="width: 400px;" @update:show="modalEditShow" :mask-closable="false" :close-on-esc="false">
      <div class="modal-form-1">
        <n-form label-placement="left" label-width="80px" require-mark-placement="left">
          <n-form-item label="参数名称">
            <n-input v-model:value="editVal" placeholder="请输入数值"></n-input>
          </n-form-item>
        </n-form>
        <div class="modal-btn">
          <n-button type="primary" @click="editSave()">确定</n-button>
        </div>
      </div>
    </n-modal>
    <n-modal title="二次授权" v-model:show="loginModal" preset="card" style="width: 600px;" :mask-closable="false" :close-on-esc="false">
      <div class="modal-form-1">
        <n-form ref="formValidate" :model="loginObj" :rules="ruleValidate"  label-placement="left" label-width="80px" require-mark-placement="left">
          <n-form-item label="用户名" path="userName">
            <n-input type="text" v-model:value="loginObj.userName" placeholder="请输入用户名"></n-input>
          </n-form-item>
          <n-form-item label="密码" path="userPassword">
            <n-input type="text" v-model:value="loginObj.userPassword" placeholder="请输入密码"></n-input>
          </n-form-item>
        </n-form>
        <div class="modal-btn">
          <n-button type="primary" @click="login()">确定</n-button>
        </div>
      </div>
    </n-modal>
    <number-keyboard v-if="showKeyboard" v-model:fatherNum="editVal" :clickTime="0" @confirmEvent="editSave"
    @numberEvent="numberEvent" @deleteEvent="deleteEvent"></number-keyboard>
  </div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import configuration from './configuration'
import echartLine from './echart-line.vue'
import echartLiquidfill from './echart-liquidfill.vue'
import { numberKeyboard } from '@/page/components/index'
import { getCurrentInstance, ref } from 'vue'
import { IInterfaceData } from '@/page/interface/interface'
import Konva from 'konva'
export default {
  components: { echartLine, echartLiquidfill, numberKeyboard },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot, permissionExpiration } = common()
    let { method, id, items, configImg, configLabel, configTag, configText, configDatetime, configDeviceImg, configWaterBoxGroup, configWaterBoxBack, configWaterBoxWater,
      configWaterBoxLine, configValue, configStatus, configSimpleButtonText, configButtunTag, configLineGroup, configLine, configLinePipe, configUploadImg,
      basicSettings, getBasicStyle, itemStyle } = configuration()
    id.value = proxy.$route.params.id
    method.value = 'view'
    function init () {
      proxy.$api.get('commonRoot', '/module/skin/get', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          document.title = r.data.data.headerSystemName
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      proxy.$api.post('commonRoot', '/v2/apps/graphics/obtainDeviceGraphicsData', { id: id.value }, (r: IInterfaceData) => {
        if (r.data.status) {
          let temp = JSON.parse(r.data.data.graphicsJson)
          basicSettings.value = temp.basicSettings
          items.value = temp.items
          getSensorIds()
        }
      })
    }
    init()
    /**
    * @desc 获取所有绑定设备的组件数组
    */
    function getSensorIds () {
      for (const iterator of items.value) {
        if (!util.value.isEmpty(iterator.deviceDataId) || !util.value.isEmpty(iterator.deviceId)) {
          sensorItems.value.push(iterator)
        }
      }
      initSocket()
      initSocketState()
    }
    let sensorItems = ref<Array<any>>([]) // 绑定设备的组件数组
    let websocket = ref<any>(null)
    let exitFlag = ref(false) // 页面退出
    /**
    * @desc websocket初始化
    */
    function initSocket () {
      let url = uploadRoot.value.replace('http://', 'ws://') + '/dsa/api/websocket/webscada/' + id.value + '/' + sessionStorage.token
      websocket.value = new WebSocket(url)
      websocket.value.onopen = (e: any) => {
        console.log('onopen')
      }
      websocket.value.onerror = (e: any) => {
        console.log('onerror')
        console.log(e)
      }
      websocket.value.onmessage = (e: any) => {
        console.log(e.data)
        if (!util.value.isEmpty(e.data)) {
          let temp = JSON.parse(e.data)
          if (temp.code === -2) {
            permissionExpiration()
            return false
          }
          for (const iterator of sensorItems.value) {
            let id = ''
            if (!util.value.isEmpty(iterator.deviceDataId)) {
              id = iterator.deviceDataId
            } else if (!util.value.isEmpty(iterator.deviceId)) {
              id = iterator.deviceId
            }
            let obj = temp[id]
            if (!util.value.isEmpty(obj)) {
              iterator.val = obj.value
            }
          }
        }
      }
      websocket.value.onclose = (e: any) => {
        console.log('onclose')
        if (!exitFlag.value) {
          setTimeout(() => {
            initSocket()
          }, 5000)
        }
      }
    }
    let websocketState = ref<any>(null)
    function initSocketState () {
      let url = uploadRoot.value.replace('http://', 'ws://') + '/dsa/api/deviceState/websocket/' + sessionStorage.token
      websocketState.value = new WebSocket(url)
      websocketState.value.onopen = (e: any) => {
        console.log('onopen')
      }
      websocketState.value.onerror = (e: any) => {
        console.log('onerror')
        console.log(e)
      }
      websocketState.value.onmessage = (e: any) => {
        // console.log(e.data)
        if (!util.value.isEmpty(e.data)) {
          let temp = JSON.parse(e.data)
          if (temp.code === -2) {
            permissionExpiration()
            return false
          }
          for (const iterator of sensorItems.value) {
            if (iterator.deviceId === temp.deviceId) {
              iterator.deviceState = temp.deviceState
              break
            }
          }
        }
      }
      websocketState.value.onclose = (e: any) => {
        console.log('onclose')
        if (!exitFlag.value) {
          setTimeout(() => {
            initSocketState()
          }, 5000)
        }
      }
    }
    /**
    * @desc 普通按钮点击
    */
    function clickBut (item: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定执行此操作？',
        submit: () => {
          editObj.value.deviceDataId = item.deviceDataId
          editVal.value = '1'
          editSave()
        }
      })
    }
    let editObj = ref({ deviceDataId: '' }) // 编辑数值对象
    let editVal = ref('') // 编辑数值
    let modalEdit = ref(false)
    let showKeyboard = ref(false)
    /**
    * @desc 打开数值弹窗
    */
    function showEdit (item: any) {
      editObj.value.deviceDataId = item.deviceDataId
      editVal.value = ''
      modalEdit.value = true
      showKeyboard.value = true
    }
    /**
    * @desc 数值弹窗展示状态
    */
    function modalEditShow (val: boolean) {
      if (!val) {
        showKeyboard.value = false
      }
    }
    /**
    * @desc 保存数值
    */
    function editSave () {
      if (util.value.isEmpty(editVal.value)) {
        proxy.$myMessage.error1('请填写数值')
        return false
      }
      if (!util.value.isEmpty(editObj.value.deviceDataId)) {
        proxy.$api.post('commonRoot', '/mes/device/data/web/setData', { deviceDataId: editObj.value.deviceDataId, value: editVal.value, twiceAuthToken: sessionStorage.token }, (r: IInterfaceData) => {
          if (r.data.code === 0) {
            modalEdit.value = false
            showKeyboard.value = false
          } else {
            proxy.$myMessage.error1(r.data.msg)
            if (r.data.msg.includes('二次授权')) {
              loginObj.value = { userName: '', userPassword: '' }
              loginModal.value = true
            }
          }
        })
      }
    }
    function numberEvent (res: string) {
      editVal.value = res
    }
    function deleteEvent (res: string) {
      editVal.value = res
    }
    let loginObj = ref({ userName: '', userPassword: '' }) // 二次授权对象
    let loginModal = ref(false)
    const ruleValidate = ref({ // 二次授权表单验证
      userName: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ]
    })
    /**
    * @desc 二次授权
    */
    function login () {

    }
    /**
    * @desc 鼠标移入
    */
    function handleMouseEnter (e: any) {
      document.body.style.cursor = 'pointer'
    }
    /**
    * @desc 鼠标移出
    */
    function handleMouseLeave (e: any) {
      document.body.style.cursor = 'default'
    }
    return { util, uploadRoot, init, items,
      configImg, configLabel, configTag, configText, configDatetime, configDeviceImg, configWaterBoxGroup,
      configWaterBoxBack, configWaterBoxWater, configWaterBoxLine,
      configValue, configStatus, configSimpleButtonText, configButtunTag,
      configLineGroup, configLine, configLinePipe, configUploadImg,
      clickBut, editVal, modalEdit, showKeyboard, showEdit, modalEditShow, editSave, numberEvent, deleteEvent,
      loginObj, loginModal, ruleValidate, login,
      handleMouseEnter, handleMouseLeave,
      basicSettings, getBasicStyle, itemStyle }
  }
}
</script>
<style lang="scss">
@import "../../style/configuration";
</style>