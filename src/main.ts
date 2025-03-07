import { createApp } from 'vue'
import ElementPlus, { ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import { UserApi } from '@/service/user'
import { EventControl, Events } from '@/common/utils/event'
import { useRouter } from 'vue-router'

const event = EventControl()
event.on(Events.LOGIN, () => {
  useRouter()?.replace('/login')
})
event.on(Events.ERROR, (message, title) => {
  ElMessageBox.alert(String(message), String(title || '未知错误'), {
    confirmButtonText: '好的',
    type: 'error'
  })
})
createApp(App).use(ElementPlus).mount('#app')
async function test() {
  const { login } = UserApi()
  const accessToken = await login({
    email: 'admin@hamm.cn',
    password: 'Aa123456'
  })
  console.log(accessToken)
}

test()
