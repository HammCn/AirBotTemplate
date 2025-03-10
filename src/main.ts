import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import { router } from './common/config/router'
import { initEvent } from './common/config/event'
import { UserApi } from './service/user'

initEvent()
createApp(App).use(router).use(ElementPlus).mount('#app')

UserApi().login({
  email: 'admin@hamm.cn-',
  password: 'Aa123456'
})