<template>
<div class="configManage_main">
  <div class="fun-btn">
      <n-button type="primary" @click="add">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>新增
      </n-button>
      <n-button type="primary" @click="changePage(1, pageSize)">
        <template #icon>
          <n-icon size="17">
            <add />
          </n-icon>
        </template>刷新
      </n-button>
    </div>
  <ul class="config-list">
    <li v-for="(item, index) in data" :key="index">
      <div class="config-li-img-con">
        <template v-if="item.coverChart === '' || item.coverChart === undefined || item.coverChart === null">
          <img src="/assets/img/config-temp.png">
        </template>
        <template v-else>
          <img :src="uploadRoot + '/oss/' + item.coverChart">
        </template>
        <div class="config-li-title">{{item.title}}</div>
      </div>
      <div class="config-li-btn">
        <a @click="edit(item)">编辑</a><a @click="view(item)">预览</a><a @click="del(item)">删除</a>
      </div>
      <div v-show="item.publishingLogo === 1" class="config-li-icon">已发布</div>
    </li>
  </ul>
  <div class="clear"></div>
  <div class="page-con">
    <n-pagination :item-count="totalRows" v-model:page="currentPage" v-model:page-size="pageSize" :on-update:page="changePage" show-quick-jumper></n-pagination>
  </div>
  <n-modal :title="title" v-model:show="baseModal" preset="card" style="width: 400px;" :mask-closable="false" :close-on-esc="false">
    <div class="modal-form">
      <n-form ref="formValidate" :model="dataObj" label-placement="left" label-width="80px" require-mark-placement="left">
        <div class="form-title">
          <span>基本信息</span>
        </div>
        <n-form-item label="应用封面">
          <n-upload :action="uploadRoot + '/module/oss/upload'" accept="image/*" :headers="{token: token}" :on-finish="upfileSuccess" :on-error="upfileError" :show-file-list="false" ref="upload">
            <template v-if="dataObj.cover === '' || dataObj.cover === null || dataObj.cover === undefined">
              <img src="/assets/img/config-temp.png">
            </template>
            <template v-else>
              <img :src="uploadRoot + '/oss/' + dataObj.cover">
            </template>
          </n-upload>
        </n-form-item>
        <n-form-item label="应用名称">
          <n-input v-model:value="dataObj.name" placeholder="请输入应用名称"></n-input>
        </n-form-item>
      </n-form>
      <div class="modal-btn">
        <n-button type="primary" @click="addNext()">保存</n-button>
      </div>
    </div>
  </n-modal>
  <div v-show="showCom" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 10;background-color: #fff;">
    <edit-configuration @save-success="saveSuccess" @close="closeModal" ref="editConfiguration"></edit-configuration>
  </div>
</div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import table from '@/page/mixins/table' // 表格列表混入
import editConfiguration from './editConfiguration.vue' // 弹窗组件
import tablePage from '@/page/components/tablePage.vue' // 表格分页组件
import tableSearch from '@/page/components/tableSearch.vue' // 表格搜索组件
import { IInterfaceData } from '@/page/interface/interface'
import { getCurrentInstance, ref, nextTick, h } from 'vue'
import { NImage } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
export default {
  components: { tablePage, tableSearch, editConfiguration, Add },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let { totalRows, data, selectObj, showCom, method, title, comObj } = table()
    let currentPage = ref(1)
    let pageSize = ref(18)
    let dataObj = ref({ name: '', cover: '' }) // 数据对象
    let token = sessionStorage.token
    let baseModal = ref(false)
    /**
    * @desc 改变页码
    */
    function changePage (current: number, pageSize: number) {
      let obj = { page: current, limit: pageSize }
      proxy.$api.post('commonRoot', '/v2/apps/graphics/pageObtainData', obj, (r: IInterfaceData) => {
        if (r.data.status) {
          totalRows.value = r.data.data.total
          data.value = r.data.data.records
        } else {
          proxy.$myMessage.error1(r.data.msg)
        }
      })
    }
    changePage(1, pageSize.value)
    /**
    * @desc 新增
    */
    function add () {
      title.value = '新增组态'
      method.value = 'add'
      dataObj.value = { name: '', cover: '' }
      baseModal.value = true
    }
    /**
    * @desc 上传成功的回调
    * @param {Object} res 返回
    */
    function upfileSuccess (res: any) {
      if (res.code === 0) {
        proxy.$myMessage.success('上传成功')
        dataObj.value.cover = res.data.relativePath
      } else {
        proxy.$myMessage.error1(res.msg)
      }
    }
    function upfileError () {
      proxy.$myMessage.error1('上传失败')
    }
    function addNext () {
      if (util.value.isEmpty(dataObj.value.name)) {
        proxy.$myMessage.error1('请填写应用名称')
      } else {
        method.value = 'add'
        showCom.value = true
        baseModal.value = false
        nextTick(() => proxy.$refs.editConfiguration.init('add', '', dataObj.value))
      }
    }
    /**
    * @desc 修改
    * @param {Object} row 数据对象
    */
    function edit (row: any) {
      title.value = '修改组态'
      method.value = 'edit'
      comObj.value = row
      showCom.value = true
      nextTick(() => proxy.$refs.editConfiguration.init('edit', row.id, {}))
    }
    function saveSuccess (flag: boolean) {
      changePage(1, pageSize.value)
      if (flag) {
        showCom.value = false
      }
    }
    function closeModal () {
      showCom.value = false
    }
    /**
    * @desc 删除
    * @param {Object} row 数据对象
    */
    function del (row: any) {
      proxy.$myMessage({
        type: 'info',
        MessageTitle: '确定删除此数据？',
        submit: () => {
          proxy.$api.post('commonRoot', '/v2/apps/graphics/del?id=' + row.id, { id: row.id }, (r: IInterfaceData) => {
            if (r.data.status) {
              proxy.$myMessage.success('删除成功')
              changePage(1, pageSize.value)
            } else {
              proxy.$myMessage.error1(r.data.msg)
            }
          })
        }
      })
    }
    function view (row: any) {
      let routeUrl = proxy.$router.resolve({
        path: 'viewConfig/' + row.id
      })
      window.open(routeUrl.href)
    }
    return {
      uploadRoot, currentPage, pageSize, dataObj, token, baseModal, changePage, add, upfileSuccess, upfileError, addNext, edit, saveSuccess, closeModal, del, view, totalRows, data, showCom, method, title, comObj
    }
  }
}
</script>
<style lang="scss">
.configManage_main{
  width: 100%;
  height: 100%;
  background: #fff;
  // margin-top: .14rem;
  padding: 20px;
  overflow: hidden;
  .location-con{
    width: 100%;
    height: .6rem;
    .location-con-btn{
      width: 6%;
      height: 100%;
      float: left;
      text-align: left;
      cursor: pointer;
      .ivu-icon{
        font-size: .2rem;
        font-weight: bold;
        margin-right: .10rem;
        margin-bottom: .03rem;
      }
      span{
        font-size: .14rem;
        line-height: .70rem;
      }
    }
  }
}
.configManage_main_modalBtn{
  width: 100%;
  height: .32rem;
  a{
    float: right;
    width: .98rem;
    height: .32rem;
    border-radius: .02rem;
    border: solid .01rem #e7e7e7;
    color: #142334;
    line-height: .32rem;
    text-align: center;
    &:hover{
      color: #fff;
      background-color: #4a73c0;
    }
  }
}
.config-list{
  height: calc(100% - 1.5rem);
  overflow-y: auto;
  li{
    float: left;
    width: 15.66%;
    margin-right: 1%;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
}
@media (max-width: 1600px){
  .config-list li{
    width: 19%;
  }
}
@media (max-width: 1300px){
  .config-list li{
    width: 24%;
  }
}
.config-li-img-con{
  position: relative;
  img{
    width: 100%;
    height: 177px;
  }
}
.config-li-icon{
  position: absolute;
  top: 10px;
  right: -25px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  background-color: #2d8cf0;
  transform: rotate(45deg);
}
.config-li-title{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: .15rem;
  background-color: rgba(0, 0, 0, .68);
}
.config-li-btn{
  padding: 12px 0 0 0;
  background-color: #fff;
  a{
    display: inline-block;
    width: 25%;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: .13rem;
    margin-bottom: 12px;
    border-right: 1px solid #dedede;
    cursor: pointer;
    &:last-child{
      border-right: none;
    }
  }
}
</style>
