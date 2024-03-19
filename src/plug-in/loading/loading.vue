<template>
  <div class="my-loading-con" v-if="visible">
    <n-spin :show="visible">
      <template #description>{{tip}}</template>
    </n-spin>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { NSpin } from 'naive-ui'
let tip = ref('')
let visible = ref(false) // 是否显示
function show (str: string = '') {
  tip.value = str
  visible.value = true
}
/**
* @desc 关闭
*/
function close () {
  visible.value = false
}
defineExpose({
  tip,
  visible,
  show,
  close
})
</script>
<style lang="scss">
.my-loading-con {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #fff, $alpha: 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
}
</style>
