import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'store/store'
import { NoticeList } from './noticeList'

describe('<NoticeList>', () => {
  it('renders all notices in store', async () => {
    const store = createStore({
      notices: {
        notices: [
          { id: '1', title: 't1', body: 'b1', type: 'info' },
          { id: '2', title: 't2', body: 'b2', type: 'success' },
          { id: '3', title: 't3', body: 'b3', type: 'warning' }
        ]
      }
    })

    render(
      <Provider store={store}>
        <NoticeList />
      </Provider>
    )
    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(3)
  })
})
