import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { AppDispatch } from '../../redux/store'
import { setCrumbs } from '../../redux/breadcrumbsSlice'
import { DivisionDataObject } from '../../features/divisions/divisionsSlice'
import { Divsion, DivisionLevels } from '../../global/types'

const formatDivisionAncestor = (data: DivisionDataObject, level: DivisionLevels): Divsion | undefined => {
  const ancestor = data.ancestor[level]

  if (ancestor.id === '') {
    return undefined
  }

  return { ...ancestor, level: data.level, breadcrumb: data.breadcrumb } as Divsion
}

interface CrumbResultsProps {
  results: DivisionDataObject[]
  isLoading: boolean
  selected: number | undefined
  isHidden?: boolean
}

export const CrumbResults = ({ results, isLoading, selected, isHidden = false }: CrumbResultsProps) => {
  const dispatch = useDispatch<AppDispatch>()

  if (isHidden) {
    return null
  }

  if (isLoading) {
    return <div className="crumb-listing__loading">Loading</div>
  }

  return <ul className="crumb-listing__results">
    {results.map(division => {
      const onClick = () => {
        dispatch(setCrumbs({
          root: formatDivisionAncestor(division, 'root'),
          state: formatDivisionAncestor(division, 'state'),
          client: formatDivisionAncestor(division, 'client'),
          location: formatDivisionAncestor(division, 'location'),
          activeLevel: division.level
        }))
      }
      return <li
        key={division.id}
        className={classNames('crumb-listing__result', { 'crumb-listing__result--selected': (division.id === selected) })}
        onClick={onClick}>
          <div className="crumb-listing__name">{division.name}</div>
          <div className="crumb-listing__breadcrumb">{division.breadcrumb}</div>
        </li>
    })}
  </ul>
}
