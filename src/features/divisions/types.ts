export type DivisionLevels = 'root' | 'state' | 'client' | 'location'

export interface Divsion {
  id: number
  name: string
  level: DivisionLevels
  breadcrumb?: string
  parentId?: number
}

interface AncestorDataObject {
  id: number | ''
  name: string
  entityCode?: string
  startDate?: string | null
  endDate?: string | null
}

interface AncestorsDataObject {
  root: AncestorDataObject
  state: AncestorDataObject
  client: AncestorDataObject
  location: AncestorDataObject
}

interface AddressDateObject {
  state: string
}

interface GeoDateObject {
  longitude: number
  latitude: number
}

interface DateDateObject {
  start: string | null
  end: string | null
}

export interface DivisionDataObject {
  id: number
  name: string
  level: DivisionLevels
  breadcrumb: string
  status: string
  ancestor: AncestorsDataObject
  address?: AddressDateObject
  geo?: GeoDateObject
  date?: DateDateObject
}