import type { CrumbType } from './types'

export const CRUMBS: CrumbType[] = [
  {
    level: 'root',
    label: 'Company',
    format: 'select'
  },
  {
    level: 'state',
    label: 'State',
    format: 'select'
  },
  {
    level: 'client',
    label: 'Client',
    format: 'search'
  },
  {
    level: 'location',
    label: 'Service Address',
    format: 'search'
  }
]
