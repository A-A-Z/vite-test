import * as React from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef
} from '@tanstack/react-table'

interface GridProps {
    columns: ColumnDef<any, any>[]
    data: object[]
}

export const Grid = ({ columns, data }: GridProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                <th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )
                    }
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
      </table>
    )
}
