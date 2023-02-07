import { it, expect, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { createStore } from '../../../redux/store'
import { SelectYear } from './selectYear'
import { DateRangePickerProvider } from './dateRangePickerProvider'

describe('<SelectYear>', () => {
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
          <SelectYear />
        </DateRangePickerProvider>
      </Provider>
    )
  })

  it('renders button with year for the active date', () => {
    expect(screen.getByRole('button', { name: /2020/ })).toBeInTheDocument()
  })

  it('open and close menu on click', async () => {
    const button = screen.getByRole('button')

    let options = screen.queryAllByRole('option')
    expect(options).toHaveLength(0)

    // open menu
    fireEvent.click(button)

    options = screen.getAllByRole('option')
    expect(options.length).greaterThan(3)

    // close menu
    fireEvent.click(button)

    options = screen.queryAllByRole('option')
    expect(options).toHaveLength(0)
  })

  it('will updated selected year', () => {
    const button = screen.getByRole('button')

    // open menu
    fireEvent.click(button)
    expect(screen.getByRole('option', { name: /2020/, selected: true })).toBeInTheDocument()

    // select "May" option
    const option = screen.getByRole('option', { name: /2019/ })
    fireEvent.click(option)

    // reopen menu
    fireEvent.click(button)

    // May should now be selected
    expect(screen.getByRole('option', { name: /2019/, selected: true })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /2019/ })).toBeInTheDocument()
  })
})
