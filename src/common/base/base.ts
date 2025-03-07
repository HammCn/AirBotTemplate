import type { PageRequest } from "../page/page.request"
import type { PageResponse } from "../page/page.response"
import type { Request } from "../request"
import { Http } from "../utils/http"

export interface Base {
  id: number
  isDisabled: boolean
  createTime: number
  updateTime: number
}
export function BaseApi<T extends Base>(url: string) {
  const baseUrl = `${url}/`

  return {
    async get(id: number): Promise<T> {
      return await Http<T>(baseUrl + 'getDetail').post({ id })
    },
    async del(id: number): Promise<void> {
      await Http<void>(baseUrl + 'delete').post({ id })
    },
    async list(request: Partial<Request<T>> = {}): Promise<T[]> {
      return await Http<T[]>(baseUrl + 'getList').post(request)
    },
    async page(request: Partial<PageRequest<T>> = {}): Promise<PageResponse<T>> {
      return await Http<PageResponse<T>>(baseUrl + 'getPage').post(request)
    },
    async add(item: T): Promise<number> {
      const saved = await Http<T>(baseUrl + 'add').post(item)
      return saved.id
    },
    async update(item: T): Promise<void> {
      await Http<void>(baseUrl + 'update').post(item)
    },
    async disable(id: number): Promise<void> {
      await Http<void>(baseUrl + 'disable').post({ id })
    },
    async enable(id: number): Promise<void> {
      await Http<void>(baseUrl + 'enable').post({ id })
    },
  }
}