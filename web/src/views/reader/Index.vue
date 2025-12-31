<template>
  <div class="reader" :style="readerStyle">
    <header class="header" v-show="showMenu">
      <button class="back" @click="$router.back()">←</button>
      <span class="title">{{ chapter?.title }}</span>
    </header>
    <div class="content" @click="toggleMenu">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="text" v-html="formattedContent"></div>
    </div>
    <footer class="footer" v-show="showMenu">
      <button @click="prevChapter" :disabled="chapterIndex <= 0">上一章</button>
      <span>{{ chapterIndex + 1 }}</span>
      <button @click="nextChapter">下一章</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getChapterList, getBookContent } from '@/api/book'
import type { BookChapter } from '@/types/book'

const route = useRoute()
const router = useRouter()

const bookUrl = decodeURIComponent(route.params.bookUrl as string)
const sourceUrl = decodeURIComponent(route.query.source as string || '')
const chapterIndex = ref(parseInt(route.params.chapterIndex as string) || 0)

const chapters = ref<BookChapter[]>([])
const content = ref('')
const loading = ref(true)
const showMenu = ref(false)

const chapter = computed(() => chapters.value[chapterIndex.value])
const formattedContent = computed(() =>
  content.value.split('\n').map(p => `<p>${p}</p>`).join('')
)
const readerStyle = { background: '#f5e6c8' }

function toggleMenu() { showMenu.value = !showMenu.value }

async function loadChapters() {
  chapters.value = await getChapterList(sourceUrl, bookUrl)
  await loadContent()
}

async function loadContent() {
  if (!chapter.value) return
  loading.value = true
  try {
    const res = await getBookContent({
      bookSourceUrl: sourceUrl,
      bookUrl,
      chapterUrl: chapter.value.url,
      chapterIndex: chapterIndex.value
    })
    content.value = res.content
  } finally {
    loading.value = false
    window.scrollTo(0, 0)
  }
}

function prevChapter() {
  if (chapterIndex.value > 0) {
    chapterIndex.value--
    loadContent()
  }
}

function nextChapter() {
  if (chapterIndex.value < chapters.value.length - 1) {
    chapterIndex.value++
    loadContent()
  }
}

onMounted(loadChapters)
</script>

<style scoped lang="scss">
.reader {
  min-height: 100vh;
  font-family: var(--font-family-reading);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0,0,0,0.8);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 10;
  .back { background: none; color: #fff; font-size: 18px; }
  .title { margin-left: 12px; }
}

.content {
  padding: 60px 20px;
  min-height: 100vh;
}

.loading {
  text-align: center;
  padding: 40px;
}

.text {
  font-size: 18px;
  line-height: 1.8;
  :deep(p) {
    text-indent: 2em;
    margin-bottom: 1em;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
  button {
    background: none;
    color: #fff;
    padding: 8px 16px;
    &:disabled { opacity: 0.5; }
  }
  span { color: #fff; }
}
</style>
