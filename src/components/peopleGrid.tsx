import React, { useMemo } from 'react'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { Grid, ColumnDate, ColumnSelect, HeaderSelect } from './grid'
import { Person } from '../global/types'
import { STATE_OPTIONS } from '../global/constants'
import { RowAction } from './rowAction'
import { openActionModal } from '../redux/peopleSlice'

const columnHelper = createColumnHelper<Person>()

const getColumns = (dispatch: Dispatch<AnyAction>) => [
  columnHelper.display({
    id: 'select',
    header: info => HeaderSelect<Person>(info),
    cell: info => ColumnSelect<Person>(info, {
      isHidden: ({ location }) => location.state === 'Victoria'
    })
  }),
  columnHelper.accessor(({ id }) => id.value as unknown, {
    header: 'ID',
    cell: info => {
      const personId = info.getValue()
      return typeof personId === 'string' ? <Link to={`person/${personId}`}>{personId}</Link> : '-----'
    },
    enableSorting: false,
    size: 90
  }),
  columnHelper.accessor(({ name: { first, last } }) => `${first} ${last}` as unknown, {
    header: 'Full Name'
  }),
  columnHelper.accessor(({ email }) => email as unknown, {
    header: 'Email'
  }),
  columnHelper.accessor(({ dob }) => dob.date as unknown, {
    header: 'DoB',
    cell: info => ColumnDate<Person>(info),
    enableColumnFilter: false,
    size: 80
  }),
  columnHelper.accessor(({ location }) => location.state as unknown, {
    header: 'State',
    size: 260,
    meta: {
      filterType: 'select',
      selectOptions: STATE_OPTIONS
    }
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <RowAction name="Action" row={row} onClickFn={(thisRow: Row<Person>) => {
      dispatch(openActionModal(thisRow.original.id.value))
    }} />
  })
]

const toolbarItems = [
  {
    id: 'delete',
    label: 'Delete Selected',
    icon: 'X',
    minSelected: 1,
    onClick: (selectedItems: object) => { console.log('Delete these:', selectedItems) }
  },
  {
    id: 'update',
    label: 'Update Selected',
    icon: 'X',
    minSelected: 1,
    onClick: (selectedItems: object) => { console.log('Update these:', selectedItems) }
  }
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
  const toolbar = useMemo(() => toolbarItems, [])

  return <Grid<Person, unknown>
    columns={columns}
    data={people?.results || []}
    isLoading={isLoading}
    isSuccess={isSuccess}
    isError={isError}
    toolbar={toolbar}
  />
}
