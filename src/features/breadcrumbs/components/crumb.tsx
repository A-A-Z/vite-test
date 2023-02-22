import { useState, useEffect, useCallback, useMemo, FocusEvent } from 'react'
import { bemNames } from 'lib/className'
import { useClickOutside } from 'hooks/useClickOutside'
import { useNavKey, keyAction } from 'hooks/useNavKey'
import { Loader } from 'components/loader'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'
import { ClearCrumbButton } from './clearCrumbButton'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

interface CrumbProps {
  isLoading: boolean
}

export const Crumb = ({ isLoading }: CrumbProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { label, selectedDivision, selectedId, format, isActive, wrapperRef, setDivisionFromid } = useBreadcrumb()
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
    setDivisionFromid(selectedId || 0)
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

  if (isLoading) {
    return (
      <div className="crumb crumb--loading">
        <div className="crumb__body">
          <div className="crumb__label">{label}</div>
          <div className="crumb__value"><Loader size="tiny" colour="grey" inline={true} /></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={bemNames('crumb', { active: isActive, set: selectedId !== undefined, open: isOpen })}
      onClick={onClickInside}
      onBlur={onBlur}
      ref={wrapperRef}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      <div className="crumb__body">
        <div className="crumb__label">{label}</div>
        <div className="crumb__value">{selectedDivision?.name || 'None'}</div>
        <ClearCrumbButton isDisabled={selectedDivision === undefined} />
      </div>
      <CrumbListing isOpen={isOpen} />
    </div>
  )
}
