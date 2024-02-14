import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '@/app/page'

describe('Home Page', () => {
  it('Should have Kaboard text', () => {
    render(<Home />) // Arrange

    expect(screen.getByTestId('Kaboard')).toBeInTheDocument()
    expect(screen.queryByTestId('does-not-exist-testing-only')).not.toBeInTheDocument()
  })
})


