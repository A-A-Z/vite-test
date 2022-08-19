import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPeopleQuery } from '../features/api/apiSlice'
import { PersonForm } from '../components/personForm'
import { Person } from '../global/types'

const PersonDetail = () => {
    const [person, setPerson] = useState<Person | undefined>(undefined);
    const { id } = useParams()

    const {
        data: people,
        isLoading,
        isError
    } = useGetPeopleQuery()

    useEffect(() => {
        if (id !== undefined && people !== undefined) {
            const search = people.results.find(person => person.id.value === id)
            setPerson(search)
        }
    }, [id, people])

    if (isLoading) {
        return <div>Loading...</div>
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
