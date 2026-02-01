<template>
  <article class="card">
    <div>
      <h4>{{ formatDate(offer.departureDate) }}</h4>
    </div>
    <div class="info-section">
      <div class="info">
        <div class="route">
          <div>
            <strong>{{ offer.origin }}</strong>
          →
          <strong>{{ offer.destination }}</strong>
          </div>
          <div class="flight-times">
            <span>{{ formattedTime }}</span>
          </div>
        </div>
        <div class="duration">
          <p>Duration</p>
          <span>{{ formattedDuration }}</span>
        </div>
        <div class="connection">
          <p>Connection</p>
          <p>Nonstop</p>
        </div>
      </div>

      <div class="price">
        <span aria-label="Price">
          {{ offer.price.amount.toFixed(2) }} €
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PriceOffer } from '@/types/PriceOffer'
import { computed } from 'vue'
import { formatDuration } from '@/utils/timeUtils';
import { formatDate } from '@/utils/dateUtils';

const props = defineProps<{
  offer: PriceOffer
}>()

const formattedTime = computed(() =>
  `${props.offer.departureTime} – ${props.offer.arrivalTime}`
)

const formattedDuration = computed(() =>
  formatDuration(props.offer.departureTime, props.offer.arrivalTime)
)
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
}
.info-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.info {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.duration,
.connection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.duration > p,
.connection > p {
  margin: 0;
}

@media (min-width: 768px) {
  .info {
    gap: 50px;
  }
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: right;
}
</style>
