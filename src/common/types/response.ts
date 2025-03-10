import type { Page } from './page'

/**
 * # 响应体
 */
export type Response<T extends any = any> = {
  /**
   * # 状态码
   */
  code: number

  /**
   * # 消息
   */
  message: string

  /**
   * # 数据
   */
  data: T
}

/**
 * # 分页响应
 */
export type PageResponse<T> = Page & {
  /**
   * # 总数
   */
  total: number

  /**
   * # 数据
   */
  list: T[]
}
