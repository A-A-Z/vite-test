// import { useState, useEffect, FormEvent, Dispatch } from 'react'
import { memo, useState, useEffect, FormEvent } from 'react'
import { useGetSearchQuery, DivisionDataObject } from '../../features/divisions/divisionsSlice'
import { CrumbListingProps } from './types'
import { CrumbResults } from './crumbResults'
// import { DIVISION_ORDER } from '../../global/constants'
// import { useDebounce } from '../../hooks/useDebounce'

const validSearchInput = (input: unknown, validLength = 3): boolean => typeof input === 'string' && input.length > validLength

// for debouncing the search input
let fuse: NodeJS.Timeout | undefined

interface CrumbSearchFieldProps {
  setDebouncedValue: (value: string) => void
}

const CrumbSearchField = ({ setDebouncedValue }: CrumbSearchFieldProps) => {
  const [inputValue, setInputValue] = useState('')
  const delay = 500

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setInputValue(value)

    if (fuse !== undefined) {
      clearTimeout(fuse)
    }

    fuse = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
  }

  return <input type="text" value={inputValue} onChange={onChange} />
}
const CrumbSearchFieldMemo = memo(CrumbSearchField)

export const CrumbSearch = ({ level, parentId, selected }: CrumbListingProps) => {
  const [search, setSearch] = useState('')

  const { results, isFetching } = useGetSearchQuery({ level, parentId, search }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      results: Object.values(data?.data || {}) as DivisionDataObject[]
    }),
    skip: !validSearchInput(search)
  })

  // useEffect(() => {
  //   console.log('activeLevel', level, DIVISION_ORDER.indexOf(level), activeLevel, DIVISION_ORDER.indexOf(activeLevel))
  // }, [activeLevel])
  useEffect(() => {
    // console.log('activeLevel', level, DIVISION_ORDER.indexOf(level), activeLevel, DIVISION_ORDER.indexOf(activeLevel))
    console.log('selected', selected)
  }, [selected])

  return (
    <div className="crumb-listing">
      Search <CrumbSearchFieldMemo setDebouncedValue={setSearch} />
      <CrumbResults results={results} isLoading={isFetching} isHidden={!validSearchInput(search)} selected={selected} />
    </div>
  )
}

// export const CrumbSearch = ({ level, parentId, selected }: CrumbListingProps) => {
//   // const [searchInput, setSearchInput] = useState('')
//   // const search = useDebounce(searchInput, 1500)
//   // console.log('search', searchInput, search)
//   const { results, isFetching } = useGetSearchQuery({ level, parentId, search }, {
//     selectFromResult: ({ data, ...context }) => ({
//       ...context,
//       results: Object.values(data?.data || {}) as DivisionDataObject[]
//     }),
//     skip: validSearchInput(search)
//   })

//   useEffect(() => {
//     console.log('selected', selected?.level)
//   }, [selected])

//   return (
//     <div className="crumb-listing">
//       Search <CrumbSearchField />
//       <CrumbResults results={results} isLoading={isFetching} isHidden={false} selected={selected?.id} />
//     </div>
//   )
// }
// Search <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
// <CrumbResults results={results} isLoading={isFetching} isHidden={!validSearchInput(searchInput)} selected={selected?.id} />
