import * as React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { Grid } from './grid'
import { Person } from '../global/types'

const columnHelper = createColumnHelper<Person>()

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => {
            const { value } = info.getValue()
            return value || '-----'
        },
        enableSorting: false
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
