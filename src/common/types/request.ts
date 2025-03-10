import type { Entity } from '../base/entity'
import type { Page } from './page'
import type { Sort } from './sort'

/**
 * # 请求参数
 */
export type Request<T extends Entity> = {
  /**
   * # 过滤条件
   */
  filter: T

  /**
   * # 排序条件
   */
  sort: Sort
}
/**
 * # 分页请求
 */
export type PageRequest<T extends Entity> = Request<T> & {
  /**
   * # 分页信息
   */
  page: Page
}
