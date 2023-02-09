import { memo } from 'react'
import { bemNames } from 'lib/className'
import { useAppDispatch } from 'hooks/useAppDispatch'
import type { Divsion, DivisionLevels, DivisionDataObject } from 'features/divisions'
import { setCrumbs } from '../breadcrumbsSlice'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

const formatDivisionAncestor = (data: DivisionDataObject, level: DivisionLevels): Divsion | undefined => {
  const { ancestor, breadcrumb } = data
  const levelAncestor = ancestor[level]

  if (levelAncestor === undefined || levelAncestor.id === '') {
    return undefined
  }

  return { ...levelAncestor, level, breadcrumb } as Divsion
}

interface CrumbResultsItemProps {
  division: DivisionDataObject
  selectedId: number | undefined
}

const CrumbResultsItem = ({ division, selectedId }: CrumbResultsItemProps) => {
  const dispatch = useAppDispatch()
  const { id, name, level, breadcrumb } = division

  const onClick = () => {
    dispatch(setCrumbs({
      root: formatDivisionAncestor(division, 'root'),
      state: formatDivisionAncestor(division, 'state'),
      client: formatDivisionAncestor(division, 'client'),
      location: formatDivisionAncestor(division, 'location'),
      activeLevel: level
    }))
  }

  return (
    <li
      key={id}
      className={bemNames('crumb-listing__result', { selected: (id === selectedId) })}
      onClick={onClick}
    >
      <div className="crumb-listing__name">{name}</div>
      <div className="crumb-listing__breadcrumb">{breadcrumb}</div>
    </li>
  )
}

const CrumbResultsItemMemo = memo(CrumbResultsItem)

interface CrumbResultsProps {
  results: DivisionDataObject[]
  isLoading: boolean
  isHidden?: boolean
}

export const CrumbResults = ({ results, isLoading, isHidden = false }: CrumbResultsProps) => {
  const { selectedId } = useBreadcrumb()

  if (isHidden) {
    return null
  }

  if (isLoading) {
    return <div className="crumb-listing__loading">Loading</div>
  }

  return <ul className="crumb-listing__results">
    {results.map(division => <CrumbResultsItemMemo key={division.id} division={division} selectedId={selectedId} />)}
  </ul>
}
