<template>
  <section aria-labelledby="offers-heading">
    <h2 id="offers-heading" class="visually-hidden">Flight offers</h2>

    <div v-if="store.loading" data-testid="loading" class="offer-loading">
      <p>Loading flight offers…</p>
    </div>

    <div v-else-if="store.error" data-testid="error" class="offer-loading-error">
      <p>An error occurred while fetching flight offers.</p>
    </div>

    <ul v-else class="list" data-testid="offers-list">
      <li v-for="offer in offers" :key="offer.uuid">
        <OfferCard :offer="offer" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useOfferStore } from '@/stores/OfferStore'
import OfferCard from './OfferCard.vue'

const store = useOfferStore()

onMounted(() => {
  store.fetchOffers()
})

const offers = computed(() => store.filteredOffers)
</script>

<style scoped>
.list {
  display: grid;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.offer-loading-error,
.offer-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  background-color: #ffe6e6;
  color: #a00;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
