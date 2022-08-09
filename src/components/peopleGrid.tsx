import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { Grid } from './grid'
import { Person } from '../global/types'
import { stateOptions } from '../global/constants'
import { RowAction } from './rowAction'

const columnHelper = createColumnHelper<Person>()

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => {
            const { value } = info.getValue()
            return value || '-----'
        },
        enableSorting: false,
        size: 90,
    }),
    columnHelper.accessor(({ name: { first, last} }) => `${first} ${last}`, {
        header: 'Full Name',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('dob', {
        header: 'DoB',
        cell: info => {
            const { date } = info.getValue()
            return dayjs(date).format('DD/MM/YYYY')
        },
        enableColumnFilter: false,
        size: 80,
    }),
    columnHelper.accessor(({ location }) => location.state, {
        header: 'State',
        cell: info => info.getValue(),
        size: 260,
        meta: {
            filterType: 'select',
            selectOptions: stateOptions
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => {
            return <RowAction name="Action" onClickFn={(event) => { console.log('click', event) }} />
        }
    }),
]

export const PeopleGrid = () => {
    const {
        data: people,
        isLoading,
        isSuccess,
        isError
    } = useGetPeopleQuery()

    return <Grid 
        columns={columns}
        data={people?.results || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
    />
}
