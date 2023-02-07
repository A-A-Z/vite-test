import { vi, it, expect, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, AppStore } from '../../../redux/store'
import { DateRangePicker } from './dateRangePicker'

// lets hide icons from screen
vi.mock('../../../components/icon', () => {
  return {
    Icon: ({ icon }: { icon: string }) => `[${icon}]`
  }
})

describe('<DateRangePicker>', () => {
  let store: AppStore

  beforeEach(() => {
    store = createStore({
      dateRange: {
        activeDate: 'Fri Feb 03 2023 13:00:00 GMT+1100 (Australian Eastern Daylight Time)',
        weekRange: 2
      }
    })

    render(
      <Provider store={store}>
        <DateRangePicker />
      </Provider>
    )
  })

  it('toggles menuu open and closed', () => {
    const button = screen.getByRole('button', {
      name: '30/01/2023 [CaretRightIcon] 12/02/2023 (2 weeks)'
    })

    expect(screen.queryByRole('menu')).toBeNull()

    // open menu
    fireEvent.click(button)

    expect(screen.queryByRole('menu')).toBeInTheDocument()

    // close menu
    fireEvent.click(button)

    expect(screen.queryByRole('menu')).toBeNull()
  })
})
