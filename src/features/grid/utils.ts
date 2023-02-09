import { CellContext, HeaderContext } from '@tanstack/react-table'

// types
type CallbaclFn<T> = (row: T) => boolean
type ConfigObj<T> = {
  isHidden: boolean | CallbaclFn<T>
}
export type CellFunc = <T>(info: CellContext<T, unknown>, config?: ConfigObj<T>) => JSX.Element | string | null
export type HeaderFunc = <T>(info: HeaderContext<T, unknown>) => JSX.Element | string | null
