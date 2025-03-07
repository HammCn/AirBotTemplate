import type { Base } from "./base/base";
import type { Sort } from "./sort";

export interface Request<T extends Base> {
  filter: T
  sort: Sort
}