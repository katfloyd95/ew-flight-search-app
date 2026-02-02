import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import AdvancedSearch from './AdvancedSearch.vue'
import type { SearchCriteria } from '@/types/SearchCriteria'

describe('Advanced Search Component Behavior', () => {
  const initialData: SearchCriteria = {
    origin: '',
    destination: '',
    departureDate: null,
    returnDate: null,
  }

  it('renders all input fields with correct labels', () => {
    render(AdvancedSearch, { props: { modelValue: initialData } })

    expect(screen.getByLabelText('Departure airport')).toBeTruthy()
    expect(screen.getByLabelText('Destination airport')).toBeTruthy()
    expect(screen.getByLabelText('Departure date')).toBeTruthy()
    expect(screen.getByLabelText('Return date')).toBeTruthy()
  })

  it('updates local state and emits search event with transformed data', async () => {
    const { emitted } = render(AdvancedSearch, {
      props: { modelValue: initialData },
    })

    const originInput = screen.getByLabelText('Departure airport')
    const destinationInput = screen.getByLabelText('Destination airport')
    const searchButton = screen.getByRole('button', { name: /search/i })

    await fireEvent.update(originInput, 'ber')
    await fireEvent.update(destinationInput, 'mad')
    await fireEvent.click(searchButton)

    expect(emitted()['update:modelValue']).toBeTruthy()

    const modelUpdateEvents = emitted()['update:modelValue']![0] as [SearchCriteria]
    expect(modelUpdateEvents[0].origin).toBe('ber')

    expect(emitted().search).toBeTruthy()
    const searchEmittedArgs = emitted().search![0] as [SearchCriteria]
    const result = searchEmittedArgs[0]

    expect(result.origin).toBe('BER')
    expect(result.destination).toBe('MAD')
  })

  it('triggers search when Enter key is pressed in an input', async () => {
    const { emitted } = render(AdvancedSearch, {
      props: { modelValue: initialData },
    })

    const originInput = screen.getByLabelText('Departure airport')

    await fireEvent.update(originInput, 'fra')
    await fireEvent.keyUp(originInput, { key: 'Enter' })

    expect(emitted().search).toBeTruthy()

    const emittedSearch = emitted().search![0] as [SearchCriteria]
    const searchData = emittedSearch[0]

    expect(searchData.origin).toBe('FRA')
    expect(searchData.destination).toBe('')
  })

  it('syncs local state when props change externally', async () => {
    const { rerender } = render(AdvancedSearch, {
      props: { modelValue: initialData },
    })

    const newCriteria: SearchCriteria = {
      origin: 'JFK',
      destination: 'LAX',
      departureDate: '2026-05-01',
      returnDate: null,
    }

    await rerender({ modelValue: newCriteria })

    const originInput = screen.getByLabelText('Departure airport') as HTMLInputElement
    expect(originInput.value).toBe('JFK')
  })
})
