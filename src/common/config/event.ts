import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { EventControl, Events } from '../utils/event'

export function initEvent() {
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
}
