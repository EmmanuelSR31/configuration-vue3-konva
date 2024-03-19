<template>
<div class="flex-con" style="padding: 0 30px;justify-content: space-between;">
  <div style="width: 454px;">
    <div class="bi-card bi-card-454" style="margin-bottom: 12px;">
      <div class="bi-card-title">设备总览</div>
      <div class="bi-zonglan-top">
        <img src="/assets/img/bi/icon-1.png">
        <div>
          <div>设备总量</div>
          <div class="bi-num">{{dataObj.VoBiDeviceCount.deviceCount}}</div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <img src="/assets/img/bi/line.png">
      </div>
      <div class="bi-zonglan-col-con">
        <div class="bi-zonglan-col">
          <div>
            <img src="/assets/img/bi/icon-2.png">工作
          </div>
          <div class="bi-num">{{dataObj.VoBiDeviceCount.workCount}}</div>
        </div>
        <div class="bi-zonglan-col">
          <div>
            <img src="/assets/img/bi/icon-3.png">停机
          </div>
          <div class="bi-num">{{dataObj.VoBiDeviceCount.startupCount}}</div>
        </div>
        <div class="bi-zonglan-col">
          <div>
            <img src="/assets/img/bi/icon-4.png">报警
          </div>
          <div class="bi-num">{{dataObj.VoBiDeviceCount.alarmCount}}</div>
        </div>
        <div class="bi-zonglan-col">
          <div>
            <img src="/assets/img/bi/icon-5.png">离线
          </div>
          <div class="bi-num">{{dataObj.VoBiDeviceCount.offLineCount}}</div>
        </div>
      </div>
    </div>
    <div class="bi-card bi-card-454-641">
      <div class="bi-card-title">设备总时间</div>
      <div class="bi-shijan-col-con">
        <div class="bi-shijan-col">
          <div style="display: flex;align-items: baseline;">
            <div class="bi-num">{{getDateText(dataObj.VoBiDeviceTime.workSecond)}}</div><div class="bi-unit">天</div>
          </div>
          <div>
            <span style="background-color: #37E066;"></span>工作时长
          </div>
        </div>
        <div class="bi-shijan-col">
          <div style="display: flex;align-items: baseline;">
            <div class="bi-num">{{getDateText(dataObj.VoBiDeviceTime.startupSecond)}}</div><div class="bi-unit">天</div>
          </div>
          <div>
            <span style="background-color: #FB9149;"></span>停机时长
          </div>
        </div>
        <div class="bi-shijan-col">
          <div style="display: flex;align-items: baseline;">
            <div class="bi-num">{{getDateText(dataObj.VoBiDeviceTime.alarmSecond)}}</div><div class="bi-unit">天</div>
          </div>
          <div>
            <span style="background-color: #63738F;"></span>离线时长
          </div>
        </div>
      </div>
      <div class="bi-chart-title"><img src="/assets/img/bi/icon-6.png"><div>年工作时间</div></div>
      <div id="chartDiv1" style="height: 220px;"></div>
      <div class="bi-chart-title"><img src="/assets/img/bi/icon-6.png"><div>年停机时间</div></div>
      <div id="chartDiv2" style="height: 220px;"></div>
    </div>
  </div>
  <div style="width: 920px;">
    <div class="bi-card bi-card-920">
      <div class="bi-card-title">各车间设备情况</div>
      <div class="bi-card-title-form">
        <n-date-picker v-model:formatted-value="searchObj.year" @update:value="getData()" value-format="yyyy" type="year" style="width: 160px;"></n-date-picker>
      </div>
      <div style=" display: flex;flex-wrap: wrap;padding: 10px 7px 0 7px;">
        <div class="bi-chart-con" v-for="(item, index) in dataObj.sbcjqk" :key="index">
          <div class="bi-chart-title"><img src="/assets/img/bi/icon-6.png"><div>{{item.workStationName}}</div></div>
          <div class="bi-chart-top">
            <div class="bi-chart-top-left"><div class="bi-num">{{item.deviceCount}}</div><div>设备总量</div></div>
            <img src="/assets/img/bi/chart-line.png">
            <div class="bi-chart-top-col">
              <div class="bi-num">{{item.workCount}}</div>
              <div><span style="background-color: #37E066;"></span>工作</div>
            </div>
            <div class="bi-chart-top-col">
              <div class="bi-num">{{item.startupCount}}</div>
              <div><span style="background-color: #FB9149;"></span>停机</div>
            </div>
            <div class="bi-chart-top-col">
              <div class="bi-num">{{item.alarmCount}}</div>
              <div><span style="background-color: #FE2D4C;"></span>报警</div>
            </div>
            <div class="bi-chart-top-col">
              <div class="bi-num">{{item.offLineCount}}</div>
              <div><span style="background-color: #63738F;"></span>离线</div>
            </div>
          </div>
          <div :id="'chartCJDiv' + index" style="height: 150px;"></div>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 455px;">
    <div class="bi-card bi-card-455">
      <div class="bi-card-title">实时报警</div>
      <div style="padding: 0 7px;">
        <div class="bi-index-baojing-top">
          <vue3-seamless-scroll :list="baojingTopData" direction="left" :limitScrollNum="1">
            <div class="bi-index-baojing-top-scroll" :style="{width: baojingTopData.length * 440 + 'px'}">
              <div class="bi-index-baojing-top-inner" style="width: 430px;" v-for="(item, index) in baojingTopData" :key="index">
                <div>{{item.deviceName + item.alarmNote}}</div>
                <span>{{item.updateDate}}</span>
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>
        <bi-table-page :columns="baojingColumns" :data="baojingData" :totalRows="baojingTotalRows" @change-page="changePage" :pageSize="15" :height="725"></bi-table-page>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, h, nextTick, onBeforeUnmount } from 'vue'
import biTablePage from './biTablePage.vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import * as echarts from 'echarts'
export default {
  components: { biTablePage, Vue3SeamlessScroll },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let timer = ref<any>(null)
    type ISbcjqkMonthTime = {
      monthYm: string
      workSecond: number
    }
    type ISbcjqk = {
      workStationName: string
      deviceCount: number
      workCount: number
      startupCount: number
      alarmCount: number
      offLineCount: number
      monthTime: ISbcjqkMonthTime[]
    }
    type INgzsj = {
      year: string
      second: number
    }
    type INtjsj = {
      year: string
      second: number
    }
    type IDataObj = {
      VoBiDeviceCount: { deviceCount: number, workCount: number, startupCount: number, alarmCount: number, offLineCount: number }
      VoBiDeviceTime: { workSecond: number, startupSecond: number, alarmSecond: number }
      ngzsj: INgzsj[]
      ntjsj: INtjsj[]
      sbcjqk: ISbcjqk[]
      ssbj: []
    }
    let dataObj = ref<IDataObj>({
      VoBiDeviceCount: { deviceCount: 0, workCount: 0, startupCount: 0, alarmCount: 0, offLineCount: 0 },
      VoBiDeviceTime: { workSecond: 0, startupSecond: 0, alarmSecond: 0 },
      ngzsj: [],
      ntjsj: [],
      sbcjqk: [],
      ssbj: []
    })
    let searchObj = ref({ year: '' })
    let colors = ref([
      { color: '#41cefe', color1: '65, 206, 254' },
      { color: '#96EF68', color1: '150, 239, 104' },
      { color: '#CF38E4', color1: '207, 56, 228' },
      { color: '#D6D836', color1: '214, 216, 54' },
      { color: '#41cefe', color1: '65, 206, 254' },
      { color: '#96EF68', color1: '150, 239, 104' }
    ])
    let levelList = ref<{ [key: string]: string}>({ 'Level1': 'Ⅰ', 'Level2': 'Ⅱ', 'Level3': 'Ⅲ', 'Level4': 'Ⅳ' })
    type RowData = {
      deviceName: string
      alarmNote: string
      value: string
      deviceAlarmLevel: string
      updateDate: string
    }
    let baojingColumns = ref([
      {
        title: '名称',
        key: 'deviceName',
        align: 'center'
      },
      {
        title: '内容',
        key: 'alarmNote',
        align: 'center'
      },
      {
        title: '实时值',
        key: 'value',
        width: 90,
        align: 'center'
      },
      {
        title: '报警级别',
        key: 'deviceAlarmLevel',
        width: 80,
        align: 'center',
        render: (row: RowData) => {
          let temp = ''
          if (!util.value.isEmpty(row.deviceAlarmLevel)) {
            temp = levelList.value[row.deviceAlarmLevel]
          }
          return h('div', temp)
        }
      }
    ])
    let baojingData = ref<Array<RowData>>([])
    let baojingAllData = ref<Array<RowData>>([])
    let baojingTotalRows = ref(0)
    let baojingTopData = ref<Array<RowData>>([])
    let chart1 = ref<any>(null)
    let chart2 = ref<any>(null)
    let cjChart = ref<Array<any>>([])
    function init() {
      searchObj.value.year = util.value.getDate(4)
      getData()
      timer.value = setInterval(() => {
        getData()
      }, 10000)
    }
    init()
    function getData () {
      proxy.$api.get('commonRoot', '/dsa/api/bi/main/home', { year: searchObj.value.year }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dataObj.value = r.data.data
          nextTick(() => {
            initChart1()
            initChart2()
            for (let i = 0; i < dataObj.value.sbcjqk.length; i++) {
              cjChart.value[i] = null
              initCJChart(i)
            }
            baojingAllData.value = dataObj.value.ssbj
            if (baojingAllData.value.length > 0) {
              baojingTopData.value = [baojingAllData.value[0]]
            }
            baojingTotalRows.value = baojingAllData.value.length
            changePage(1, 19)
          })
        }
      })
    }
    function changePage (page: number, pageSize: number) {
      if (baojingAllData.value.length > 0) {
        let arr = util.value.deepClone(baojingAllData.value)
        baojingData.value = arr.slice((page - 1) * pageSize, pageSize * page)
      }
    }
    function initChart1 () {
      let xData = []
      let yData = []
      for (const iterator of dataObj.value.ngzsj) {
        xData.push(iterator.year)
        yData.push(getDateText(iterator.second))
      }
      if (chart1.value) {
        chart1.value.dispose()
      }
      chart1.value = echarts.init(document.getElementById('chartDiv1'))
      chart1.value.setOption({
        grid: {
          left: 50,
          right: 20,
          top: 50,
          bottom: 50
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}年<br />{c}天'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#164887'
            }
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#164887'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0A274D',
              type: 'dashed'
            }
          },
          name: '单位:天',
          nameTextStyle: {
            color: '#e2ff5c'
          }
        },
        series: [{
          data: yData,
          type: 'bar',
          barWidth: 18,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#28FBEC' },
              { offset: 1, color: '#1B63B3' }
            ]),
            borderRadius: [9, 9, 0, 0]
          }
        }]
      })
    }
    function initChart2 () {
      let xData = []
      let yData = []
      for (const iterator of dataObj.value.ntjsj) {
        xData.push(iterator.year)
        yData.push(getDateText(iterator.second))
      }
      if (chart2.value) {
        chart2.value.dispose()
      }
      chart2.value = echarts.init(document.getElementById('chartDiv2'))
      chart2.value.setOption({
        grid: {
          left: 50,
          right: 20,
          top: 50,
          bottom: 50
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}年<br />{c}天'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#164887'
            }
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#164887'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0A274D',
              type: 'dashed'
            }
          },
          name: '单位:天',
          nameTextStyle: {
            color: '#e2ff5c'
          }
        },
        series: [{
          data: yData,
          type: 'bar',
          barWidth: 18,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#D0B9AA' },
              { offset: 1, color: '#CF8347' }
            ]),
            borderRadius: [9, 9, 0, 0]
          }
        }]
      })
    }
    function initCJChart (i: number) {
      let xData = []
      let yData = []
      for (const iterator of dataObj.value.sbcjqk[i].monthTime) {
        xData.push(iterator.monthYm.substring(5))
        yData.push(getDateText(iterator.workSecond))
      }
      if (cjChart.value[i]) {
        cjChart.value[i].dispose()
      }
      cjChart.value[i] = echarts.init(document.getElementById('chartCJDiv' + i))
      cjChart.value[i].setOption({
        grid: {
          left: 50,
          right: 20,
          top: 40,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}月<br />{c}天'
        },
        color: colors.value[i].color,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#164887'
            }
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#b6ceef',
            fontSize: 12
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#164887'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0A274D',
              type: 'dashed'
            }
          },
          name: '单位:天',
          nameTextStyle: {
            color: '#e2ff5c'
          }
        },
        series: [{
          data: yData,
          type: 'line',
          showSymbol: false,
          areaStyle: {
            opacity: 0.86,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(' + colors.value[i].color1 + ', 0.4)'
              },
              {
                offset: 1,
                color: 'rgba(' + colors.value[i].color1 + ', 0)'
              }
            ])
          }
        }]
      })
    }
    function getDateText (send: number) {
      let temp = 0
      if (!util.value.isEmpty(send)) {
        temp = Math.ceil(send / (24 * 60 * 60))
      }
      return temp
    }
    onBeforeUnmount(() => {
      window.clearInterval(timer.value)
    })
    return {
      dataObj, searchObj, baojingColumns, baojingData, baojingTotalRows, baojingTopData, getData, changePage, getDateText
    }
  }
}
</script>

<style lang="scss">
</style>
