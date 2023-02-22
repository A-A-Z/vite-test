import React, { createContext, useMemo, RefObject, MouseEvent } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { Division, DivisionLevels, DivisionDataObject } from 'features/divisions'
import { setCrumbsFromDivision, clearCrumb } from './breadcrumbsSlice'
import type { CrumbType, CrumbFormat } from './types'
import {
  selectCrumbs,
  selectDivisionParentId,
  selectActiveDivisionLevel
} from './selectors'
import { useRecentCrumbs } from './hooks/useRecentCrumbs'

interface LocalStoreCrumb {
  id: number
  name: string
  breadcrumb: string
  level: DivisionLevels
  added: number
}

interface BreadcrumbContextValue {
  level: DivisionLevels
  label: string
  selectedId?: number
  selectedDivision?: Division
  format: 'select' | 'search'
  parentId: number
  isActive: boolean
  recentCrumbs: LocalStoreCrumb[]
  wrapperRef: RefObject<HTMLDivElement>
  url: string
  setDivision: (division: DivisionDataObject) => void
  setDivisionFromid: (id: number) => void
  clearThisCrumb: (event: MouseEvent<HTMLButtonElement>) => void
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  level: 'root' as DivisionLevels,
  label: '',
  selectedId: undefined,
  selectedDivision: undefined,
  format: 'select' as CrumbFormat,
  parentId: 0,
  isActive: false,
  recentCrumbs: [],
  wrapperRef: React.createRef<HTMLDivElement>(),
  url: '',
  setDivision: division => division,
  setDivisionFromid: num => num,
  clearThisCrumb: event => event
})

interface BreadcrumbProviderProps {
  children: React.ReactNode
  crumb: CrumbType
  url: string
}

export const BreadcrumbProvider = ({ children, crumb, url }: BreadcrumbProviderProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { level, label, format } = crumb
  const { recentCrumbs } = useRecentCrumbs(level)

  const crumbValues = useSelector(selectCrumbs, shallowEqual)
  const parentIds = useSelector(selectDivisionParentId, shallowEqual)
  const activeLevel = useSelector(selectActiveDivisionLevel, shallowEqual)

  const selectedDivision = crumbValues[level]
  const parentId = parentIds[level] ?? 0
  const isActive = activeLevel === level
  const selectedId = selectedDivision?.id
  const wrapperRef = React.createRef<HTMLDivElement>()

  const setDivision = (division: DivisionDataObject) => {
    dispatch(setCrumbsFromDivision(division))
    navigate(`${url}/${division.id}`, { replace: true })
  }

  const clearThisCrumb = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const newDivisionId = parentIds[level]
    dispatch(clearCrumb(level))
    const newUrl = (newDivisionId > 0) ? `${url}/${newDivisionId}` : url
    navigate(newUrl, { replace: true })
  }

  const setDivisionFromid = (divisionId: number) => {
    // fetchData(divisionId)
    console.log('setDivisionFromid', divisionId)
  }

  const value = useMemo(() => ({
    level,
    label,
    selectedId,
    selectedDivision,
    format,
    parentId,
    isActive,
    wrapperRef,
    recentCrumbs,
    url,
    setDivision,
    setDivisionFromid,
    clearThisCrumb
  }), [selectedId, parentId, isActive, recentCrumbs])

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
