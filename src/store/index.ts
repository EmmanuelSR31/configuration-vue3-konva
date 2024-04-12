import { createStore } from 'vuex'
import Util from '@/utils/index'

export default createStore({
  state: {
    currentPageName: '/home', // 当前页面名
    currentPageObj: {}, // 当前页面
    pageOpenedList: [{ // 打开页面列表
      text: '首页',
      path: '/home',
      name: 'home',
      url: '/home'
    }],
    cachePage: [], // 缓存页面
    dontCache: [], // 在这里定义你不想要缓存的页面的name属性值
    contextMenuList: [ // 标签右键菜单
      {
        name: 'close',
        title: '关闭当前'
      },
      {
        name: 'closeOther',
        title: '关闭其他'
      },
      {
        name: 'closeAll',
        title: '关闭所有'
      }
    ],
    contextMenuOpenedTag: '', // 打开右键菜单的标签
    lineType: [{ text: '实线', value: 'solid' }, { text: '虚线', value: 'dashed' }, { text: '点状', value: 'dotted' }], // 图表线条类型
    commonItems: [ // 基本
      {
        name: '文本',
        type: 'text',
        text: '文本',
        fontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: '',
        color: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        verticalAlign: 'top',
        lineHeight: 1.2,
        padding: 0,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 0,
        borderStyle: 'solid',
        cornerRadius: 0,
        icon: 'iconxingzhuang-wenzi',
        width: 200,
        height: 60
      },
      {
        name: '时间',
        type: 'datetime',
        fontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: '',
        color: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        verticalAlign: 'top',
        lineHeight: 1.2,
        padding: 0,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 0,
        borderStyle: 'solid',
        cornerRadius: 0,
        icon: 'iconriqi',
        width: 200,
        height: 60
      },
      {
        name: '天气(标准版)',
        type: 'weather',
        category: 1,
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        icon: 'icontianqi',
        width: 200,
        height: 60
      },
      {
        name: '天气(迷你版)',
        type: 'weather',
        category: 2,
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        icon: 'icontubiaozhizuomoban',
        width: 300,
        height: 20
      },
      {
        name: '天气(温湿度)',
        type: 'weather',
        category: 3,
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        icon: 'iconicon-temperature',
        width: 320,
        height: 120
      },
      {
        name: '天气(5天版)',
        type: 'weather',
        category: 4,
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        icon: 'icontianqi-',
        width: 640,
        height: 60
      },
      /* {
        name: '链接',
        type: 'link',
        text: '链接',
        href: '',
        fontSize: '12',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        lineHeight: 'normal',
        icon: 'iconlianjie',
        width: 200,
        height: 60
      } */
    ],
    chartItems: [
      {
        name: '开关',
        type: 'chart',
        category: 'switch',
        img: 'assets/img/chart/switch1.png',
        selectSwitch: '开关(第一组)',
        onImg: 'assets/img/chart/on1.svg',
        offImg: 'assets/img/chart/off1.svg',
        backColor: 'rgba(255,255,255,0)',
        width: 84,
        height: 34
      },
      {
        name: '阀门',
        type: 'chart',
        category: 'valve',
        img: 'assets/img/device/valve.png',
        onImg: 'assets/img/device/valve.svg',
        offImg: 'assets/img/device/valve-off.svg',
        errorImg: 'assets/img/device/valve-error.svg',
        width: 38,
        height: 28
      },
      {
        name: '水泵',
        type: 'chart',
        category: 'waterPump',
        img: 'assets/img/device/pump.png',
        onImg: 'assets/img/device/pump.svg',
        offImg: 'assets/img/device/pump-off.svg',
        errorImg: 'assets/img/device/pump-error.svg',
        width: 42,
        height: 73
      },
      {
        name: '卧式水泵',
        type: 'chart',
        category: 'waterPumpHorizontal',
        img: 'assets/img/device/horizontal-pump.svg',
        onImg: 'assets/img/device/horizontal-pump.svg',
        offImg: 'assets/img/device/horizontal-pump-off.svg',
        errorImg: 'assets/img/device/horizontal-pump-error.svg',
        width: 73,
        height: 41
      },
      {
        name: '水箱',
        type: 'chart',
        category: 'waterBox',
        img: 'assets/img/device/box.svg',
        color: 'rgba(0,102,255,1)',
        backColor: 'rgba(255,255,255,1)',
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 6,
        borderStyle: 'solid',
        width: 116,
        height: 190,
        maxHeight: 10
      },
      {
        name: '数值',
        type: 'chart',
        category: 'value',
        img: 'assets/img/chart/value.png',
        text: '',
        unitText: '',
        fontSize: 14,
        unitFontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: '',
        numDigits: 3,
        color: 'rgba(0,0,0,1)',
        unitColor: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,0)',
        align: 'left',
        verticalAlign: 'top',
        lineHeight: 1.2,
        padding: 0,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 0,
        borderStyle: 'solid',
        cornerRadius: 0,
        width: 200,
        height: 50
      },
      {
        name: '折线图',
        type: 'chart',
        category: 'echart-line',
        img: 'assets/img/chart/curve1.png',
        fontSize: 14,
        color: 'rgba(0,0,0,1)',
        lineColor: 'rgba(0,0,0,1)',
        whiteFlag: false,
        smoothFlag: false,
        areaFlag: false,
        dataZoom: false,
        markLine: false,
        stackFlag: false,
        width: 500,
        height: 300
      },
      {
        name: '柱状图',
        type: 'chart',
        category: 'echart-bar',
        img: 'assets/img/chart/histogram1.jpg',
        whiteFlag: false,
        dataZoom: false,
        transverse: false,
        stackFlag: false,
        width: 500,
        height: 300
      },
      {
        name: '饼图',
        type: 'chart',
        category: 'echart-pie',
        img: 'assets/img/chart/piechart2.jpg',
        whiteFlag: false,
        annular: false,
        width: 400,
        height: 400
      },
      {
        name: '仪表盘',
        type: 'chart',
        category: 'echart-gauge',
        img: 'assets/img/chart/meter1.png',
        whiteFlag: false,
        max: 100,
        unit: '',
        axisLineWidth: 30,
        showAxisLabel: true,
        axisLabelDistance: 5,
        detailFontSize: 15,
        width: 400,
        height: 400
      },
      {
        name: '箭头',
        type: 'chart',
        category: 'arrow',
        img: 'assets/img/device/arrow-right.png',
        onImg: 'assets/img/device/arrow-right.svg',
        offImg: 'assets/img/device/arrow-right-off.svg',
        errorImg: 'assets/img/device/arrow-right-error.svg',
        backColor: 'rgba(255,255,255,0)',
        errorStatusColor: 'rgba(235,98,51,1)',
        width: 120,
        height: 120
      },
      {
        name: '状态',
        type: 'chart',
        category: 'status',
        img: 'assets/img/device/status.png',
        shape: 'circular',
        color: 'rgba(255,0,0,1)',
        errorStatusColor: 'rgba(235,235,235,0)',
        backColor: 'rgba(255,255,255,0)',
        width: 10,
        height: 10,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 1,
        borderStyle: 'solid',
        statusData: [{greater: '0', less: '0', color: 'rgba(255,0,0,1)' }, {greater: '1', less: '1', color: 'rgba(0,255,0,1)' }]
      },
      {
        name: '报警',
        type: 'chart',
        category: 'alarm',
        img: 'assets/img/device/alarm.svg',
        backColor: 'rgba(255,255,255,0)',
        errorStatusColor: 'rgba(235,98,51,1)',
        width: 30,
        height: 30,
        fontSize: '16',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: 'rgba(0,0,0,1)',
        align: 'left',
        lineHeight: 'normal'
      },
      {
        name: '文字滚动',
        type: 'chart',
        category: 'textScroll',
        img: 'assets/img/device/text-scroll.png',
        backColor: 'rgba(255,255,255,0)',
        width: 150,
        height: 30,
        fontSize: '16',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: 'rgba(0,0,0,1)',
        align: 'left',
        lineHeight: 'normal'
      },
      {
        name: '',
        type: 'chart',
        category: 'deviceImg',
        img: 'assets/img/device/img/GFJ(2)-on.svg',
        onImg: 'assets/img/device/img/img/GFJ(2)-on.svg',
        offImg: 'assets/img/device/img/GFJ(2)-off.svg',
        backColor: 'rgba(255,255,255,0)',
        width: 142,
        height: 74
      },
      {
        name: '',
        type: 'chart',
        category: 'deviceImg',
        img: 'assets/img/device/img/SPJG(22)-on.svg',
        onImg: 'assets/img/device/img/SPJG(22)-off.svg',
        offImg: 'assets/img/device/img/SPJG(22)-off.svg',
        backColor: 'rgba(255,255,255,0)',
        width: 293,
        height: 567
      },
      {
        name: '普通按钮',
        type: 'chart',
        category: 'simpleButton',
        img: 'assets/img/chart/simple-button.png',
        text: '确定',
        width: 120,
        height: 40,
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: '',
        color: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,1)',
        align: 'center',
        verticalAlign: 'middle',
        lineHeight: 1.2,
        padding: 0,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 1,
        borderStyle: 'solid',
        cornerRadius: 5
      },
      {
        name: '状态按钮',
        type: 'chart',
        category: 'button',
        img: 'assets/img/chart/button.png',
        text: '确定',
        width: 120,
        height: 40,
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: '',
        color: 'rgba(0,0,0,1)',
        backColor: 'rgba(255,255,255,1)',
        activeBackColor: 'rgba(255,255,255,1)',
        align: 'center',
        verticalAlign: 'middle',
        lineHeight: 1.2,
        padding: 0,
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 1,
        borderStyle: 'solid',
        cornerRadius: 5
      },
      {
        name: '摄像头',
        type: 'chart',
        category: 'camera',
        img: 'assets/img/chart/camera.png',
        width: 400,
        height: 300
      },
      {
        name: '本地摄像头',
        type: 'chart',
        category: 'localCamera',
        img: 'assets/img/chart/camera.png',
        width: 400,
        height: 300
      },
      {
        name: '状态指示灯',
        type: 'chart',
        category: 'stateLight',
        img: 'assets/img/device/light-off.png',
        width: 64,
        height: 64
      },
      {
        name: '线条',
        type: 'chart',
        category: 'line',
        img: 'assets/img/device/line.png',
        width: 100,
        height: 1,
        strokeWidth: 2,
        color: 'rgba(0,0,0,1)'
      }
    ],
    svgContainerItems: [
      {
        name: '智能电磁流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(1).svg',
        width: 366,
        height: 557
      },
      {
        name: '气旋流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(2).svg',
        width: 554,
        height: 569
      },
      {
        name: '电磁流量计1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(3).svg',
        width: 563,
        height: 556
      },
      {
        name: '简单流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(4).svg',
        width: 481,
        height: 553
      },
      {
        name: '模拟输出流量传感器',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(5).svg',
        width: 554,
        height: 554
      },
      {
        name: '流量积算器',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(6).svg',
        width: 554,
        height: 510
      },
      {
        name: '锥式流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(7).svg',
        width: 554,
        height: 277
      },
      {
        name: '电磁流量计2',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(8).svg',
        width: 364,
        height: 553
      },
      {
        name: '电磁流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(9).svg',
        width: 238,
        height: 560
      },
      {
        name: '流管3',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(10).svg',
        width: 554,
        height: 168
      },
      {
        name: '热式质量流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(11).svg',
        width: 563,
        height: 556
      },
      {
        name: '智能科氏流量计 2',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(12).svg',
        width: 567,
        height: 284
      },
      {
        name: '涡轮流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(13).svg',
        width: 563,
        height: 311
      },
      {
        name: '简单流量控制器',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(14).svg',
        width: 561,
        height: 458
      },
      {
        name: '排气压力',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(15).svg',
        width: 280,
        height: 280
      },
      {
        name: '啤酒罐',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(16).svg',
        width: 284,
        height: 557
      },
      {
        name: '智能科氏流量计 1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(17).svg',
        width: 369,
        height: 550
      },
      {
        name: '用OSHA胶带封口的纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(18).svg',
        width: 552,
        height: 437
      },
      {
        name: '压力',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(19).svg',
        width: 184,
        height: 557
      },
      {
        name: '塑料容器 2',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(20).svg',
        width: 234,
        height: 558
      },
      {
        name: '罐头',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(21).svg',
        width: 287,
        height: 561
      },
      {
        name: '浴缸',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(22).svg',
        width: 554,
        height: 242
      },
      {
        name: '带盖船运集装箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(23).svg',
        width: 362,
        height: 561
      },
      {
        name: '流量计',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(24).svg',
        width: 481,
        height: 553
      },
      {
        name: '塑料容器 3',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(25).svg',
        width: 224,
        height: 566
      },
      {
        name: '升瓶子',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(26).svg',
        width: 177,
        height: 560
      },
      {
        name: '散装货集装箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(27).svg',
        width: 564,
        height: 378
      },
      {
        name: '升瓶子1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(28).svg',
        width: 177,
        height: 561
      },
      {
        name: '杯子',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(29).svg',
        width: 185,
        height: 561
      },
      {
        name: '流元件',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(30).svg',
        width: 554,
        height: 182
      },
      {
        name: '温度',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(31).svg',
        width: 155,
        height: 559
      },
      {
        name: '塑料容器',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(32).svg',
        width: 199,
        height: 566
      },
      {
        name: '桶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(33).svg',
        width: 564,
        height: 548
      },
      {
        name: '容器 1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(34).svg',
        width: 406,
        height: 560
      },
      {
        name: '罐头 2',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(35).svg',
        width: 209,
        height: 565
      },
      {
        name: '罐头 3',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(36).svg',
        width: 209,
        height: 565
      },
      {
        name: '瓶子',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(37).svg',
        width: 235,
        height: 558
      },
      {
        name: '黄桶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(38).svg',
        width: 332,
        height: 560
      },
      {
        name: '灰色桶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(39).svg',
        width: 336,
        height: 560
      },
      {
        name: '绿色桶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(40).svg',
        width: 336,
        height: 560
      },
      {
        name: '蓝桶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(41).svg',
        width: 333,
        height: 563
      },
      {
        name: '药瓶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(42).svg',
        width: 341,
        height: 553
      },
      {
        name: '玻璃纤维方形网格光栅(俯视图)',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(43).svg',
        width: 280,
        height: 280
      },
      {
        name: '板条箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(44).svg',
        width: 561,
        height: 554
      },
      {
        name: '玻璃纤维方形网格光栅(透视图)',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(45).svg',
        width: 560,
        height: 55
      },
      {
        name: '贴有条形码的密封纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(46).svg',
        width: 276,
        height: 220
      },
      {
        name: '微电脑控制器',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(47).svg',
        width: 280,
        height: 204
      },
      {
        name: '投药瓶',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(48).svg',
        width: 202,
        height: 547
      },
      {
        name: '塑料托盘',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(49).svg',
        width: 564,
        height: 72
      },
      {
        name: '打开的纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(50).svg',
        width: 554,
        height: 365
      },
      {
        name: '封口贴标纸箱俯视图',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(51).svg',
        width: 554,
        height: 413
      },
      {
        name: '开口纸箱俯视图',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(52).svg',
        width: 555,
        height: 395
      },
      {
        name: '有向上箭头的密封贴标纸箱1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(53).svg',
        width: 555,
        height: 482
      },
      {
        name: '有向上箭头的封口纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(54).svg',
        width: 555,
        height: 482
      },
      {
        name: '实木托盘',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(55).svg',
        width: 568,
        height: 97
      },
      {
        name: '无盖纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(56).svg',
        width: 555,
        height: 474
      },
      {
        name: '纸箱 2',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(57).svg',
        width: 555,
        height: 241
      },
      {
        name: '纸箱 1',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(58).svg',
        width: 555,
        height: 482
      },
      {
        name: '封口纸箱俯视图',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(59).svg',
        width: 555,
        height: 482
      },
      {
        name: '封口纸箱',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(60).svg',
        width: 555,
        height: 482
      },
      {
        name: '简易封口纸箱，俯视图',
        type: 'device',
        category: 'container',
        img: 'assets/img/svg/RQ/RQ(61).svg',
        width: 552,
        height: 429
      }
    ], // 容器
    svgValveItems: [
      {
        name: '控制阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(1).svg',
        width: 95,
        height: 140
      },
      {
        name: '旋转阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(2).svg',
        width: 142,
        height: 110
      },
      {
        name: '水平单向阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(3).svg',
        width: 140,
        height: 107
      },
      {
        name: '垂直单向阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(4).svg',
        width: 112,
        height: 140
      },
      {
        name: '电动阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(5).svg',
        width: 64,
        height: 141
      },
      {
        name: '手动阀1',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(6).svg',
        width: 142,
        height: 122
      },
      {
        name: '法兰控制阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(7).svg',
        width: 67,
        height: 141
      },
      {
        name: '球形阀2',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(8).svg',
        width: 140,
        height: 81
      },
      {
        name: '球形阀1',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(9).svg',
        width: 141,
        height: 90
      },
      {
        name: '阀门1',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(10).svg',
        width: 85,
        height: 140
      },
      {
        name: '球形阀3',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(11).svg',
        width: 93,
        height: 142
      },
      {
        name: '卸灰阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(12).svg',
        width: 95,
        height: 141
      },
      {
        name: '塑料旋启式止回阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(13).svg',
        width: 142,
        height: 118
      },
      {
        name: '控制阀2',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(14).svg',
        width: 58,
        height: 142
      },
      {
        name: '安全阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(15).svg',
        width: 126,
        height: 142
      },
      {
        name: '水平控制阀1',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(16).svg',
        width: 139,
        height: 139
      },
      {
        name: '垂直控制阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(17).svg',
        width: 131,
        height: 142
      },
      {
        name: '水平控制阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(18).svg',
        width: 104,
        height: 142
      },
      {
        name: '夹管阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(19).svg',
        width: 100,
        height: 142
      },
      {
        name: '水平控制阀2',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(20).svg',
        width: 110,
        height: 139
      },
      {
        name: '阀门',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(21).svg',
        width: 124,
        height: 140
      },
      {
        name: '双通阀',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(22).svg',
        width: 142,
        height: 125
      },
      {
        name: '手动阀2',
        type: 'device',
        category: 'valve',
        img: 'assets/img/svg/FM/FM(23).svg',
        width: 142,
        height: 109
      }
    ], // 阀门
    svgWaterItems: [
      {
        name: '预处理装置',
        type: 'device',
        category: 'water',
        img: 'assets/img/device/pretreatment.svg',
        width: 140,
        height: 115
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(69).svg',
        width: 138,
        height: 540
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(104).svg',
        width: 339,
        height: 314
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(1).svg',
        width: 221,
        height: 368
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(2).svg',
        width: 340,
        height: 351
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(3).svg',
        width: 341,
        height: 325
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(4).svg',
        width: 340,
        height: 346
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(5).svg',
        width: 340,
        height: 266
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(6).svg',
        width: 341,
        height: 296
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(7).svg',
        width: 341,
        height: 217
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(8).svg',
        width: 341,
        height: 220
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(9).svg',
        width: 221,
        height: 375
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(10).svg',
        width: 341,
        height: 336
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(11).svg',
        width: 340,
        height: 305
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(12).svg',
        width: 299,
        height: 177
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(13).svg',
        width: 341,
        height: 149
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(14).svg',
        width: 341,
        height: 337
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(15).svg',
        width: 300,
        height: 183
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(16).svg',
        width: 341,
        height: 181
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(17).svg',
        width: 299,
        height: 220
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(18).svg',
        width: 341,
        height: 234
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(19).svg',
        width: 341,
        height: 225
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(20).svg',
        width: 341,
        height: 359
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(21).svg',
        width: 299,
        height: 248
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(22).svg',
        width: 299,
        height: 295
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(23).svg',
        width: 341,
        height: 420
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(24).svg',
        width: 340,
        height: 293
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(25).svg',
        width: 341,
        height: 454
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(26).svg',
        width: 341,
        height: 251
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(27).svg',
        width: 341,
        height: 313
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(28).svg',
        width: 341,
        height: 328
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(29).svg',
        width: 299,
        height: 272
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(30).svg',
        width: 221,
        height: 323
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(31).svg',
        width: 84,
        height: 125
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(32).svg',
        width: 341,
        height: 112
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(33).svg',
        width: 77,
        height: 116
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(34).svg',
        width: 299,
        height: 268
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(35).svg',
        width: 77,
        height: 116
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(36).svg',
        width: 341,
        height: 224
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(37).svg',
        width: 322,
        height: 346
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(38).svg',
        width: 341,
        height: 250
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(39).svg',
        width: 299,
        height: 217
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(40).svg',
        width: 341,
        height: 323
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(41).svg',
        width: 104,
        height: 227
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(42).svg',
        width: 340,
        height: 431
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(43).svg',
        width: 341,
        height: 439
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(44).svg',
        width: 341,
        height: 242
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(45).svg',
        width: 341,
        height: 242
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(46).svg',
        width: 340,
        height: 669
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(47).svg',
        width: 341,
        height: 410
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(48).svg',
        width: 340,
        height: 351
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(49).svg',
        width: 126,
        height: 126
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(50).svg',
        width: 84,
        height: 99
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(51).svg',
        width: 282,
        height: 334
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(52).svg',
        width: 77,
        height: 173
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(53).svg',
        width: 77,
        height: 149
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(54).svg',
        width: 221,
        height: 430
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(55).svg',
        width: 300,
        height: 128
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(56).svg',
        width: 340,
        height: 125
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(57).svg',
        width: 220,
        height: 493
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(58).svg',
        width: 340,
        height: 260
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(59).svg',
        width: 341,
        height: 309
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(60).svg',
        width: 341,
        height: 597
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(61).svg',
        width: 332,
        height: 694
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(62).svg',
        width: 341,
        height: 310
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(63).svg',
        width: 341,
        height: 305
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(64).svg',
        width: 341,
        height: 264
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(65).svg',
        width: 47,
        height: 104
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(66).svg',
        width: 299,
        height: 287
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(67).svg',
        width: 194,
        height: 550
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(68).svg',
        width: 341,
        height: 870
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(69).svg',
        width: 221,
        height: 541
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(70).svg',
        width: 77,
        height: 114
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(71).svg',
        width: 341,
        height: 438
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(72).svg',
        width: 341,
        height: 224
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(73).svg',
        width: 322,
        height: 608
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(74).svg',
        width: 341,
        height: 215
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(75).svg',
        width: 341,
        height: 464
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(76).svg',
        width: 46,
        height: 114
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(77).svg',
        width: 341,
        height: 157
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(78).svg',
        width: 341,
        height: 256
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(79).svg',
        width: 532,
        height: 376
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(80).svg',
        width: 77,
        height: 108
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(81).svg',
        width: 77,
        height: 129
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(82).svg',
        width: 342,
        height: 249
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(83).svg',
        width: 33,
        height: 175
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(84).svg',
        width: 317,
        height: 428
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(85).svg',
        width: 341,
        height: 341
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(86).svg',
        width: 341,
        height: 458
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(87).svg',
        width: 341,
        height: 296
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(88).svg',
        width: 221,
        height: 411
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(89).svg',
        width: 341,
        height: 149
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(90).svg',
        width: 51,
        height: 114
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(91).svg',
        width: 268,
        height: 420
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(92).svg',
        width: 33,
        height: 144
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(93).svg',
        width: 341,
        height: 229
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(94).svg',
        width: 231,
        height: 482
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(95).svg',
        width: 299,
        height: 299
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(96).svg',
        width: 342,
        height: 90
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(97).svg',
        width: 84,
        height: 400
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(98).svg',
        width: 532,
        height: 376
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(99).svg',
        width: 278,
        height: 609
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(100).svg',
        width: 339,
        height: 352
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(101).svg',
        width: 300,
        height: 218
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(102).svg',
        width: 341,
        height: 490
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(103).svg',
        width: 278,
        height: 550
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(104).svg',
        width: 278,
        height: 550
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(105).svg',
        width: 300,
        height: 300
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(106).svg',
        width: 341,
        height: 357
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(107).svg',
        width: 341,
        height: 196
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(108).svg',
        width: 341,
        height: 99
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(109).svg',
        width: 341,
        height: 165
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(110).svg',
        width: 253,
        height: 744
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(111).svg',
        width: 341,
        height: 353
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(112).svg',
        width: 300,
        height: 274
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(113).svg',
        width: 342,
        height: 287
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(114).svg',
        width: 342,
        height: 212
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(115).svg',
        width: 342,
        height: 287
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(116).svg',
        width: 341,
        height: 148
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(117).svg',
        width: 341,
        height: 203
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(118).svg',
        width: 341,
        height: 392
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(119).svg',
        width: 341,
        height: 296
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(120).svg',
        width: 342,
        height: 167
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(121).svg',
        width: 342,
        height: 194
      },
      {
        name: '',
        type: 'device',
        category: 'water',
        img: 'assets/img/svg/FSCL/FSCL(122).svg',
        width: 342,
        height: 251
      }
    ], // 图库水处理
    svgMachineItems: [
      {
        name: '煤磨机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(1).svg',
        width: 359,
        height: 566
      },
      {
        name: '均质乳化机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(2).svg',
        width: 326,
        height: 554
      },
      {
        name: '自动车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(3).svg',
        width: 562,
        height: 502
      },
      {
        name: '去毛刺机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(4).svg',
        width: 562,
        height: 340
      },
      {
        name: '平行刃口剪切机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(5).svg',
        width: 565,
        height: 480
      },
      {
        name: '酵母发酵机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(6).svg',
        width: 561,
        height: 339
      },
      {
        name: '普通车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(7).svg',
        width: 565,
        height: 196
      },
      {
        name: '立式车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(8).svg',
        width: 567,
        height: 495
      },
      {
        name: '水平轧机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(9).svg',
        width: 554,
        height: 509
      },
      {
        name: '小型数控车削中心',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(10).svg',
        width: 561,
        height: 330
      },
      {
        name: '自动卡盘车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(11).svg',
        width: 561,
        height: 482
      },
      {
        name: '滚刀磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(12).svg',
        width: 566,
        height: 458
      },
      {
        name: '机械冲剪机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(13).svg',
        width: 525,
        height: 567
      },
      {
        name: '通用车削机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(14).svg',
        width: 565,
        height: 191
      },
      {
        name: '重型带锯机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(15).svg',
        width: 443,
        height: 563
      },
      {
        name: '研磨抛光机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(16).svg',
        width: 415,
        height: 566
      },
      {
        name: '数控车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(17).svg',
        width: 485,
        height: 564
      },
      {
        name: '磨碎机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(18).svg',
        width: 434,
        height: 566
      },
      {
        name: '均化器',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(19).svg',
        width: 567,
        height: 567
      },
      {
        name: '床型水平轴研磨机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(20).svg',
        width: 561,
        height: 561
      },
      {
        name: '液压折弯机 2',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(21).svg',
        width: 560,
        height: 481
      },
      {
        name: '超高温灭菌机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(22).svg',
        width: 512,
        height: 568
      },
      {
        name: '卧式架轧机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(23).svg',
        width: 566,
        height: 518
      },
      {
        name: '矫正辊式矫直机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(24).svg',
        width: 411,
        height: 564
      },
      {
        name: '工业烤箱',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(25).svg',
        width: 560,
        height: 475
      },
      {
        name: '无心磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(26).svg',
        width: 561,
        height: 449
      },
      {
        name: '蒸汽灭菌器',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(27).svg',
        width: 565,
        height: 323
      },
      {
        name: '低压省煤器',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(28).svg',
        width: 367,
        height: 567
      },
      {
        name: '立式去毛刺机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(29).svg',
        width: 465,
        height: 567
      },
      {
        name: '冲床2',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(30).svg',
        width: 437,
        height: 562
      },
      {
        name: '回转平面磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(31).svg',
        width: 562,
        height: 532
      },
      {
        name: '封罐机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(32).svg',
        width: 566,
        height: 494
      },
      {
        name: '立式去毛刺机1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(33).svg',
        width: 561,
        height: 544
      },
      {
        name: '立轴旋转平面磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(34).svg',
        width: 556,
        height: 526
      },
      {
        name: '球磨机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(35).svg',
        width: 561,
        height: 291
      },
      {
        name: '粉碎机 3',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(36).svg',
        width: 562,
        height: 475
      },
      {
        name: '零件清洗机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(37).svg',
        width: 562,
        height: 384
      },
      {
        name: '电脑辅助车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(38).svg',
        width: 561,
        height: 451
      },
      {
        name: '机械压力机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(39).svg',
        width: 398,
        height: 566
      },
      {
        name: '液压折弯机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(40).svg',
        width: 560,
        height: 488
      },
      {
        name: '拣果机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(41).svg',
        width: 566,
        height: 286
      },
      {
        name: '数控立式加工中心',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(42).svg',
        width: 488,
        height: 560
      },
      {
        name: '工业烤箱1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(43).svg',
        width: 560,
        height: 482
      },
      {
        name: '强力金属压机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(44).svg',
        width: 227,
        height: 561
      },
      {
        name: '自动万能磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(45).svg',
        width: 561,
        height: 275
      },
      {
        name: '带锯机1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(46).svg',
        width: 564,
        height: 456
      },
      {
        name: '立式压缩液压机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(47).svg',
        width: 296,
        height: 567
      },
      {
        name: '洗瓶机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(48).svg',
        width: 566,
        height: 319
      },
      {
        name: '研磨机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(49).svg',
        width: 564,
        height: 396
      },
      {
        name: '卧式磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(50).svg',
        width: 554,
        height: 508
      },
      {
        name: '冲压机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(51).svg',
        width: 564,
        height: 270
      },
      {
        name: '冲床1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(52).svg',
        width: 437,
        height: 562
      },
      {
        name: '多轴钻机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(53).svg',
        width: 317,
        height: 562
      },
      {
        name: '数控坐标测量',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(54).svg',
        width: 344,
        height: 562
      },
      {
        name: '鼓形磁铁',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(55).svg',
        width: 560,
        height: 270
      },
      {
        name: '粉碎机 1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(56).svg',
        width: 475,
        height: 567
      },
      {
        name: '板式压滤机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(57).svg',
        width: 566,
        height: 276
      },
      {
        name: '夹层锅',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(58).svg',
        width: 566,
        height: 347
      },
      {
        name: '立式加工中心',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(59).svg',
        width: 533,
        height: 544
      },
      {
        name: '卧式加工中心',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(60).svg',
        width: 490,
        height: 563
      },
      {
        name: '立式带锯',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(61).svg',
        width: 325,
        height: 566
      },
      {
        name: '洗果机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(62).svg',
        width: 565,
        height: 285
      },
      {
        name: '多工位压力机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(63).svg',
        width: 502,
        height: 502
      },
      {
        name: '高速激光设备',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(64).svg',
        width: 566,
        height: 167
      },
      {
        name: '卧式液压机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(65).svg',
        width: 566,
        height: 238
      },
      {
        name: '摇臂钻床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(66).svg',
        width: 467,
        height: 563
      },
      {
        name: '带锯机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(67).svg',
        width: 564,
        height: 420
      },
      {
        name: '数控转塔冲床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(68).svg',
        width: 564,
        height: 299
      },
      {
        name: '立式自动切削预调机床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(69).svg',
        width: 565,
        height: 523
      },
      {
        name: '粉碎机 2',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(70).svg',
        width: 356,
        height: 567
      },
      {
        name: '制粒机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(71).svg',
        width: 512,
        height: 566
      },
      {
        name: '内圆磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(72).svg',
        width: 560,
        height: 334
      },
      {
        name: '冲床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(73).svg',
        width: 563,
        height: 527
      },
      {
        name: '多轴车床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(74).svg',
        width: 525,
        height: 567
      },
      {
        name: '坐标测量机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(75).svg',
        width: 400,
        height: 563
      },
      {
        name: '轧钢机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(76).svg',
        width: 562,
        height: 496
      },
      {
        name: '搅拌器',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(77).svg',
        width: 566,
        height: 479
      },
      {
        name: '集雾器',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(78).svg',
        width: 308,
        height: 567
      },
      {
        name: '缝焊机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(79).svg',
        width: 521,
        height: 568
      },
      {
        name: '多轴钻机1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(80).svg',
        width: 377,
        height: 562
      },
      {
        name: '捣碎准备',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(81).svg',
        width: 540,
        height: 565
      },
      {
        name: '磨床',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(82).svg',
        width: 565,
        height: 492
      },
      {
        name: '钻头',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(83).svg',
        width: 40,
        height: 563
      },
      {
        name: '喷嘴',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(84).svg',
        width: 563,
        height: 212
      },
      {
        name: 'Wet grains',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(85).svg',
        width: 540,
        height: 410
      },
      {
        name: '回转平面磨床1',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(86).svg',
        width: 563,
        height: 571
      },
      {
        name: '搅拌机',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(87).svg',
        width: 438,
        height: 557
      },
      {
        name: '齿轮',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(88).svg',
        width: 526,
        height: 526
      },
      {
        name: '电子稳定系统',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(89).svg',
        width: 562,
        height: 393
      },
      {
        name: '楼板',
        type: 'device',
        category: 'machine',
        img: 'assets/img/svg/JIQI/JIQI(90).svg',
        width: 565,
        height: 93
      }
    ], // 机器
    svgEngineItems: [
      {
        name: '无刷电机',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(1).svg',
        width: 156,
        height: 125
      },
      {
        name: '制动马达',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(2).svg',
        width: 185,
        height: 115
      },
      {
        name: '发动机 2',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(3).svg',
        width: 155,
        height: 101
      },
      {
        name: '减速器',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(4).svg',
        width: 165,
        height: 185
      },
      {
        name: '防爆电动机',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(5).svg',
        width: 157,
        height: 129
      },
      {
        name: '气压制动器',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(6).svg',
        width: 156,
        height: 114
      },
      {
        name: '3-D 发动机',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(7).svg',
        width: 185,
        height: 86
      },
      {
        name: '伺服电机',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(8).svg',
        width: 155,
        height: 79
      },
      {
        name: '发动机 4',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(9).svg',
        width: 156,
        height: 86
      },
      {
        name: '伺服电机1',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(10).svg',
        width: 155,
        height: 81
      },
      {
        name: '步进电机驱动器',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(11).svg',
        width: 268,
        height: 126
      },
      {
        name: '发动机 3',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(12).svg',
        width: 155,
        height: 100
      },
      {
        name: '智能马达',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(13).svg',
        width: 285,
        height: 249
      },
      {
        name: '促动器',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(14).svg',
        width: 185,
        height: 89
      },
      {
        name: '轴角编码器',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(15).svg',
        width: 215,
        height: 178
      },
      {
        name: '发动机 1',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(16).svg',
        width: 214,
        height: 76
      },
      {
        name: '工业标准发动机',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(17).svg',
        width: 185,
        height: 98
      },
      {
        name: '简单马达',
        type: 'device',
        category: 'engine',
        img: 'assets/img/svg/FDJ/FDJ(18).svg',
        width: 214,
        height: 159
      }
    ], // 发动机
    svgCarriageItems: [
      {
        name: '输送机 6',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(1).svg',
        width: 563,
        height: 414
      },
      {
        name: '卡车',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(2).svg',
        width: 565,
        height: 194
      },
      {
        name: '交叉带分隔符',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(3).svg',
        width: 560,
        height: 263
      },
      {
        name: '过滤器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(4).svg',
        width: 157,
        height: 567
      },
      {
        name: '双渠道震动容器放电器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(5).svg',
        width: 565,
        height: 558
      },
      {
        name: '袋式除尘器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(6).svg',
        width: 565,
        height: 499
      },
      {
        name: '传送装置',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(7).svg',
        width: 498,
        height: 565
      },
      {
        name: '圆锥破碎机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(8).svg',
        width: 448,
        height: 567
      },
      {
        name: '套筒式除尘器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(9).svg',
        width: 320,
        height: 564
      },
      {
        name: '旋转气封进料器2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(10).svg',
        width: 478,
        height: 567
      },
      {
        name: '金属网仓储笼',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(11).svg',
        width: 567,
        height: 435
      },
      {
        name: '散装袋装货机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(12).svg',
        width: 756,
        height: 756
      },
      {
        name: '振动筛',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(13).svg',
        width: 142,
        height: 565
      },
      {
        name: '筛分机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(14).svg',
        width: 538,
        height: 568
      },
      {
        name: '收尘器 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(15).svg',
        width: 756,
        height: 756
      },
      {
        name: '输送机 5',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(16).svg',
        width: 203,
        height: 568
      },
      {
        name: '散装袋卸货机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(17).svg',
        width: 756,
        height: 756
      },
      {
        name: '垃圾袋丢弃',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(18).svg',
        width: 246,
        height: 566
      },
      {
        name: '真空输送机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(19).svg',
        width: 561,
        height: 303
      },
      {
        name: '流量表',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(20).svg',
        width: 411,
        height: 568
      },
      {
        name: '球磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(21).svg',
        width: 357,
        height: 566
      },
      {
        name: '垂直轴撞击器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(22).svg',
        width: 565,
        height: 380
      },
      {
        name: '料仓1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(23).svg',
        width: 120,
        height: 567
      },
      {
        name: '真空压力卸料机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(24).svg',
        width: 566,
        height: 462
      },
      {
        name: '高速搅拌机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(25).svg',
        width: 284,
        height: 567
      },
      {
        name: '带漏斗螺旋输送机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(26).svg',
        width: 564,
        height: 193
      },
      {
        name: '输送机 7',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(27).svg',
        width: 563,
        height: 193
      },
      {
        name: '盘式粉磨机 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(28).svg',
        width: 251,
        height: 560
      },
      {
        name: '离心筛',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(29).svg',
        width: 566,
        height: 216
      },
      {
        name: '锤式粉碎机 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(30).svg',
        width: 561,
        height: 531
      },
      {
        name: '送料器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(31).svg',
        width: 246,
        height: 567
      },
      {
        name: '固体处理',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(32).svg',
        width: 202,
        height: 566
      },
      {
        name: '收尘器 4',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(33).svg',
        width: 313,
        height: 565
      },
      {
        name: '锤磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(34).svg',
        width: 441,
        height: 558
      },
      {
        name: '料斗',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(35).svg',
        width: 756,
        height: 756
      },
      {
        name: '空气分级机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(36).svg',
        width: 320,
        height: 565
      },
      {
        name: '胶体搅拌机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(37).svg',
        width: 531,
        height: 568
      },
      {
        name: '粉碎机1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(38).svg',
        width: 200,
        height: 564
      },
      {
        name: '双轮破碎机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(39).svg',
        width: 348,
        height: 562
      },
      {
        name: '自动装卸机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(40).svg',
        width: 565,
        height: 253
      },
      {
        name: '磨碎机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(41).svg',
        width: 291,
        height: 567
      },
      {
        name: '滚压机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(42).svg',
        width: 546,
        height: 568
      },
      {
        name: '湿式除尘器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(43).svg',
        width: 403,
        height: 566
      },
      {
        name: '容积式给料器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(44).svg',
        width: 756,
        height: 756
      },
      {
        name: '风扫煤磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(45).svg',
        width: 564,
        height: 275
      },
      {
        name: '输送机 4',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(46).svg',
        width: 246,
        height: 566
      },
      {
        name: '分级磨',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(47).svg',
        width: 567,
        height: 119
      },
      {
        name: '料仓',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(48).svg',
        width: 562,
        height: 362
      },
      {
        name: '凝结器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(49).svg',
        width: 291,
        height: 567
      },
      {
        name: '输送机 3',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(50).svg',
        width: 471,
        height: 568
      },
      {
        name: '进料漏斗 3',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(51).svg',
        width: 528,
        height: 565
      },
      {
        name: '真空输送机1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(52).svg',
        width: 343,
        height: 567
      },
      {
        name: '称量斗',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(53).svg',
        width: 291,
        height: 567
      },
      {
        name: '锥形螺杆挤出机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(54).svg',
        width: 566,
        height: 298
      },
      {
        name: '装袋机 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(55).svg',
        width: 531,
        height: 568
      },
      {
        name: '研磨分类系统',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(56).svg',
        width: 369,
        height: 561
      },
      {
        name: '旋转气封进料器 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(57).svg',
        width: 451,
        height: 475
      },
      {
        name: '轨道车',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(58).svg',
        width: 567,
        height: 560
      },
      {
        name: '粉尘回收机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(59).svg',
        width: 200,
        height: 507
      },
      {
        name: '不锈钢重型搅拌器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(60).svg',
        width: 340,
        height: 538
      },
      {
        name: '粉末搅拌器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(61).svg',
        width: 561,
        height: 443
      },
      {
        name: '锤式粉碎机 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(62).svg',
        width: 561,
        height: 214
      },
      {
        name: '澄清器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(63).svg',
        width: 568,
        height: 419
      },
      {
        name: '粉尘颗粒传送机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(64).svg',
        width: 567,
        height: 552
      },
      {
        name: '小型喷雾干燥器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(65).svg',
        width: 319,
        height: 564
      },
      {
        name: '给料器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(66).svg',
        width: 291,
        height: 567
      },
      {
        name: '收尘器 3',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(67).svg',
        width: 277,
        height: 568
      },
      {
        name: '重力送料器 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(68).svg',
        width: 326,
        height: 563
      },
      {
        name: '装袋机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(69).svg',
        width: 531,
        height: 568
      },
      {
        name: '旋风器 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(70).svg',
        width: 239,
        height: 568
      },
      {
        name: '盘式粉磨机 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(71).svg',
        width: 563,
        height: 438
      },
      {
        name: '真空助力器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(72).svg',
        width: 566,
        height: 483
      },
      {
        name: '橡胶造粒机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(73).svg',
        width: 451,
        height: 422
      },
      {
        name: '冷却干燥机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(74).svg',
        width: 260,
        height: 564
      },
      {
        name: '空气输送机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(75).svg',
        width: 171,
        height: 564
      },
      {
        name: '输送机 8',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(76).svg',
        width: 418,
        height: 568
      },
      {
        name: '鼓风管状干燥机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(77).svg',
        width: 229,
        height: 563
      },
      {
        name: '设备真空系统',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(78).svg',
        width: 560,
        height: 559
      },
      {
        name: '碎料',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(79).svg',
        width: 567,
        height: 418
      },
      {
        name: '组合给料机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(80).svg',
        width: 568,
        height: 560
      },
      {
        name: '收尘器 6',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(81).svg',
        width: 201,
        height: 564
      },
      {
        name: '给料机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(82).svg',
        width: 567,
        height: 171
      },
      {
        name: '旋风器 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(83).svg',
        width: 202,
        height: 567
      },
      {
        name: '输送机 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(84).svg',
        width: 255,
        height: 567
      },
      {
        name: '滑动给料器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(85).svg',
        width: 566,
        height: 358
      },
      {
        name: '细磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(86).svg',
        width: 135,
        height: 566
      },
      {
        name: '容积式给料机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(87).svg',
        width: 500,
        height: 567
      },
      {
        name: '管道混合器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(88).svg',
        width: 567,
        height: 97
      },
      {
        name: 'AGI 混合器',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(89).svg',
        width: 348,
        height: 561
      },
      {
        name: '收尘器 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(90).svg',
        width: 756,
        height: 756
      },
      {
        name: '精磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(91).svg',
        width: 451,
        height: 562
      },
      {
        name: '自动卸料漏斗',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(92).svg',
        width: 451,
        height: 279
      },
      {
        name: '研磨机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(93).svg',
        width: 313,
        height: 567
      },
      {
        name: '离心机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(94).svg',
        width: 569,
        height: 412
      },
      {
        name: '高级分类系统',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(95).svg',
        width: 535,
        height: 565
      },
      {
        name: '进料漏斗 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(96).svg',
        width: 372,
        height: 566
      },
      {
        name: '重力送料器 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(97).svg',
        width: 493,
        height: 567
      },
      {
        name: '进料漏斗 1',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(98).svg',
        width: 354,
        height: 561
      },
      {
        name: '粉碎机',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(99).svg',
        width: 365,
        height: 566
      },
      {
        name: '装袋机 3',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(100).svg',
        width: 410,
        height: 568
      },
      {
        name: '输送机 2',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(101).svg',
        width: 565,
        height: 394
      },
      {
        name: '收尘器 5',
        type: 'device',
        category: 'carriage',
        img: 'assets/img/svg/WLYS/WLYS(102).svg',
        width: 216,
        height: 567
      }
    ], // 物料运输
    svgBlowerItems: [
      {
        name: '压滤机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(1).svg',
        width: 142,
        height: 55
      },
      {
        name: '涡轮鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(2).svg',
        width: 142,
        height: 74
      },
      {
        name: '回热鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(3).svg',
        width: 142,
        height: 100
      },
      {
        name: '压缩机组',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(4).svg',
        width: 142,
        height: 110
      },
      {
        name: '旋涡风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(5).svg',
        width: 142,
        height: 129
      },
      {
        name: '烟气抽风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(6).svg',
        width: 142,
        height: 121
      },
      {
        name: '鼓风机室',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(7).svg',
        width: 142,
        height: 112
      },
      {
        name: '空气压缩机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(8).svg',
        width: 132,
        height: 143
      },
      {
        name: 'HVAC压缩机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(9).svg',
        width: 140,
        height: 140
      },
      {
        name: '气闸',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(10).svg',
        width: 142,
        height: 93
      },
      {
        name: '气泵',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(11).svg',
        width: 142,
        height: 80
      },
      {
        name: '通风风扇',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(12).svg',
        width: 142,
        height: 103
      },
      {
        name: '叶片轴流式扇风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(13).svg',
        width: 142,
        height: 142
      },
      {
        name: '往复式压缩机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(14).svg',
        width: 110,
        height: 139
      },
      {
        name: '稀释风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(15).svg',
        width: 129,
        height: 139
      },
      {
        name: '内联空气过滤器',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(16).svg',
        width: 53,
        height: 142
      },
      {
        name: '离心鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(17).svg',
        width: 142,
        height: 115
      },
      {
        name: '空气压缩机1',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(18).svg',
        width: 132,
        height: 129
      },
      {
        name: '玻璃纤维风扇',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(19).svg',
        width: 142,
        height: 119
      },
      {
        name: '混流内联风扇',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(20).svg',
        width: 142,
        height: 104
      },
      {
        name: '通风风扇2',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(21).svg',
        width: 129,
        height: 139
      },
      {
        name: '压缩机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(22).svg',
        width: 142,
        height: 112
      },
      {
        name: '3-D工业标准结构鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(23).svg',
        width: 142,
        height: 141
      },
      {
        name: '高压鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(24).svg',
        width: 103,
        height: 142
      },
      {
        name: '塑料风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(25).svg',
        width: 107,
        height: 142
      },
      {
        name: '通风风扇1',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(26).svg',
        width: 142,
        height: 75
      },
      {
        name: '径向通风抽风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(27).svg',
        width: 142,
        height: 136
      },
      {
        name: '抽烟机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(28).svg',
        width: 142,
        height: 122
      },
      {
        name: '鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(29).svg',
        width: 127,
        height: 142
      },
      {
        name: '灰色阴影风扇',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(30).svg',
        width: 130,
        height: 139
      },
      {
        name: '简易式鼓风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(31).svg',
        width: 142,
        height: 118
      },
      {
        name: '压风机',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(32).svg',
        width: 142,
        height: 124
      },
      {
        name: '风机动力型终端设备',
        type: 'device',
        category: 'blower',
        img: 'assets/img/svg/GFJ/GFJ(33).svg',
        width: 142,
        height: 64
      }
    ], // 鼓风机
    svgBoilerItems: [
      {
        name: '锅炉 11',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(1).svg',
        width: 447,
        height: 559
      },
      {
        name: '锅炉 10',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(2).svg',
        width: 565,
        height: 364
      },
      {
        name: '锅炉 4',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(3).svg',
        width: 323,
        height: 560
      },
      {
        name: '锅炉 14',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(4).svg',
        width: 475,
        height: 560
      },
      {
        name: '电动热水和蒸汽锅炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(5).svg',
        width: 437,
        height: 566
      },
      {
        name: '火焰式锅炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(6).svg',
        width: 411,
        height: 548
      },
      {
        name: '热风加热器',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(7).svg',
        width: 501,
        height: 563
      },
      {
        name: '锅炉 8',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(8).svg',
        width: 418,
        height: 563
      },
      {
        name: '锅炉 3',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(9).svg',
        width: 559,
        height: 434
      },
      {
        name: '鼓风炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(10).svg',
        width: 221,
        height: 553
      },
      {
        name: '锅炉 9',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(11).svg',
        width: 565,
        height: 327
      },
      {
        name: '锅炉 6',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(12).svg',
        width: 564,
        height: 342
      },
      {
        name: '锅炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(13).svg',
        width: 559,
        height: 390
      },
      {
        name: '锅炉 7',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(14).svg',
        width: 318,
        height: 542
      },
      {
        name: '锅炉 5',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(15).svg',
        width: 331,
        height: 560
      },
      {
        name: '火焰管道式锅炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(16).svg',
        width: 510,
        height: 554
      },
      {
        name: '有火焰的锅炉符号',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(17).svg',
        width: 510,
        height: 562
      },
      {
        name: '锅炉 2',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(18).svg',
        width: 298,
        height: 552
      },
      {
        name: '火室锅炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(19).svg',
        width: 565,
        height: 312
      },
      {
        name: '加热炉',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(20).svg',
        width: 177,
        height: 557
      },
      {
        name: '锅炉控制',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(21).svg',
        width: 565,
        height: 342
      },
      {
        name: '锅炉 13',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(22).svg',
        width: 184,
        height: 546
      },
      {
        name: '锅炉 12',
        type: 'device',
        category: 'boiler',
        img: 'assets/img/svg/GL/GL(23).svg',
        width: 506,
        height: 557
      }
    ], // 锅炉
    svgElectricityItems: [
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(1).svg',
        width: 286,
        height: 252
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(2).svg',
        width: 299,
        height: 178
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(3).svg',
        width: 299,
        height: 172
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(4).svg',
        width: 301,
        height: 196
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(5).svg',
        width: 300,
        height: 250
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(6).svg',
        width: 299,
        height: 258
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(7).svg',
        width: 294,
        height: 334
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(8).svg',
        width: 299,
        height: 185
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(9).svg',
        width: 477,
        height: 324
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(10).svg',
        width: 301,
        height: 451
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(11).svg',
        width: 299,
        height: 199
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(12).svg',
        width: 77,
        height: 182
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(13).svg',
        width: 299,
        height: 288
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(14).svg',
        width: 299,
        height: 180
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(15).svg',
        width: 301,
        height: 1646
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(16).svg',
        width: 299,
        height: 218
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(17).svg',
        width: 191,
        height: 173
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(18).svg',
        width: 299,
        height: 425
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(19).svg',
        width: 299,
        height: 233
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(20).svg',
        width: 78,
        height: 127
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(21).svg',
        width: 146,
        height: 139
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(22).svg',
        width: 299,
        height: 180
      },
      {
        name: '料仓1',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(23).svg',
        width: 299,
        height: 324
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(24).svg',
        width: 299,
        height: 361
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(25).svg',
        width: 299,
        height: 252
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(26).svg',
        width: 299,
        height: 220
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(27).svg',
        width: 299,
        height: 252
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(28).svg',
        width: 78,
        height: 133
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(29).svg',
        width: 299,
        height: 236
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(30).svg',
        width: 77,
        height: 370
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(31).svg',
        width: 299,
        height: 257
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(32).svg',
        width: 299,
        height: 151
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(33).svg',
        width: 299,
        height: 102
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(34).svg',
        width: 299,
        height: 455
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(35).svg',
        width: 271,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(36).svg',
        width: 284,
        height: 376
      },
      {
        name: '胶体搅拌机',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(37).svg',
        width: 300,
        height: 464
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(38).svg',
        width: 299,
        height: 593
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(39).svg',
        width: 299,
        height: 252
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(40).svg',
        width: 242,
        height: 556
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(41).svg',
        width: 300,
        height: 405
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(42).svg',
        width: 271,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(43).svg',
        width: 300,
        height: 542
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(44).svg',
        width: 299,
        height: 856
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(45).svg',
        width: 299,
        height: 119
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(46).svg',
        width: 299,
        height: 569
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(47).svg',
        width: 301,
        height: 433
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(48).svg',
        width: 299,
        height: 632
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(49).svg',
        width: 299,
        height: 656
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(50).svg',
        width: 299,
        height: 656
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(51).svg',
        width: 299,
        height: 1034
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(52).svg',
        width: 299,
        height: 299
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(53).svg',
        width: 228,
        height: 815
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(54).svg',
        width: 297,
        height: 542
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(55).svg',
        width: 65,
        height: 948
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(56).svg',
        width: 36,
        height: 542
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(57).svg',
        width: 36,
        height: 542
      },
      {
        name: '',
        type: 'device',
        category: 'electricity',
        img: 'assets/img/svg/DY/DY(58).svg',
        width: 36,
        height: 542
      }
    ], // 电源
    svgPipeItems: [
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(1).svg',
        width: 30,
        height: 30
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(2).svg',
        width: 30,
        height: 30
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(3).svg',
        width: 30,
        height: 30
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(4).svg',
        width: 14,
        height: 71
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(5).svg',
        width: 30,
        height: 30
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(6).svg',
        width: 71,
        height: 14
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(7).svg',
        width: 167,
        height: 261
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(8).svg',
        width: 34,
        height: 43
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(9).svg',
        width: 55,
        height: 116
      },
      {
        name: '',
        type: 'device',
        category: 'pipe',
        img: 'assets/img/svg/GD/GD(10).svg',
        width: 34,
        height: 43
      }
    ], // 管道
    svgIndustrialItems: [
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(1).svg',
        width: 324,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(2).svg',
        width: 257,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(3).svg',
        width: 564,
        height: 531
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(4).svg',
        width: 566,
        height: 269
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(5).svg',
        width: 567,
        height: 98
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(6).svg',
        width: 464,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(7).svg',
        width: 558,
        height: 505
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(8).svg',
        width: 568,
        height: 123
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(9).svg',
        width: 565,
        height: 450
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(10).svg',
        width: 567,
        height: 333
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(11).svg',
        width: 564,
        height: 215
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(12).svg',
        width: 567,
        height: 468
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(13).svg',
        width: 321,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(14).svg',
        width: 321,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(15).svg',
        width: 257,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(16).svg',
        width: 565,
        height: 463
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(17).svg',
        width: 301,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(18).svg',
        width: 217,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(19).svg',
        width: 564,
        height: 214
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(20).svg',
        width: 564,
        height: 255
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(21).svg',
        width: 398,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(22).svg',
        width: 567,
        height: 324
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(23).svg',
        width: 567,
        height: 544
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(24).svg',
        width: 440,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(25).svg',
        width: 347,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(26).svg',
        width: 566,
        height: 501
      },
      {
        name: '',
        type: 'device',
        category: 'industrial',
        img: 'assets/img/svg/GY/GY(27).svg',
        width: 276,
        height: 567
      }
    ], // 工业
    svgFoodItems: [
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(1).svg',
        width: 566,
        height: 399
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(2).svg',
        width: 565,
        height: 409
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(3).svg',
        width: 565,
        height: 491
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(4).svg',
        width: 456,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(5).svg',
        width: 362,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(6).svg',
        width: 548,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(7).svg',
        width: 545,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(8).svg',
        width: 354,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(9).svg',
        width: 250,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(10).svg',
        width: 563,
        height: 449
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(11).svg',
        width: 533,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(12).svg',
        width: 481,
        height: 545
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(13).svg',
        width: 299,
        height: 551
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(14).svg',
        width: 564,
        height: 342
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(15).svg',
        width: 566,
        height: 144
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(16).svg',
        width: 500,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(17).svg',
        width: 563,
        height: 482
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(18).svg',
        width: 556,
        height: 439
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(19).svg',
        width: 567,
        height: 333
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(20).svg',
        width: 212,
        height: 555
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(21).svg',
        width: 563,
        height: 216
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(22).svg',
        width: 293,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(23).svg',
        width: 359,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(24).svg',
        width: 557,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(25).svg',
        width: 267,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(26).svg',
        width: 227,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(27).svg',
        width: 171,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(28).svg',
        width: 422,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(29).svg',
        width: 563,
        height: 548
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(30).svg',
        width: 481,
        height: 580
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(31).svg',
        width: 565,
        height: 205
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(32).svg',
        width: 557,
        height: 483
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(33).svg',
        width: 183,
        height: 555
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(34).svg',
        width: 556,
        height: 351
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(35).svg',
        width: 164,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(36).svg',
        width: 756,
        height: 756
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(37).svg',
        width: 493,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(38).svg',
        width: 463,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(39).svg',
        width: 351,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(40).svg',
        width: 567,
        height: 499
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(41).svg',
        width: 566,
        height: 526
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(42).svg',
        width: 510,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'food',
        img: 'assets/img/svg/SPJG/SPJG(43).svg',
        width: 563,
        height: 533
      }
    ], // 食品加工
    svgLogisticsItems: [
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(1).svg',
        width: 566,
        height: 226
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(2).svg',
        width: 561,
        height: 397
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(3).svg',
        width: 566,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(4).svg',
        width: 238,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(5).svg',
        width: 566,
        height: 305
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(6).svg',
        width: 566,
        height: 155
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(7).svg',
        width: 369,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(8).svg',
        width: 563,
        height: 129
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(9).svg',
        width: 563,
        height: 57
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(10).svg',
        width: 563,
        height: 262
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(11).svg',
        width: 469,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(12).svg',
        width: 567,
        height: 334
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(13).svg',
        width: 567,
        height: 353
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(14).svg',
        width: 567,
        height: 340
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(15).svg',
        width: 561,
        height: 263
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(16).svg',
        width: 566,
        height: 293
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(17).svg',
        width: 567,
        height: 154
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(18).svg',
        width: 561,
        height: 537
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(19).svg',
        width: 349,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(20).svg',
        width: 565,
        height: 299
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(21).svg',
        width: 563,
        height: 495
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(22).svg',
        width: 566,
        height: 266
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(23).svg',
        width: 566,
        height: 248
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(24).svg',
        width: 567,
        height: 234
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(25).svg',
        width: 567,
        height: 234
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(26).svg',
        width: 567,
        height: 381
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(27).svg',
        width: 563,
        height: 457
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(28).svg',
        width: 562,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(29).svg',
        width: 566,
        height: 209
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(30).svg',
        width: 566,
        height: 356
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(31).svg',
        width: 567,
        height: 340
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(32).svg',
        width: 567,
        height: 300
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(33).svg',
        width: 559,
        height: 419
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(34).svg',
        width: 561,
        height: 525
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(35).svg',
        width: 567,
        height: 247
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(36).svg',
        width: 529,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(37).svg',
        width: 560,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(38).svg',
        width: 560,
        height: 457
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(39).svg',
        width: 559,
        height: 419
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(40).svg',
        width: 559,
        height: 408
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(41).svg',
        width: 562,
        height: 214
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(42).svg',
        width: 247,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(43).svg',
        width: 138,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(44).svg',
        width: 559,
        height: 419
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(45).svg',
        width: 556,
        height: 386
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(46).svg',
        width: 566,
        height: 271
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(47).svg',
        width: 563,
        height: 495
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(48).svg',
        width: 559,
        height: 419
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(49).svg',
        width: 566,
        height: 259
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(50).svg',
        width: 566,
        height: 333
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(51).svg',
        width: 566,
        height: 265
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(52).svg',
        width: 566,
        height: 306
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(53).svg',
        width: 566,
        height: 300
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(54).svg',
        width: 561,
        height: 497
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(55).svg',
        width: 566,
        height: 469
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(56).svg',
        width: 566,
        height: 240
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(57).svg',
        width: 566,
        height: 208
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(58).svg',
        width: 566,
        height: 208
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(59).svg',
        width: 559,
        height: 463
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(60).svg',
        width: 326,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(61).svg',
        width: 566,
        height: 312
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(62).svg',
        width: 566,
        height: 379
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(63).svg',
        width: 566,
        height: 347
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(64).svg',
        width: 566,
        height: 253
      },
      {
        name: '',
        type: 'device',
        category: 'logistics',
        img: 'assets/img/svg/WL/WL(65).svg',
        width: 562,
        height: 274
      }
    ], // 物流
    svgHeaterItems: [
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(1).svg',
        width: 512,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(2).svg',
        width: 567,
        height: 420
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(3).svg',
        width: 261,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(4).svg',
        width: 311,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(5).svg',
        width: 490,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(6).svg',
        width: 567,
        height: 247
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(7).svg',
        width: 567,
        height: 200
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(8).svg',
        width: 551,
        height: 592
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(9).svg',
        width: 504,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(10).svg',
        width: 565,
        height: 453
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(11).svg',
        width: 454,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(12).svg',
        width: 374,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(13).svg',
        width: 566,
        height: 446
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(14).svg',
        width: 336,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(15).svg',
        width: 567,
        height: 477
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(16).svg',
        width: 374,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'heater',
        img: 'assets/img/svg/JRQ/JRQ(17).svg',
        width: 554,
        height: 326
      }
    ], // 加热器
    svgHavcItems: [
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(1).svg',
        width: 562,
        height: 232
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(2).svg',
        width: 455,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(3).svg',
        width: 562,
        height: 430
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(4).svg',
        width: 564,
        height: 358
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(5).svg',
        width: 552,
        height: 327
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(6).svg',
        width: 186,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(7).svg',
        width: 567,
        height: 470
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(8).svg',
        width: 355,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(9).svg',
        width: 408,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(10).svg',
        width: 545,
        height: 209
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(11).svg',
        width: 370,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(12).svg',
        width: 314,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(13).svg',
        width: 561,
        height: 95
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(14).svg',
        width: 565,
        height: 484
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(15).svg',
        width: 356,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(16).svg',
        width: 567,
        height: 470
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(17).svg',
        width: 532,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(18).svg',
        width: 567,
        height: 239
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(19).svg',
        width: 221,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(20).svg',
        width: 554,
        height: 306
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(21).svg',
        width: 554,
        height: 437
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(22).svg',
        width: 566,
        height: 313
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(23).svg',
        width: 510,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(24).svg',
        width: 567,
        height: 358
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(25).svg',
        width: 566,
        height: 358
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(26).svg',
        width: 545,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(27).svg',
        width: 222,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(28).svg',
        width: 416,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(29).svg',
        width: 446,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(30).svg',
        width: 562,
        height: 354
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(31).svg',
        width: 562,
        height: 423
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(32).svg',
        width: 567,
        height: 296
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(33).svg',
        width: 564,
        height: 394
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(34).svg',
        width: 245,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(35).svg',
        width: 567,
        height: 554
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(36).svg',
        width: 557,
        height: 249
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(37).svg',
        width: 557,
        height: 498
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(38).svg',
        width: 390,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(39).svg',
        width: 567,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(40).svg',
        width: 329,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(41).svg',
        width: 362,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(42).svg',
        width: 566,
        height: 216
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(43).svg',
        width: 439,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(44).svg',
        width: 385,
        height: 551
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(45).svg',
        width: 567,
        height: 425
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(46).svg',
        width: 301,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(47).svg',
        width: 557,
        height: 421
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(48).svg',
        width: 567,
        height: 149
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(49).svg',
        width: 567,
        height: 284
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(50).svg',
        width: 395,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(51).svg',
        width: 557,
        height: 521
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(52).svg',
        width: 408,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(53).svg',
        width: 443,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(54).svg',
        width: 282,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(55).svg',
        width: 567,
        height: 541
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(56).svg',
        width: 567,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(57).svg',
        width: 567,
        height: 154
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(58).svg',
        width: 567,
        height: 447
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(59).svg',
        width: 567,
        height: 455
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(60).svg',
        width: 567,
        height: 380
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(61).svg',
        width: 567,
        height: 395
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(62).svg',
        width: 561,
        height: 387
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(63).svg',
        width: 409,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(64).svg',
        width: 567,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(65).svg',
        width: 400,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(66).svg',
        width: 567,
        height: 431
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(67).svg',
        width: 561,
        height: 369
      },
      {
        name: '',
        type: 'device',
        category: 'havc',
        img: 'assets/img/svg/HAVC/HAVC(68).svg',
        width: 567,
        height: 263
      }
    ], // HAVC
    svgChemicalItems: [
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(1).svg',
        width: 390,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(2).svg',
        width: 481,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(3).svg',
        width: 554,
        height: 529
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(4).svg',
        width: 120,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(5).svg',
        width: 120,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(6).svg',
        width: 370,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(7).svg',
        width: 347,
        height: 554
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(8).svg',
        width: 423,
        height: 556
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(9).svg',
        width: 143,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(10).svg',
        width: 496,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(11).svg',
        width: 481,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(12).svg',
        width: 151,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(13).svg',
        width: 182,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(14).svg',
        width: 217,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(15).svg',
        width: 567,
        height: 341
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(16).svg',
        width: 141,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(17).svg',
        width: 372,
        height: 554
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(18).svg',
        width: 372,
        height: 555
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(19).svg',
        width: 269,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(20).svg',
        width: 305,
        height: 551
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(21).svg',
        width: 135,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(22).svg',
        width: 179,
        height: 552
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(23).svg',
        width: 281,
        height: 556
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(24).svg',
        width: 366,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(25).svg',
        width: 225,
        height: 545
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(26).svg',
        width: 254,
        height: 554
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(27).svg',
        width: 191,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(28).svg',
        width: 558,
        height: 485
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(29).svg',
        width: 272,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(30).svg',
        width: 251,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(31).svg',
        width: 255,
        height: 550
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(32).svg',
        width: 517,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(33).svg',
        width: 241,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(34).svg',
        width: 170,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(35).svg',
        width: 559,
        height: 237
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(36).svg',
        width: 99,
        height: 543
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(37).svg',
        width: 559,
        height: 506
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(38).svg',
        width: 419,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(39).svg',
        width: 554,
        height: 453
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(40).svg',
        width: 205,
        height: 561
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(41).svg',
        width: 140,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(42).svg',
        width: 170,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(43).svg',
        width: 497,
        height: 556
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(44).svg',
        width: 347,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(45).svg',
        width: 558,
        height: 486
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(46).svg',
        width: 565,
        height: 330
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(47).svg',
        width: 226,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(48).svg',
        width: 555,
        height: 325
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(49).svg',
        width: 565,
        height: 206
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(50).svg',
        width: 558,
        height: 447
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(51).svg',
        width: 356,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(52).svg',
        width: 166,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(53).svg',
        width: 330,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(54).svg',
        width: 367,
        height: 555
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(55).svg',
        width: 295,
        height: 556
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(56).svg',
        width: 171,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(57).svg',
        width: 87,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(58).svg',
        width: 76,
        height: 545
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(59).svg',
        width: 284,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(60).svg',
        width: 257,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(61).svg',
        width: 532,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(62).svg',
        width: 283,
        height: 560
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(63).svg',
        width: 158,
        height: 550
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(64).svg',
        width: 561,
        height: 515
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(65).svg',
        width: 213,
        height: 547
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(66).svg',
        width: 226,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(67).svg',
        width: 284,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(68).svg',
        width: 98,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(69).svg',
        width: 561,
        height: 545
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(70).svg',
        width: 354,
        height: 554
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(71).svg',
        width: 356,
        height: 565
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(72).svg',
        width: 341,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(73).svg',
        width: 206,
        height: 575
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(74).svg',
        width: 355,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(75).svg',
        width: 57,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(76).svg',
        width: 94,
        height: 557
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(77).svg',
        width: 117,
        height: 559
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(78).svg',
        width: 158,
        height: 545
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(79).svg',
        width: 147,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(80).svg',
        width: 563,
        height: 226
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(81).svg',
        width: 169,
        height: 555
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(82).svg',
        width: 176,
        height: 539
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(83).svg',
        width: 143,
        height: 551
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(84).svg',
        width: 330,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(85).svg',
        width: 57,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(86).svg',
        width: 297,
        height: 563
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(87).svg',
        width: 440,
        height: 566
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(88).svg',
        width: 563,
        height: 529
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(89).svg',
        width: 213,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(90).svg',
        width: 495,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(91).svg',
        width: 565,
        height: 496
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(92).svg',
        width: 196,
        height: 558
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(93).svg',
        width: 70,
        height: 539
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(94).svg',
        width: 509,
        height: 553
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(95).svg',
        width: 206,
        height: 551
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(96).svg',
        width: 213,
        height: 552
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(97).svg',
        width: 139,
        height: 562
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(98).svg',
        width: 94,
        height: 564
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(99).svg',
        width: 561,
        height: 458
      },
      {
        name: '',
        type: 'device',
        category: 'chemica',
        img: 'assets/img/svg/HX/HX(100).svg',
        width: 133,
        height: 564
      }
    ], // 化学
    svgPlantItems: [
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(1).svg',
        width: 378,
        height: 378
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(2).svg',
        width: 127,
        height: 282
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(3).svg',
        width: 347,
        height: 568
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(4).svg',
        width: 552,
        height: 383
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(5).svg',
        width: 552,
        height: 435
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(6).svg',
        width: 552,
        height: 383
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(7).svg',
        width: 414,
        height: 213
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(8).svg',
        width: 552,
        height: 435
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(9).svg',
        width: 119,
        height: 567
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(10).svg',
        width: 96,
        height: 281
      },
      {
        name: '',
        type: 'device',
        category: 'plant',
        img: 'assets/img/svg/GCSS/GCSS(11).svg',
        width: 96,
        height: 281
      }
    ], // 工厂设施
    svgBuildingItems: [
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(1).svg',
        width: 299,
        height: 285
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(2).svg',
        width: 299,
        height: 260
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(3).svg',
        width: 299,
        height: 215
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(4).svg',
        width: 299,
        height: 201
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(5).svg',
        width: 299,
        height: 108
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(6).svg',
        width: 299,
        height: 270
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(7).svg',
        width: 299,
        height: 205
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(8).svg',
        width: 299,
        height: 285
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(9).svg',
        width: 299,
        height: 285
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(10).svg',
        width: 300,
        height: 254
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(11).svg',
        width: 300,
        height: 209
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(12).svg',
        width: 300,
        height: 217
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(13).svg',
        width: 299,
        height: 239
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(14).svg',
        width: 300,
        height: 296
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(15).svg',
        width: 300,
        height: 328
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(16).svg',
        width: 299,
        height: 284
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(17).svg',
        width: 298,
        height: 478
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(18).svg',
        width: 299,
        height: 316
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(19).svg',
        width: 299,
        height: 594
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(20).svg',
        width: 150,
        height: 384
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(21).svg',
        width: 299,
        height: 538
      },
      {
        name: '',
        type: 'device',
        category: 'building',
        img: 'assets/img/svg/JZ/JZ(22).svg',
        width: 299,
        height: 215
      }
    ], // 建筑
    svgMeterItems: [
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(1).svg',
        width: 299,
        height: 183
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(2).svg',
        width: 299,
        height: 303
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(3).svg',
        width: 299,
        height: 314
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(4).svg',
        width: 299,
        height: 312
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(5).svg',
        width: 299,
        height: 386
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(6).svg',
        width: 299,
        height: 417
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(7).svg',
        width: 299,
        height: 311
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(8).svg',
        width: 299,
        height: 240
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(9).svg',
        width: 299,
        height: 176
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(10).svg',
        width: 300,
        height: 337
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(11).svg',
        width: 299,
        height: 303
      },
      {
        name: '',
        type: 'device',
        category: 'meter',
        img: 'assets/img/svg/YB/YB(12).svg',
        width: 299,
        height: 299
      }
    ], // 仪表
    svgMedicalItems: [
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(1).svg',
        width: 91,
        height: 89
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(2).svg',
        width: 178,
        height: 210
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(3).svg',
        width: 200,
        height: 137
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(4).svg',
        width: 89,
        height: 138
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(5).svg',
        width: 91,
        height: 89
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(6).svg',
        width: 179,
        height: 245
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(7).svg',
        width: 178,
        height: 196
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(8).svg',
        width: 91,
        height: 111
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(9).svg',
        width: 179,
        height: 110
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(10).svg',
        width: 91,
        height: 73
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(11).svg',
        width: 106,
        height: 229
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(12).svg',
        width: 141,
        height: 126
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(13).svg',
        width: 106,
        height: 248
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(14).svg',
        width: 179,
        height: 193
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(15).svg',
        width: 178,
        height: 179
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(16).svg',
        width: 91,
        height: 172
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(17).svg',
        width: 149,
        height: 83
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(18).svg',
        width: 141,
        height: 80
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(19).svg',
        width: 141,
        height: 211
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(20).svg',
        width: 149,
        height: 73
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(21).svg',
        width: 179,
        height: 157
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(22).svg',
        width: 90,
        height: 170
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(23).svg',
        width: 149,
        height: 76
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(24).svg',
        width: 200,
        height: 280
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(25).svg',
        width: 200,
        height: 200
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(26).svg',
        width: 90,
        height: 64
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(27).svg',
        width: 141,
        height: 126
      },
      {
        name: '',
        type: 'device',
        category: 'medical',
        img: 'assets/img/svg/YX/YX(28).svg',
        width: 141,
        height: 184
      }
    ], // 医学
    imgItems: [
      {
        type: 'img',
        img: 'assets/img/graphical/tx(1).svg',
        color: 'rgba(255, 205, 99, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 70,
        height: 60
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(2).svg',
        color: 'rgba(96, 125, 139, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 196,
        height: 197
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(3).svg',
        color: 'rgba(124, 211, 113, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 70,
        height: 35
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(4).svg',
        color: 'rgba(240, 75, 54, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 48,
        height: 48
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(5).svg',
        color: 'rgba(166, 186, 171, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 70,
        height: 70
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(6).svg',
        color: 'rgba(210, 196, 140, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 70,
        height: 70
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(7).svg',
        color: 'rgba(247, 169, 59, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 48,
        height: 48
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(8).svg',
        color: 'rgba(255, 88, 78, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 118,
        height: 98
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(9).svg',
        color: 'rgba(77, 160, 216, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 48,
        height: 48
      },
      {
        type: 'img',
        img: 'assets/img/graphical/tx(10).svg',
        color: 'rgba(224, 203, 154, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 240,
        height: 297
      },
      {
        type: 'img',
        img: 'assets/img/graphical/arrow1.svg',
        color: 'rgba(0, 0, 0, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 60,
        height: 60
      },
      {
        type: 'img',
        img: 'assets/img/graphical/arrow2.svg',
        color: 'rgba(0, 0, 0, 1)',
        backColor: 'rgba(255, 255, 255, 0)',
        width: 40,
        height: 30
      }
    ],
    canvasItems: [
      {
        name: '管道',
        type: 'pip-h',
        img: 'assets/img/canvas/gdz2.svg',
        color: 'rgba(9, 181, 252, 1)',
        pipelineColor: 'rgba(231, 231, 231, 1)',
        strokeWidth: 20,
        stopFlag: false,
        width: 400,
        height: 20,
        pipeStrokeWidth: 10,
        dashWidth: 30,
        dashOffset: 10,
        multipleDevices: false,
        judgmentByNumber: false,
        judgmentNumber: null
      },
      {
        name: '进度条',
        type: 'progress',
        img: 'assets/img/canvas/progress.jpg',
        fontColor: 'rgba(255,255,255,1)',
        color: 'rgba(45, 140, 240, 1)',
        backColor: 'rgba(243, 243, 243, 1)',
        fontSize: '12',
        max: 100,
        width: 300,
        height: 30
      },
      {
        name: '水池',
        type: 'liquidfill',
        img: 'assets/img/canvas/liquidfill.jpg',
        backColor: 'rgba(255,255,255,0)',
        color: 'rgba(0, 0, 0, 1)',
        liquidColor: 'rgba(50, 140, 236, 1)',
        liquidOpacity: 1,
        shape: 'rect',
        strokeWidth: 5,
        borderStyle: 'solid',
        stroke: 'rgba(50, 140, 236, 1)',
        borderDistance: 5,
        cornerRadius: 0,
        fontSize: '20',
        maxHeight: 100,
        unitText: '',
        width: 200,
        height: 200
      }
    ],
    svgOtherItems: [
      {
        name: '',
        type: 'device',
        category: 'other',
        img: 'assets/img/device/arrow-right.png',
        width: 120,
        height: 76
      },
      {
        name: '',
        type: 'device',
        category: 'other',
        img: 'assets/img/device/box-bg.png',
        width: 513,
        height: 240
      },
      {
        name: '',
        type: 'device',
        category: 'other',
        img: 'assets/img/device/row-bg.png',
        width: 99,
        height: 38
      },
      {
        name: '',
        type: 'device',
        category: 'other',
        img: 'assets/img/device/white-bg.png',
        width: 1073,
        height: 216
      }
    ],
    switchs: [ // 开关组
      {
        name: '开关(第一组)',
        onImg: 'assets/img/chart/on1.svg',
        offImg: 'assets/img/chart/off1.svg'
      },
      {
        name: '开关(第二组)',
        onImg: 'assets/img/chart/on2.svg',
        offImg: 'assets/img/chart/off2.svg'
      },
      {
        name: '开关(第三组)',
        onImg: 'assets/img/chart/on3.svg',
        offImg: 'assets/img/chart/off3.svg'
      },
      {
        name: '开关(第四组)',
        onImg: 'assets/img/chart/on4.png',
        offImg: 'assets/img/chart/off4.png'
      },
      {
        name: '开关(第五组)',
        onImg: 'assets/img/chart/on5.png',
        offImg: 'assets/img/chart/off5.png'
      },
      {
        name: '开关(第六组)',
        onImg: 'assets/img/chart/on6.png',
        offImg: 'assets/img/chart/off6.png'
      },
      {
        name: '开关(第七组)',
        onImg: 'assets/img/chart/on7.png',
        offImg: 'assets/img/chart/off7.png'
      },
      {
        name: '开关(第八组)',
        onImg: 'assets/img/chart/on8.png',
        offImg: 'assets/img/chart/off8.png'
      },
      {
        name: '开关(第九组)',
        onImg: 'assets/img/chart/on9.png',
        offImg: 'assets/img/chart/off9.png'
      },
      {
        name: '开关(第十组)',
        onImg: 'assets/img/chart/on10.png',
        offImg: 'assets/img/chart/off10.png'
      }
    ]
  },
  mutations: {
    /**
    * @desc 设置当前页面
    * @param {String} name 页面名
    */
    setCurrentPageName (state: any, name: string) {
      state.currentPageName = name
    },
    setCurrentPage (state: any, obj: any) {
      state.currentPageObj = obj
    },
    /**
    * @desc 添加标签
    * @param {Object} tagObj 标签对象
    */
    increateTag (state: any, tagObj: any) {
      if (!Util.oneOf(tagObj.url, state.dontCache)) {
        state.cachePage.push(tagObj.url)
      }
      if (state.pageOpenedList.findIndex((ele: any) => ele.url === tagObj.url) === -1) {
        state.pageOpenedList.push(tagObj)
      }
      // console.log(state.pageOpenedList)
      state.currentPageName = tagObj.url
      state.currentPageObj = tagObj
    },
    /**
    * @desc 删除标签
    * @param {String} name 标签名
    */
    removeTag (state: any, name: string) {
      state.pageOpenedList.map((item: any, index: number) => {
        if (item.url === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    /**
    * @desc 从缓存页面中删除页面
    * @param {String} name 页面名
    */
    closePage (state: any, name: string) {
      state.cachePage.forEach((item: any, index: number) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    /**
    * @desc 关闭当前标签
    */
    closeCurrentTag (state: any) {
      let currentIndex = 0
      state.pageOpenedList.forEach((item: any, index: number) => {
        if (item.url === state.contextMenuOpenedTag) {
          currentIndex = index
        }
      })
      state.pageOpenedList.splice(currentIndex, 1)
      state.cachePage.splice(currentIndex, 1)
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
    * @desc 关闭其他标签
    */
    closeOtherTag (state: any) {
      let currentIndex = 0
      state.pageOpenedList.forEach((item: any, index: number) => {
        if (item.url === state.contextMenuOpenedTag) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter((item: any) => {
        return item === state.contextMenuOpenedTag
      })
      state.cachePage = newCachepage
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
    * @desc 关闭所有标签
    */
    closeAllTag (state: any) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    /**
    * @desc 设置打开右键菜单的标签
    * @param {String} name 标签名
    */
    setContextMenuOpenedTag (state: any, name: string) {
      state.contextMenuOpenedTag = name
    }
  },
  actions: {
  },
  modules: {
  }
})
