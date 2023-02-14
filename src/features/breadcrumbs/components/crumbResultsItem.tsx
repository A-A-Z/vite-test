import { bemNames } from 'lib/className'
import type { DivisionDataObject } from 'features/divisions'

interface CrumbResultsItemProps {
  division: DivisionDataObject
  selectedId: number | undefined
  isFocused: boolean
  setDivision: (division: DivisionDataObject) => void
}

export const CrumbResultsItem = ({ division, selectedId, isFocused, setDivision }: CrumbResultsItemProps) => {
  const { id, name, breadcrumb } = division
  return (
    <li
      key={id}
      className={bemNames('crumb-listing__result', { selected: (id === selectedId), focus: isFocused })}
      onClick={() => { setDivision(division) }}
    >
      <div className="crumb-listing__name">{name}</div>
      <div className="crumb-listing__breadcrumb">{breadcrumb}</div>
    </li>
  )
}
