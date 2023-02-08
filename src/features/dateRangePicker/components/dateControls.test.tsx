import { vi, it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { createStore } from 'store/store'
import { DateControls } from './dateControls'
import { DateRangePickerProvider } from './dateRangePickerProvider'

vi.mock('./selectMonth', () => {
  return {
    SelectMonth: () => '[SelectMonth]'
  }
})

vi.mock('./selectYear', () => {
  return {
    SelectYear: () => '[selectYear]'
  }
})

describe('<DateControls>', () => {
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
          <DateControls />
        </DateRangePickerProvider>
      </Provider>
    )
  })

  it('renders Previous Month button', () => {
    expect(screen.getByLabelText('Previous Month')).toBeInTheDocument()
  })

  it('renders Next Month button', () => {
    expect(screen.getByLabelText('Next Month')).toBeInTheDocument()
  })
})
