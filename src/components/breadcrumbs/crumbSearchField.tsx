import { useState, useEffect, useRef, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveDivision } from '../../redux/selectors'

interface CrumbSearchFieldProps {
  setDebouncedValue: (value: string) => void
}

export const CrumbSearchField = ({ setDebouncedValue }: CrumbSearchFieldProps) => {
  const [inputValue, setInputValue] = useState('')
  const { id: activeDivisionId } = useSelector(selectActiveDivision) || { id: 0 }
  const delay = 500
  // for debouncing the search input
  const fuse = useRef<NodeJS.Timeout | undefined>(undefined)

  // debounce input change values
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setInputValue(value)

    if (fuse !== undefined) {
      clearTimeout(fuse.current)
    }

    fuse.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
  }

  // reset field if the active divisin changes
  useEffect(() => {
    setInputValue('')
    setDebouncedValue('')
  }, [activeDivisionId])

  return <input type="text" value={inputValue} onChange={onChange} aria-label="Search" autoFocus />
}
