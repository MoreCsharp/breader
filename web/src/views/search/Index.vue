<template>
  <div class="search-page">
    <header class="header">
      <div class="search-box">
        <input
          v-model="keyword"
          type="text"
          placeholder="搜索书名或作者"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch">搜索</button>
      </div>
    </header>
    <div class="content">
      <div class="history" v-if="history.length">
        <div class="title">搜索历史</div>
        <div class="tags">
          <span
            v-for="item in history"
            :key="item"
            @click="keyword = item; doSearch()"
          >{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const history = ref<string[]>(
  JSON.parse(localStorage.getItem('searchHistory') || '[]')
)

function doSearch() {
  if (!keyword.value.trim()) return
  // 保存历史
  const arr = history.value.filter(h => h !== keyword.value)
  arr.unshift(keyword.value)
  history.value = arr.slice(0, 10)
  localStorage.setItem('searchHistory', JSON.stringify(history.value))
  // 跳转
  router.push({ path: '/search/result', query: { keyword: keyword.value } })
}
</script>

<style scoped lang="scss">
.search-page { padding-bottom: 56px; }

.header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.search-box {
  display: flex;
  gap: 8px;
  input {
    flex: 1;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
  }
  button {
    padding: 0 16px;
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-md);
  }
}

.content { padding: var(--spacing-md); }

.history {
  .title {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    span {
      padding: 6px 12px;
      background: var(--color-bg-secondary);
      border-radius: var(--radius-sm);
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>
