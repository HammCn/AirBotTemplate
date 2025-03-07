import type { Entity } from '../base/entity'
import type { Page } from './page'
import type { Sort } from './sort'

/**
 * # 请求参数
 */
export interface Request<T extends Entity> {
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
export interface PageRequest<T extends Entity> extends Request<T> {
  /**
   * # 分页信息
   */
  page: Page
}
