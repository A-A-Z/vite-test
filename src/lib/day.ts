import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(isBetween)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', { weekStart: 1 })

export default dayjs
