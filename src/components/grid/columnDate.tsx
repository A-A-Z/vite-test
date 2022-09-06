import dayjs from 'dayjs'
import { CellFunc } from './utils'
import { DATE_DISPLAY } from '../../global/constants'

export const ColumnDate: CellFunc = info => {
  const date = info.getValue()
  return typeof date === 'string'
    ? <time dateTime={dayjs(date).format('YYYY-MM-DD')}>{dayjs(date).format(DATE_DISPLAY)}</time>
    : null
}
