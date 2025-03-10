import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders
} from 'axios'
import type { Response } from '../types/response'
import { EventControl, Events } from './event'

/**
 * # 网络请求状态码
 */
export enum HttpStatus {
  /**
   * # HTTP OK
   */
  OK = 200
}

/**
 * # 服务端返回的状态码
 */
export enum ServiceCode {
  /**
   * # 成功
   */
  SUCCESS = 200,

  /**
   * # 未登录
   */
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
    /**
     * # 重定向登录处理
     */
    redirectToLogin?: () => void
    /**
     * # 业务异常处理
     * @param response Axios响应
     */
    error?: (response: AxiosResponse) => void
    /**
     * # 网络异常处理
     * @param error 网络异常
     */
    networkError?: (error: unknown) => void
    /**
     * # 请求前置拦截器
     * @param config Axios配置
     * @returns Axios配置
     */
    beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
  } = {}
) {
  let config: AxiosRequestConfig = {}
  config.headers = header
  config.baseURL = import.meta.env.VITE_API_URL || '/api/'

  const { redirectToLogin, networkError, error, beforeRequest } = hooks

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
    try {
      const res = await response
      if (res.data.code === ServiceCode.UNAUTHORIZED) {
        if (redirectToLogin) {
          // 如果有传入自定义登录钩子
          redirectToLogin()
        } else {
          // 路由直接处理掉
          EventControl().emit(Events.LOGIN)
        }
        return undefined as T
      }
      if (res.data.code !== ServiceCode.SUCCESS) {
        if (error) {
          error(res)
        } else {
          EventControl().emit(Events.ERROR, res.data.message + "(" + res.data.code + ")", '请求失败')
        }
        return undefined as T
      }
      return res.data.data
    } catch (e) {
      if (networkError) {
        // 如果有异常钩子传入
        networkError(e)
        return undefined as T
      }
      if (e instanceof AxiosError) {
        EventControl().emit(Events.ERROR, e.message, e.code || e.status || "网络错误")
      } else {
        EventControl().emit(Events.ERROR, (e as Record<string, unknown>).message, '发生错误')
      }
      return undefined as T
    }
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
