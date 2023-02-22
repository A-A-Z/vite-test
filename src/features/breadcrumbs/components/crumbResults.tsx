import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavKey, keyAction } from 'hooks/useNavKey'
import type { DivisionDataObject } from 'features/divisions'
import { Loader } from 'components/loader'
import { useBreadcrumb } from '../hooks/useBreadcrumb'
import { CrumbResultsItem } from './crumbResultsItem'

interface CrumbResultsProps {
  results: DivisionDataObject[]
  isLoading: boolean
  isHidden?: boolean
}

export const CrumbResults = ({ results, isLoading, isHidden = false }: CrumbResultsProps) => {
  const [focusIndex, setFocusIndex] = useState(-1)
  const { wrapperRef, setDivision } = useBreadcrumb()

  const focusUp = useCallback(() => {
    if (!isLoading && results.length > 0) {
      setFocusIndex(state => state > 0 ? state - 1 : state)
    }
  }, [isLoading])

  const focusDown = useCallback(() => {
    if (!isLoading && results.length > 0) {
      setFocusIndex(state => state < (results.length - 1) ? state + 1 : state)
    }
  }, [isLoading])

  const onEnter = () => {
    if (focusIndex >= 0) {
      setDivision(results[focusIndex])
    }
  }

  const actions: keyAction = useMemo(() => ({
    ArrowUp: focusUp,
    ArrowDown: focusDown,
    Enter: onEnter
  }), [isLoading, isHidden, focusIndex])
  useNavKey<HTMLDivElement>(wrapperRef, actions)

  // reset the focusIndex when the results change or hidden
  useEffect(() => {
    setFocusIndex(-1)
  }, [isLoading, isHidden])

  if (isHidden) {
    return null
  }

  if (isLoading) {
    return <div className="crumb-listing__loading"><Loader size="small" colour="dark" /></div>
  }

  return <ul className="crumb-listing__results">
    {results.map((division, currentIndex) =>
      <CrumbResultsItem
        key={division.id}
        division={division}
        isFocused={currentIndex === focusIndex}
      />
    )}
  </ul>
}
