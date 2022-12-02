import React, { useMemo } from 'react'
import { createColumnHelper, Row, RowModel } from '@tanstack/react-table'
import { useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../redux/store'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { Grid, ColumnDate, ColumnSelect, HeaderSelect, ToolbarItemProps } from './grid'
import { Person } from '../global/types'
import { STATE_OPTIONS } from '../global/constants'
import { RowAction } from './rowAction'
import { openActionModal, deleteConfirm } from '../redux/peopleSlice'
import { addNotice } from '../redux/noticesSlice'

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

const getToolbarItems = (dispatch: AppDispatch): ToolbarItemProps<Person>[] => [
  {
    id: 'delete',
    label: 'Delete Selected',
    icon: 'TrashIcon',
    minSelected: 1,
    onClick: (selectedItems: RowModel<Person>) => {
      const selectPersons = Object.values(selectedItems.flatRows).map(({ original: person }) => ({
        id: person.id.value || '',
        name: `${person.name.first} ${person.name.last}`
      }))

      dispatch(deleteConfirm(selectPersons))
    }
  },
  {
    id: 'notice',
    label: 'Create Notice',
    icon: 'FilePlusIcon',
    minSelected: 0,
    onClick: () => {
      dispatch(addNotice({ title: 'Test Notice', body: 'This is just a test', type: 'info' }))
    }
  }
]

export const PeopleGrid = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    data: people,
    isSuccess,
    isError,
    isFetching
  } = useGetPeopleQuery()

  const columns = useMemo(() => getColumns(dispatch), [])
  const toolbar = useMemo(() => getToolbarItems(dispatch), [])

  return <Grid<Person, unknown>
    columns={columns}
    data={people?.results || []}
    isLoading={isFetching}
    isSuccess={isSuccess}
    isError={isError}
    toolbar={toolbar}
  />
}
