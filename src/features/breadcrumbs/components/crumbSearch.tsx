import { memo, useState, useLayoutEffect } from 'react'
import { useGetSearchQuery, DivisionDataObject } from 'features/divisions'
import type { CrumbListingProps } from '../types'
import { CrumbResults } from './crumbResults'
import { CrumbSearchField } from './crumbSearchField'
import { useBreadcrumb } from '../hooks/useBreadcrumb'
import { isSearchValid } from '../utils/search'

const CrumbSearchFieldMemo = memo(CrumbSearchField)

const recentlyViewedResults: DivisionDataObject[] = [
  {
    id: 52080,
    name: 'Something Something',
    level: 'client',
    breadcrumb: 'Wilson > NSW > _TD Wilson Parking',
    status: 'active',
    ancestor: {
      location: {
        id: '',
        name: '',
        entityCode: '',
        startDate: null,
        endDate: null
      },
      client: {
        id: 52080,
        name: 'Something Something',
        entityCode: 'Wilsonparking2',
        startDate: null,
        endDate: null
      },
      state: {
        id: 68,
        name: 'NSW'
      },
      root: {
        id: 1,
        name: 'Wilson'
      }
    },
    address: {
      state: 'NSW'
    },
    geo: {
      longitude: 0,
      latitude: 0
    },
    date: {
      start: null,
      end: null
    }
  },
  {
    id: 52081,
    name: '_TD Wilson Parking',
    level: 'client',
    breadcrumb: 'Wilson > NSW > _TD Wilson Parking',
    status: 'active',
    ancestor: {
      location: {
        id: '',
        name: '',
        entityCode: '',
        startDate: null,
        endDate: null
      },
      client: {
        id: 52080,
        name: '_TD Wilson Parking',
        entityCode: 'Wilsonparking2',
        startDate: null,
        endDate: null
      },
      state: {
        id: 68,
        name: 'NSW'
      },
      root: {
        id: 1,
        name: 'Wilson'
      }
    },
    address: {
      state: 'NSW'
    },
    geo: {
      longitude: 0,
      latitude: 0
    },
    date: {
      start: null,
      end: null
    }
  }
]

export const CrumbSearch = ({ isOpen }: CrumbListingProps) => {
  const [search, setSearch] = useState('')
  const { level, parentId } = useBreadcrumb()
  const isResultsHidden = !isSearchValid(search)

  const { results, isFetching } = useGetSearchQuery({ level, parentId, search }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    }),
    skip: isResultsHidden
  })

  useLayoutEffect(() => {
    setSearch('')
  }, [isOpen])

  const isRecentHidden = isFetching || !isResultsHidden || recentlyViewedResults.length === 0

  if (!isOpen) {
    return null
  }

  return (
    <div className="crumb-listing crumb-listing--search">
      <CrumbSearchFieldMemo setDebouncedValue={setSearch} />
      <CrumbResults results={results} isLoading={isFetching} isHidden={isResultsHidden} />
      {!isRecentHidden && <h3 className="crumb-listing__recent_title">Recently Viewed</h3>}
      <CrumbResults results={recentlyViewedResults} isLoading={false} isHidden={isRecentHidden} />
    </div>
  )
}
