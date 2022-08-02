import * as React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Invoice, StatusEnum, CycleEnum } from '../global/types'
import { Grid } from './grid'

const defaultData: Invoice[] = [
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

const columnHelper = createColumnHelper<Invoice>()

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

export const InvoiceTable = () => Grid(columns, defaultData)
