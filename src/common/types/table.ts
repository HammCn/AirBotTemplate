/**
 * # 配置项
 */
type TableColumn = {
  /**
   * # 标题
   */
  label: string
  /**
   * # 列宽
   */
  width?: number
  /**
   * # 对齐方式
   */
  align?: 'left' | 'center' | 'right'

  /**
   * # 固定列
   */
  fixed?: 'left' | 'right'
}

/**
 * # 表格列配置
 */
export type TableColumnConfig<T> = {
  [K in keyof Partial<T>]: TableColumn
}

/**
 * # 表格列配置
 * @param columns 表格列配置
 * @returns 表格列配置数组
 */
export function tableColumn<T>(columns: TableColumnConfig<T>): (TableColumn & { prop: string })[] {
  const arr: (TableColumn & { prop: string })[] = []
  const keys: [keyof T] = Object.keys(columns) as [keyof T]

  for (const key of keys) {
    const column = columns[key]
    arr.push({
      prop: key.toString(),
      label: column?.label || key.toString(),
      ...column
    })
  }
  return arr
}
