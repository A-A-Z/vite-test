import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Person } from '../../global/types'

type PeopleResponse = {
    info: object
    results: Person[]
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me' }),
    tagTypes: ['People'],
    endpoints: (builder) => ({
        getPeople: builder.query<PeopleResponse, void>({
            query: () => '/api/?results=20&nat=au',
            providesTags: ['People']
        })
    })
})

export const {
    useGetPeopleQuery
} = apiSlice
