import { useState, useEffect, useCallback, useMemo, FocusEvent } from 'react'
import { bemNames } from 'lib/className'
import { useClickOutside } from 'hooks/useClickOutside'
import { useNavKey, keyAction } from 'hooks/useNavKey'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'
import { ClearCrumbButton } from './clearCrumbButton'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

export const Crumb = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { level, label, selectedDivision, selectedId, format, parentId, isActive, wrapperRef } = useBreadcrumb()
  const CrumbListing = format === 'search' ? CrumbSearch : CrumbSelect

  const onClickOutside = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onClickInside = useCallback(() => {
    setIsOpen(true)
  }, [])

  useClickOutside<HTMLDivElement>(wrapperRef, onClickOutside)

  useEffect(() => {
    setIsOpen(false)
  }, [selectedId])

  const onEnter = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (wrapperRef?.current && !wrapperRef.current.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  const actions: keyAction = useMemo(() => ({
    Enter: onEnter
  }), [isOpen])
  useNavKey<HTMLDivElement>(wrapperRef, actions)

  return (
    <div
      className={bemNames('crumb', { active: isActive, unset: selectedDivision === undefined, open: isOpen })}
      onClick={onClickInside}
      onBlur={onBlur}
      ref={wrapperRef}
      tabIndex={0}
    >
      <div className="crumb__body">
        <div className="crumb__label">{label}</div>
        <div className="crumb__value">{selectedDivision?.name || 'none'} / {parentId}</div>
        <ClearCrumbButton level={level} isDisabled={selectedDivision === undefined} />
      </div>
      <CrumbListing isOpen={isOpen} />
    </div>
  )
}
