import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import { router } from './common/config/router'
import { initEvent } from './common/config/event'

initEvent()
createApp(App).use(router).use(ElementPlus).mount('#app')
