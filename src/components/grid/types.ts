import { Header, RowModel } from '@tanstack/react-table'
import { IconKey } from '../icon'

export type GridKeys = string | unknown

export interface GridCellHeaderProps<T, K> {
  header: Header<T, K>
  isDisabled?: boolean
}

export interface ToolbarItemProps<T> {
  id: string
  label: string
  icon?: IconKey
  minSelected?: number
  onClick: (selectedItems: RowModel<T>) => void
}
