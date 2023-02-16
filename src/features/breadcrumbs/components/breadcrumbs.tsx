import { Crumb } from './crumb'
import { CRUMBS } from '../constants'
import { BreadcrumbProvider } from '../breadcrumbProvider'
import '../assets/styles/index.scss'

export const Breadcrumbs = () => {
  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => (
        <li className="breadcrumbs__item" key={crumb.level}>
          <BreadcrumbProvider crumb={crumb}>
              <Crumb />
          </BreadcrumbProvider>
        </li>
      ))}
    </ul>
  )
}
