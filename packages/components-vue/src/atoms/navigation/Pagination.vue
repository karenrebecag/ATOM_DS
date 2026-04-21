<script setup lang="ts">
/**
 * Pagination (Atom)
 *
 * Table pagination with page size selector and navigation controls.
 *
 * Data Attributes (Animation Contract):
 * - data-pagination: Root element (discovery)
 *
 * Usage:
 * <Pagination :current-page="1" :total-pages="10" @page-change="goTo" />
 * <Pagination :current-page="page" :total-pages="50" :page-size="25" @page-size-change="resize" />
 *
 * @see packages/css/src/components/pagination.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize?: number
  pageSizeOptions?: number[]
  isLoading?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  pageSizeOptions: () => [10, 25, 50, 100],
  isLoading: false
})

const emit = defineEmits<{
  pageChange: [page: number]
  pageSizeChange: [size: number]
}>()

const isFirstPage = computed(() => props.currentPage <= 1)
const isLastPage = computed(() => props.currentPage >= props.totalPages)

const paginationClasses = computed(() => [
  'pagination',
  {
    'pagination--loading': props.isLoading
  },
  props.class
])

function handlePageSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('pageSizeChange', Number(target.value))
}
</script>

<template>
  <nav
    :class="paginationClasses"
    data-pagination
    aria-label="Pagination"
    :aria-busy="isLoading ? 'true' : undefined"
  >
    <div v-if="pageSizeOptions.length > 0" class="pagination__page-size">
      <label class="pagination__page-size-label" for="pagination-page-size">
        Rows per page
      </label>
      <select
        id="pagination-page-size"
        class="pagination__page-size-select"
        :value="pageSize"
        :disabled="isLoading"
        @change="handlePageSizeChange"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <span class="pagination__info" aria-live="polite">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <div class="pagination__controls">
      <button
        type="button"
        class="pagination__button pagination__button--prev"
        :disabled="isFirstPage || isLoading"
        aria-label="Previous page"
        @click="emit('pageChange', currentPage - 1)"
      >
        <span class="pagination__icon pagination__icon--prev" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="pagination__button pagination__button--next"
        :disabled="isLastPage || isLoading"
        aria-label="Next page"
        @click="emit('pageChange', currentPage + 1)"
      >
        <span class="pagination__icon pagination__icon--next" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
