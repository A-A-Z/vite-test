import { SelectOption, DivisionLevels } from './types'

// formats
export const DATE_DISPLAY = 'DD/MM/YYYY'

// selects

export const STATE_OPTIONS: SelectOption[] = [
  { id: '', name: 'Any' },
  { id: 'Australian Capital Territory', name: 'Australian Capital Territory' },
  { id: 'New South Wales', name: 'New South Wales' },
  { id: 'Northern Territory', name: 'Northern Territory' },
  { id: 'Queensland', name: 'Queensland' },
  { id: 'South Australia', name: 'South Australia' },
  { id: 'Tasmania', name: 'Tasmania' },
  { id: 'Victoria', name: 'Victoria' },
  { id: 'Western Australia', name: 'Western Australia' }
]

export const GENDER_OPTIONS: SelectOption[] = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'other', name: 'Other' }
]

// divisions

export const DIVISION_ORDER: DivisionLevels[] = [
  'root', 'state', 'client', 'location'
]
