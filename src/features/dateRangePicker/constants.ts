import { DateRangeOption } from './types'

export const DATE_DISPLAY_FORMAT = 'DD/MM/YYYY'

export const DATE_FORMAT_PATTERN = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-3][0-9])$/

export const RANGE_OPTIONS: DateRangeOption[] = [
  { length: 1 },
  { length: 2, label: 'Fortnight' },
  { length: 4 },
  { length: 8 },
  { length: 12 }
]
