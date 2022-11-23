import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deleteClose, deleteError } from '../../redux/peopleSlice'
import { addNotice } from '../../redux/noticesSlice'
import { Person } from '../../global/types'

type PeopleResponse = {
  info: object
  results: Person[]
}

const SEED = 'wilsonvitedemo22'
const USE_SEED = true

const fakeDeleteRequest = () => new Promise(resolve => setTimeout(resolve, 2000))

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/api/' }),
  tagTypes: ['People'],
  endpoints: (build) => ({
    getPeople: build.query<PeopleResponse, void>({
      query: () => USE_SEED ? `?results=20&nat=au&seed=${SEED}` : '?results=20&nat=au',
      providesTags: ['People']
    }),
    deletePeople: build.mutation<string, string[]>({
      async queryFn (ids) {
        console.log('Deleting: ', ids)
        await fakeDeleteRequest()
        return { data: 'success' }
      },
      invalidatesTags: ['People'],
      async onQueryStarted (ids, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(deleteClose())
          dispatch(addNotice({ title: 'Delete Successful', body: `Successfully deleted ${ids.length} ${ids.length === 1 ? 'person' : 'people'}.`, type: 'success' }))
        } catch (err) {
          dispatch(deleteError())
        }
      }
    })
  })
})

export const {
  useGetPeopleQuery,
  useDeletePeopleMutation
} = apiSlice
