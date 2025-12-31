<template>
  <div class="book-detail">
    <header class="header">
      <button class="back" @click="$router.back()">←</button>
      <span>书籍详情</span>
    </header>
    <div v-if="loading" class="loading">加载中...</div>
    <template v-else-if="book">
      <div class="book-info">
        <div class="cover">
          <img v-if="book.coverUrl" :src="book.coverUrl" />
          <div v-else class="no-cover">{{ book.name.slice(0,2) }}</div>
        </div>
        <div class="meta">
          <h1>{{ book.name }}</h1>
          <p class="author">{{ book.author }}</p>
          <p class="intro">{{ book.intro }}</p>
        </div>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="startRead">开始阅读</button>
        <button class="btn-secondary" @click="addToShelf">加入书架</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookInfo } from '@/api/book'
import { useBookshelfStore } from '@/stores/bookshelf'
import type { Book } from '@/types/book'

const route = useRoute()
const router = useRouter()
const bookshelfStore = useBookshelfStore()

const bookUrl = decodeURIComponent(route.params.bookUrl as string)
const sourceUrl = decodeURIComponent(route.query.source as string || '')
const book = ref<Book | null>(null)
const loading = ref(true)

async function loadBook() {
  try {
    book.value = await getBookInfo(sourceUrl, bookUrl)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function startRead() {
  router.push(`/read/${encodeURIComponent(bookUrl)}/0?source=${encodeURIComponent(sourceUrl)}`)
}

function addToShelf() {
  if (book.value) {
    bookshelfStore.addBook(book.value)
    alert('已加入书架')
  }
}

onMounted(loadBook)
</script>

<style scoped lang="scss">
.book-detail { min-height: 100vh; }

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  .back { background: none; font-size: 18px; }
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--color-text-tertiary);
}

.book-info {
  display: flex;
  gap: 16px;
  padding: var(--spacing-md);
}

.cover {
  width: 100px;
  height: 133px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-bg-secondary);
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
  .no-cover {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    color: var(--color-text-tertiary);
  }
}

.meta {
  h1 { font-size: 18px; margin-bottom: 8px; }
  .author { color: var(--color-text-secondary); margin-bottom: 8px; }
  .intro {
    font-size: 13px;
    color: var(--color-text-tertiary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.actions {
  display: flex;
  gap: 12px;
  padding: 0 var(--spacing-md);
  button {
    flex: 1;
    height: 44px;
    border-radius: var(--radius-md);
    font-size: 15px;
  }
  .btn-primary {
    background: var(--color-primary);
    color: #fff;
  }
  .btn-secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text);
  }
}
</style>
