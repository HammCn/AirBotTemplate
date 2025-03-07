import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { UserApi } from './service/user'

createApp(App).use(ElementPlus).mount('#app')
async function test() {
  const { login} = UserApi()
  const accessToken = await login({
    email: "admin@hamm.cn",
    password: "Aa123456"
  })
  console.log(accessToken);
  
}

test()