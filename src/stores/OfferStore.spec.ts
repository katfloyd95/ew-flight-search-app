import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useOfferStore } from '@/stores/OfferStore'
import type { PriceOffer } from '@/types/PriceOffer'

const createMockOffer = (overrides: Partial<PriceOffer> = {}): PriceOffer => ({
  uuid: crypto.randomUUID(),
  origin: 'BER',
  destination: 'MAD',
  departureDate: '2026-01-01',
  departureTime: '10:00',
  arrivalTime: '12:00',
  price: { amount: 100, currency: 'EUR' },
  durationMinutes: 120,
  ...overrides
})

describe('OfferStore Behavior', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useOfferStore()
    expect(store.offers).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.sortBy).toBe('departureTime')
  })

  describe('getters: filteredOffers', () => {
    const mockOffers = [
      createMockOffer({ uuid: '1', origin: 'BER', price: { amount: 200, currency: 'EUR' } }),
      createMockOffer({ uuid: '2', origin: 'MAD', price: { amount: 100, currency: 'EUR' } }),
    ]

    it('filters offers by origin', () => {
      const store = useOfferStore()
      store.offers = mockOffers
      store.originFilter = 'BER'

      expect(store.filteredOffers.length).toBe(1)
      expect(store.filteredOffers[0]!.origin).toBe('BER')
    })

    it('sorts offers by price correctly', () => {
      const store = useOfferStore()
      store.offers = mockOffers
      store.sortBy = 'price'

      expect(store.filteredOffers[0]!.price.amount).toBe(100)
      expect(store.filteredOffers[1]!.price.amount).toBe(200)
    })

    it('sorts offers by date and time chronologically', () => {
      const store = useOfferStore()

      store.offers = [
        createMockOffer({
          uuid: 'late',
          departureDate: '2026-12-01',
          departureTime: '20:00'
        }),
        createMockOffer({
          uuid: 'early',
          departureDate: '2026-12-01',
          departureTime: '08:00'
        }),
        createMockOffer({
          uuid: 'next-day',
          departureDate: '2026-12-02',
          departureTime: '05:00'
        })
      ]

      store.sortBy = 'date'

      const results = store.filteredOffers

      expect(results[0]!.uuid).toBe('early')
      expect(results[1]!.uuid).toBe('late')
      expect(results[2]!.uuid).toBe('next-day')
    })
  })

  describe('actions: fetchOffers', () => {
    it('sets loading to true while fetching and false after', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ priceOffers: [] }),
      }))

      const store = useOfferStore()
      const fetchPromise = store.fetchOffers()

      expect(store.loading).toBe(true)
      await fetchPromise
      expect(store.loading).toBe(false)
    })

    it('sets error to true if fetch fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false
      } as Response)

      const store = useOfferStore()
      await store.fetchOffers()

      expect(store.error).toBe(true)
      expect(store.loading).toBe(false)

      vi.restoreAllMocks()
    })
  })
})
