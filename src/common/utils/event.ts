/**
 * # 监听器
 */
export function EventControl() {
  // 定义一个Map保存所有监听器
  const listeners = new Map<Events, Function[]>()

  return {
    /**
     * # 监听事件
     * @param eventName 事件名
     * @param listener 监听器
     */
    on(eventName: Events, listener: (...args: unknown[]) => void) {
      // 获取当前事件名的监听器数组
      const listenerList = listeners.get(eventName) || []
      // 将监听器添加到监听器数组中
      listenerList.push(listener)
    },

    /**
     * # 触发事件
     * @param eventName 事件名
     * @param args 事件参数
     */
    emit(eventName: Events, ...args: unknown[]) {
      // 获取当前事件名的监听器数组
      const listenerList = listeners.get(eventName)
      // 如果监听器数组存在
      if (listenerList) {
        // 遍历监听器数组
        listenerList.forEach((listener) => {
          // 调用监听器
          listener(...args)
        })
      }
    },

    /**
     * # 移除事件
     * @param eventName 事件名
     * @param listener 监听器
     */
    off(eventName: Events, listener: (...args: unknown[]) => void) {
      // 获取当前事件名的监听器数组
      const listenerList = listeners.get(eventName)
      // 如果监听器数组存在
      if (listenerList) {
        // 遍历监听器数组
        listenerList.forEach((l) => {
          // 如果监听器相等
          if (l === listener) {
          }
        })
      }
    }
  }
}

/**
 * # 事件枚举
 */
export enum Events {
  /**
   * # 登录事件
   */
  LOGIN = 'login',

  /**
   * # 错误事件
   */
  ERROR = 'ERROR'
}
