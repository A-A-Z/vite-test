import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from './pageHeader'

describe('<PageHeader>', () => {
  it('renders the header title', () => {
    render(<PageHeader title="testme" />)
    expect(
      screen.getByRole('heading', {
        name: /testme/i
      })
    ).toBeInTheDocument()
  })
})
