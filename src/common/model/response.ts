import type { Page } from "./page"

/**
 * # 响应体
 */
export interface Response<T extends any = any> {
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
export interface PageResponse<T> extends Page{
  /**
   * # 总数
   */
  total: number

  /**
   * # 数据
   */
  list: T[]
}