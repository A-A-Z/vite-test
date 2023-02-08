import { useGetSearchQuery, DivisionDataObject } from 'features/divisions'
import type { CrumbListingProps } from '../types'
import { CrumbResults } from './crumbResults'

export const CrumbSelect = ({ level, parentId, selected, isOpen }: CrumbListingProps) => {
  const { results, isFetching } = useGetSearchQuery({ level, parentId }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    })
  })

  if (!isOpen) {
    return null
  }

  return (
    <div className="crumb-listing crumb-listing--select">
      <CrumbResults results={results} isLoading={isFetching} selected={selected} />
    </div>
  )
}
