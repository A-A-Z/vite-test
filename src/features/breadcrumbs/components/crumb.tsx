import { useState, useRef, useEffect, useCallback } from 'react'
import { bemNames } from 'lib/className'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'
import { ClearCrumbButton } from './clearCrumbButton'
import { useClickOutside } from 'hooks/useClickOutside'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

export const Crumb = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { level, label, selectedDivision, format, parentId, isActive } = useBreadcrumb()
  const CrumbListing = format === 'search' ? CrumbSearch : CrumbSelect
  const selected = selectedDivision?.id
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
      className={bemNames('crumb', { active: isActive, unset: selectedDivision === undefined, open: isOpen })}
      onClick={onClickInside}
      ref={wrapperRef}
    >
      <div className="crumb__label">{label}</div>
      <div className="crumb__value">{selectedDivision?.name || 'none'} / {parentId}</div>
      <ClearCrumbButton level={level} isDisabled={selectedDivision === undefined} />
      <CrumbListing isOpen={isOpen} />
    </div>
  )
}
