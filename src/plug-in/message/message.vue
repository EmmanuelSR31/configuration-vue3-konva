<template>
  <div>
    <n-modal v-model:show="visible" :title="''" preset="card" class="message-modal" :modal="false" style="width: 400px;" :on-after-leave="beforeClose" destroy-on-close>
      <img :src="imgSrc" :class="{'message-small-img': !['error', 'info'].includes(type)}">
      <span class="message-title" v-html="MessageTitle"></span>
      <div class="modal-btn" v-if="['error', 'info'].includes(type)">
        <n-button type="info" @click="submitBtn">确认</n-button>
        <n-button @click="cancelBtn" v-if="['info'].includes(type)">取消</n-button>
      </div>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue'
import { NButton, NModal } from 'naive-ui'
const props = defineProps({
  type: { // 类型
    type: String,
    default: 'success'
  },
  MessageTitle: { // 文本
    type: String,
    default: ''
  },
  duration: { // 关闭时间
    type: Number,
    default: 2000
  },
  submit: {
    type: Function,
  },
  cancel: {
    type: Function,
  }
})
let visible = ref(true) // 是否显示
let imgSrc = ref('')
/**
* @desc 定时关闭
*/
function setTimer () {
  setTimeout(() => {
    close()
  }, props.duration)
}
/**
* @desc 关闭
*/
function close () {
  visible.value = false
  setTimeout(() => {
    // this.$destroy(true)
    // this.$el.parentNode.parentNode.removeChild(this.$el.parentNode) // 从DOM里将这个组件移除
  }, 500)
}
/**
* @desc 确定按钮方法
*/
function submitBtn () {
  props.submit!()
  close()
}
/**
* @desc 取消按钮方法
*/
function cancelBtn () {
  props.cancel!()
  close()
}
function beforeClose () {
  close()
}
onMounted(() => {
  if (props.type === 'error') {
    imgSrc.value = 'assets/img/errorMessage.png'
  } else if (props.type === 'info') {
    imgSrc.value = 'assets/img/infoMessage.png'
  } else if (props.type === 'login') {
    imgSrc.value = 'assets/img/loginImg.png'
  } else if (props.type === 'success') {
    imgSrc.value = 'assets/img/successMessage.png'
  } else if (props.type === 'warning') {
    imgSrc.value = 'assets/img/warningMessage.png'
  } else if (props.type === 'error1') {
    imgSrc.value = 'assets/img/errorMessage1.png'
  }
  if (props.duration !== 0 && props.type !== 'info' && props.type !== 'error') {
    setTimer() // 挂载的时候就开始计时
  }
})
</script>
<style lang="scss">
.message-modal {
  img{
    display: block;
    width: 1.63rem;
    height: auto;
    margin: .2rem auto;
    &.message-small-img {
      width: auto;
      height: .6rem;
      margin: .5rem auto;
    }
  }
  .message-title{
    display: block;
    text-align: center;
    font-size: 16px;
    line-height: 1.8;
    color: #0b0b0b;
    word-wrap: break-word;
  }
  .modal-btn {
    button {
      &:first-child {
        margin-right: 50px;
      }
    }
  }
}
</style>
