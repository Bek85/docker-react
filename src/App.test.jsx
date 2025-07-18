import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders correctly', () => {
    render(<App />)

    // Check if main heading is present
    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()

    // Check if logos are present
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()

    // Check if count button is present with initial value
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()

    // Check if instructional text is present - using a function matcher to handle text across elements
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Edit src/App.jsx and save to test HMR'
    })).toBeInTheDocument()

    expect(screen.getByText(/click on the vite and react logos to learn more/i)).toBeInTheDocument()
  })

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const countButton = screen.getByRole('button', { name: /count is 0/i })

    // Click the button and verify count increases
    await user.click(countButton)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()

    // Click again to verify it continues incrementing
    await user.click(countButton)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('has correct logo links', () => {
    render(<App />)

    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    const reactLink = screen.getByRole('link', { name: /react logo/i })

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(viteLink).toHaveAttribute('target', '_blank')

    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    expect(reactLink).toHaveAttribute('target', '_blank')
  })
})
