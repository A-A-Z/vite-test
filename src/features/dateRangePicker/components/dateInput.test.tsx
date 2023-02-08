import { vi, it, expect, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { EnhancedStore, AnyAction } from '@reduxjs/toolkit'
import { createStore } from 'store/store'
import { DateInput } from './dateInput'
import * as dateRangeAction from '../dateRangeSlice'

vi.mock('../../../hooks/useAppDispatch', () => {
  return {
    useAppDispatch: (action: AnyAction) => () => action
  }
})

vi.mock('../../../utils/dates', async () => {
  return {
    getTodayAsString: () => 'string',
    createDateFromDateString: () => 'string'
  }
})

describe('<DateInput>', () => {
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
        <DateInput />
      </Provider>
    )
  })

  it('renders Active Date input', () => {
    const input = screen.getByLabelText('Active Date')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('01/06/2020')
  })

  it('will update active date if valid', () => {
    const setActiveDateSpy = vi.spyOn(dateRangeAction, 'setActiveDate')
    const expected = '24/05/2020'
    const input = screen.getByLabelText('Active Date')

    fireEvent.change(input, { target: { value: expected } })
    expect(input).toHaveValue(expected)
    expect(setActiveDateSpy).toBeCalledWith('string')

    setActiveDateSpy.mockClear()
  })

  it('will not update active date if invalid', () => {
    const setActiveDateSpy = vi.spyOn(dateRangeAction, 'setActiveDate')
    const expected = 'fail'
    const input = screen.getByLabelText('Active Date')

    fireEvent.change(input, { target: { value: expected } })
    expect(input).toHaveValue(expected)
    expect(setActiveDateSpy).toBeCalledTimes(0)

    setActiveDateSpy.mockClear()
  })

  it('renders Today button', () => {
    const button = screen.getByRole('button', { name: 'Today' })
    expect(button).toBeInTheDocument()
  })

  it('handles button click', () => {
    const setActiveDateSpy = vi.spyOn(dateRangeAction, 'setActiveDate')

    const button = screen.getByRole('button', { name: 'Today' })
    fireEvent.click(button)

    expect(setActiveDateSpy).toBeCalledWith('string')

    setActiveDateSpy.mockClear()
  })
})
