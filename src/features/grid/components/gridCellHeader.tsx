import {
  flexRender
} from '@tanstack/react-table'
import { GridKeys, GridCellHeaderProps } from '../types'
import SortingIcon from 'components/sortingIcon'

export const GridCellHeader = <T extends object, K extends GridKeys>({ header: { isPlaceholder, column, getContext } }: GridCellHeaderProps<T, K>) => (
  <th className="grid__cell-head">{isPlaceholder ? '&nbsp;' : flexRender(column.columnDef.header, getContext())}</th>
)

export const GridCellHeaderSortable = <T extends object, K extends GridKeys>({ header, isDisabled = false }: GridCellHeaderProps<T, K>) => {
  const { isPlaceholder, column, getContext } = header

  if (isDisabled) {
    return <GridCellHeader header={header} />
  }

  if (isPlaceholder) {
    return <th className="grid__cell-head">&nbsp;</th>
  }

  return (
    <th className="grid__cell-head grid__cell-head--sortable">
      <div className="grid__cell-head-content" onClick={column.getToggleSortingHandler()}>{flexRender(column.columnDef.header, getContext())}<SortingIcon type={column.getIsSorted()} /></div>
    </th>
  )
}
