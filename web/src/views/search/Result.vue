<template>
  <div class="result-page">
    <header class="header">
      <button class="back" @click="$router.back()">←</button>
      <span>搜索: {{ keyword }}</span>
    </header>
    <div class="content">
      <div v-if="loading" class="loading">搜索中...</div>
      <div v-else-if="books.length === 0" class="empty">未找到相关书籍</div>
      <div v-else class="book-list">
        <div
          v-for="book in books"
          :key="book.bookUrl"
          class="book-item"
          @click="openBook(book)"
        >
          <div class="cover">
            <img v-if="book.coverUrl" :src="book.coverUrl" />
            <div v-else class="no-cover">{{ book.name.slice(0,2) }}</div>
          </div>
          <div class="info">
            <div class="name">{{ book.name }}</div>
            <div class="author">{{ book.author }}</div>
            <div class="source">来源: {{ book.originName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookSourceStore } from '@/stores/bookSource'
import { searchBook } from '@/api/book'
import type { SearchBook } from '@/types/book'

const route = useRoute()
const router = useRouter()
const sourceStore = useBookSourceStore()

const keyword = ref(route.query.keyword as string || '')
const books = ref<SearchBook[]>([])
const loading = ref(false)

async function doSearch() {
  if (!keyword.value) return
  await sourceStore.fetchSources()
  if (sourceStore.sources.length === 0) {
    alert('请先添加书源')
    return
  }
  loading.value = true
  books.value = []
  try {
    // 使用第一个书源搜索
    const source = sourceStore.sources[0]
    const result = await searchBook(source.bookSourceUrl, keyword.value)
    books.value = result
  } catch (e: any) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function openBook(book: SearchBook) {
  router.push(`/book/${encodeURIComponent(book.bookUrl)}?source=${encodeURIComponent(book.origin)}`)
}

onMounted(doSearch)
</script>

<style scoped lang="scss">
.result-page { min-height: 100vh; }

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  .back {
    background: none;
    font-size: 18px;
  }
}

.content { padding: var(--spacing-md); }
.loading, .empty {
  text-align: center;
  padding: 40px;
  color: var(--color-text-tertiary);
}

.book-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-divider);
  cursor: pointer;
}

.cover {
  width: 60px;
  height: 80px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-bg-secondary);
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
  .no-cover {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    color: var(--color-text-tertiary);
  }
}

.info {
  flex: 1;
  .name { font-weight: 500; margin-bottom: 4px; }
  .author, .source {
    font-size: 13px;
    color: var(--color-text-secondary);
  }
}
</style>