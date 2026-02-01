<template>
  <section class="sorting-section">
    <button
      class="toggle-btn"
      @click="toggle"
      :aria-expanded="open"
      aria-haspopup="listbox"
    >
      Sorted by: {{ label }}
    </button>

    <ul
      v-if="open"
      class="sorting-menu"
      role="sorting-list"
    >
      <li
        v-for="option in options"
        :key="option.value"
        role="option"
        tabindex="0"
        @click="select(option.value)"
        @keydown.enter.prevent="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOfferStore } from '@/stores/OfferStore'
import type { SortBy } from '@/types/SortBy'

const store = useOfferStore()
const open = ref(false)

const options: { value: SortBy; label: string }[] = [
  { value: 'date', label: 'Departure date' },
  { value: 'departureTime', label: 'Departure time' },
  { value: 'price', label: 'Price' },
  { value: 'duration', label: 'Duration' },
]

const label = computed(() =>
  options.find(o => o.value === store.sortBy)?.label ?? ''
)

function toggle() {
  open.value = !open.value
}

function select(value: SortBy) {
  store.sortBy = value
  open.value = false
}
</script>

<style scoped>
.sorting-section {
  position: relative;
  margin-bottom: 1rem;
}

.toggle-btn {
  padding: 0.5rem 0.75rem;
}

.sorting-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  width: 100%;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.sorting-menu li {
  padding: 0.5rem;
  cursor: pointer;
}

.sorting-menu li:hover,
.sorting-menu li:focus {
  background: #f0f0f0;
}
</style>
