import { memo } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { AppDispatch } from '../../redux/store'
import { setCrumbs } from '../../redux/breadcrumbsSlice'
import { DivisionDataObject } from '../../features/divisions/divisionsSlice'
import { Divsion, DivisionLevels } from '../../global/types'

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
  selected: number | undefined
}

const CrumbResultsItem = ({ division, selected }: CrumbResultsItemProps) => {
  const dispatch = useDispatch<AppDispatch>()
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
      className={classNames('crumb-listing__result', { 'crumb-listing__result--selected': (id === selected) })}
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
  selected: number | undefined
  isHidden?: boolean
}

export const CrumbResults = ({ results, isLoading, selected, isHidden = false }: CrumbResultsProps) => {
  if (isHidden) {
    return null
  }

  if (isLoading) {
    return <div className="crumb-listing__loading">Loading</div>
  }

  return <ul className="crumb-listing__results">
    {results.map(division => <CrumbResultsItemMemo key={division.id} division={division} selected={selected} />)}
  </ul>
}
