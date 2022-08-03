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
        }
    }),
    columnHelper.accessor('name', {
        header: 'Full Name',
        cell: info => {
            const { first, last, title } = info.getValue()
            return `${title} ${first} ${last}`
        }
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

const Loading = () => <div>Loading...</div>
const Error = () => <div>Error!</div>

export const PeopleGrid = () => {
    const {
        data: people,
        isLoading,
        isSuccess,
        isError
    } = useGetPeopleQuery()

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Error />
    }

    if (isSuccess && people !== undefined) {
        return <Grid columns={columns} data={people.results} />
    }

    return <div>Grid here</div>
}
