// import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Crumb } from './crumb'
import { DivisionLevels } from '../../global/types'
import { selectCrumbs, selectDivisionParentId, selectActiveDivisionLevel } from '../../redux/selectors'

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

export const Breadcrumbs = () => {
  const crumbValues = useSelector(selectCrumbs)
  const parentIds = useSelector(selectDivisionParentId)
  const activeLevel = useSelector(selectActiveDivisionLevel)
  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => {
        const { [crumb.name]: crumbValue } = crumbValues
        const { [crumb.name]: crumbParentId } = parentIds
        return <li className="breadcrumbs__item" key={crumb.name}>
          <Crumb
            value={crumbValue}
            parentId={crumbParentId}
            activeLevel={activeLevel ?? 'root'}
            isActive={crumb.name === activeLevel}
            {...crumb}
          />
        </li>
      })}
    </ul>
  )
}

// export const Breadcrumbs = () => {
//   const crumbValues = useSelector(selectCrumbs)
//   const parentIds = useSelector(selectDivisionParentId)

//   return (
//     <ul className="breadcrumbs">
//       {CRUMBS.map(crumb => <li className="breadcrumbs__item" key={crumb.name}>
//           <Crumb
//             value={crumbValues[crumb.name as DivisionLevels]}
//             parentId={parentIds[crumb.name as DivisionLevels]}
//             {...crumb}
//           />
//         </li>
//       )}
//     </ul>
//   )
// }
