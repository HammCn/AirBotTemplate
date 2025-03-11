import { EntityApi, type Entity } from '@/common/base/entity'
import { tableColumn } from '@/common/types/table'
import { Http } from '@/common/utils/http'

/**
 * # 用户
 */
export type User = Entity & {
  /**
   * # 邮箱
   */
  email: string
  /**
   * # 昵称
   */
  nickname: string
  /**
   * # 手机号
   */
  phone: string
}

/**
 * # 用户列
 */
export const userTableColumn = tableColumn<User>({
  nickname: {
    label: '昵称'
  },
  email: {
    label: '邮箱',
    width: 100
  },
  phone: {
    label: '手机号',
    align: 'center'
  }
})

/**
 * # 用户 API
 */
export function UserApi() {
  const url = 'user/'

  const entityApi = EntityApi<User>(url)

  return {
    ...entityApi,
    async login(user: Partial<User>): Promise<string> {
      return await Http<string>(url + 'login').post(user)
    }
  }
}
