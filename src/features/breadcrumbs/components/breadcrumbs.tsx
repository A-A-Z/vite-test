import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useLazyGetSummaryQuery, DivisionDataObject } from 'features/divisions'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { setCrumbsFromDivision } from '../breadcrumbsSlice'
import { Crumb } from './crumb'
import { CRUMBS } from '../constants'
import { BreadcrumbProvider } from '../breadcrumbProvider'
import { useOnCrumbRouted } from '../hooks/useOnCrumbRouted'
import '../assets/styles/index.scss'

export const Breadcrumbs = () => {
  const dispatch = useAppDispatch()
  const [fetchData, { paramDivision, paramDivisionId, isFetching, isUninitialized }] = useLazyGetSummaryQuery({
    selectFromResult: ({ data, ...context }) => ({
      ...context,
      paramDivision: data?.data as DivisionDataObject | undefined,
      paramDivisionId: data?.data.id as number | undefined
    })
  })
  const onRoutChange = (idFromPram: number) => {
    fetchData(idFromPram)
  }
  const isMismatch = useOnCrumbRouted(onRoutChange)
  const isCrumbLoading = ((isMismatch && isUninitialized) || isFetching)

  useEffect(() => {
    if (paramDivision !== undefined) {
      dispatch(setCrumbsFromDivision(paramDivision))
    }
  }, [paramDivisionId])

  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => (
        <li className="breadcrumbs__item" key={crumb.level}>
          <BreadcrumbProvider crumb={crumb} url="/week">
              <Crumb isLoading={isCrumbLoading} />
          </BreadcrumbProvider>
        </li>
      ))}
    </ul>
  )
}
