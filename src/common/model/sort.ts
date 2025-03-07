/**
 * # 排序
 */
export interface Sort {
  /**
   * # 排序字段
   */
  field: string

  /**
   * # 排序方向
   */
  direction: 'asc' | 'desc'
}