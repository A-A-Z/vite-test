import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bemNames } from 'lib/className'
import type { DivisionDataObject } from 'features/divisions'
import { Icon } from 'components/icon'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

interface CrumbResultsItemProps {
  division: DivisionDataObject
  isFocused: boolean
}

export const CrumbResultsItem = ({ division, isFocused }: CrumbResultsItemProps) => {
  const { selectedId, url, setDivision } = useBreadcrumb()
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
      <Link to={`${url}/${id}`}>
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
      </Link>
    </li>
  )
}
