import common from '@/page/mixins/common' // 基本混入
import { getCurrentInstance, ref, computed } from 'vue'

export default function () {
  const proxy: any = getCurrentInstance()!.proxy
  let { util, uploadRoot } = common()
  let method = ref('')
  let id = ref('')
  let items = ref<Array<any>>([]) // 所有组件
  /**
  * @desc 图片配置
  */
  function configImg (item: any) {
    var imageObj = new Image()
    imageObj.src = item.img
    item.image = imageObj
    item.name = 'item'
    return item
  }
  /**
  * @desc 文本块配置
  */
  function configLabel (item: any) {
    let obj = util.value.deepClone(item)
    obj.name = 'item'
    return obj
  }
  /**
  * @desc 背景配置
  */
  function configTag (item: any) {
    let obj = util.value.deepClone(item)
    obj.x = 0
    obj.y = 0
    obj.scaleX = 1
    obj.scaleY = 1
    obj.rotation = 0
    obj.fill = obj.backColor
    obj.draggable = false
    if (obj.borderStyle === 'dashed') {
      obj.dash = [6, 3]
    } else if (obj.borderStyle === 'dotted') {
      obj.dash = [3, 3]
    }
    return obj
  }
  /**
  * @desc 文本配置
  */
  function configText (item: any) {
    let obj = util.value.deepClone(item)
    obj.fill = obj.color
    obj.x = 0
    obj.y = 0
    obj.scaleX = 1
    obj.scaleY = 1
    obj.rotation = 0
    obj.draggable = false
    obj.strokeWidth = 0
    if (obj.fontStyle === 'italic' && obj.fontWeight === 'bold') {
      obj.fontStyle = 'italic bold'
    } else if (obj.fontStyle !== 'italic' && obj.fontWeight === 'bold') {
      obj.fontStyle = 'bold'
    }
    return obj
  }
  let nowDatetime = ref('') // 当前时间
  /**
  * @desc 时间更新
  */
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
    let obj = configText(item)
    obj.text = nowDatetime.value
    return obj
  }
  /**
  * @desc 阀门，泵配置
  */
  function configDeviceImg (item: any) {
    var imageObj = new Image()
    if (method.value === 'view') {
      imageObj.src = item.offImg
      if (item.deviceState === 'OffLine') {
        imageObj.src = item.offImg
      } else if (item.deviceState === 'Startup') {
        imageObj.src = item.offImg
      } else if (item.deviceState === 'Work') {
        imageObj.src = item.onImg
      } else if (item.deviceState === 'Alarm') {
        imageObj.src = item.errorImg
      }
    } else {
      imageObj.src = item.onImg
    }
    item.image = imageObj
    item.name = 'item'
    return item
  }
  /**
  * @desc 水箱组配置
  */
  function configWaterBoxGroup (item: any) {
    let obj = util.value.deepClone(item)
    obj.name = 'item'
    return obj
  }
  /**
  * @desc 水箱背景配置
  */
  function configWaterBoxBack (item: any) {
    let obj = util.value.deepClone(item)
    obj.fill = item.backColor
    obj.x = 0
    obj.y = 0
    obj.scaleX = 1
    obj.scaleY = 1
    obj.rotation = 0
    obj.strokeWidth = 0
    obj.draggable = false
    return obj
  }
  /**
  * @desc 水箱液位配置
  */
  function configWaterBoxWater (item: any) {
    let obj = util.value.deepClone(item)
    obj.fill = item.color
    obj.scaleX = 1
    obj.scaleY = 1
    obj.rotation = 0
    // 实际只减边框宽度的一半
    obj.x = item.strokeWidth / 2
    obj.width = item.width - (item.strokeWidth * 1)
    let h = 0
    if (method.value === 'view') {
      h = item.val / item.maxHeight * item.height
    } else {
      h = item.height / 2
    }
    obj.y = obj.height - h
    obj.height = h - (item.strokeWidth / 2)
    obj.strokeWidth = 0
    obj.draggable = false
    return obj
  }
  function configWaterBoxLine (item: any) {
    let obj = util.value.deepClone(item)
    obj.points = [0, 0, 0, item.height, item.width, item.height, item.width, 0]
    obj.x = 0
    obj.y = 0
    obj.scaleX = 1
    obj.scaleY = 1
    obj.rotation = 0
    obj.lineJoin = 'round'
    obj.lineCap = 'round'
    obj.draggable = false
    return obj
  }
  /**
  * @desc 数值配置
  */
  function configValue (item: any) {
    let obj = configText(item)
    if (method.value === 'view') {
      obj.text = obj.val
    } else {
      obj.text = '12.34'
    }
    if (!util.value.isEmpty(item.unitText)) {
      obj.text += item.unitText
    }
    return obj
  }
  /**
  * @desc 状态配置
  */
  function configStatus (item: any) {
    if (method.value === 'view') {
      for (const iterator of item.statusData) {
        if (item.val >= iterator.less && item.val <= iterator.greater) {
          item.fill = iterator.color
        }
      }
    } else {
      item.fill = item.color
    }
    item.radius = item.width
    return item
  }
  /**
  * @desc 普通按钮配置
  */
  function configSimpleButtonText (item: any) {
    let obj = configText(item)
    return obj
  }
  /**
  * @desc 按钮背景配置
  */
  function configButtunTag (item: any) {
    let obj = configTag(item)
    return obj
  }
  /**
  * @desc 线条组配置
  */
  function configLineGroup (item: any) {
    item.group.name = 'item'
    return item.group
  }
  /**
  * @desc 线条配置
  */
  function configLine (item: any) {
    item.stroke = item.color
    item.x = 0
    item.y = 0
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
  * @desc 上传图片配置
  */
  function configUploadImg (item: any) {
    var imageObj = new Image()
    imageObj.src = uploadRoot.value + '/oss/' + item.relativePath
    item.image = imageObj
    return item
  }
  let basicSettings = ref({ // 基本设置
    name: '',
    cover: '',
    width: 1920,
    height: 1080,
    adapt: false,
    showAuxiliaryLine: true,
    backColor: 'rgba(255,255,255,0)',
    ossId: '',
    fileName: '',
    relativePath: ''
  })
  /**
  * @desc 画布样式
  */
  const getBasicStyle = computed(() => {
    let temp = `width:${basicSettings.value.width}px;height:${basicSettings.value.height}px;position:relative;`
    if (!util.value.isEmpty(basicSettings.value.relativePath)) {
      temp += `background:url(${uploadRoot.value}/oss/${basicSettings.value.relativePath}) center no-repeat;`
      temp += `background-size:100% 100%;`
    } else {
      temp += `background-color:${basicSettings.value.backColor};`
    }
    // 缩放
    if (method.value === 'view' && basicSettings.value.adapt) {
      let w = document.body.clientWidth
      let h = document.body.clientHeight
      let widthScale = util.value.FloatDiv(w, basicSettings.value.width)
      let heightScale = util.value.FloatDiv(h, basicSettings.value.height)
      temp += `transform:scale(${widthScale},${heightScale}) translate3d(0,0,0);`
      temp += `transform-origin:top left;`
    }
    return temp
  })
  /**
  * @desc 组件样式
  */
  function itemStyle (item: any) {
    return `width:${item.width * item.scaleX}px;height:${item.height * item.scaleY}px;position:absolute;top:${item.y}px;left:${item.x}px;`
  }
  return {
    method, id, items, configImg, configLabel, configTag, configText, configDatetime, configDeviceImg, configWaterBoxGroup, configWaterBoxBack, configWaterBoxWater,
    configWaterBoxLine, configValue, configStatus, configSimpleButtonText, configButtunTag, configLineGroup, configLine, configLinePipe, configUploadImg,
    basicSettings, getBasicStyle, itemStyle
  }
}