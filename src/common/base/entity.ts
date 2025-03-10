import type { PageRequest, Request } from '../types/request'
import type { PageResponse } from '../types/response'
import { Http } from '../utils/http'

/**
 * # 实体基础
 */
export type Entity = {
  /**
   * # ID
   */
  id: number

  /**
   * # 是否禁用
   */
  isDisabled: boolean

  /**
   * # 创建时间
   */
  createTime: number

  /**
   * # 更新时间
   */
  updateTime: number
}

/**
 * # 实体基础 API
 * @param url 接口地址
 */
export function EntityApi<T extends Entity>(url: string) {
  const entityUrl = `${url}/`

  return {
    /**
     * # 获取详情
     * @param id ID
     * @returns 详情
     */
    async get(id: number): Promise<T> {
      return await Http<T>(entityUrl + 'getDetail').post({ id })
    },

    /**
     * # 删除
     * @param id ID
     */
    async del(id: number): Promise<void> {
      await Http<void>(entityUrl + 'delete').post({ id })
    },

    /**
     * # 列表
     * @param request 请求
     * @returns 列表
     */
    async list(request: Partial<Request<T>> = {}): Promise<T[]> {
      return await Http<T[]>(entityUrl + 'getList').post(request)
    },

    /**
     * # 分页
     * @param request 请求
     * @returns 分页
     */
    async page(request: Partial<PageRequest<T>> = {}): Promise<PageResponse<T>> {
      return await Http<PageResponse<T>>(entityUrl + 'getPage').post(request)
    },

    /**
     * # 添加
     * @param item 实体
     * @returns ID
     */
    async add(item: T): Promise<number> {
      const saved = await Http<T>(entityUrl + 'add').post(item)
      return saved.id
    },

    /**
     * # 修改
     * @param item 实体
     */
    async update(item: T): Promise<void> {
      await Http<void>(entityUrl + 'update').post(item)
    },

    /**
     * # 禁用
     * @param id ID
     */
    async disable(id: number): Promise<void> {
      await Http<void>(entityUrl + 'disable').post({ id })
    },

    /**
     * # 启用
     * @param id ID
     */
    async enable(id: number): Promise<void> {
      await Http<void>(entityUrl + 'enable').post({ id })
    }
  }
}
