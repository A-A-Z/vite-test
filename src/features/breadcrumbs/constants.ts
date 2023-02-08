import type { CrumbType } from './types'

export const CRUMBS: CrumbType[] = [
  {
    name: 'root',
    label: 'Company',
    type: 'select'
  },
  {
    name: 'state',
    label: 'State',
    type: 'select'
  },
  {
    name: 'client',
    label: 'Client',
    type: 'search'
  },
  {
    name: 'location',
    label: 'Service Address',
    type: 'search'
  }
]
