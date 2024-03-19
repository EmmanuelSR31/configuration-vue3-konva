<template>
<div class="bi-bg" :style="{transform: 'scale(' + widthScale + ',' + heightScale + ')'}">
  <div class="bi-header">
    <div class="bi-date">
      <span class="bi-time">{{dateText.substring(11)}}</span><span>{{weekText}}&nbsp;&nbsp;&nbsp;&nbsp;{{dateText.substring(0, 10)}}</span>
    </div>
    <div class="header-name">{{systemObj.headerSystemName}}</div>
  </div>
  <div class="bi-tab-con">
    <div class="bi-tab" :class="{'active': tabVal === 0}" @click="selectTab(0, {})"><span>首页</span></div>
    <div class="bi-tab" v-for="(item, index) in chejianData" :class="{'active': tabVal === (index + 1)}" @click="selectTab(index + 1, item)" :key="index"><span>{{item.workStationName}}</span></div>
  </div>
  <bi-index v-if="tabVal === 0"></bi-index>
  <bi-chejian v-if="tabVal !== 0" :id="chejianObj.workStationId" ref="chejian"></bi-chejian>
</div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { getCurrentInstance, ref, nextTick, onBeforeUnmount } from 'vue'
import { IInterfaceData } from '@/page/interface/interface'
import biIndex from './biIndex.vue'
import biChejian from './biChejian.vue'
export default {
  components: { biIndex, biChejian },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util } = common()
    let widthScale = ref(1) // 宽度比例
    let heightScale = ref(1) // 高度比例
    let systemObj = ref({ headerSystemName: '' }) // 系统名称对象
    let dateTimer = ref<any>(null)
    let dateText = ref('')
    let weekText = ref('')
    let tabVal = ref(0)
    let chejianObj = ref({ workStationId: '' })
    let chejianData = ref<Array<any>>([])
    function init() {
      let w = document.body.clientWidth
      let h = document.body.clientHeight
      widthScale.value = util.value.FloatDiv(w, 1920)
      heightScale.value = util.value.FloatDiv(h, 1080)
      proxy.$api.get('commonRoot', '/module/skin/get', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          systemObj.value = r.data.data
          document.title = systemObj.value.headerSystemName
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
      getDate()
      dateTimer.value = setInterval(() => {
        getDate()
      }, 1000)
      getData()
    }
    init()
    function getDate () {
      let temp = new Date()
      dateText.value = proxy.$moment(temp).format('YYYY-MM-DD HH:mm:ss')
      let day = proxy.$moment(temp).day()
      let week = ['日', '一', '二', '三', '四', '五', '六']
      weekText.value = ' 星期' + week[day]
    }
    function getData () {
      proxy.$api.get('commonRoot', '/dsa/api/bi/main/home', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          chejianData.value = r.data.data.sbcjqk
        }
      })
    }
    function selectTab (val: number, obj: any) {
      if (val !== 0) {
        chejianObj.value = obj
      }
      tabVal.value = val
      if (val !== 0) {
        nextTick(() => {
          proxy.$refs.chejian.init()
        })
      }
    }
    onBeforeUnmount(() => {
      window.clearInterval(dateTimer.value)
    })
    return {
      widthScale, heightScale, systemObj, dateText, weekText, tabVal, chejianData, chejianObj, selectTab
    }
  }
}
</script>

<style lang="scss">
@import "../../style/bi";
</style>
