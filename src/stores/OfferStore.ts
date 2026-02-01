import { defineStore } from 'pinia'
import type { PriceOffer } from '@/types/PriceOffer'
import type { SortBy } from '@/types/SortBy'

export const useOfferStore = defineStore('offers', {
  state: () => ({
    offers: [] as PriceOffer[],
    originFilter: '',
    destinationFilter: '',
    departureDateFilter: '',
    returnDateFilter: '',
    sortBy: 'departureTime' as SortBy,
    error: false,
    loading: false,
  }),

  getters: {
    filteredOffers(state): PriceOffer[] {
      return [...state.offers]
        .filter(o =>
          (!state.originFilter || o.origin.includes(state.originFilter)) &&
          (!state.destinationFilter || o.destination.includes(state.destinationFilter))
        )
        .sort((a, b) => {
          switch (state.sortBy) {
            case 'price':
              return a.price.amount - b.price.amount

            case 'duration':
              return (a.durationMinutes ?? 0) - (b.durationMinutes ?? 0)

            case 'date': {
              // Proper chronological sorting (date + time)
              const dateA = new Date(`${a.departureDate}T${a.departureTime}`)
              const dateB = new Date(`${b.departureDate}T${b.departureTime}`)
              return dateA.getTime() - dateB.getTime()
            }

            case 'departureTime':
            default:
              // Time-only sort (same-day comparison)
              return a.departureTime.localeCompare(b.departureTime)
          }
        })
    },
  },

  actions: {
    async fetchOffers() {
      try {
        this.loading = true
        this.error = false
        const res = await fetch('http://localhost:3001/api/price-offers')
        const data = await res.json()
        this.offers = data.priceOffers
      } catch (err) {
        console.error('Failed to fetch offers:', err)
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
})
