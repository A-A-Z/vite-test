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
  Header,
  RowData,
  RowModel
} from '@tanstack/react-table'
import classNames from 'classnames'
import { ToolbarButton } from '.'
import { IconKey } from '../icon'
import SortingIcon from '../sortingIcon'
import { Filter } from '../filter'
import { selectOption } from '../../global/types'
import { Loader } from '../loader'

// https://codesandbox.io/s/beautiful-currying-ih7vmi?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.tsx

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'text' | 'select',
    selectOptions: selectOption[]
  }
}

type GridKeys = string | unknown

export interface ToolbarItemProps<T> {
  id: string
  label: string
  icon?: IconKey
  minSelected?: number
  onClick: (selectedItems: RowModel<T>) => void
}
export interface GridProps<T, K> {
  columns: ColumnDef<T, K>[]
  data: T[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  toolbar?: ToolbarItemProps<T>[]
}

interface GridCellHeaderProps<T, K> {
  header: Header<T, K>
}

const GridCellHeader = <T extends object, K extends GridKeys>({ header: { isPlaceholder, column, getContext } }: GridCellHeaderProps<T, K>) => (
  <th className="grid__cell-head">{isPlaceholder ? '&nbsp;' : flexRender(column.columnDef.header, getContext())}</th>
)

const GridCellHeaderSortable = <T extends object, K extends GridKeys>({ header: { isPlaceholder, column, getContext } }: GridCellHeaderProps<T, K>) => (
  isPlaceholder
    ? <th className="grid__cell-head">&nbsp;</th>
    : <th className="grid__cell-head grid__cell-head--sortable">
      <div className="grid__cell-head-content" onClick={column.getToggleSortingHandler()}>{flexRender(column.columnDef.header, getContext())}<SortingIcon type={column.getIsSorted()} /></div>
    </th>
)

const GridCellHeaderFilter = <T extends object, K extends GridKeys>({ header: { isPlaceholder, column } }: GridCellHeaderProps<T, K>) => (
  isPlaceholder
    ? <th className="grid__cell-filter">&nbsp;</th>
    : <th className="grid__cell-filter">
      <Filter
        type={column.columnDef.meta?.filterType}
        options={column.columnDef.meta?.selectOptions}
        onChangeFn={(selectedValue: string | number | undefined) => column.setFilterValue(selectedValue)}
      />
    </th>
)

export interface GridToolbarProps<T> {
  items?: ToolbarItemProps<T>[]
  selected: RowModel<T>
}
const GridToolbar = <T extends object>({ items, selected }: GridToolbarProps<T>) => (
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

export const Grid = <T extends object, K extends GridKeys>({ columns, data, isLoading, isSuccess, isError, toolbar }: GridProps<T, K>) => {
  const hasResults = data.length > 0
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
      {!isLoading &&
        <>
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
                        ? <GridCellHeaderSortable<T, unknown> key={`h1-${header.id}`} header={header} />
                        : <GridCellHeader key={`h1-${header.id}`} header={header} />
                    ))}
                  </tr>
                  <tr>
                    {headerGroup.headers.map(header => (
                      header.column.getCanFilter()
                        ? <GridCellHeaderFilter<T, unknown> key={`h1-${header.id}`} header={header} />
                        : <th key={`h1-${header.id}`}>&nbsp;</th>
                    ))}
                  </tr>
                </Fragment>
              ))}
            </thead>
            <tbody>
              {isSuccess && hasResults &&
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
        </>
      }
      {isSuccess && !hasResults &&
        <div className="grid__msg">No Data</div>
      }
      {isLoading &&
        <div className="grid__msg"><Loader label="Fetching results" /></div>
      }
      {isError &&
        <div className="grid__msg">Error!</div>
      }
    </div>
  )
}
