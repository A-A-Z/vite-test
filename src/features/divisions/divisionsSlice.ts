import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DivisionLevels } from '../../global/types'

export interface InfoResponse {
  foo: string
  bar: string
}

export interface SearchRequest {
  search: string
  level: DivisionLevels
}

interface AncestorDataObject {
  id: number | ''
  name: string
}

interface AncestorsDataObject {
  root: AncestorDataObject
  state: AncestorDataObject
  client: AncestorDataObject
  location: AncestorDataObject
}

export interface DivisionDataObject {
  id: number
  name: string
  level: DivisionLevels
  breadcrumb: string
  status: string
  ancestor: AncestorsDataObject
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
    // /search?search=vic&parentId=&level=state
    getSearch: build.query({
      // query: () => 'search?search=vic&parentId=&level=state',
      // query: (search: string, level: DivisionLevels, parentId: number) => {
      //   return `search?search=${search}&parentId=${parentId}&level=${level}`
      // },
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
