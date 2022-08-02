import * as React from 'react'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'

enum StatusEnum {
    approved,
    draft,
    finalised
}

enum CycleEnum {
    fortnightly = 'FORTNIGHT',
    monthly_advance = 'MONTHLY_ADVANCE',
    monthly_arrears = 'MONTHLY_ARREARS',
    national = 'NATIONAL',
    quarterly = 'QUARTERLY',
    weekly = 'WEEKLY'
}

// const types: Map<ETypeId, string> = new Map( [
//     [ ETypeId.alpha, "Alpha" ],
//     [ ETypeId.beta, "Beta" ],
//  ])

type IInvoice = {
    id: number
    status: StatusEnum
    cycle: CycleEnum
    description: string
    clientId: number
    clientName: string
    divisionId: number
} 

const defaultData: IInvoice[] = [
    {
        id: 1,
        status: StatusEnum.approved,
        cycle: CycleEnum.fortnightly,
        description: 'This is a test',
        clientId: 100,
        clientName: 'Client Test 1',
        divisionId: 10
    },
    {
        id: 2,
        status: StatusEnum.draft,
        cycle: CycleEnum.weekly,
        description: 'This is also a test',
        clientId: 110,
        clientName: 'Client Test 2',
        divisionId: 11
    },
    {
        id: 3,
        status: StatusEnum.finalised,
        cycle: CycleEnum.quarterly,
        description: 'Last test',
        clientId: 120,
        clientName: 'Client Test 3',
        divisionId: 12
    }
]

const columnHelper = createColumnHelper<IInvoice>()

const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.status, {
        id: 'status',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Status</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.cycle, {
        id: 'cycle',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Cycle</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('clientName', {
        id: 'client',
        cell: ({ row: { original } }) => `${original.clientName} (${original.clientId})`,
        header: () => <span>Client</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.divisionId, {
        id: 'divisionId1',
        //cell: info => <i>{info.getValue()}</i>,
        cell: info => {
            //console.log(info.row)
            return info.getValue()
        },
        //header: () => <span>Client</span>,
        footer: info => info.column.id,
    }),
]

export const Table = () => {
    const [data, setData] = React.useState(() => [...defaultData])

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
                        )}
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
        <tfoot>
            {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                <th key={header.id}>
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                        )}
                </th>
                ))}
            </tr>
            ))}
        </tfoot>
      </table>
    )
}
