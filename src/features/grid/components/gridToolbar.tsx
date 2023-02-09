import { RowModel } from '@tanstack/react-table'
import { ToolbarItemProps } from '../types'
import { ToolbarButton } from './toolbarButton'

export interface GridToolbarProps<T> {
  items?: ToolbarItemProps<T>[]
  selected: RowModel<T>
}

export const GridToolbar = <T extends object>({ items, selected }: GridToolbarProps<T>) => (
  <>
    {items !== undefined && items.length > 0 &&
        <ul className="grid__toolbar">
          {items.map(({ id, ...toolbarItem }) => (
            <ToolbarButton<T> key={`toolbar-item-${id}`} selectedItems={selected} {...toolbarItem} />
          ))}
        </ul>
      }
  </>
)
