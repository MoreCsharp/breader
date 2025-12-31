<template>
  <div class="bookshelf">
    <header class="header">
      <h1>书架</h1>
    </header>
    <div class="content">
      <div v-if="books.length === 0" class="empty">
        <p>书架空空如也</p>
        <router-link to="/search" class="btn">去搜索</router-link>
      </div>
      <div v-else class="book-grid">
        <div
          v-for="book in books"
          :key="book.bookUrl"
          class="book-item"
          @click="openBook(book)"
        >
          <div class="cover">
            <img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.name" />
            <div v-else class="no-cover">{{ book.name.slice(0, 2) }}</div>
          </div>
          <div class="name">{{ book.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookshelfStore } from '@/stores/bookshelf'
import type { Book } from '@/types/book'

const router = useRouter()
const store = useBookshelfStore()
const books = computed(() => store.books)

store.loadFromLocal()

function openBook(book: Book) {
  router.push(`/book/${encodeURIComponent(book.bookUrl)}`)
}
</script>

<style scoped lang="scss">
.bookshelf {
  padding-bottom: 56px;
}

.header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  h1 { font-size: 18px; font-weight: 600; }
}

.content { padding: var(--spacing-md); }

.empty {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-tertiary);
  .btn {
    display: inline-block;
    margin-top: 16px;
    padding: 8px 24px;
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-md);
  }
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.book-item {
  cursor: pointer;
  .cover {
    aspect-ratio: 3/4;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--color-bg-secondary);
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  .no-cover {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; color: var(--color-text-tertiary);
  }
  .name {
    margin-top: 8px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
