import type { Page } from "./page"

export interface PageResponse<T> extends Page{
  total: number
  list: T[]
}