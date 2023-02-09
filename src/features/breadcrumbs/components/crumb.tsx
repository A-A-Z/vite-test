import { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import type { Divsion, DivisionLevels } from 'features/divisions'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'
import { ClearCrumbButton } from './clearCrumbButton'
import { useClickOutside } from 'hooks/useClickOutside'

export interface CrumbProps {
  name: DivisionLevels
  label: string
  type: 'select' | 'search'
  value?: Divsion
  parentId?: number
  isActive: boolean
}

export const Crumb = ({ name, label, value, type, parentId, isActive }: CrumbProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const CrumbListing = type === 'search' ? CrumbSearch : CrumbSelect
  const selected = value?.id
  const wrapperRef = useRef(null)

  const onClickOutside = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onClickInside = useCallback(() => {
    setIsOpen(true)
  }, [])

  useClickOutside(wrapperRef, onClickOutside)

  useEffect(() => {
    setIsOpen(false)
  }, [selected])

  return (
    <div
      className={classNames('crumb', { 'crumb--active': isActive, 'crumb--unset': value === undefined, 'crumb--open': isOpen })}
      onClick={onClickInside}
      ref={wrapperRef}
    >
      <div className="crumb__label">{label}</div>
      <div className="crumb__value">{value?.name || 'none'} / {parentId}</div>
      <ClearCrumbButton level={name} isDisabled={value === undefined} />
      <CrumbListing
        level={name}
        parentId={parentId ?? 0}
        selected={selected}
        isOpen={isOpen}
      />
    </div>
  )
}
