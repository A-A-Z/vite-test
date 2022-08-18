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
        isSuccess,
        isError
    } = useGetPeopleQuery()

    //let person: Person | undefined

    useEffect(() => {
        if (id !== undefined && people !== undefined) {
            let search = people.results.find(person => person.id.value === id)
            console.log('find', search, id)
            setPerson(search)
        }
    }, [id, people])

    console.log('person', person)

    if (id === undefined || person === undefined) {
        return <div>No Data</div>
    }

    //console.log('people', people)
    //const person = people.find(person => person.id.value === id)

    return (
        <div className="page">
            <Link to="/">Back</Link>

            <p>Detail page here</p>

            <PersonForm id={id} initData={person} />

        </div>
    )
}

export default PersonDetail
