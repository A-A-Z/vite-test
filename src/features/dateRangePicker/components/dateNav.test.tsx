import { vi, it, expect, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { EnhancedStore, AnyAction } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createStore } from '../../../redux/store'
import { DateNav } from './dateNav'
import * as dateRangeAction from '../dateRangeSlice'

// lets hide icons from screen
vi.mock('../../../components/icon', () => {
  return {
    Icon: ({ icon }: { icon: string }) => `[${icon}]`
  }
})

vi.mock('../../../hooks/useAppDispatch', () => {
  return {
    useAppDispatch: (action: AnyAction) => () => action
  }
})

describe('<DateNav>', () => {
  let store: EnhancedStore
  let isControlsOpen: boolean
  const mockSetIsControlsOpen = vi.fn()

  beforeEach(() => {
    store = createStore({
      dateRange: {
        activeDate: 'Fri Feb 03 2023 13:00:00 GMT+1100 (Australian Eastern Daylight Time)',
        weekRange: 2
      }
    })
    isControlsOpen = false

    render(
      <Provider store={store}>
        <DateNav isControlsOpen={isControlsOpen} setIsControlsOpen={mockSetIsControlsOpen} />
      </Provider>
    )
  })

  it('renders correct dates and range', () => {
    expect(
      screen.getByRole('button', {
        name: '30/01/2023 [CaretRightIcon] 12/02/2023 (2 weeks)'
      })
    ).toBeInTheDocument()
  })

  it('calls SetIsControlsOpen', () => {
    const button = screen.getByRole('button', {
      name: '30/01/2023 [CaretRightIcon] 12/02/2023 (2 weeks)'
    })

    fireEvent.click(button)

    expect(mockSetIsControlsOpen).toBeCalledTimes(1)
  })

  it('renders forward button', () => {
    const navRangeForwardSpy = vi.spyOn(dateRangeAction, 'navRangeForward')

    const button = screen.getByLabelText('Next Month')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(navRangeForwardSpy).toBeCalledTimes(1)

    navRangeForwardSpy.mockClear()
  })

  it('renders back button', () => {
    const navRangeBackSpy = vi.spyOn(dateRangeAction, 'navRangeBack')

    const button = screen.getByLabelText('Previous Month')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(navRangeBackSpy).toBeCalledTimes(1)

    navRangeBackSpy.mockClear()
  })
})
