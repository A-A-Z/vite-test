import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectNotices } from '../redux/selectors'
import { AppDispatch } from '../redux/store'
import { removeNotice, notice } from '../redux/noticesSlice'
import { Icon } from './icon'

export interface NoticeItemProps {
  notice: notice
}

type NoticeIconString = 'InfoCircledIcon' | 'CrossCircledIcon' | 'CheckCircledIcon'

const iconMap = {
  info: 'InfoCircledIcon',
  warning: 'CrossCircledIcon',
  success: 'CheckCircledIcon'
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id = '', title, body, type } = notice
  const iconType = iconMap[type] as NoticeIconString
  const onClick = useCallback(() => {
    dispatch(removeNotice(id))
  }, [])
  return (
    <li className="notices__row" onClick={onClick}>
      <div className={`notices__item notice notice--${type}`}>
        <div className="notice__icon"><Icon icon={iconType} /></div>
        <div className="notice__title">{title}</div>
        <div className="notice__body">{body}</div>
      </div>
    </li>
  )
}

export const NoticeList = () => {
  const notices = useSelector(selectNotices)
  return (
    <ul className="notices">
      {notices.map(notice => <NoticeItem key={`notice-${notice.id}`} notice={notice} />)}
    </ul>
  )
}
