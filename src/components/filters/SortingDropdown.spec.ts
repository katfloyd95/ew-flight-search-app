import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import SortingDropdown from './SortingDropdown.vue'
import { useOfferStore } from '@/stores/OfferStore'

describe('SortingDropdown.vue', () => {
  const factory = (initialState = {}) => {
    return render(SortingDropdown, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { offers: initialState },
            stubActions: false,
          }),
        ],
      },
    })
  }

  it('renders with the initial store value', () => {
    factory({ sortBy: 'price' })
    const button = screen.getByRole('button')

    expect(button.textContent).toContain('Sorted by: Price')
  })

  it('toggles the menu visibility when the button is clicked', async () => {
    factory()
    const button = screen.getByRole('button')

    expect(screen.queryByRole('listbox')).toBeNull()

    expect(button.getAttribute('aria-expanded')).toBe('false')

    await fireEvent.click(button)
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(button.getAttribute('aria-expanded')).toBe('true')

    await fireEvent.click(button)
    expect(screen.queryByRole('sorting-list')).toBeNull()
  })

  it('updates the store and closes the menu when an option is selected', async () => {
    factory({ sortBy: 'departureTime' })
    const store = useOfferStore()

    await fireEvent.click(screen.getByRole('button'))

    const priceOption = screen.getByText('Price')
    await fireEvent.click(priceOption)

    expect(store.sortBy).toBe('price')
    expect(screen.queryByRole('sorting-list')).toBeNull()
  })
})
