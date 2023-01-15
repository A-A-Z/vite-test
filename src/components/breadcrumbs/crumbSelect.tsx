import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useGetSearchQuery, DivisionDataObject } from '../../features/divisions/divisionsSlice'
import { setCrumbs } from '../../redux/breadcrumbsSlice'
import { Divsion, DivisionLevels } from '../../global/types'

export interface CrumbSelectProps {
  level: DivisionLevels
  parentId: number
}

const formatDivisionAncestor = (data: DivisionDataObject, level: DivisionLevels): Divsion | undefined => {
  const ancestor = data.ancestor[level]

  if (ancestor.id === '') {
    return undefined
  }

  return { ...ancestor, level: data.level, breadcrumb: data.breadcrumb } as Divsion
}

export const CrumbSelect = ({ level, parentId }: CrumbSelectProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { divisions, isFetching } = useGetSearchQuery({ level, parentId }, {
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      divisions: Object.values(data?.data || {}) as DivisionDataObject[]
    })
  })

  return (
    <div>Select {isFetching && 'loading'}
      <ul>
        {divisions.map(division => {
          const onClick = () => {
            dispatch(setCrumbs({
              root: formatDivisionAncestor(division, 'root'),
              state: formatDivisionAncestor(division, 'state'),
              client: formatDivisionAncestor(division, 'client'),
              location: formatDivisionAncestor(division, 'location')
            }))
          }
          return <li key={division.id} onClick={onClick}>{division.name}</li>
        })}
      </ul>
    </div>
  )
}
