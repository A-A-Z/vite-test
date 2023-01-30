// import { CalendarMonth } from '@rehookify/datepicker'
// import { Listbox } from '@headlessui/react'
// import classNames from 'classnames'
// import { Icon } from '../icon'

// interface SelectMonthProps {
//   // months: CalendarMonth[]
//   year: number
//   setYear: (d: Date) => void
// }

// export const SelectYear = ({ year, setYear }: SelectMonthProps) => {
//   const BACK_YEARS = 10
//   const FORWARD_YEARS = 1

//   const onYearChange = (newYear: number) => {
//     setYear(date.$date)
//   }
//   // const value = months.find(({ active }) => active)

//   return (
//     <div className="select-lite">
//       <Listbox value={year} onChange={onYearChange}>
//         <Listbox.Button className="select-lite__btn">
//           <div className="select-lite__btn-text">{year}</div>
//           <Icon icon="CaretSortIcon" />
//         </Listbox.Button>
//         <Listbox.Options className="select-lite__list">
//           {months.map((month) => (
//             <Listbox.Option
//               key={month.name}
//               value={month}
//               disabled={month.disabled}
//               className={classNames('select-lite__option', { 'select-lite__option--selected': month.active })}
//             >
//               <div className="select-lite__value">{month.name}</div>
//               {month.active && <Icon icon="CheckIcon" />}
//             </Listbox.Option>
//           ))}
//         </Listbox.Options>
//       </Listbox>
//     </div>
//   )
// }
export const SelectYear = () => <div>Year</div>
