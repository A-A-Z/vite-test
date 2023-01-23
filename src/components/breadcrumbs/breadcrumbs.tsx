import { useSelector, shallowEqual } from 'react-redux'
import { Crumb } from './crumb'
import { DivisionLevels, Divsion } from '../../global/types'
import {
  selectCrumbs,
  selectDivisionParentId,
  selectActiveDivisionLevel
} from '../../redux/selectors'

interface CrumbType {
  name: DivisionLevels
  label: string
  type: 'select' | 'search'
}

const CRUMBS: CrumbType[] = [
  {
    name: 'root',
    label: 'Company',
    type: 'select'
  },
  {
    name: 'state',
    label: 'State',
    type: 'select'
  },
  {
    name: 'client',
    label: 'Client',
    type: 'search'
  },
  {
    name: 'location',
    label: 'Service Address',
    type: 'search'
  }
]

export type CrumbsValues = {
  root: Divsion | undefined,
  state: Divsion | undefined,
  client: Divsion | undefined,
  location: Divsion | undefined
}

export type ParentIds = {
  root: number,
  state: number,
  client: number,
  location: number
}

interface BreadcrumbsItem {
  crumb: CrumbType
  values: CrumbsValues
  parentIds: ParentIds
  activeLevel: DivisionLevels | undefined
}

const BreadcrumbsItem = ({ crumb, values, parentIds, activeLevel }: BreadcrumbsItem) => {
  const { [crumb.name]: crumbValue } = values
  const { [crumb.name]: crumbParentId } = parentIds
  return <li className="breadcrumbs__item" key={crumb.name}>
    <Crumb
      value={crumbValue}
      parentId={crumbParentId}
      isActive={crumb.name === activeLevel}
      {...crumb}
    />
  </li>
}

export const Breadcrumbs = () => {
  const crumbValues = useSelector(selectCrumbs, shallowEqual)
  const parentIds = useSelector(selectDivisionParentId, shallowEqual)
  const activeLevel = useSelector(selectActiveDivisionLevel, shallowEqual)
  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => <BreadcrumbsItem
        key={crumb.name}
        crumb={crumb}
        values={crumbValues}
        parentIds={parentIds}
        activeLevel={activeLevel}
      />)}
    </ul>
  )
}
