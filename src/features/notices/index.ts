import noticeReducer, { addNotice, removeNotice, NoticesState } from './noticesSlice'
import { NoticeList } from './components/noticeList'
import { NoticeItem } from './components/noticeItem'

export {
  NoticeList,
  NoticeItem,
  noticeReducer,
  addNotice,
  removeNotice
}

export type {
  NoticesState
}
