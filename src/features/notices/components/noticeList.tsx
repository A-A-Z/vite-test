import { useSelector } from 'react-redux'
import { selectNotices } from '../selectors'
import { NoticeItemMemo } from './noticeItem'

export const NoticeList = () => {
  const notices = useSelector(selectNotices)
  return (
    <ul className="notices">
      {notices.map(notice => (
        <li className="notices__row" key={`notice-${notice.id}`}>
          <NoticeItemMemo {...notice} />
        </li>
      ))}
    </ul>
  )
}
