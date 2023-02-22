import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface InfoResponse {
  foo: string
  bar: string
}

export const divisionsSlice = createApi({
  reducerPath: 'divisions',
  baseQuery: fetchBaseQuery({ baseUrl: '/mockapi/division/' }),
  tagTypes: ['divisions', 'summary'],
  endpoints: (build) => ({
    getInfo: build.query<InfoResponse, void>({ // TODO this is an example, delete later
      query: () => 'info/bar',
      providesTags: ['divisions']
    }),
    getSearch: build.query({
      query: (params) => {
        return {
          url: 'search',
          params
        }
      },
      providesTags: ['divisions']
    }),
    getSummary: build.query({
      query: (divisionId: number) => {
        return {
          url: `${divisionId}/summary`
        }
      },
      providesTags: ['summary']
    })
  })
})

export const {
  useGetInfoQuery,
  useGetSearchQuery,
  useLazyGetSummaryQuery
} = divisionsSlice
