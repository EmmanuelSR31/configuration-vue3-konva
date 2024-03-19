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
              <v-label :config="configLabel(item)">
                <v-tag :config="configTag(item)"></v-tag>
                <v-text :config="configValue(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.category === 'status'">
              <v-circle :config="configStatus(item)"></v-circle>
            </template>
            <template v-else-if="item.category === 'simpleButton'">
              <v-label :config="configLabel(item)" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
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
    </template>
  </div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import configuration from './configuration'
import echartLine from './echart-line.vue'
import { getCurrentInstance, ref, nextTick, h } from 'vue'
import { IInterfaceData } from '@/page/interface/interface'
import Konva from 'konva'
export default {
  components: { echartLine },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let { method, id, items, configImg, configLabel, configTag, configText, configDatetime, configDeviceImg, configWaterBoxGroup, configWaterBoxBack, configWaterBoxWater,
      configWaterBoxLine, configValue, configStatus, configSimpleButtonText, configButtunTag, configLineGroup, configLine, configLinePipe, basicSettings, getBasicStyle,
      itemStyle } = configuration()
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
      configLineGroup, configLine, configLinePipe, handleMouseEnter, handleMouseLeave,
      basicSettings, getBasicStyle, itemStyle }
  }
}
</script>
<style lang="scss">
@import "../../style/configuration";
</style>