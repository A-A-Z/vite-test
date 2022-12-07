import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { PersonForm } from '../components/personForm'
import { Loader } from '../components/loader'
import { Icon } from '../components/icon'
import { NoticeItem } from '../components/noticeItem'

const PersonDetailBody = () => {
  const { id } = useParams()
  const { person, isLoading, isError, isUninitialized } = useGetPeopleQuery(undefined, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      person: data?.results.find(person => person.id.value === id)
    })
  })

  if (isUninitialized || isLoading) {
    return <Loader label="Loading person" />
  }

  if (isError) {
    return (
        <div className="notice-banner"><NoticeItem title="Error" body="Unabled to fetch person." type="warning" /></div>
    )
  }

  if (id === undefined || person === undefined) {
    return (
        <div className="notice-banner"><NoticeItem title="Person not found" body="Could not find the selected person.  Maybe a bad link?" type="warning" /></div>
    )
  }

  return (
    <PersonForm initData={person} />
  )
}

const PersonDetail = () => (
  <>
    <nav className="page-nav">
      <ul className="page-nav__list">
        <li className="page-nav__item"><Link to="/"><Icon icon={'ResetIcon'}>Back to list</Icon></Link></li>
      </ul>
    </nav>
    <main className="page-main">
      <PersonDetailBody />
    </main>
  </>
)

export default PersonDetail
