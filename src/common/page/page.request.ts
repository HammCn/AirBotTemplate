import type { Base } from "../base/base"
import type { Request } from "../request"
import type { Page } from "./page"

export interface PageRequest<T extends Base> extends Request<T> {
  page: Page
}