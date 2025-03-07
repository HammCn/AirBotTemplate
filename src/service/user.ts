import { BaseApi, type Base } from "../common/base/base";
import { Http } from "../common/utils/http";

export interface User extends Base {
  email: string
  nickname: string
  password: string
}

export function UserApi() {
  const baseUrl = 'user/'

  const baseApi = BaseApi<User>(baseUrl)

  return {
    ...baseApi,
    async login(user: Partial<User>): Promise<string> {
      return await Http<string>(baseUrl + 'login').post(user)
    },
  }
}