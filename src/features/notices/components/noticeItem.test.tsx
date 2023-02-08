import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'store/store'
import { NoticeItem } from './noticeItem'

describe('<NoticeItem>', () => {
  const store = createStore()

  it('renders notice content', () => {
    const noticeTitle = 'test-title'
    const noticeBody = 'test-body'

    render(
      <Provider store={store}>
        <NoticeItem id="1" title={noticeTitle} body={noticeBody} type="info" />
      </Provider>
    )
    expect(screen.getByText(noticeTitle)).toBeInTheDocument()
    expect(screen.getByText(noticeBody)).toBeInTheDocument()
  })
})
