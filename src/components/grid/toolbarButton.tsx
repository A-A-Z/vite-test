import { RowModel } from '@tanstack/react-table'

export interface ToolbarButtonProps<T> {
  selectedItems: RowModel<T>
}

export const ToolbarButton = <T extends object>({ selectedItems }: ToolbarButtonProps<T>) => {
  const hasSelected = selectedItems.flatRows.length > 0

  const onClick = () => {
    console.log('Selected:', selectedItems.flatRows)
    return true
  }

  return <li><button type="button" disabled={!hasSelected} onClick={onClick}>Delete Selected</button></li>
}
