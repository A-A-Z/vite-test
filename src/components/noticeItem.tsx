import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { removeNotice, Notice } from '../redux/noticesSlice'
import { Icon } from './icon'

type NoticeIconString = 'InfoCircledIcon' | 'CrossCircledIcon' | 'CheckCircledIcon'

const iconMap = {
  info: 'InfoCircledIcon',
  warning: 'CrossCircledIcon',
  success: 'CheckCircledIcon'
}

export const NoticeItem = ({ id = '', title, body, type }: Notice) => {
  const dispatch = useDispatch<AppDispatch>()
  const iconType = iconMap[type] as NoticeIconString
  const onClick = useCallback(() => {
    dispatch(removeNotice(id))
  }, [id])
  return (
    <div
      className={`notices__item notice notice--${type}`}
      tabIndex={0}
      role="button"
      onClick={onClick}
    >
      <div className="notice__icon"><Icon icon={iconType} /></div>
      <div className="notice__title">{title}</div>
      <div className="notice__body">{body}</div>
    </div>
  )
}

export const NoticeItemMemo = React.memo(NoticeItem)
