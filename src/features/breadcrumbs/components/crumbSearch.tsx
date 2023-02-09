import { memo, useState } from 'react'
import { useGetSearchQuery, DivisionDataObject } from 'features/divisions'
import type { CrumbListingProps } from '../types'
import { CrumbResults } from './crumbResults'
import { CrumbSearchField } from './crumbSearchField'

const isSearchValue = (input: unknown, validLength = 3): boolean => typeof input === 'string' && input.length >= validLength

const CrumbSearchFieldMemo = memo(CrumbSearchField)

export const CrumbSearch = ({ level, parentId, selected, isOpen }: CrumbListingProps) => {
  const [search, setSearch] = useState('')

  const { results, isFetching } = useGetSearchQuery({ level, parentId, search }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    }),
    skip: !isSearchValue(search)
  })

  if (!isOpen) {
    return null
  }

  return (
    <div className="crumb-listing">
      <CrumbSearchFieldMemo setDebouncedValue={setSearch} />
      <CrumbResults results={results} isLoading={isFetching} isHidden={!isSearchValue(search)} selected={selected} />
    </div>
  )
}
