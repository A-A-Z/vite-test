import { it, expect, describe } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, AppStore } from '../../../redux/store'
import { setActiveDate } from '../dateRangeSlice'
import { Calender } from './calender'
import { DateRangePickerProvider } from './dateRangePickerProvider'

describe('<Calender>', () => {
  let store: AppStore

  beforeEach(() => {
    store = createStore({
      dateRange: {
        activeDate: 'Mon Jun 01 2020 00:00:00 GMT+1000 (Australian Eastern Standard Time)',
        weekRange: 2
      }
    })

    render(
      <Provider store={store}>
        <DateRangePickerProvider>
          <Calender />
        </DateRangePickerProvider>
      </Provider>
    )
  })

  it('render calender', () => {
    // calender
    expect(screen.getByRole('list')).toBeInTheDocument()
    // headers
    expect(screen.queryAllByRole('listitem')).toHaveLength(7)
    // days
    expect(screen.queryAllByRole('button')).toHaveLength(7 * 6)
  })

  it('render selected', () => {
    const selected = screen.queryAllByRole('button', { pressed: true })
    expect(selected).toHaveLength(7 * 2)
    expect(selected[0]).toHaveTextContent('01')
    expect(selected[selected.length - 1]).toHaveTextContent('14')
  })

  it('updates selected on click', () => {
    const day = screen.getByRole('button', { name: /25/ })
    fireEvent.click(day)
    const selected = screen.queryAllByRole('button', { pressed: true })
    expect(selected[0]).toHaveTextContent('22')
    expect(selected[selected.length - 1]).toHaveTextContent('05')
  })

  it('updates when active date is changed outside calender', () => {
    act(() => {
      store.dispatch(setActiveDate('Thu Jul 16 2020 00:00:00 GMT+1000 (Australian Eastern Standard Time)'))
    })

    const selected = screen.queryAllByRole('button', { pressed: true })
    expect(selected[0]).toHaveTextContent('13')
    expect(selected[selected.length - 1]).toHaveTextContent('26')
  })
})
