// import { WeekGrid } from '../components/weekGrid'
import { Breadcrumbs } from 'features/breadcrumbs'
import { DateRangePicker } from 'features/dateRangePicker'

const WeekView = () => {
  return (
    <>
      <nav>
        <Breadcrumbs />
        <DateRangePicker />
      </nav>
      <main className="page-main">Week View
        {/* <WeekGrid /> */}
      </main>
    </>
  )
}

export default WeekView
