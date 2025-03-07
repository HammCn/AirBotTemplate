import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
import type { Response } from "../response"
import { useRouter } from "vue-router"
import { ElMessageBox } from "element-plus"
export function Http<T = any>(url: string, header: Record<string, string> = {}, hooks: {
  redirectToLogin?: () => void
  errorHandler?: (response: AxiosResponse) => void,
  beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
} = {}) {
  let config: AxiosRequestConfig = {}
  config.headers = header
  config.baseURL = import.meta.env.API_URL || '/api/'

  const { redirectToLogin, errorHandler, beforeRequest } = hooks

  config.headers.Authorization = localStorage.getItem('token') || ''
  if (beforeRequest) {
    config = beforeRequest(config)
  }
  const STATUS = {
    SUCCESS: 200
  }
  const CODE = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
  }

  let response: Promise<AxiosResponse<Response<T>>>;

  function showError(message: string, title = '请求异常') {
    ElMessageBox.alert(message, title, {
      confirmButtonText: '好的',
      type: 'error'
    })
  }

  async function respond<T = any>(response: Promise<AxiosResponse<Response<T>>>) {
    return new Promise<T>(async (resolve, reject) => {
      const res = await response

      if (res.status !== STATUS.SUCCESS) {
        if (errorHandler) {
          errorHandler(res)
        } else {
          showError("请求出现异常，请稍后再试")
        }
        reject(res)
        return
      }
      if (res.data.code === CODE.UNAUTHORIZED) {
        if (redirectToLogin) {
          redirectToLogin()
        } else {
          useRouter().replace("/login")
        }
        reject("登录信息已过期，请重新登录")
        return
      }
      if (res.data.code !== CODE.SUCCESS) {
        if (errorHandler) {
          errorHandler(res)
        } else {
          showError(res.data.message)
        }
        reject(res.data)
        return
      }
      resolve(res.data.data)
    })
  }

  async function post(data?: any): Promise<T> {
    response = axios.post(url, data, config)
    return respond<T>(response)
  }
  async function get(): Promise<T> {
    response = axios.get(url, config)
    return respond<T>(response)
  }

  return {
    post, get
  }
}