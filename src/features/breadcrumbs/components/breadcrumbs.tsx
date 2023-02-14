import { Crumb } from './crumb'
import { CRUMBS } from '../constants'
import { BreadcrumbProvider } from '../breadcrumbProvider'
import '../assets/styles/index.scss'

// import { KeyNavProvider } from 'hooks/useKeyNav'

export const Breadcrumbs = () => {
  return (
    <ul className="breadcrumbs">
      {CRUMBS.map(crumb => (
        <li className="breadcrumbs__item" key={crumb.level}>
          <BreadcrumbProvider crumb={crumb}>
            {/* <KeyNavProvider subscribedActions={['ArrowUp', 'ArrowDown']}> */}
              <Crumb />
            {/* </KeyNavProvider> */}
          </BreadcrumbProvider>
        </li>
      ))}
    </ul>
  )
}
