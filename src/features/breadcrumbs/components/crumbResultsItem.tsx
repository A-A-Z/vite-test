import { Fragment } from 'react'
import { bemNames } from 'lib/className'
import type { DivisionDataObject } from 'features/divisions'
import { Icon } from 'components/icon'

interface CrumbResultsItemProps {
  division: DivisionDataObject
  selectedId: number | undefined
  isFocused: boolean
  setDivision: (division: DivisionDataObject) => void
}

export const CrumbResultsItem = ({ division, selectedId, isFocused, setDivision }: CrumbResultsItemProps) => {
  const { id, name, breadcrumb } = division
  const breadcrumbArr = breadcrumb.split(' > ')
  breadcrumbArr.pop()
  const isSelected = id === selectedId
  return (
    <li
      key={id}
      className={bemNames('crumb-listing__result', { selected: isSelected, focus: isFocused })}
      onClick={() => { setDivision(division) }}
    >
      <div className="crumb-listing__name">
        <span title={name}>{name}</span>
        {isSelected && <Icon icon="CheckIcon" />}
      </div>
      <div className="crumb-listing__breadcrumb">
        {breadcrumbArr.map((breadcrumb, index) => (
          <Fragment key={index}>
            {index > 0 && <Icon icon="ChevronRightIcon" />}
            <span className="crumb-listing__breadcrumb-item" title={breadcrumb}>{breadcrumb}</span>
          </Fragment>
        ))}
      </div>
    </li>
  )
}
