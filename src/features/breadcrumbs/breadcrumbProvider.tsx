import React, { createContext, useMemo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import type { Divsion, DivisionLevels } from 'features/divisions'
import type { CrumbType, CrumbFormat } from './types'
import {
  selectCrumbs,
  selectDivisionParentId,
  selectActiveDivisionLevel
} from './selectors'

interface BreadcrumbContextValue {
  level: DivisionLevels
  label: string
  selectedId?: number
  selectedDivision?: Divsion
  format: 'select' | 'search'
  parentId: number
  isActive: boolean
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  level: 'root' as DivisionLevels,
  label: '',
  selectedId: undefined,
  selectedDivision: undefined,
  format: 'select' as CrumbFormat,
  parentId: 0,
  isActive: false
})

interface BreadcrumbProviderProps {
  children: React.ReactNode
  crumb: CrumbType
}

export const BreadcrumbProvider = ({ children, crumb }: BreadcrumbProviderProps) => {
  const { level, label, format } = crumb

  const crumbValues = useSelector(selectCrumbs, shallowEqual)
  const parentIds = useSelector(selectDivisionParentId, shallowEqual)
  const activeLevel = useSelector(selectActiveDivisionLevel, shallowEqual)

  const selectedDivision = crumbValues[level]
  const parentId = parentIds[level] ?? 0
  const isActive = activeLevel === level
  const selectedId = selectedDivision?.id

  const value = useMemo(() => ({
    level,
    label,
    selectedId,
    selectedDivision,
    format,
    parentId,
    isActive
  }), [selectedId, parentId, isActive])

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
