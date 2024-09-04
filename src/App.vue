<template>
  <div class="app-main">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
      <n-notification-provider>
        <router-view></router-view>
      </n-notification-provider>
    </n-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider, GlobalThemeOverrides, NNotificationProvider } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1890ff',
    primaryColorHover: '#46a6ff',
    primaryColorPressed: '#46a6ff'
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app, .app-main{
  width: 100%;
  height: 100%;
}
</style>
