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
      <div class="bi-card-title">设备列表</div>
      <div class="shebei-table">
        <table cellspacing="4">
          <tr>
            <th width="168">设备名称</th>
            <th width="90">运行状态</th>
            <th width="90">工作时长 (小时)</th>
            <th width="90">停机时长 (小时)</th>
            <th>设备当月时长走势</th>
          </tr>
          <tr v-for="(item, index) in shebeiData" :key="index">
            <td>{{item.deviceName}}</td>
            <td><img :src="getStateImg(item)">{{deviceStateList[item.deviceState]}}</td>
            <td>{{getDateTextHour(item.workSecond)}}</td>
            <td>{{getDateTextHour(item.startupSecond)}}</td>
            <td><div :id="'shebeiChart' + index" style="height: 90px;"></div></td>
          </tr>
        </table>
        <div class="bi-index-baojing-table" style="display: flex;justify-content: center;padding-top: 3px;">
          <n-pagination :item-count="shebeiTotalRows" v-model:page="shebeiCurrentPage" :page-size="8" :on-update:page="changePage"></n-pagination>
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
        <bi-table-page :columns="baojingColumns" :data="baojingData" :totalRows="baojingTotalRows" @change-page="changePageBaojing" :pageSize="19" :height="770"></bi-table-page>
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
  props: {
    id: String
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let timer = ref<any>(null)
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
    }
    let dataObj = ref<IDataObj>({
      VoBiDeviceCount: { deviceCount: 0, workCount: 0, startupCount: 0, alarmCount: 0, offLineCount: 0 },
      VoBiDeviceTime: { workSecond: 0, startupSecond: 0, alarmSecond: 0 },
      ngzsj: [],
      ntjsj: []
    })
    let deviceStateList = ref<{ [key: string]: string}>({})
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
    let shebeiData = ref<Array<any>>([])
    let shebeiAllData = ref<Array<any>>([])
    let shebeiCurrentPage = ref(1)
    let shebeiTotalRows = ref(0)
    let chart1 = ref<any>(null)
    let chart2 = ref<any>(null)
    let shebeiChart = ref<Array<any>>([])
    function init() {
      baojingData.value = []
      baojingAllData.value = []
      baojingTopData.value = []
      shebeiAllData.value = []
      shebeiData.value = []
      proxy.$api.get('commonRoot', '/mes/device/enum/DeviceState', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceStateList.value = r.data.data
        }
      })
      if (timer.value !== null) {
        clearInterval(timer.value)
      }
      getData()
      timer.value = setInterval(() => {
        getData()
      }, 10000)
    }
    function getData () {
      proxy.$api.get('commonRoot', '/dsa/api/bi/workStation/main', { workStationId: props.id }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dataObj.value = r.data.data
          nextTick(() => {
            initChart1()
            initChart2()
          })
        }
      })
      proxy.$api.get('commonRoot', '/dsa/api/bi/workStation/sbcjqk', { workStationId: props.id }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          shebeiAllData.value = r.data.data
          shebeiTotalRows.value = shebeiAllData.value.length
          changePage(1)
        }
      })
      proxy.$api.get('commonRoot', '/dsa/api/bi/workStation/realtimeAlarm', { workStationId: props.id }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          baojingAllData.value = r.data.data
          if (baojingAllData.value.length > 0) {
            baojingTopData.value = [baojingAllData.value[0]]
          }
          baojingTotalRows.value = baojingAllData.value.length
          changePageBaojing(1, 19)
        }
      })
    }
    function changePage (page: number) {
      shebeiChart.value = []
      if (shebeiAllData.value.length > 0) {
        let arr = JSON.parse(JSON.stringify(shebeiAllData.value))
        shebeiData.value = arr.slice((page - 1) * 8, 8 * page)
      }
      nextTick(() => {
        initShebeiCharts()
      })
    }
    function changePageBaojing (page: number, pageSize: number) {
      if (baojingAllData.value.length > 0) {
        let arr = JSON.parse(JSON.stringify(baojingAllData.value))
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
    function initShebeiCharts () {
      for (let i = 0; i < shebeiData.value.length; i++) {
        shebeiChart.value[i] = null
        initShebeiChart(i)
      }
    }
    function initShebeiChart (id: number) {
      let xData = []
      let yData = []
      for (const iterator of shebeiData.value[id].timeList) {
        // xData.push(iterator.d.substring(8))
        xData.push(iterator.d.substring(5))
        let temp = getDateTextHour(iterator.workSecond)
        if (temp > 24) {
          temp = 24
        }
        yData.push(temp)
      }
      if (shebeiChart.value[id]) {
        shebeiChart.value[id].dispose()
      }
      shebeiChart.value[id] = echarts.init(document.getElementById('shebeiChart' + id))
      shebeiChart.value[id].setOption({
        grid: {
          left: 40,
          right: 40,
          top: 15,
          bottom: 30
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{c}小时'
        },
        color: ['#41cefe'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            // interval: 0,
            color: '#b6ceef',
            fontSize: 10
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
            fontSize: 12,
            show: false
          },
          axisLine: {
            show: false,
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
          }
        },
        series: [{
          data: yData,
          type: 'bar',
          barWidth: 4,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3F57E7' },
              { offset: 1, color: '#0ECCFF' }
            ]),
            borderRadius: [2, 2, 2, 2]
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
    function getDateTextHour (send: number) {
      let temp = 0
      if (!util.value.isEmpty(send)) {
        temp = Math.ceil(send / (60 * 60))
      }
      return temp
    }
    function getStateImg (row: any) {
      let temp = '/assets/img/bi/icon-'
      if (row.deviceState === 'Work') {
        temp += '2'
      } else if (row.deviceState === 'OffLine') {
        temp += '5'
      } else if (row.deviceState === 'Startup') {
        temp += '3'
      } else if (row.deviceState === 'Alarm') {
        temp += '4'
      }
      temp += '.png'
      return temp
    }
    onBeforeUnmount(() => {
      window.clearInterval(timer.value)
    })
    return {
      dataObj, deviceStateList, baojingColumns, baojingData, baojingTotalRows, baojingTopData, getData, changePage, shebeiData, shebeiCurrentPage, shebeiTotalRows,
      changePageBaojing, init, getDateText, getDateTextHour, getStateImg
    }
  }
}
</script>

<style lang="scss">
</style>
