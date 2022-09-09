import { RowModel } from '@tanstack/react-table'

export interface ToolbarButtonProps<T> {
  selectedItems: RowModel<T>
  label: string
  icon?: string
  minSelected?: number
  onClick: (selectedItems: RowModel<T>) => void
}

export const ToolbarButton = <T extends object>({ selectedItems, label, onClick, minSelected = 0 }: ToolbarButtonProps<T>) => {
  const isDisabled = selectedItems.flatRows.length < minSelected

  const handleClick = () => {
    onClick(selectedItems)
    return true
  }

  // TODO add icon
  return <li><button type="button" className="btn" disabled={isDisabled} onClick={handleClick}>{label}</button></li>
}
