import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface InfoResponse {
  foo: string
  bar: string
}

export const divisionsSlice = createApi({
  reducerPath: 'divisions',
  baseQuery: fetchBaseQuery({ baseUrl: '/mockapi/' }),
  tagTypes: ['divisions'],
  endpoints: (build) => ({
    getInfo: build.query<InfoResponse, void>({
      query: () => 'info/bar',
      providesTags: ['divisions']
    })
  })
})

export const {
  useGetInfoQuery
} = divisionsSlice
