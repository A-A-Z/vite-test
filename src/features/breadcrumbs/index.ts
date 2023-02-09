import { Breadcrumbs } from './components/breadcrumbs'
import breadcrumbsReducer, { setCrumbs, clearCrumb, BreadcrumbsState } from './breadcrumbsSlice'

export {
  Breadcrumbs,
  breadcrumbsReducer,
  setCrumbs,
  clearCrumb
}

export type {
  BreadcrumbsState
}
