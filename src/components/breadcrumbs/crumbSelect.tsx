import { useGetSearchQuery, DivisionDataObject } from '../../features/divisions/divisionsSlice'
import { CrumbListingProps } from './types'
import { CrumbResults } from './crumbResults'

export const CrumbSelect = ({ level, parentId, selected, isActive }: CrumbListingProps) => {
  const { results, isFetching } = useGetSearchQuery({ level, parentId }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    }),
    skip: isActive
  })

  return (
    <div className="crumb-listing crumb-listing--select">
      Select
      <CrumbResults results={results} isLoading={isFetching} selected={selected} />
    </div>
  )
}
