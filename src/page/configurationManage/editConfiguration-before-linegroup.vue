<template>
  <div class="editConfiguration_main">
    <div class="config-header">
      <a href="javascript:void(0)">{{basicSettings.name}}</a>
      <span class="config-header-btn">
        <!-- <a @click="viewConfig" style="" href="javascript:void(0);">预览</a> -->
        
        <a @click="closeConfig" href="javascript:void(0);">关闭</a>
        <a @click="saveConfig" href="javascript:void(0);">保存</a>
      </span>
    </div>
    <div class="config-con">
      <div class="config-left">
        <ul>
          <li :class="{'active': curItemListType === 'common'}" @click="setCurItemListType('common')"><a href="javascript:void(0)"><Icon type="ios-paper-outline" /><br>基本</a></li>
          <li :class="{'active': curItemListType === 'chart'}" @click="setCurItemListType('chart')"><a href="javascript:void(0)"><Icon type="md-stats" /><br>组件</a></li>
          <li :class="{'active': curItemListType === 'device'}" @click="setCurItemListType('device')"><a href="javascript:void(0)"><Icon type="ios-image-outline" /><br>图库</a></li>
          <li :class="{'active': curItemListType === 'img'}" @click="setCurItemListType('img')"><a href="javascript:void(0)"><Icon type="md-photos" /><br>图形</a></li>
          <li :class="{'active': curItemListType === 'canvas'}" @click="setCurItemListType('canvas')"><a href="javascript:void(0)"><Icon type="md-git-compare" /><br>动画</a></li>
        </ul>
      </div>
      <div class="config-item-con" v-show="itemListShow">
        <div class="config-item-top" v-show="curItemListType === 'device'">
          {{svgItemsTypeTitle}}
          <a href="javascript:void(0)" @click="toggleDeviceItemType">
            <svg class="icon" aria-hidden="true" :style="{transform: 'rotate(' + (deviceItemTypeShow ? 0 : 180) + 'deg)'}">
              <use xlink:href="#iconxiangxiazhanhang"></use>
            </svg>
          </a>
        </div>
        <div class="config-item-list-con" :style="{height: curItemListType === 'device' ? 'calc(100% - 20px)' : '100%'}">
          <ul class="config-common-item-list" v-show="curItemListType === 'common'">
            <li v-for="(item, index) in commonItems" :key="'commonItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#' + item.icon"></use>
                </svg>
                <h3>{{item.name}}</h3>
              </div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'chart'" class="config-item-list">
            <li v-for="(item, index) in chartItems" :key="'chartItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
          <div v-show="deviceItemTypeShow && curItemListType === 'device'" class="config-item-type-con">
            <ul>
              <li :class="{'active': svgItemsTypeTitle === '容器'}" @click="setSvgItems('svgContainerItems', '容器')">容器</li>
              <li :class="{'active': svgItemsTypeTitle === '阀门'}" @click="setSvgItems('svgValveItems', '阀门')">阀门</li>
              <li :class="{'active': svgItemsTypeTitle === '水处理'}" @click="setSvgItems('svgWaterItems', '水处理')">水处理</li>
              <li :class="{'active': svgItemsTypeTitle === '机器'}" @click="setSvgItems('svgMachineItems', '机器')">机器</li>
              <li :class="{'active': svgItemsTypeTitle === '发动机'}" @click="setSvgItems('svgEngineItems', '发动机')">发动机</li>
              <li :class="{'active': svgItemsTypeTitle === '物料运输'}" @click="setSvgItems('svgCarriageItems', '物料运输')">物料运输</li>
              <li :class="{'active': svgItemsTypeTitle === '鼓风机'}" @click="setSvgItems('svgBlowerItems', '鼓风机')">鼓风机</li>
              <li :class="{'active': svgItemsTypeTitle === '锅炉'}" @click="setSvgItems('svgBoilerItems', '锅炉')">锅炉</li>
              <li :class="{'active': svgItemsTypeTitle === '电源'}" @click="setSvgItems('svgElectricityItems', '电源')">电源</li>
              <li :class="{'active': svgItemsTypeTitle === '管道'}" @click="setSvgItems('svgPipeItems', '管道')">管道</li>
              <li :class="{'active': svgItemsTypeTitle === '工业'}" @click="setSvgItems('svgIndustrialItems', '工业')">工业</li>
              <li :class="{'active': svgItemsTypeTitle === '食品加工'}" @click="setSvgItems('svgFoodItems', '食品加工')">食品加工</li>
              <li :class="{'active': svgItemsTypeTitle === '物流'}" @click="setSvgItems('svgLogisticsItems', '物流')">物流</li>
              <li :class="{'active': svgItemsTypeTitle === '加热器'}" @click="setSvgItems('svgHeaterItems', '加热器')">加热器</li>
              <li :class="{'active': svgItemsTypeTitle === 'HAVC'}" @click="setSvgItems('svgHavcItems', 'HAVC')">HAVC</li>
              <li :class="{'active': svgItemsTypeTitle === '化学'}" @click="setSvgItems('svgChemicalItems', '化学')">化学</li>
              <li :class="{'active': svgItemsTypeTitle === '工厂设施'}" @click="setSvgItems('svgPlantItems', '工厂设施')">工厂设施</li>
              <li :class="{'active': svgItemsTypeTitle === '建筑'}" @click="setSvgItems('svgBuildingItems', '建筑')">建筑</li>
              <li :class="{'active': svgItemsTypeTitle === '仪表'}" @click="setSvgItems('svgMeterItems', '仪表')">仪表</li>
              <li :class="{'active': svgItemsTypeTitle === '医学'}" @click="setSvgItems('svgMedicalItems', '医学')">医学</li>
              <li :class="{'active': svgItemsTypeTitle === '其他'}" @click="setSvgItems('svgOtherItems', '其他')">其他</li>
            </ul>
          </div>
          <ul v-show="!deviceItemTypeShow && curItemListType === 'device'" class="config-item-list">
            <li v-for="(item, index) in svgItems" :key="'svgItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'img'" class="config-item-list config-img-item-list">
            <li v-for="(item, index) in imgItems" :key="'imgItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :src="item.img"></div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'canvas'" class="config-item-list">
            <li v-for="(item, index) in canvasItems" :key="'canvasItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="config-center" @dragover="e=>e.preventDefault()" @drop="drop" :class="{'config-center-bg': basicSettings.showAuxiliaryLine}" :style="{width: basicSettings.width + 'px', height: basicSettings.height + 'px', backgroundColor: basicSettings.backColor}">
      <v-stage :config="basicSettings" @click="stageClick">
        <v-layer ref="layer">
          <template v-for="(item ,index) in items">
            <template v-if="item.type === 'device'">
              <v-image :config="configImg(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
            </template>
            <template v-else-if="item.type === 'text'">
              <v-text :config="configText(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-text>
            </template>
            <template v-else-if="item.type === 'datetime'">
              <v-text :config="configDatetime(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-text>
            </template>
            <template v-else-if="item.type === 'chart'">
              <template v-if="item.category === 'value'">
                <v-text :config="configValue(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-text>
              </template>
              <template v-else-if="item.category === 'led'">
                <v-text :config="configLed(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-text>
              </template>
              <template v-else-if="item.category === 'simpleButton'">
                <v-rect :config="configSimpleButton(item)"></v-rect>
                <v-text :config="configSimpleButtonText(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend"></v-text>
              </template>
              <template v-else-if="item.category === 'line'">
                <v-line :config="configLine(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend"></v-line>
                <v-circle :config="configLineAnchor(item1)" v-for="(item1, index1) in item.anchorPoints" @dragstart="dragstartLineAnchor(item1, index1, item)" @dragmove="dragmoveLineAnchor" @dragend="dragendLineAnchor" :key="index1"></v-circle>
                <v-circle :config="configLineMiddle(item2)" v-for="(item2, index2) in item.middlePoints" @dragstart="dragstartLineMiddle(item2, index2, item)" @dragmove="dragmoveLineMiddle" @dragend="dragendLineMiddle" :key="index2"></v-circle>
                
              </template>
            </template>
            <template v-else-if="item.type === 'pip-h'">
              <v-line :config="configLine(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend"></v-line>
              <v-line :config="configLinePipe(item)" :ref="'linePipe' + item.id"></v-line>
              <v-circle :config="configLineAnchor(item1)" v-for="(item1, index1) in item.anchorPoints" @dragstart="dragstartLineAnchor(item1, index1, item)" @dragmove="dragmoveLineAnchor" @dragend="dragendLineAnchor" :key="index1"></v-circle>
              <v-circle :config="configLineMiddle(item2)" v-for="(item2, index2) in item.middlePoints" @dragstart="dragstartLineMiddle(item2, index2, item)" @dragmove="dragmoveLineMiddle" @dragend="dragendLineMiddle" :key="index2"></v-circle>
            </template>
          </template>
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { getCurrentInstance, ref, nextTick, h } from 'vue'
import Konva from 'konva'
export default {
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let method = ref('')
    let id = ref('')
    let commonItems = proxy.$store.state.commonItems // 基本
    let chartItems = proxy.$store.state.chartItems // 组件
    let svgItems = proxy.$store.state.svgContainerItems // 图库
    let imgItems = proxy.$store.state.imgItems // 图形
    let canvasItems = proxy.$store.state.canvasItems // 动画
    let switchs = proxy.$store.state.switchs // 开关组
    let svgItemsTypeTitle = ref('容器') // 图库类别名
    let curItemListType = ref('common') // 当前显示图片列表类型
    let itemListShow = ref(true) // 图片列表是否显示
    let deviceItemTypeShow = ref(false) // 图库分类是否显示
    let basicSettings = ref({ // 基本设置
      name: '',
      cover: '',
      width: 1920,
      height: 1080,
      adapt: false,
      showAuxiliaryLine: true,
      backColor: 'rgba(255,255,255,0)'
    })
    function init (m: string, i: string, obj: any) {
      method.value = m
      id.value = i
      if (method.value === 'add') {
        basicSettings.value.name = obj.name
        basicSettings.value.cover = obj.cover
      } else if (method.value === 'edit') {
        proxy.$api.post('commonRoot', '/v2/apps/graphics/obtainDeviceGraphicsData', { id: id.value }, (r: any) => {
          if (r.data.status) {
            let temp = JSON.parse(r.data.data.graphicsJson)
            basicSettings.value = temp.basicSettings
            items.value = temp.items
          }
        })
      }
    }
    /**
    * @desc 设置当前左侧显示类型
    * @param {String} val 显示类型
    */
    function setCurItemListType (val: string) {
      if (curItemListType.value === val) {
        itemListShow.value = !itemListShow.value
      } else {
        curItemListType.value = val
        itemListShow.value = true
      }
    }
    /**
    * @desc 切换显示图库分类
    */
    function toggleDeviceItemType () {
      deviceItemTypeShow.value = !deviceItemTypeShow.value
    }
    /**
    * @desc 设置svg图库列表
    * @param {String} name 图库列表名
    * @param {String} title 图库名
    */
    function setSvgItems (name: string, title: string) {
      svgItems = proxy.$store.state[name]
      svgItemsTypeTitle.value = title
      deviceItemTypeShow.value = false
    }
    let dragObj = ref<any>({})
    let items = ref<Array<any>>([])
    function dragstartLeft (item: any) {
      dragObj.value = item
    }
    function drop (e :any) {
      console.log(e)
      let temp = util.value.deepClone(dragObj.value)
      temp.id = new Date().getTime() + ''
      temp.borderWidth = 0
      temp.borderColor = 'rgba(0,0,0,0)'
      temp.borderRadius = 0
      temp.transparency = 10
      temp.rotation = 0
      temp.scaleX = 1
      temp.scaleY = 1
      temp.draggable = true
      if (dragObj.value.category === 'line' || dragObj.value.type === 'pip-h') {
        temp.points = [e.offsetX, e.offsetY, e.offsetX + dragObj.value.width, e.offsetY]
        temp.anchorPoints = [{ x: e.offsetX, y: e.offsetY, category: 'line' }, { x: e.offsetX + dragObj.value.width, y: e.offsetY, category: 'line' }]
        temp.middlePoints = [{ x: e.offsetX + (dragObj.value.width / 2), y: e.offsetY, category: 'line' }]
        temp.x = 0
        temp.y = 0
      } else {
        temp.x = e.offsetX
        temp.y = e.offsetY
      }
      items.value.push(temp)
      console.log(items.value)
      // 流动动画
      if (dragObj.value.type === 'pip-h') {
        setTimeout(() => {
          let obj = proxy.$refs['linePipe' + temp.id][0].getNode()
          console.log(obj)
          const anim = new Konva.Animation(function(frame) {
            let temp = obj.attrs.dashOffset
            if (isNaN(obj.attrs.dashOffset)) {
              obj.dashOffset(0)
            }
            if (temp > (obj.attrs.dashWidth + obj.attrs.dashOffset)) {
              obj.dashOffset(0)
            }
            obj.dashOffset(obj.attrs.dashOffset - 1)
          }, obj.getLayer())
          anim.start()
        }, 500)
      }
    }
    /**
    * @desc 图片配置
    */
    function configImg (item: any) {
      var imageObj = new Image()
      imageObj.src = item.img
      item.image = imageObj
      return item
    }
    /**
    * @desc 文本配置
    */
    function configText (item: any) {
      item.fill = item.color
      item.text = '温度：25'
      return item
    }
    let nowDatetime = ref('')
    function setNowDatetime () {
      let date = new Date()
      nowDatetime.value = date.toLocaleString('zh', { hour12: false }).replace(/\//g, '-')
    }
    // 时间实时更新
    window.setInterval(setNowDatetime, 1000)
    /**
    * @desc 时间配置
    */
    function configDatetime (item: any) {
      item.fill = item.color
      item.text = nowDatetime.value
      return item
    }
    /**
    * @desc 数值配置
    */
    function configValue (item: any) {
      item.fill = item.color
      item.text = '12.34'
      if (!util.value.isEmpty(item.unit)) {
        item.text += item.unit
      }
      return item
    }
    /**
    * @desc LED数值配置
    */
    function configLed (item: any) {
      configValue(item)
      item.fontFamily = 'LcdD'
      return item
    }
    /**
    * @desc 普通按钮配置
    */
    function configSimpleButton (item: any) {
      let obj = util.value.deepClone(item)
      obj.fill = '#f2f2f2'
      obj.stroke = '#999'
      obj.strokeWidth = 5
      obj.draggable = false
      obj.name = 'rect' + obj.id
      return obj
    }
    function configSimpleButtonText (item: any) {
      item.fill = item.color
      return item
    }
    /**
    * @desc 线条配置
    */
    function configLine (item: any) {
      item.stroke = item.color
      /* item.x = 0
      item.y = 0 */
      item.hitStrokeWidth = item.strokeWidth + 10
      return item
    }
    /**
    * @desc 线条流块配置
    */
    function configLinePipe (item: any) {
      let obj = util.value.deepClone(item)
      obj.stroke = item.pipelineColor
      obj.strokeWidth = item.pipeStrokeWidth
      obj.lineJoin = 'round'
      obj.dash = [item.dashWidth, item.dashOffset]
      obj.draggable = false
      return obj
    }
    /**
    * @desc 线条端点配置
    */
    function configLineAnchor (item: any) {
      item.radius = 5
      item.stroke = 'black'
      item.strokeWidth = 2
      item.draggable = true
      return item
    }
    /**
    * @desc 线条中点配置
    */
    function configLineMiddle (item: any) {
      item.radius = 5
      item.stroke = 'blue'
      item.strokeWidth = 2
      item.draggable = true
      return item
    }
    let moveLineAnchorObj = ref<any>({}) // 移动中的线条端点
    let moveLineAnchorIndex = ref(0) // 移动中的线条端点位置
    function dragstartLineAnchor (item: any, index: number, lineObj: any) {
      moveLineAnchorObj.value = item
      moveLineAnchorIndex.value = index
      moveObj.value = lineObj
    }
    function dragmoveLineAnchor (e: any) {
      moveLineAnchorObj.value.y = e.target.attrs.y
      moveLineAnchorObj.value.x = e.target.attrs.x
      // 拖动端点时移动线条
      moveObj.value.points[moveLineAnchorIndex.value * 2] = e.target.attrs.x - moveObj.value.x
      moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] = e.target.attrs.y - moveObj.value.y
      // 拖动端点时移动中点
      // 第一个端点时
      if (moveLineAnchorIndex.value === 0) {
        moveObj.value.middlePoints[moveLineAnchorIndex.value].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 + 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 + 3] + moveObj.value.y) / 2
      // 中间端点时
      } else if (moveLineAnchorIndex.value !== (moveObj.value.anchorPoints.length - 1)) {
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 - 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 - 1] + moveObj.value.y) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 + 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 + 3] + moveObj.value.y) / 2
      // 最后端点时
      } else {
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 - 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 - 1] + moveObj.value.y) / 2
      }
    }
    function dragendLineAnchor (e: any) {
      moveLineAnchorObj.value.y = e.target.attrs.y
      moveLineAnchorObj.value.x = e.target.attrs.x
    }
    let moveLineMiddleObj = ref<any>({}) // 移动中的线条中点
    let moveLineMiddleIndex = ref(0) // 移动中的线条中点位置
    function dragstartLineMiddle (item: any, index: number, lineObj: any) {
      moveLineMiddleObj.value = item
      moveLineMiddleIndex.value = index
      moveObj.value = lineObj
    }
    function dragmoveLineMiddle (e: any) {
      moveLineMiddleObj.value.y = e.target.attrs.y
      moveLineMiddleObj.value.x = e.target.attrs.x
    }
    function dragendLineMiddle (e: any) {
      // 增加线条
      moveObj.value.points.splice(moveLineMiddleIndex.value * 2 + 2, 0, e.target.attrs.x - moveObj.value.x, e.target.attrs.y - moveObj.value.y)
      console.log(moveObj.value.points)
      // 增加端点
      moveObj.value.anchorPoints.splice(moveLineMiddleIndex.value + 1, 0, { x: e.target.attrs.x, y: e.target.attrs.y, category: 'line' })
      // 更新拖动中点位置
      moveLineMiddleObj.value.y = (moveObj.value.anchorPoints[moveLineMiddleIndex.value].y + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].y) / 2
      moveLineMiddleObj.value.x = (moveObj.value.anchorPoints[moveLineMiddleIndex.value].x + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].x) / 2
      // 增加中点
      moveObj.value.middlePoints.splice(moveLineMiddleIndex.value + 1, 0, {
        x: (moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].x + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 2].x) / 2,
        y: (moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].y + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 2].y) / 2,
        category: 'line'
      })
    }
    let moveObj = ref<any>({}) // 移动中的组件
    // 开始拖动时初始位置
    let moveOldX = ref(0)
    let moveOldY = ref(0)
    function dragstart (item: any, e: any) {
      console.log(e)
      moveOldX.value = e.evt.offsetX
      moveOldY.value = e.evt.offsetY
      moveObj.value = item
    }
    function dragmove (e: any) {
      console.log(e)
      moveObj.value.y = e.target.attrs.y
      moveObj.value.x = e.target.attrs.x
      if (moveObj.value.category === 'line' || dragObj.value.type === 'pip-h') {
        // 更新端点位置
        for (const iterator of moveObj.value.anchorPoints) {
          iterator.x += e.evt.offsetX - moveOldX.value
          iterator.y += e.evt.offsetY - moveOldY.value
        }
        // 更新中点位置
        for (const iterator of moveObj.value.middlePoints) {
          iterator.x += e.evt.offsetX - moveOldX.value
          iterator.y += e.evt.offsetY - moveOldY.value
        }
        moveOldX.value = e.evt.offsetX
        moveOldY.value = e.evt.offsetY
      }
    }
    function dragend (e: any) {
      console.log(e)
      moveObj.value.y = e.target.attrs.y
      moveObj.value.x = e.target.attrs.x
      console.log(moveObj.value)
    }
    function transformend (e: any) {
      console.log(e)
      moveObj.value.y = e.target.attrs.y
      moveObj.value.x = e.target.attrs.x
      moveObj.value.scaleX = e.target.attrs.scaleX
      moveObj.value.scaleY = e.target.attrs.scaleY
      moveObj.value.rotation = e.target.attrs.rotation
    }
    // let transformerNode = ref<any | null>(null)
    function stageClick (e: any) {
      console.log(e)
      // if we are selecting with rect, do nothing
      /* if (selectionRectangle.visible()) {
        return;
      } */
      let transformerNode = proxy.$refs.transformer.getNode()
      // console.log(transformerNode)
      // if click on empty area - remove all selections
      if (e.target === e.currentTarget) {
        transformerNode.nodes([])
        return
      }
      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
      const isSelected = transformerNode.nodes().indexOf(e.target) >= 0

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        // 按钮需选中rect和text
        if (['simpleButton'].includes(e.target.attrs.category)) {
          let arr = proxy.$refs.layer.getNode().children
          let rectTemp = arr.find((ele: any) => ele.hasName('rect' + e.target.attrs.id))
          if (rectTemp !== undefined) {
            transformerNode.nodes([e.target, rectTemp])
          } else {
            transformerNode.nodes([e.target])
          }
          /* let tArr = []
          for (const iterator of arr) {
            console.log(iterator.hasName('rect'))
            if (iterator.attrs.id === e.target.attrs.id) {
              tArr.push(iterator)
            }
          }
          transformerNode.nodes(tArr) */
        } else if (['line'].includes(e.target.attrs.category) || e.target.attrs.type === 'pip-h') {
          
        } else {
          transformerNode.nodes([e.target])
        }
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = transformerNode.nodes().slice() // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1)
        transformerNode.nodes(nodes)
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = transformerNode.nodes().concat([e.target])
        transformerNode.nodes(nodes)
      }
    }
    function saveConfig () {
      console.log(items.value)
      let obj = { basicSettings: basicSettings.value, items: items.value }
      let jsonStr = JSON.stringify(obj)
      proxy.$myLoading.show()
      if (method.value === 'add') {
        let temp = util.value.getDate(18)
        proxy.$api.post('commonRoot', '/v2/apps/graphics/insert', { title: basicSettings.value.name, coverChart: 'aaa', graphicsJson: jsonStr, publishingLogo: 0, addDate: temp, addPople: 'admin' }, (r: any) => {
          if (r.data.status) {
            proxy.$myMessage.success('新增成功')
            proxy.$emit('save-success', true)
          } else {
            proxy.$myMessage.error1('新增失败')
          }
          proxy.$myLoading.close()
        })
      } else if (method.value === 'edit') {
        proxy.$api.post('commonRoot', '/v2/apps/graphics/updateGraphics', { id: id.value, title: basicSettings.value.name, coverChart: basicSettings.value.cover, graphicsJson: jsonStr }, (r: any) => {
          if (r.data.status) {
            proxy.$myMessage.success('修改成功')
            proxy.$emit('save-success', false)
          } else {
            proxy.$myMessage.error1('修改失败')
          }
          proxy.$myLoading.close()
        })
      }
    }
    function closeConfig () {
      proxy.$emit('close')
    }
    return { uploadRoot, commonItems, chartItems, svgItems, imgItems, canvasItems, switchs, svgItemsTypeTitle, curItemListType, itemListShow,
      deviceItemTypeShow, basicSettings,
      init, setCurItemListType, toggleDeviceItemType, setSvgItems, dragstartLeft, drop, items,
      configImg, configText, configDatetime, configValue, configLed, configSimpleButton, configSimpleButtonText,
      configLine, configLinePipe, configLineAnchor, configLineMiddle,
      dragstartLineAnchor, dragmoveLineAnchor, dragendLineAnchor, dragstartLineMiddle, dragmoveLineMiddle, dragendLineMiddle,
      dragstart, dragmove, dragend, transformend, stageClick,
      saveConfig, closeConfig }
  }
}
</script>
<style lang="scss">
@import "../../style/configuration";
</style>