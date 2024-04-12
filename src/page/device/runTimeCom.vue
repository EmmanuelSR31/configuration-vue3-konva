<template>
<n-modal :title="title" v-model:show="showModel" preset="card" style="width: 1000px;" :mask-closable="false" :close-on-esc="false">
  <div class="modal-form-3 runtime-form">
    <n-form ref="formValidate" :model="dataObj" label-placement="left" label-width="100px" require-mark-placement="left">
      <n-form-item label="设备编号：">
        {{dataObj.deviceCode}}
      </n-form-item>
      <n-form-item label="设备名称：" style="width: 66.66%;">
        {{dataObj.deviceName}}
      </n-form-item>
      <n-form-item label="设备厂家：">
        {{dataObj.manufacturer}}
      </n-form-item>
      <n-form-item label="设备型号：">
        {{dataObj.deviceModel}}
      </n-form-item>
      <n-form-item label="进厂时间：">
        {{dataObj.intoFactoryDate}}
      </n-form-item>
      <n-form-item label="设备总时间：">
        {{getTimeText(dataObj.totalSecond)}}/{{getDayTimeText(dataObj.totalSecond)}}
      </n-form-item>
      <n-form-item label="工作时间：">
        {{getTimeText(dataObj.workSecond)}}/{{getDayTimeText(dataObj.workSecond)}}
      </n-form-item>
      <n-form-item label="停机时间：">
        {{getTimeText(dataObj.startupSecond)}}/{{getDayTimeText(dataObj.startupSecond)}}
      </n-form-item>
    </n-form>
  </div>
  <div class="run-card">
    <div class="run-card-title">
      <div class="run-card-title-left"><n-icon size="18" color="#1664FB"><list-circle /></n-icon>设备当天运行情况</div>
      <div class="run-card-title-right">
        <n-date-picker v-model:formatted-value="searchObj.day" value-format="yyyy-MM-dd" type="date" style="width: 140px;margin-right: 10px;"></n-date-picker>
        <n-button type="primary" @click="getData1">查询</n-button>
      </div>
    </div>
    <div style="height: 380px;" id="chart1Div"></div>
    <div class="run-card-chart-title">
      <div>工作时间：{{convertSecondsToTime1(dataObj1.workSecond, 2)}}</div>
      <div>停机时间：{{convertSecondsToTime1(dataObj1.startupSecond, 2)}}</div>
    </div>
  </div>
  <div class="run-card">
    <div class="run-card-title">
      <div class="run-card-title-left"><n-icon size="18" color="#1664FB"><list-circle /></n-icon>设备当月运行情况</div>
      <div class="run-card-title-right">
        <n-date-picker v-model:formatted-value="searchObj.month" value-format="yyyy-MM" type="month" style="width: 140px;margin-right: 10px;"></n-date-picker>
        <n-button type="primary" @click="getData2">查询</n-button>
      </div>
    </div>
    <div style="height: 380px;" id="chart2Div"></div>
    <div class="run-card-chart-title">
      <div>工作时间：{{convertSecondsToTime(dataObj2.workSecond, 2)}}</div>
      <div>停机时间：{{convertSecondsToTime(dataObj2.startupSecond, 2)}}</div>
    </div>
  </div>
</n-modal>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref } from 'vue'
import { ListCircle } from '@vicons/ionicons5'
import * as echarts from 'echarts'
export default {
  props: {
    show: Boolean,
    title: String, // 标题
    obj: Object as any, // 数据
    method: String // 方法
  },
  components: { ListCircle },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, showModel } = common()
    let dataObj = ref({ deviceCode: '', deviceName: '', manufacturer: '', deviceModel: '', intoFactoryDate: '', totalSecond: '', workSecond: '', startupSecond: '' }) // 数据对象
    let searchObj = ref({ day: '', month: '', beginDate: '', endDate: '' })
    /**
    * @desc 初始化
    */
    function init () {
      showModel.value = true
      searchObj.value.day = proxy.$moment().format('YYYY-MM-DD')
      searchObj.value.month = proxy.$moment().format('YYYY-MM')
      searchObj.value.beginDate = proxy.$moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      searchObj.value.endDate = proxy.$moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      proxy.$api.get('commonRoot', '/mes/device/web/one', { id: props.obj.deviceId }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          dataObj.value = r.data.data
        }
      })
      getData1()
      getData2()
    }
    init()
    let chart1 = ref<any>(null)
    let chart2 = ref<any>(null)
    let dataObj1 = ref({ workSecond: 0, startupSecond: 0 })
    let dataObj2 = ref({ workSecond: 0, startupSecond: 0 })
    let data1 = ref<Array<any>>([])
    let data2 = ref<Array<any>>([])
    function getData1 () {
      proxy.$api.get('commonRoot', '/mes/device/time/hour/list', { deviceId: props.obj.deviceId, day: searchObj.value.day }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data1.value = r.data.data
          initChart1()
        }
      })
    }
    function getData2 () {
      searchObj.value.beginDate = proxy.$moment(searchObj.value.month).startOf('month').format('YYYY-MM-DD')
      searchObj.value.endDate = proxy.$moment(searchObj.value.month).endOf('month').format('YYYY-MM-DD')
      proxy.$api.get('commonRoot', '/mes/device/time/day/list', { deviceId: props.obj.deviceId, beginDate: searchObj.value.beginDate, endDate: searchObj.value.endDate }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          data2.value = r.data.data
          initChart2()
        }
      })
    }
    function initChart1 () {
      let xData = []
      let yData = []
      let yData1 = []
      let yData2 = []
      dataObj1.value.workSecond = 0
      dataObj1.value.startupSecond = 0
      for (const iterator of data1.value) {
        xData.push(iterator.h)
        yData.push(iterator.totalSecond)
        yData1.push(iterator.workSecond)
        yData2.push(iterator.startupSecond)
        dataObj1.value.workSecond += iterator.workSecond
        dataObj1.value.startupSecond += iterator.startupSecond
      }
      if (chart1.value) {
        chart1.value.dispose()
      }
      chart1.value = echarts.init(document.getElementById('chart1Div'))
      chart1.value.setOption({
        color: ['#00CC33', '#FFCC00'],
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            let temp = params[0].axisValue + '<br>' +
              '<br>' + '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;background-color:' + params[0].color + '"></span>工作时间:' + convertSecondsToTime1(params[0].value) +
              '<br>' + '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;background-color:' + params[1].color + '"></span>停机时间:' + convertSecondsToTime1(params[1].value)
            return temp
          }
        },
        legend: {
        },
        grid: {
          left: 120,
          right: 10,
          top: 40,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#999'
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#999',
            formatter: (value: number, index: number) => {
              return convertSecondsToTime1(value)
            }
          }
        },
        series: [{
          name: '工作时间',
          type: 'bar',
          stack: 'Ad',
          data: yData1,
          barMaxWidth: 18
        }, {
          name: '停机时间',
          type: 'bar',
          stack: 'Ad',
          data: yData2,
          barMaxWidth: 18
        }]
      })
    }
    function initChart2 () {
      let xData = []
      let yData = []
      let yData1 = []
      let yData2 = []
      dataObj2.value.workSecond = 0
      dataObj2.value.startupSecond = 0
      for (const iterator of data2.value) {
        xData.push(iterator.d.substring(8))
        yData.push(iterator.totalSecond)
        yData1.push(iterator.workSecond)
        yData2.push(iterator.startupSecond)
        dataObj2.value.workSecond += iterator.workSecond
        dataObj2.value.startupSecond += iterator.startupSecond
      }
      if (chart2.value) {
        chart2.value.dispose()
      }
      chart2.value = echarts.init(document.getElementById('chart2Div'))
      chart2.value.setOption({
        color: ['#00CC33', '#FFCC00'],
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            let temp = params[0].axisValue + '<br>' +
              '<br>' + '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;background-color:' + params[0].color + '"></span>工作时间:' + convertSecondsToTime(params[0].value) +
              '<br>' + '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:5px;background-color:' + params[1].color + '"></span>停机时间:' + convertSecondsToTime(params[1].value)
            return temp
          }
        },
        legend: {
        },
        grid: {
          left: 150,
          right: 10,
          top: 40,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#999'
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#999',
            formatter: (value: number, index: number) => {
              return convertSecondsToTime(value)
            }
          }
        },
        series: [{
          name: '工作时间',
          type: 'bar',
          stack: 'Ad',
          data: yData1,
          barMaxWidth: 18
        }, {
          name: '停机时间',
          type: 'bar',
          stack: 'Ad',
          data: yData2,
          barMaxWidth: 18
        }]
      })
    }
    function getTimeText (num: string | number) {
      let temp = 0
      if (!util.value.isEmpty(num)) {
        temp = Math.ceil(util.value.FloatDiv(num, 3600))
      }
      return temp + '小时'
    }
    function getDayTimeText (num: string | number) {
      let temp = 0
      if (!util.value.isEmpty(num)) {
        temp = Math.ceil(util.value.FloatDiv(num, 3600 * 24))
      }
      return temp + '天'
    }
    function convertSecondsToTime (seconds: number, type = 0) {
      let days = Math.floor(seconds / (3600 * 24)); // 计算天数
      seconds -= days * 3600 * 24; // 从总秒数中去除已经计算过的天数部分
      let hours = Math.floor(seconds / 3600); // 计算小时数
      seconds -= hours * 3600; // 从总秒数中去除已经计算过的小时数部分
      let minutes = Math.floor(seconds / 60); // 计算分钟数
      seconds -= minutes * 60; // 从总秒数中去除已经计算过的分钟数部分
      if (type === 2) {
        if (minutes > 0) {
          hours++
        }
        return `${days}天${hours}小时`
      } else {
        return `${days}天${hours}小时${minutes}分钟${seconds}秒`
      }
    }
    function convertSecondsToTime1 (seconds: number, type = 0) {
      let hours = Math.floor(seconds / 3600); // 计算小时数
      seconds -= hours * 3600; // 从总秒数中去除已经计算过的小时数部分
      let minutes = Math.floor(seconds / 60); // 计算分钟数
      seconds -= minutes * 60; // 从总秒数中去除已经计算过的分钟数部分
      if (type === 2) {
        if (minutes > 0) {
          hours++
        }
        return `${hours}小时`
      } else {
        return `${hours}小时${minutes}分钟${seconds}秒`
      }
    }
    return { showModel, dataObj, searchObj, init, dataObj1, dataObj2, getData1, getData2, getDayTimeText, getTimeText, convertSecondsToTime, convertSecondsToTime1 }
  }
}
</script>
<style lang="scss" scoped>
.runtime-form {
  ::v-deep .n-form-item .n-form-item-feedback-wrapper {
    display: none;
  }
}
.run-card {
  box-shadow: 0px 0px 12px 2px rgba(235,235,235,0.3);
  border-radius: 12px;
  margin-bottom: 20px;
  position: relative;
}
.run-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border-bottom: 1px solid #F2F2F2;
  font-size: 16px;
  margin-bottom: 10px;
}
.run-card-title-left {
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
  }
}
.run-card-title-right {
  display: flex;
  align-items: center;
}
.run-card-chart-title {
  position: absolute;
  top: 12px;
  left: 200px;
  font-size: 16px;
  display: flex;
  div {
    margin-right: 15px;
  }
}
</style>
