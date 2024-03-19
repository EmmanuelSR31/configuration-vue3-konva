<template>
<div>
  <div class="home-card" style="margin-bottom: 30px;">
    <div class="home-card-title"><hr>基础数据</div>
    <div class="home-col-con">
      <div class="home-col" style="background: url(assets/img/home/1-bg.png) center no-repeat;background-size: 100% 100%;">
        <img src="/assets/img/home/icon-1.png">
        <div>
          <div>数采终端</div>
          <div><span>{{deviceObj.dtuCount}}</span>个</div>
        </div>
      </div>
      <div class="home-col" style="background: url(assets/img/home/2-bg.png) center no-repeat;background-size: 100% 100%;">
        <img src="/assets/img/home/icon-2.png">
        <div>
          <div>数采点位</div>
          <div><span>{{deviceObj.dataPointCount}}</span>个</div>
        </div>
      </div>
      <div class="home-col" style="background: url(assets/img/home/3-bg.png) center no-repeat;background-size: 100% 100%;">
        <img src="/assets/img/home/icon-3.png">
        <div>
          <div>报警点位</div>
          <div><span>{{deviceObj.alarmPointCount}}</span>个</div>
        </div>
      </div>
    </div>
    <div class="home-col-con">
      <div class="home-col home-col-1">
        <div class="home-col-title">
          <img src="/assets/img/home/icon-4.png">数据吞吐总量
        </div>
        <div class="home-col-box">
          <div class="home-col-box-col" style="width: 45%;">
            <div class="home-col-box-col-title"></div>
            <div v-html="getSizeStr(dataObj.dataSize)"></div>
          </div>
          <div class="home-col-box-col" style="width: 55%;">
            <div class="home-col-box-col-title"></div>
            <div v-html="getCountStr(dataObj.dataCount)"></div>
          </div>
        </div>
      </div>
      <div class="home-col home-col-1">
        <div class="home-col-title">
          <img src="/assets/img/home/icon-4.png">当日数据吞吐量
        </div>
        <div class="home-col-box">
          <div class="home-col-box-col" style="width: 45%;">
            <div class="home-col-box-col-title"></div>
            <div v-html="getSizeStr(dayDataObj.dataSize)"></div>
          </div>
          <div class="home-col-box-col" style="width: 55%;">
            <div class="home-col-box-col-title"></div>
            <div v-html="getCountStr(dayDataObj.dataCount)"></div>
          </div>
        </div>
      </div>
      <div class="home-col home-col-1">
        <div class="home-col-title">
          <img src="/assets/img/home/icon-6.png">数采接口频次
        </div>
        <div class="home-col-box">
          <div class="home-col-box-col" style="width: 25%;">
          </div>
          <div class="home-col-box-col">
            <div class="home-col-box-col-title"></div>
            <div><span>{{interfaceObj.count}}</span>次/分钟</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-card" style="padding-bottom: 10px;">
    <div class="home-card-title"><hr>数据吞吐量走势</div>
    <div id="chartDiv1" style="height: 360px;"></div>
  </div>
</div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref } from 'vue'
import * as echarts from 'echarts'
export default {
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let timer = ref<any>(null)
    let dayTimer = ref<any>(null)
    let deviceObj = ref({ dtuCount: 0, dataPointCount: 0, alarmPointCount: 0 })
    let dataObj = ref({ dataCount: 0, dataSize: 0 })
    let dayDataObj = ref({ dataCount: 0, dataSize: 0 })
    let interfaceObj = ref({ count: 0 })
    let data = ref([])
    let chart1 = ref<any>(null)
    function init() {
      getData()
      getDayData()
      getChartData()
      dayTimer.value = setInterval(() => {
        getDayData()
      }, 3000)
      timer.value = setInterval(() => {
        getChartData()
      }, 60000)
    }
    init()
    function getData () {
      proxy.$api.get('commonRoot', '/dsa/api/homepage/baseData', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            deviceObj.value = r.data.data
          }
        }
      })
    }
    function getDayData () {
      proxy.$api.get('commonRoot', '/dsa/api/statistics/total', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            dataObj.value = r.data.data[0]
          }
        }
      })
      proxy.$api.get('commonRoot', '/dsa/api/statistics/day', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            dayDataObj.value = r.data.data
          }
        }
      })
      proxy.$api.get('commonRoot', '/dsa/api/homepage/interfaceStatiMinute', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          if (r.data.data !== null) {
            interfaceObj.value = r.data.data
          }
        }
      })
    }
    function getChartData () {
      proxy.$api.get('commonRoot', '/dsa/api/statistics/dataFlowMinute', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data.value = r.data.data
          initChart1()
        }
      })
    }
    function initChart1 () {
      let xData = []
      let yData = []
      let arr = ref<Array<any>>([])
      if (data.value.length > 60) {
        arr.value = data.value.slice(0, 60)
      }
      for (const iterator of arr.value) {
        xData.push(util.value.getDate(19, iterator.updateDate * 1000 * 60).substring(11, 16))
        yData.push(parseFloat(util.value.FloatDiv(iterator.dataSize, (1024 * 1024))).toFixed(2))
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
          bottom: 70
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{c}MB'
        },
        color: ['#4C71B0'],
        legend: { data: ['吞吐量'], right: 30 },
        dataZoom: [
          {
            start: 0,
            realtime: true,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#666666',
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: '#C8C8C8'
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
            color: '#666',
            fontSize: 14
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#C8C8C8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#C8C8C8',
              type: 'dashed'
            }
          },
          name: '单位：MB',
          nameTextStyle: {
            color: '#666'
          }
        },
        series: [{
          name: '吞吐量',
          data: yData,
          type: 'line',
          showSymbol: false,
          smooth: true,
          areaStyle: {
            opacity: 0.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(76, 113, 176, 0.4)'
              },
              {
                offset: 0.5,
                color: 'rgba(76, 113, 176, 0)'
              }
            ])
          }
        }]
      })
    }
    function getSizeStr (val: number) {
      let temp = ''
      if (val > (1024 * 1024 * 1024)) {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, (1024 * 1024 * 1024))).toFixed(1)}</span>GB`
      } else {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, (1024 * 1024))).toFixed(1)}</span>MB`
      }
      return temp
    }
    function getCountStr (val: number) {
      let temp = ''
      if (val > 100000000) {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, 100000000)).toFixed(1)}</span>亿包`
      } else if (val > 1000000) {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, 1000000)).toFixed(1)}</span>百万包`
      } else if (val > 10000) {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, 10000)).toFixed(1)}</span>万包`
      } else if (val > 1000) {
        temp = `<span>${parseFloat(util.value.FloatDiv(val, 1000)).toFixed(1)}</span>千包`
      } else {
        temp = `<span>${val}</span>包`
      }
      return temp
    }
    return {
      deviceObj, dataObj, dayDataObj, interfaceObj, getSizeStr, getCountStr
    }
  }
}
</script>

<style lang="scss">
@import "../../style/home";
</style>
