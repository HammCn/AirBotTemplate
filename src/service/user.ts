import { EntityApi, type Entity } from '../common/base/entity'
import { Http } from '../common/utils/http'

/**
 * # 用户
 */
export interface User extends Entity {
  /**
   * # 邮箱
   */
  email: string

  /**
   * # 昵称
   */
  nickname: string

  /**
   * # 密码
   */
  password: string
}

/**
 * # 用户API
 */
export function UserApi() {
  const url = 'user/'

  const entityApi = EntityApi<User>(url)

  return {
    ...entityApi,

    /**
     * # 登录
     * @param user 用户
     * @returns AccessToken
     */
    async login(user: Partial<User>): Promise<string> {
      return await Http<string>(url + 'login').post(user)
    }
  }
}
