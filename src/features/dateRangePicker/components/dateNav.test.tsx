import { vi, it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from '../../../redux/store'
import { DateNav } from './dateNav'

// lets hide icons from screen
vi.mock('../../../components/icon', () => {
  return {
    Icon: ({ icon }: { icon: string }) => `[${icon}]`
  }
})

describe('<DateNav>', () => {
  let store = createStore()
  let isControlsOpen = false

  beforeEach(() => {
    store = createStore({
      dateRange: {
        activeDate: 'Fri Feb 03 2023 13:00:00 GMT+1100 (Australian Eastern Daylight Time)',
        weekRange: 2
      }
    })
  })

  it('renders correct dates and range', async () => {
    const mockSetIsControlsOpen = () => {
      isControlsOpen = true
    }

    render(
      <Provider store={store}>
        <DateNav isControlsOpen={isControlsOpen} setIsControlsOpen={mockSetIsControlsOpen} />
      </Provider>
    )

    expect(
      screen.getByRole('button', {
        name: '30/01/2023 [CaretRightIcon] 12/02/2023 (2 weeks)'
      })
    ).toBeInTheDocument()
  })
})
