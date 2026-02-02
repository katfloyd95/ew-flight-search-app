import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import OfferCard from '@/components/offers/OfferCard.vue'
import type { PriceOffer } from '@/types/PriceOffer'

vi.mock('@/utils/timeUtils', () => ({
  formatDuration: vi.fn(() => '2h 30m')
}))

vi.mock('@/utils/dateUtils', () => ({
  formatDate: vi.fn(() => '01.01.2026')
}))

describe('Behavior of Offer Card Component', () => {
  const mockOffer: PriceOffer = {
    origin: 'BER',
    destination: 'MAD',
    departureDate: '2026-02-01',
    departureTime: '10:00',
    arrivalTime: '12:30',
    price: { amount: 150.00, currency: 'EUR' },
    durationMinutes: 150,
    uuid: '123',
  }
  beforeEach(() => {
    render(OfferCard, { props: { offer: mockOffer } })
  })

  it('renders the route (origin and destination) correctly', () => {

    expect(screen.getByText('BER')).toBeTruthy()
    expect(screen.getByText('MAD')).toBeTruthy()
  })

  it('renders the formatted flight times', () => {

    expect(screen.getByText('10:00 – 12:30')).toBeTruthy()
  })

  it('displays the price formatted to two decimal places', () => {
    const priceElement = screen.getByLabelText('Price')
    expect(priceElement.textContent).toContain('150.00 €')
  })

  it('uses the utility functions for date and duration display', () => {
    expect(screen.getByText('01.01.2026')).toBeTruthy()
    expect(screen.getByText('2h 30m')).toBeTruthy()
  })
})
