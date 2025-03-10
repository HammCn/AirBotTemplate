import { ElTableColumn } from 'element-plus';

type TableColumn = Omit<Partial<typeof ElTableColumn>, "filters">

/**
 * # 表格列配置
 */
export type TableColumnConfig<T> = {
  [K in keyof Partial<T>]: TableColumn
}

/**
 * # Element Plus 表格列配置
 * @param columns 表格列配置
 * @returns 表格列配置数组
 */
export function tableColumn<T>(columns: TableColumnConfig<T>): TableColumn[] {
  const arr: TableColumn[] = []
  const keys: [keyof T] = Object.keys(columns) as [keyof T]

  for (const key of keys) {
    const column = columns[key]
    arr.push({
      prop: key,
      ...column
    })
  }
  return arr
}