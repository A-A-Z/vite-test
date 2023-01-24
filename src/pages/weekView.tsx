// import { WeekGrid } from '../components/weekGrid'
import { Breadcrumbs } from '../components/breadcrumbs'
import { DateRangePicker } from '../components/dateRangePicker'

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
