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
}

interface AncestorsDataObject {
  root: AncestorDataObject
  state: AncestorDataObject
  client: AncestorDataObject
  location: AncestorDataObject
}

export interface DivisionDataObject {
  id: number
  name: string
  level: DivisionLevels
  breadcrumb: string
  status: string
  ancestor: AncestorsDataObject
}
