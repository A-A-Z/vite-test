import React, { useMemo } from 'react'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import dayjs from 'dayjs'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { Grid } from './grid'
import { Person } from '../global/types'
import { stateOptions } from '../global/constants'
import { RowAction } from './rowAction'
import { openActionModal } from '../redux/peopleSlice'

const columnHelper = createColumnHelper<Person>()

const getColumns = (dispatch: Dispatch<AnyAction>) => [
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
        cell: ({ row }) => <RowAction name="Action" row={row} onClickFn={(thisRow: Row<Person>) => { dispatch(openActionModal(thisRow.original)) }} />
    }),
]

export const PeopleGrid = () => {
    const dispatch = useDispatch()

    const {
        data: people,
        isLoading,
        isSuccess,
        isError
    } = useGetPeopleQuery()

    const columns = useMemo(() => getColumns(dispatch), [])

    return <Grid 
        columns={columns}
        data={people?.results || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
    />
}
