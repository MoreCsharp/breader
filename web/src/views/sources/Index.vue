<template>
  <div class="sources-page">
    <header class="header">
      <h1>书源管理</h1>
      <button @click="showImport = true">导入</button>
    </header>
    <div class="content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="sources.length === 0" class="empty">
        暂无书源，请先导入
      </div>
      <div v-else class="source-list">
        <div v-for="s in sources" :key="s.bookSourceUrl" class="source-item">
          <span class="name">{{ s.bookSourceName }}</span>
          <span class="url">{{ s.bookSourceUrl }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBookSourceStore } from '@/stores/bookSource'

const store = useBookSourceStore()
const sources = computed(() => store.sources)
const loading = computed(() => store.loading)

onMounted(() => store.fetchSources())
</script>

<style scoped lang="scss">
.sources-page { padding-bottom: 56px; }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  h1 { font-size: 18px; }
  button {
    padding: 6px 12px;
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-sm);
  }
}

.content { padding: var(--spacing-md); }
.loading, .empty {
  text-align: center;
  padding: 40px;
  color: var(--color-text-tertiary);
}

.source-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-divider);
  .name { display: block; font-weight: 500; }
  .url {
    font-size: 12px;
    color: var(--color-text-tertiary);
  }
}
</style>
