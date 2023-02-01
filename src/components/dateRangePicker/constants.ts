import { DateRangeOption } from './types'

export const DATE_DISPLAY_FORMAT = 'DD/MM/YYYY'

export const RANGE_OPTIONS: DateRangeOption[] = [
  { length: 1 },
  { length: 2, label: 'Fortnight' },
  { length: 4 },
  { length: 8 },
  { length: 12 }
]
