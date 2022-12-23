import React, { useMemo } from 'react'
// import { createColumnHelper, RowModel } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/react-table'
// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { AppDispatch } from '../redux/store'
import { useGetPeopleQuery } from '../features/api/apiSlice'
// import { Grid, ColumnDate, ColumnSelect, HeaderSelect, ToolbarItemProps } from './grid'
import { Grid } from './grid'
import { Person } from '../global/types'
// import { STATE_OPTIONS } from '../global/constants'
// import { deleteConfirm } from '../redux/peopleSlice'
// import { addNotice } from '../redux/noticesSlice'

interface Week {
  monday: Person[]
}

const columnHelper = createColumnHelper<Week>()

const getColumns = () => [
  columnHelper.accessor(({ monday }) => monday as unknown, {
    header: 'ID',
    cell: info => {
      console.log(info)
      return 'test'
    },
    enableSorting: false,
    size: 90
  })
]

// const getToolbarItems = (dispatch: AppDispatch): ToolbarItemProps<Person>[] => []

export const WeekGrid = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const {
  //   data: people,
  //   isSuccess,
  //   isError,
  //   isFetching
  // } = useGetPeopleQuery()
  const { week, isFetching, isSuccess, isError } = useGetPeopleQuery(undefined, {
    // selectFromResult: ({ data, ...context }) => ({
    //   ...context,
    //   // person: data?.results.find(person => person.id.value === id)
    //   week: [{ monday: [data.results[0]] }]
    // })
    selectFromResult: ({ data, ...context }) => {
      const monday: Person[] = []
      if (data !== undefined && data.results.length > 0) {
        monday.push(data.results[0])
      }
      return {
        ...context,
        week: [{ monday }]
      }
    }
  })

  const columns = useMemo(() => getColumns(), [])
  // const toolbar = useMemo(() => getToolbarItems(dispatch), [])

  return <Grid<Week, unknown>
    columns={columns}
    data={week || []}
    isLoading={isFetching}
    isSuccess={isSuccess}
    isError={isError}
  />
}
