import { RowModel } from '@tanstack/react-table'
import { Icon, IconKey } from '../icon'

export interface ToolbarButtonProps<T> {
  selectedItems: RowModel<T>
  label: string
  icon?: IconKey
  minSelected?: number
  onClick: (selectedItems: RowModel<T>) => void
}

export const ToolbarButton = <T extends object>({ selectedItems, label, icon, onClick, minSelected = 0 }: ToolbarButtonProps<T>) => {
  const isDisabled = selectedItems.flatRows.length < minSelected

  const handleClick = () => {
    onClick(selectedItems)
    return true
  }

  return (
    <li>
      <button type="button" className="btn btn--icon" disabled={isDisabled} onClick={handleClick}>
        <Icon icon={icon}>{label}</Icon>
      </button>
    </li>
  )
}
