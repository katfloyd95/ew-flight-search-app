<template>
  <section class="search-section" aria-labelledby="search-heading">
    <h2 id="search-heading" class="visually-hidden">Search flights</h2>
    <div class="fields">
      <div class="airport-field">
        <label for="origin">Departure airport</label>
        <input
          id="origin"
          type="text"
          placeholder="e.g. BER"
          v-model="local.origin"
          @keyup.enter="search"
        />
      </div>
      <div class="airport-field">
        <label for="destination">Destination airport</label>
        <input
          id="destination"
          type="text"
          v-model="local.destination"
          placeholder="e.g. CGN"
          @keyup.enter="search"
        />
      </div>
      </div>
      <div class="fields">
      <div class="date-field">
        <label for="departureDate">Departure date</label>
        <input
          id="departureDate"
          type="date"
          v-model="local.departureDate"
          @keyup.enter="search"
        />
      </div>

      <div class="date-field">
        <label for="returnDate">Return date</label>
        <input
          id="returnDate"
          type="date"
          v-model="local.returnDate"
          @keyup.enter="search"
        />
      </div>
      <button class="search-btn" @click="search">
      Search
    </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SearchCriteria } from '@/types/SearchCriteria'

const props = defineProps<{
  modelValue: SearchCriteria
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SearchCriteria): void
  (e: 'search', value: SearchCriteria): void
}>()

const local = ref<SearchCriteria>({ ...props.modelValue })

watch(
  () => props.modelValue,
  value => (local.value = { ...value })
)

function search() {
  const normalizedCriteria: SearchCriteria = {
    ...local.value,
    origin: local.value.origin?.toUpperCase().trim() ?? '',
    destination: local.value.destination?.toUpperCase().trim() ?? '',
  }

  emit('update:modelValue', normalizedCriteria)
  emit('search', normalizedCriteria)
}
</script>

<style scoped>
.search-section {
  margin-bottom: 1rem;
  gap: 0.75rem;
}
.airport-field {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.75em;
}
.date-field {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
}
.search-btn {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}

.field {
  flex: 1;
}

label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

input {
  max-width: 100%;
  padding: 0.5rem;
}

.search-btn {
  min-height: 44px;
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
@media (min-width: 768px) {
  .fields {
    flex-direction: row;
  }
}
</style>
