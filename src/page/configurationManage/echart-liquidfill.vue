<template>
  <div :id="'chartLiquidfill' + index" :style="itemStyle(obj)"></div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import common from '@/page/mixins/common' // 基本混入
import configuration from './configuration'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  props: {
    obj: {
      type: Object as any
    },
    index: Number
  },
  setup (props: any) {
    const proxy: any = getCurrentInstance()!.proxy
    const { util } = common()
    const { itemStyle } = configuration()
    let chart = ref<any>(null)
    let chartTimer = ref<any>(null)
    function init () {
      initChart()
    }
    function initChart () {
      let val = 0
      if (!util.value.isEmpty(props.obj.val)) {
        val = props.obj.val
      }
      if (chart.value) {
        chart.value.dispose()
      }
      chart.value = echarts.init(document.getElementById('chartLiquidfill' + props.index))
      let option = {
        series: [
          {
            type: 'liquidFill',
            data: [val / props.obj.maxHeight],
            shape: props.obj.shape,
            itemStyle: {
              color: props.obj.liquidColor,
              opacity: props.obj.liquidOpacity
            },
            outline: {
              itemStyle: {
                borderWidth: props.obj.strokeWidth,
                borderColor: props.obj.stroke,
                borderType: props.obj.stroke
              }
            },
            backgroundStyle: {
              color: props.obj.backColor
            },
            label: {
              color: props.obj.color,
              fontSize: props.obj.fontSize,
              formatter: val + props.obj.unitText
            }
          }
        ]
      }
      chart.value.setOption(option)
    }
    onMounted(()=>{
      init()
    })
    watch(() => props.obj, (newVal) => {
      initChart()
    }, {
      deep: true
    })
    onBeforeUnmount(() => {
      clearInterval(chartTimer.value)
    })
    return {
      itemStyle
    }
  }
}
</script>
