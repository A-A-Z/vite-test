import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deleteClose, deleteError } from '../../redux/peopleSlice'
import { addNotice } from '../../redux/noticesSlice'
import { Person, PersonFormData } from '../../global/types'
import { fakeApiCall } from '../../utils/api'

type PeopleResponse = {
  info: object
  results: Person[]
}

const SEED = 'wilsonvitedemo22'
const USE_SEED = true

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
        await fakeApiCall(2)
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
    }),
    editPerson: build.mutation<string, PersonFormData>({
      async queryFn (formData) {
        console.log('Saving: ', formData)
        await fakeApiCall(2)
        return { data: 'success' }
      },
      invalidatesTags: ['People'],
      async onQueryStarted (formData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(addNotice({ title: 'Save Successful', body: 'Successfully saved changes to person.', type: 'success' }))
        } catch (err) {
          dispatch(addNotice({ title: 'Failed to save', body: 'Something went wrong, try again later.', type: 'warning' }))
        }
      }
    })
  })
})

export const {
  useGetPeopleQuery,
  useDeletePeopleMutation,
  useEditPersonMutation
} = apiSlice
