import { vi, it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { createStore } from '../../../redux/store'
import { RangeSelect } from './rangeSelect'

// lets hide icons from screen
vi.mock('../../../components/icon', () => {
  return {
    Icon: ({ icon }: { icon: string }) => `[${icon}]`
  }
})

vi.mock('../constants', () => {
  return {
    RANGE_OPTIONS: ([
      { length: 1 },
      { length: 2 },
      { length: 3, label: 'Foo' },
      { length: 4, label: 'Bar' }
    ])
  }
})

describe('<RangeSelect>', () => {
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
        <RangeSelect />
      </Provider>
    )
  })

  it('renders the correct number of items', async () => {
    const items = await screen.getAllByRole('radio')
    expect(items).toHaveLength(4)
  })

  it('renders 1 week correctly', async () => {
    const items = await screen.getAllByRole('radio')
    expect(items[0]).toHaveTextContent('1 Week' + '1st Jun [CaretRightIcon] 7th Jun')
  })

  it('renders 2 weeks correctly', async () => {
    const items = await screen.getAllByRole('radio')
    expect(items[1]).toHaveTextContent('2 Weeks' + '1st Jun [CaretRightIcon] 14th Jun')
  })

  it('renders with label', async () => {
    const items = await screen.getAllByRole('radio')
    expect(items[2]).toHaveTextContent('Foo' + '1st Jun [CaretRightIcon] 21st Jun')
  })
})
