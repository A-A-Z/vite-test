import { memo, useState, useLayoutEffect } from 'react'
import { useGetSearchQuery, DivisionDataObject } from 'features/divisions'
import type { CrumbListingProps } from '../types'
import { CrumbResults } from './crumbResults'
import { CrumbSearchField } from './crumbSearchField'
import { useBreadcrumb } from '../hooks/useBreadcrumb'
import { isSearchValid } from '../utils/search'

const CrumbSearchFieldMemo = memo(CrumbSearchField)

export const CrumbSearch = ({ isOpen }: CrumbListingProps) => {
  const [search, setSearch] = useState('')
  const { level, parentId } = useBreadcrumb()

  const { results, isFetching } = useGetSearchQuery({ level, parentId, search }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    }),
    skip: !isSearchValid(search)
  })

  useLayoutEffect(() => {
    setSearch('')
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="crumb-listing crumb-listing--search">
      <CrumbSearchFieldMemo setDebouncedValue={setSearch} />
      <CrumbResults results={results} isLoading={isFetching} isHidden={!isSearchValid(search)} />
    </div>
  )
}
