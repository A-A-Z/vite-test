import { useGetSearchQuery, DivisionDataObject } from 'features/divisions'
import type { CrumbListingProps } from '../types'
import { useBreadcrumb } from '../hooks/useBreadcrumb'
import { CrumbResults } from './crumbResults'

export const CrumbSelect = ({ isOpen }: CrumbListingProps) => {
  const { level, parentId } = useBreadcrumb()
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
      <CrumbResults results={results} isLoading={isFetching} />
    </div>
  )
}
