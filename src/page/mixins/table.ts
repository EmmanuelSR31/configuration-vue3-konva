import Util from '@/utils/index'
import { getCurrentInstance, ref, computed } from 'vue'
import { ITableSearch } from '@/page/interface/interface'

export default function () {
  const proxy: any = getCurrentInstance()!.proxy
  let loading = ref(false) // 加载中
  let leftLoading = ref(false) // 加载中
  let totalRows = ref(0) // 数据总数
  let leftTotalRows = ref(0) // 数据总数
  const data = ref<Array<any>>([]) // 数据
  const leftData = ref<Array<any>>([]) // 数据
  const selectObj: any = ref({}) // 选中数据
  const selectRowObj = ref({}) // 选中行数据
  const searchArr = ref<ITableSearch[]>([]) // 搜索项
  let showCom = ref(false) // 显示弹窗组件
  let method = ref('') // 弹窗组件方法
  let title = ref('') // 弹窗组件标题
  const comObj = ref({}) // 弹窗组件数据
  let showLeftCom = ref(false) // 显示弹窗组件
  let leftMethod = ref('') // 弹窗组件方法
  let leftTitle = ref('') // 弹窗组件标题
  const leftComObj = ref({}) // 弹窗组件数据
  const tableHeight = computed(() => document.body.clientHeight - 330) // 表格高度
  /**
  * @desc 搜索
  */
  function search () {
    if (!Util.isEmpty(proxy.$refs.tablePage)) {
      proxy.$refs.tablePage.changePage(1)
    } else {
      // changePage()
    }
  }
  return {
    loading, leftLoading, totalRows, leftTotalRows, data, leftData, selectObj, searchArr, showCom, method, title, comObj, showLeftCom, leftMethod, leftTitle, leftComObj, tableHeight, search
  }
}