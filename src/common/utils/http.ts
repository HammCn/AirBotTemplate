import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders
} from 'axios'
import type { Response } from '../model/response'
import { EventControl, Events } from './event'

/**
 * # 网络请求状态码
 */
export enum HttpStatus {
  SUCCESS = 200
}

/**
 * # 服务端返回的状态码
 */
export enum ServiceCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401
}

/**
 * # 发起网络请求
 * @param url URL
 * @param header [可选]请求的Headers
 * @param hooks [可选]请求过程中的钩子函数
 * @returns 请求返回的数据
 */
export function Http<T = unknown>(
  url: string,
  header: RawAxiosRequestHeaders = {},
  hooks: {
    redirectToLogin?: () => void
    errorHandler?: (response: AxiosResponse) => void
    beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
  } = {}
) {
  let config: AxiosRequestConfig = {}
  config.headers = header
  config.baseURL = import.meta.env.API_URL || '/api/'

  const { redirectToLogin, errorHandler, beforeRequest } = hooks

  // 自动给Header塞入身份令牌
  config.headers.Authorization = localStorage.getItem('token') || ''

  // 走请求前置Hook
  if (beforeRequest) {
    config = beforeRequest(config)
  }

  let response: Promise<AxiosResponse<Response<T>>>

  /**
   * # 处理返回结果
   * @param response Axios响应
   * @returns 返回结果
   */
  async function handleResponse(response: Promise<AxiosResponse<Response<T>>>) {
    return new Promise<T>(async (resolve, reject) => {
      const res = await response

      if (res.status !== HttpStatus.SUCCESS) {
        if (errorHandler) {
          errorHandler(res)
        } else {
          EventControl().emit(Events.ERROR, '请求出现异常，请稍后再试', '请求异常')
        }
        reject(res)
        return
      }
      if (res.data.code === ServiceCode.UNAUTHORIZED) {
        if (redirectToLogin) {
          // 如果有传入自定义登录钩子
          redirectToLogin()
        } else {
          // 路由直接处理掉
          EventControl().emit(Events.LOGIN)
        }
        reject('登录信息已过期，请重新登录')
        return
      }
      if (res.data.code !== ServiceCode.SUCCESS) {
        if (errorHandler) {
          errorHandler(res)
        } else {
          EventControl().emit(Events.ERROR, res.data.message, '发生错误')
        }
        reject(res.data)
        return
      }
      resolve(res.data.data)
    })
  }

  /**
   * # 发起POST请求
   * @param data 请求数据
   * @returns 请求结果
   */
  async function post(data?: unknown): Promise<T> {
    response = axios.post(url, data, config)
    return handleResponse(response)
  }

  /**
   * # 发起GET请求
   * @returns 请求结果
   */
  async function get(): Promise<T> {
    response = axios.get(url, config)
    return handleResponse(response)
  }

  return {
    post,
    get
  }
}
