import { it, expect, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { createStore } from 'store/store'
import { SelectMonth } from './selectMonth'
import { DateRangePickerProvider } from './dateRangePickerProvider'

describe('<SelectMonth>', () => {
  let store: EnhancedStore

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
          <SelectMonth />
        </DateRangePickerProvider>
      </Provider>
    )
  })

  it('renders button with month for the active date', () => {
    expect(screen.getByRole('button', { name: /June/ })).toBeInTheDocument()
  })

  it('open and close menu on click', async () => {
    const button = screen.getByRole('button')

    let options = screen.queryAllByRole('option')
    expect(options).toHaveLength(0)

    // open menu
    fireEvent.click(button)

    options = await screen.getAllByRole('option')
    expect(options).toHaveLength(12)

    // close menu
    fireEvent.click(button)

    options = screen.queryAllByRole('option')
    expect(options).toHaveLength(0)
  })

  it('will updated selected month', () => {
    const button = screen.getByRole('button')

    // open menu
    fireEvent.click(button)
    expect(screen.getByRole('option', { name: /June/, selected: true })).toBeInTheDocument()

    // select "May" option
    const option = screen.getByRole('option', { name: /May/ })
    fireEvent.click(option)

    // reopen menu
    fireEvent.click(button)

    // May should now be selected
    expect(screen.getByRole('option', { name: /May/, selected: true })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /May/ })).toBeInTheDocument()
  })
})
