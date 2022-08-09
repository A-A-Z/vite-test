import React from 'react'
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
} from '@tanstack/react-table'
import SortingIcon from './sortingIcon'
import { Filter } from './filter'
import { selectOption } from '../global/types'

declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterType: 'text' | 'select',
        selectOptions: selectOption[]
    }
  }

interface GridProps {
    columns: ColumnDef<any, any>[]
    data: object[]
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}

interface GridCellHeaderProps {
    header: Header<any, any>
}

const GridCellHeader = ({ header: { isPlaceholder, column, getContext } }: GridCellHeaderProps) => (
    <th className="grid__cell-head">{isPlaceholder ? '&nbsp;' : flexRender(column.columnDef.header, getContext())}</th>
)

const GridCellHeaderSortable = ({ header: { isPlaceholder, column, getContext } }: GridCellHeaderProps) => (
    isPlaceholder 
        ? <th className="grid__cell-head">&nbsp;</th>
        : <th className="grid__cell-head grid__cell-head--sortable">
            <div className="grid__cell-head-content" onClick={column.getToggleSortingHandler()}>{flexRender(column.columnDef.header, getContext())}<SortingIcon type={column.getIsSorted()} /></div>
        </th>
)

const GridCellHeaderFilter = ({ header: { isPlaceholder, column } }: GridCellHeaderProps) => (
    isPlaceholder 
        ? <th className="grid__cell-filter">&nbsp;</th>
        : <th className="grid__cell-filter">
            <Filter 
                type={column.columnDef.meta?.filterType}
                options={column.columnDef.meta?.selectOptions}
                onChangeFn={(value:any) => column.setFilterValue(value)} 
            />
        </th>
)

export const Grid = ({ columns, data, isLoading, isSuccess, isError }: GridProps) => {
    const hasResults = data.length > 0

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        defaultColumn: {
            size: 0,
            minSize: 0,
        }
    })

    return (
        <div className="grid">
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
                        <React.Fragment key={headerGroup.id}>
                            <tr>
                                {headerGroup.headers.map(header => (
                                    header.column.getCanSort() 
                                        ? <GridCellHeaderSortable key={`h1-${header.id}`} header={header} />
                                        : <GridCellHeader key={`h1-${header.id}`} header={header} />
                                ))}
                            </tr>
                            <tr>
                                {headerGroup.headers.map(header => (
                                    header.column.getCanFilter()
                                        ? <GridCellHeaderFilter key={`h1-${header.id}`} header={header} />
                                        : <th key={`h1-${header.id}`}>&nbsp;</th>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </thead>
                <tbody>
                    {isSuccess && hasResults &&
                        table
                            .getRowModel()
                            .rows.map(row => (
                                <tr key={row.id} className="grid__row">
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
            {isLoading &&
                <div className="grid__msg">Loading...</div>
            }
            {isError &&
                <div className="grid__msg">Error!</div>
            }
        </div>
    )
}
