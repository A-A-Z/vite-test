import { Fragment, useState, useMemo, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData
} from '@tanstack/react-table'
import classNames from 'classnames'
import { SelectOption } from '../../global/types'
import { Loader } from '../loader'
import { GridKeys, ToolbarItemProps } from './types'
import { GridCellHeader, GridCellHeaderSortable } from './gridCellHeader'
import { GridCellHeaderFilter } from './gridCellHeaderFilter'
import { GridToolbar } from './gridToolbar'

// https://codesandbox.io/s/beautiful-currying-ih7vmi?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.tsx

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'text' | 'select',
    selectOptions: SelectOption[]
  }
}

export interface GridProps<T, K> {
  columns: ColumnDef<T, K>[]
  data: T[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  toolbar?: ToolbarItemProps<T>[]
}

export const Grid = <T extends object, K extends GridKeys>({ columns, data, isLoading, isSuccess, isError, toolbar }: GridProps<T, K>) => {
  const hasResults = data.length > 0
  const isActive = !isLoading && !isError && hasResults
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      size: 0,
      minSize: 0
    }
  })

  const selectedItems = table.getSelectedRowModel()
  const ToolbarMemo = useMemo(() => <GridToolbar<T> items={toolbar} selected={selectedItems} />, [selectedItems, toolbar])

  useEffect(() => {
    if (isLoading === false && Object.values(selectedItems.flatRows).length > 0) {
      // if the table has reloaded then reset selected
      table.resetRowSelection()
    }
  }, [isLoading])

  return (
    <div className="grid">
        {ToolbarMemo}
        <table className="grid__table">
          {table.getHeaderGroups().map(headerGroup => (
            <colgroup key={`colgroup-${headerGroup.id}`}>
              {headerGroup.headers.map(header => (
                <col
                  key={`col-${header.id}`}
                  width={header.getSize() === 0 ? 'auto' : `${header.getSize()}px`}
                />
              ))}
            </colgroup>
          ))}
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Fragment key={headerGroup.id}>
                <tr>
                  {headerGroup.headers.map(header => (
                    header.column.getCanSort()
                      ? <GridCellHeaderSortable<T, unknown> key={`h1-${header.id}`} header={header} isDisabled={!isActive} />
                      : <GridCellHeader key={`h1-${header.id}`} header={header} />
                  ))}
                </tr>
                <tr>
                  {headerGroup.headers.map(header => (
                    header.column.getCanFilter()
                      ? <GridCellHeaderFilter<T, unknown> key={`h1-${header.id}`} header={header} isDisabled={!isActive} />
                      : <th key={`h1-${header.id}`}>&nbsp;</th>
                  ))}
                </tr>
              </Fragment>
            ))}
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={table.getAllColumns().length}><Loader label="Fetching results" /></td></tr>}
            {!isLoading && isSuccess && hasResults &&
              table
                .getRowModel()
                .rows.map(row => (
                  <tr key={row.id} className={classNames('grid__row', { 'grid__row--selected': row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="grid__cell">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      {isSuccess && !hasResults &&
        <div className="grid__msg">No Data</div>
      }
      {isError &&
        <div className="grid__msg">Error!</div>
      }
    </div>
  )
}
