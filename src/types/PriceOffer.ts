// src/types/PriceOffer.ts
export interface Price {
  amount: number
  currency: string
}

export interface PriceOffer {
  uuid: string            // matches your JSON
  origin: string          // e.g., "BER"
  destination: string     // e.g., "CGN"
  departureDate: string   // e.g., "2026-02-10"
  departureTime: string   // e.g., "08:15"
  arrivalDate?: string    // optional, in case returnDate differs
  arrivalTime: string     // e.g., "09:25"
  returnDate?: string     // optional
  seatAvailability?: number
  offerType?: string
  durationMinutes?: number  // optional, can be calculated dynamically
  price: Price
}
