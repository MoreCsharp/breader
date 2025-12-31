import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Book } from '@/types/book'

export const useBookshelfStore = defineStore('bookshelf', () => {
  const books = ref<Book[]>([])

  function addBook(book: Book) {
    if (!books.value.find(b => b.bookUrl === book.bookUrl)) {
      books.value.unshift(book)
      saveToLocal()
    }
  }

  function removeBook(bookUrl: string) {
    books.value = books.value.filter(b => b.bookUrl !== bookUrl)
    saveToLocal()
  }

  function saveToLocal() {
    localStorage.setItem('bookshelf', JSON.stringify(books.value))
  }

  function loadFromLocal() {
    const data = localStorage.getItem('bookshelf')
    if (data) {
      books.value = JSON.parse(data)
    }
  }

  return { books, addBook, removeBook, loadFromLocal }
})
