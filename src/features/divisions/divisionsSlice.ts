import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface InfoResponse {
  foo: string
  bar: string
}

export const divisionsSlice = createApi({
  reducerPath: 'divisions',
  baseQuery: fetchBaseQuery({ baseUrl: '/mockapi/division/' }),
  tagTypes: ['divisions'],
  endpoints: (build) => ({
    getInfo: build.query<InfoResponse, void>({
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
    })
  })
})

export const {
  useGetInfoQuery,
  useGetSearchQuery
} = divisionsSlice
