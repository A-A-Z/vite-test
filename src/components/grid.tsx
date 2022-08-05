import React from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    Header,
} from '@tanstack/react-table'
import SortingIcon from './sortingIcon'

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
        : <th className="grid__cell-head grid__cell-head--sortable" onClick={column.getToggleSortingHandler()}>
            <div className="grid__cell-head-content">{flexRender(column.columnDef.header, getContext())}<SortingIcon type={column.getIsSorted()} /></div>
        </th>
)

export const Grid = ({ columns, data, isLoading, isSuccess, isError }: GridProps) => {
    const hasResults = data.length > 0

    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className="grid">
            <table className="grid__table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                header.column.getCanSort() 
                                    ? <GridCellHeaderSortable key={header.id} header={header} />
                                    : <GridCellHeader key={header.id} header={header} />
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {isSuccess && hasResults &&
                        table
                            .getRowModel()
                            .rows.map(row => (
                                <tr key={row.id}>
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
