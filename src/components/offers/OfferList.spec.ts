import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import OfferList from '@/components/offers/OfferList.vue'
import { useOfferStore } from '@/stores/OfferStore'

describe('OfferList Component Behavior', () => {
  const factory = (initialState = {}) => {
  return render(OfferList, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            offers: {
              offers: [],
              loading: false,
              error: false,
              ...initialState
            },
          },
        }),
      ],
      stubs: { OfferCard: true }
    },
  })
}

  it('shows loading state correctly', () => {
    factory({ loading: true })
    expect(screen.getByTestId('loading')).toBeTruthy()
    expect(screen.queryByTestId('offers-list')).toBeNull()
  })

  it('shows error state correctly', () => {
    factory({ error: true, loading: false })
    expect(screen.getByTestId('error')).toBeTruthy()
    expect(screen.queryByTestId('offers-list')).toBeNull()
  })

  it('renders a list of offers when data is present', () => {
    const mockOffers = [
    {
      uuid: '1',
      origin: 'NYC',
      destination: 'LON',
      price: { amount: 100 },
      departureTime: '10:00',
      departureDate: '2024-12-01'
    },
    {
      uuid: '2',
      origin: 'PAR',
      destination: 'BER',
      price: { amount: 200 },
      departureTime: '12:00',
      departureDate: '2024-12-01'
    }
  ]

    factory({
      offers: mockOffers,
      loading: false,
      error: false
    })

    const list = screen.getByTestId('offers-list')
    expect(list).toBeTruthy()
    expect(list.children.length).toBe(2)
  })

  it('calls fetchOffers on mount', () => {
    factory()
    const store = useOfferStore()
    expect(store.fetchOffers).toHaveBeenCalledTimes(1)
  })
})
