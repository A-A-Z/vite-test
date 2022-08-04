import React, { useMemo } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    Header
} from '@tanstack/react-table'
import classnames from 'classnames'

interface GridProps {
    columns: ColumnDef<any, any>[]
    data: object[]
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
        : <th 
            className={classnames(
                'grid__cell-head',
                'grid__cell-head--sortable',
                { 
                    'grid__cell-head--no-sort': (column.getIsSorted() === false), 
                    'grid__cell-head--asc': (column.getIsSorted() === 'asc'), 
                    'grid__cell-head--desc': (column.getIsSorted() === 'desc')
                }
            )}
            onClick={column.getToggleSortingHandler()}
        >{flexRender(column.columnDef.header, getContext())}</th>
)

export const Grid = ({ columns, data }: GridProps) => {
    const columnsMemo = useMemo(() => columns, [])
    const dataMemo = useMemo(() => data, [])

    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data: dataMemo,
        columns: columnsMemo,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <table className="grid">
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
            {table
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
    )
}