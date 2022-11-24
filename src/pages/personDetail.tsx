import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { PersonForm } from '../components/personForm'
import { Loader } from '../components/loader'

const PersonDetail = () => {
  const { id } = useParams()
  const { person, isLoading, isError } = useGetPeopleQuery(undefined, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      person: data?.results.find(person => person.id.value === id)
    })
  })

  if (isLoading) {
    return <Loader label="Loading person" />
  }

  if (isError) {
    return <div>ERROR!</div>
  }

  if (id === undefined || person === undefined) {
    return <div>No Data</div>
  }

  return (
    <div className="page">
      <Link to="/">Back</Link>
      <PersonForm initData={person} />
    </div>
  )
}

export default PersonDetail
