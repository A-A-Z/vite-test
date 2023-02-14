import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useNavKey, keyAction } from 'hooks/useNavKey'
import type { Divsion, DivisionLevels, DivisionDataObject } from 'features/divisions'
import { setCrumbs } from '../breadcrumbsSlice'
import { useBreadcrumb } from '../hooks/useBreadcrumb'
import { CrumbResultsItem } from './crumbResultsItem'

const formatDivisionAncestor = (data: DivisionDataObject, level: DivisionLevels): Divsion | undefined => {
  const { ancestor, breadcrumb } = data
  const levelAncestor = ancestor[level]

  if (levelAncestor === undefined || levelAncestor.id === '') {
    return undefined
  }

  return { ...levelAncestor, level, breadcrumb } as Divsion
}

interface CrumbResultsProps {
  results: DivisionDataObject[]
  isLoading: boolean
  isHidden?: boolean
}

export const CrumbResults = ({ results, isLoading, isHidden = false }: CrumbResultsProps) => {
  const dispatch = useAppDispatch()
  const [focusIndex, setFocusIndex] = useState(-1)
  const { selectedId, wrapperRef, level } = useBreadcrumb()

  const setDivision = useCallback((division: DivisionDataObject) => {
    dispatch(setCrumbs({
      root: formatDivisionAncestor(division, 'root'),
      state: formatDivisionAncestor(division, 'state'),
      client: formatDivisionAncestor(division, 'client'),
      location: formatDivisionAncestor(division, 'location'),
      activeLevel: level
    }))
  }, [])

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

  const actions: keyAction = useMemo(() => (
    isHidden
      ? {}
      : {
          ArrowUp: focusUp,
          ArrowDown: focusDown,
          Enter: onEnter
        }
  ), [isLoading, isHidden, focusIndex])
  useNavKey<HTMLDivElement>(wrapperRef, actions)

  // reset the focusIndex when the results change or hidden
  useEffect(() => {
    setFocusIndex(-1)
  }, [isLoading, isHidden])

  if (isHidden) {
    return null
  }

  if (isLoading) {
    return <div className="crumb-listing__loading">Loading</div>
  }

  return <ul className="crumb-listing__results">
    {results.map((division, currentIndex) =>
      <CrumbResultsItem
        key={division.id}
        division={division}
        selectedId={selectedId}
        isFocused={currentIndex === focusIndex}
        setDivision={setDivision}
      />
    )}
  </ul>
}
