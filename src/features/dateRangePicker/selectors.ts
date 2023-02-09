import dayjs from 'lib/day'
import { RootState } from 'store/store'

export const selectActiveDate = ({ dateRange: { activeDate } }: RootState): Date | undefined =>
  activeDate !== undefined ? new Date(activeDate) : undefined

export const selectWeekRange = ({ dateRange }: RootState): number => dateRange.weekRange

export const selectFromToDate = ({ dateRange: { activeDate, weekRange } }: RootState): [Date, Date, number] => {
  const start = dayjs(activeDate).weekday(0).toDate()
  const end = dayjs(activeDate).weekday((7 * weekRange) - 1).toDate()
  return [start, end, weekRange]
}
