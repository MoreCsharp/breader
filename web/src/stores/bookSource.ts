import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BookSource } from '@/types/book'
import { getBookSources } from '@/api/bookSource'

export const useBookSourceStore = defineStore('bookSource', () => {
  const sources = ref<BookSource[]>([])
  const loading = ref(false)

  async function fetchSources() {
    loading.value = true
    try {
      sources.value = await getBookSources()
    } finally {
      loading.value = false
    }
  }

  return { sources, loading, fetchSources }
})
