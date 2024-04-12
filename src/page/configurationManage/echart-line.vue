<template>
  <div :id="'chartLine' + index" :style="itemStyle(obj)"></div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, onBeforeUnmount } from 'vue'
import common from '@/page/mixins/common' // 基本混入
import configuration from './configuration'
import { IInterfaceData } from '@/page/interface/interface'
import * as echarts from 'echarts'
export default {
  props: {
    obj: {
      type: Object as any
    },
    index: Number
  },
  setup (props: any, { emit }: any) {
    const proxy: any = getCurrentInstance()!.proxy
    const { util } = common()
    const { itemStyle } = configuration()
    let chart = ref<any>(null)
    let xData = ref<Array<any>>([])
    let legendData = ref<Array<any>>([])
    let seriesData = ref<Array<any>>([])
    let lineData = ref<Array<any>>([])
    let historySearch = ref({ beginDate: '', endDate: '', deviceId: '' })
    let chartTimer = ref<any>(null)
    function init () {
      historySearch.value.beginDate = proxy.$moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
      historySearch.value.endDate = proxy.$moment().format('YYYY-MM-DD HH:mm:ss')
      if (!util.value.isEmpty(props.obj.deviceId)) {
        historySearch.value.deviceId = props.obj.deviceId
        proxy.$api.get('commonRoot', '/dsa/api/data/storageModel/web/list', { deviceId: props.obj.deviceId }, (r: IInterfaceData) => {
          if (r.data.code === 0) {
            if (r.data.data !== null) {
              for (const iterator of r.data.data) {
                lineData.value.push({ key: iterator.deviceDataId, name: iterator.dataName })
              }
            }
            // console.log(lineData)
            getChartData()
            chartTimer.value = setInterval(() => {
              getChartData()
            }, 30000)
          }
        })
      }
    }
    init()
    function getChartData () {
      for (const iterator of lineData.value) {
        iterator.values = []
      }
      proxy.$api.get('commonRoot', '/dsa/api/data/history/getDeviceDataListBytime', historySearch.value, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          let arr = r.data.data
          arr = arr.reverse()
          xData.value = []
          for (const iterator of arr) {
            xData.value.push(iterator.date)
            for (const item of lineData.value) {
              item.values.push(iterator[item.key])
            }
          }
          legendData.value = []
          seriesData.value = []
          // console.log(yArr)
          for (const iterator of lineData.value) {
            legendData.value.push(iterator.name)
            seriesData.value.push({
              name: iterator.name,
              data: iterator.values,
              type: 'line'
            })
          }
          initChart()
        }
      })
    }
    function initChart () {
      if (chart.value) {
        chart.value.dispose()
      }
      chart.value = echarts.init(document.getElementById('chartLine' + props.index))
      let option = {
        grid: {
          top: 50,
          bottom: 80
        },
        tooltip: {
          trigger: 'axis'
          /* position: ['40%', '90%'],
          appendToBody: true */
        },
        toolbox: {
          show: true,
          top: 20,
          feature: {
            dataZoom: {
              title: { zoom: '区域缩放', back: '区域缩放还原' }
            }
          }
        },
        legend: {
          top: 0,
          data: legendData.value
        },
        dataZoom: [
          {
            start: 0,
            yAxisIndex: 0,
            realtime: true,
            end: 100
          },
          {
            start: 0,
            xAxisIndex: 0,
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
          data: xData.value
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData.value
      }
      chart.value.setOption(option)
    }
    onBeforeUnmount(() => {
      clearInterval(chartTimer.value)
    })
    return {
      itemStyle
    }
  }
}
</script>
