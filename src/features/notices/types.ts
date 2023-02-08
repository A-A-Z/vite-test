export type NoticeType = 'info' | 'warning' | 'success'

export interface Notice {
  id?: string
  title: string
  body?: string
  type: NoticeType
}
