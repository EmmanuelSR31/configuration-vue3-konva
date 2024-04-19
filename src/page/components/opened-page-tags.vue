<template>
  <div class="tab-con">
    <!-- 解决点击左侧菜单无法更新tab -->
    <div style="position:absolute;top:-1000px;left:0;">{{currentPageName}}</div>
    <n-tabs v-model:value="tabVal" type="card" :on-update:value="linkTo" :on-close="closeTag">
      <n-tab-pane v-for="item in pageTagsList" :tab="item.text" :name="item.url" :closable="item.url !== '/home'" :key="item.url">
        <template #tab>
          <div @contextmenu="showTagMenu(item, $event)">{{item.text}}</div>
        </template>
      </n-tab-pane>
    </n-tabs>
    <div class="contextmenu-con" v-show="tagContextmenuShow" @mouseleave="contextMenuClose" :style="{left: axios.x + 'px', top: axios.y + 'px'}">
      <ul>
        <li v-for="item in contextMenuList" :key="item.name" @click="contextMenuClick(item.name)">
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, ref, computed, watch, onMounted, PropType } from 'vue'
export default {
  name: 'openedPageTags',
  props: {
    pageTagsList: { // 标签数据列表
      type: Array as PropType<any>
    }
  },
  setup (props) {
    const proxy: any = getCurrentInstance()!.proxy
    let tabVal = ref('')
    tabVal.value = proxy.$store.state.currentPageName
    let tagContextmenuShow = ref(false) // 是否显示右键菜单
    let axios = ref({ x: 0, y: 0 }) // 右键菜单位置
    let tagConLeft = ref(0) // 滚动区域左侧距离
    let refsTag = ref([]) // 标签DOM
    const currentPageName = computed(() => { // 当前页面名
      tabVal.value = proxy.$store.state.currentPageName
      return proxy.$store.state.currentPageName
    })
    const contextMenuList = computed(() => proxy.$store.state.contextMenuList)
    /**
    * @desc 关闭标签
    * @param {String} name 要关闭的标签名
    */
    function closeTag (name: string) {
      let pageOpenedList = proxy.$store.state.pageOpenedList
      let lastPageObj = pageOpenedList[0]
      if (currentPageName.value === name) {
        let len = pageOpenedList.length
        let i = pageOpenedList.findIndex((element: any) => (element.url === name))
        lastPageObj = i < (len - 1) ? pageOpenedList[i + 1] : pageOpenedList[i - 1]
      }
      proxy.$store.commit('removeTag', name)
      proxy.$store.commit('closePage', name)
      pageOpenedList = proxy.$store.state.pageOpenedList
      sessionStorage.pageOpenedList = JSON.stringify(pageOpenedList)
      if (currentPageName.value === name) {
        linkTo(lastPageObj.url)
      }
    }
    /**
    * @desc 跳转页面
    * @param {String} obj 跳转的标签名
    */
    function linkTo (name: string) {
      let item: any = props.pageTagsList.find((ele: any) => ele.url === name)
      routerLinkTo(item)
      proxy.$emit('clickTag', item)
    }
    function routerLinkTo (obj: any) {
      proxy.$router.push({
        path: obj.url
      })
      proxy.$store.commit('setCurrentPageName', obj.url)
      proxy.$store.commit('setCurrentPage', obj)
    }
    /**
    * @desc 打开右键菜单
    * @param {Object} item 要打开右键菜单的标签
    * @param {Object} event 事件
    */
    function showTagMenu (item: any, event: any) {
      event.preventDefault()
      let x: number = event.clientX - 2
      let y: number = event.clientY - 2
      proxy.$store.commit('setContextMenuOpenedTag', item.url)
      tagContextmenuShow.value = true
      axios.value.x = x
      axios.value.y = y
    }
    /**
    * @desc 点击右键菜单
    * @param {String} name 点击的右键菜单名
    */
    function contextMenuClick (name: string) {
      if (name === 'close' && proxy.$store.state.contextMenuOpenedTag !== '/home') {
        let pageOpenedList = proxy.$store.state.pageOpenedList
        let lastPageObj = pageOpenedList[0]
        if (currentPageName.value === proxy.$store.state.contextMenuOpenedTag) {
          let len = pageOpenedList.length
          let i = pageOpenedList.findIndex((element: any) => (element.url === proxy.$store.state.contextMenuOpenedTag))
          lastPageObj = i < (len - 1) ? pageOpenedList[i + 1] : pageOpenedList[i - 1]
        }
        proxy.$store.commit('closeCurrentTag')
        if (currentPageName.value === proxy.$store.state.contextMenuOpenedTag) {
          routerLinkTo(lastPageObj)
        }
      } else if (name === 'closeOther') {
        proxy.$store.commit('closeOtherTag')
        routerLinkTo(proxy.$store.state.pageOpenedList[proxy.$store.state.pageOpenedList.length - 1])
      } else if (name === 'closeAll') {
        proxy.$store.commit('closeAllTag')
        routerLinkTo({ url: '/home', text: '首页' })
      }
      contextMenuClose()
    }
    /**
    * @desc 关闭右键菜单
    */
    function contextMenuClose () {
      tagContextmenuShow.value = false
    }
    watch(() => '$route', (to: any) => {
      proxy.$store.commit('setCurrentPageName', to.path)
    })
    onMounted(() => {
      refsTag.value = proxy.$refs.tagsPageOpened
    })
    return { tabVal, tagContextmenuShow, axios, currentPageName, contextMenuList, closeTag, linkTo, showTagMenu, contextMenuClick, contextMenuClose }
  }
}
</script>
<style lang="scss" scoped>
.tab-con {
  padding-top: 4px;
  .n-tabs .n-tab-pane {
    padding: 0;
  }
  ::v-deep .n-tabs {
    border: 0;
    margin: 0;
    .el-tabs__nav {
      border: 0;
    }
    .n-tabs-tab-pad {
      width: 0;
    }
    .n-tabs-tab-wrapper {
      margin-top: 6px;
      margin-right: -18px;
    }
    .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab {
      height: 40px;
      padding: 0 30px 0 30px !important;
      line-height: 40px;
      text-align: center;
      border: 0;
      color: #515a6e;
      background-color: #fff;
      transition: padding .3s cubic-bezier(.645,.045,.355,1) !important;
      .n-tabs-tab__close {
        width: 0;
        overflow: hidden;
        transition: all .3s;
      }
      .n-base-icon {
        width: 0;
        overflow: hidden;
        transition: all .3s;
      }
    }
    .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {
      padding: 0 30px 0 30px !important;
      -webkit-mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size:100% 100%;
      mask-size:100% 100%;
      color: #1890ff !important;
      background: #e8f4ff !important;
      outline:none;
      z-index: 5;
      .n-tabs-tab__close {
        width: 14px;
        color: #1890ff;
      }
      .n-base-icon {
        width: 14px;
      }
    }
    .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab:hover {
      padding: 0 30px 0 30px !important;
      background-color: #DEE1E6;
      -webkit-mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size:100% 100%;
      mask-size:100% 100%;
      z-index: 2;
      .n-tabs-tab__close {
        width: 14px;
      }
      .n-base-icon {
        width: 14px;
      }
    }
  }
}
.contextmenu-con{
  position: fixed;
  z-index: 100;
  background-color: #ffffff;
  padding: 5px 0;
  li{
    padding: 5px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover{
      background-color: #eeeeee;
    }
  }
}

</style>
