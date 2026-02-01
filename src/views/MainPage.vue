<template>
  <main class="container">
    <AdvancedSearch
    v-model="searchCriteria"
    @search="handleSearch"
    />
    <SortingDropdown
      v-model="store.sortBy"
    />
    <OfferList />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdvancedSearch from '@/components/search/AdvancedSearch.vue'
import SortingDropdown from '@/components/filters/SortingDropdown.vue'
import OfferList from '@/components/offers/OfferList.vue'
import { useOfferStore } from '@/stores/OfferStore'
import type { SearchCriteria } from '@/types/SearchCriteria'

const store = useOfferStore()

const searchCriteria = ref<SearchCriteria>({
  origin: '',
  destination: '',
  departureDate: null,
  returnDate: null,
})

function handleSearch(criteria: SearchCriteria) {
  store.originFilter = criteria.origin
  store.destinationFilter = criteria.destination
  store.departureDateFilter = criteria.departureDate ?? ''
  store.returnDateFilter = criteria.returnDate ?? ''
}
</script>

<style scoped>
.container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
