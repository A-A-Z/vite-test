import { useContext } from 'react'
import { BreadcrumbContext } from '../breadcrumbProvider'

export const useBreadcrumb = () => useContext(BreadcrumbContext)
