import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index'
// import naive from './naive'
import naive from 'naive-ui'
import Message from '@/plug-in/message'
import Loading from '@/plug-in/loading'
import VueKonva from 'vue-konva'
import moment from 'moment'
const app = createApp(App)
app.config.globalProperties.$api = api
app.config.globalProperties.$moment=moment
app.use(store).use(router).use(naive).use(Message).use(Loading).use(VueKonva).mount('#app')