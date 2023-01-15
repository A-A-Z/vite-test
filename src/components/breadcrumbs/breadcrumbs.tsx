import { useSelector } from 'react-redux'
import { Crumb, CrumbType } from './crumb'
import { selectCrumbs, selectDivisionParentId } from '../../redux/selectors'
import { DivisionLevels } from '../../global/types'

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

export const Breadcrumbs = () => {
  const crumbValues = useSelector(selectCrumbs)
  const parentIds = useSelector(selectDivisionParentId)

  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => <li className="breadcrumbs__crumb" key={crumb.name}>
        <Crumb
          value={crumbValues[crumb.name as DivisionLevels]}
          parentId={parentIds[crumb.name as DivisionLevels]}
          {...crumb} />
        </li>
      )}
    </ul>
  )
}
