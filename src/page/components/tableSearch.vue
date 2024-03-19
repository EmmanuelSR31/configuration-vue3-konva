<template>
  <div class="searchTemplate" v-show="searchList.length > 0">
    <n-form :model="searchObj" inline label-placement="left" :label-width="labelWidth">
      <template v-for="item in searchList">
        <!-- 日期类型 -->
        <template v-if="item.type === 'dateType'">
          <n-form-item label="日期类型" :key="item.text" :style="{width: 'calc(' + labelWidth + ' + 100px)'}">
            <n-select v-model:value="dateType" :placeholder="'请选择' + item.name" :options="dateTypeOptions" @update:value="selectDateType(item)"></n-select>
          </n-form-item>
          <n-form-item label="开始日期" :style="{width: '200px'}">
            <n-date-picker type="date" v-if="item.startDateText !== undefined" v-model:formatted-value="searchObj[item.startDateText]" placeholder="请选择开始日期" value-format="yyyy-MM-dd" clearable></n-date-picker>
          </n-form-item>
          <n-form-item label="结束日期" :style="{width: '200px'}">
            <n-date-picker type="date" v-if="item.endDateText !== undefined" v-model:formatted-value="searchObj[item.endDateText]" placeholder="请选择结束日期" value-format="yyyy-MM-dd" clearable></n-date-picker>
          </n-form-item>
        </template>
        <template v-else>
          <n-form-item :label="item.name" :key="item.text" :style="{width: getFormItemWidth(item)}">
            <!-- 文本框 -->
            <template v-if="item.type === 'text'">
              <n-input v-model:value="searchObj[item.text]" :placeholder="'请输入' + item.name" clearable></n-input>
            </template>
            <!-- 日期框 -->
            <template v-else-if="item.type === 'date'">
              <n-date-picker type="date" v-model:formatted-value="searchObj[item.text]" value-format="yyyy-MM-dd" clearable></n-date-picker>
            </template>
            <!-- 日期时间框 -->
            <template v-else-if="item.type === 'datetime'">
              <n-date-picker type="datetime" v-model:formatted-value="searchObj[item.text]" value-format="yyyy-MM-dd HH:mm:ss" clearable></n-date-picker>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="item.type === 'select'">
              <n-select v-model:value="searchObj[item.text]" :placeholder="'请选择' + item.name" :options="item.selectData" :value-field="item.valueName" :label-field="item.textName" @update:value="selectChange(item)" clearable filterable></n-select>
            </template>
            <!-- 树形下拉框 -->
            <template v-else-if="item.type === 'treeSelect'">
              <n-tree-select v-model:value="searchObj[item.text]" :placeholder="'请选择' + item.name" :options="item.selectData" :key-field="item.valueName" :label-field="item.textName" />
            </template>
            <!-- 日期范围 -->
            <template v-else-if="item.type === 'dateRange'">
              <n-date-picker type="date" v-if="item.startDateText !== undefined" v-model:formatted-value="searchObj[item.startDateText]" value-format="yyyy-MM-dd" clearable style="width: calc(50% - 10px);"></n-date-picker> -
              <n-date-picker type="date" v-if="item.endDateText !== undefined" v-model:formatted-value="searchObj[item.endDateText]" value-format="yyyy-MM-dd" clearable style="width: calc(50% - 10px);"></n-date-picker>
            </template>
          </n-form-item>
        </template>
      </template>
      <n-form-item :label="''" class="searchTemplate_btn">
        <n-button type="primary" @click="search"><n-icon size="17"><Search /></n-icon>搜索</n-button>
        <n-button @click="reset"><n-icon size="17"><Refresh /></n-icon>刷新</n-button>
      </n-form-item>
    </n-form>
    <div class="clear"></div>
  </div>
</template>

<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import { getCurrentInstance, reactive, ref, computed, onMounted } from 'vue'
import { IInterfaceData, ITableSearch } from '@/page/interface/interface'
import { Search, Refresh } from '@vicons/ionicons5'
export default {
  props: {
    // 搜索项
    searchArr: Array,
    // label宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 一行搜索框数量
    itemNumber: {
      type: Number,
      default: 4
    }
  },
  components: { Search, Refresh },
  setup (props: any, { emit }: any) {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, arrRemoveEmptyChildren } = common()
    const searchList = ref<ITableSearch[]>([]) // 搜索项
    let searchObj: any = ref({}) // 搜索对象
    let initialSearchObj = reactive({}) // 初始搜索对象
    const selectLoading: any = reactive({}) // 数据加载
    const formItemWidth = computed(() => 100 / props.itemNumber + '%') // 搜索框宽度
    const dateTypeOptions = ref([{ value: 1, label: '当天' }, { value: 2, label: '当月' }, { value: 3, label: '当年' }, { value: 4, label: '自定义' }]) // 日期类型选项
    let dateType = ref(4) // 日期类型
    /**
    * @desc 初始化
    */
    function init (arr: ITableSearch[]) {
      searchList.value = arr
      let hasDefaultValue = false
      for (const iterator of searchList.value) {
        // 添加默认值
        searchObj.value[iterator.text] = ''
        if (!util.value.isEmpty(iterator.defaultValue)) {
          searchObj.value[iterator.text] = iterator.defaultValue
          hasDefaultValue = true
        } else if (iterator.type === 'dateRange' && iterator.startDateText !== undefined  && iterator.endDateText !== undefined) {
          searchObj.value[iterator.startDateText] = null
          searchObj.value[iterator.endDateText] = null
        } else if (iterator.type === 'date' || iterator.type === 'datetime') {
          searchObj.value[iterator.text] = null
        }
        // 设置树形下拉数据格式
        if (iterator.type === 'treeSelect') {
          iterator.selectData = arrRemoveEmptyChildren(iterator.selectData!)
        }
      }
      initialSearchObj = util.value.deepClone(searchObj.value)
      if (hasDefaultValue) {
        emit('search')
      }
    }
    /**
    * @desc 搜索
    */
    function search () {
      emit('search')
    }
    /**
    * @desc 重置
    */
    function reset () {
      searchObj.value = util.value.deepClone(initialSearchObj)
      emit('search')
    }
    /**
    * @desc 级联下拉取下级数据
    * @param {Object} item 级联下拉上级
    */
    function selectChange (item: any) {
      if (item.onChange && !util.value.isEmpty(searchObj.value[item.text])) {
        const obj: any = {}
        obj[item.changeAjax.paramsName] = searchObj.value[item.text]
        let toObj: ITableSearch = { name: '', text: '', type: '', defaultValue: '', selectData: [] } // 级联下级对象
        for (const iterator of searchList.value) {
          if (iterator.text === item.changeAjax.changeDataText) {
            toObj = iterator
            break
          }
        }
        toObj.selectData = []
        selectLoading[toObj.text] = true
        proxy.$api[item.changeAjax.method](item.changeAjax.rootName, item.changeAjax.url, obj, (r: IInterfaceData) => {
          const arr = item.changeAjax.callback(r)
          toObj.selectData = arr
          selectLoading[toObj.text] = false
        })
      }
    }
    /**
    * @desc 选择日期类型
    */
    function selectDateType (item: ITableSearch) {
      if (item.startDateText !== undefined && item.endDateText !== undefined) {
        if (dateType.value === 1) {
          searchObj.value[item.startDateText] = util.value.getDate(10)
          searchObj.value[item.endDateText] = util.value.getDate(10)
        } else if (dateType.value === 2) {
          searchObj.value[item.startDateText] = proxy.$moment().startOf('month').format('YYYY-MM-DD')
          searchObj.value[item.endDateText] = proxy.$moment().endOf('month').format('YYYY-MM-DD')
        } else if (dateType.value === 3) {
          searchObj.value[item.startDateText] = util.value.getDate(5) + '01-01'
          searchObj.value[item.endDateText] = util.value.getDate(5) + '12-31'
        }
      }
    }
    /**
    * @desc 取搜索对象
    */
    function getSearchObj () {
      const obj = util.value.deepClone(searchObj.value)
      for (const iterator of searchList.value) {
        // 设置树形下拉数据格式
        if (iterator.type === 'treeSelect' && !util.value.isEmpty(obj[iterator.text])) {
          obj[iterator.text] = obj[iterator.text].pop()
        }
      }
      return obj
    }
    /**
    * @desc 取宽度
    */
    function getFormItemWidth (item: ITableSearch) {
      if (util.value.isEmpty(item.width)) {
        return formItemWidth.value
      } else {
        return item.width
      }
    }
    onMounted(() => {
      searchList.value = props.searchArr as ITableSearch[]
    })
    return {
      searchList, searchObj, initialSearchObj, selectLoading, formItemWidth, dateTypeOptions, dateType, init, search, reset, selectChange, selectDateType, getSearchObj, getFormItemWidth
    }
  }
}
</script>
