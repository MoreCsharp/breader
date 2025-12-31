import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'bookshelf',
      component: () => import('@/views/bookshelf/Index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/Index.vue'),
    },
    {
      path: '/search/result',
      name: 'searchResult',
      component: () => import('@/views/search/Result.vue'),
    },
    {
      path: '/book/:bookUrl',
      name: 'bookDetail',
      component: () => import('@/views/book/Detail.vue'),
    },
    {
      path: '/read/:bookUrl/:chapterIndex',
      name: 'reader',
      component: () => import('@/views/reader/Index.vue'),
    },
    {
      path: '/sources',
      name: 'sources',
      component: () => import('@/views/sources/Index.vue'),
    },
  ],
})

export default router
