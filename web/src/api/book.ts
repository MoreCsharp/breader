import request from '@/utils/request'
import type { SearchBook, Book, BookChapter } from '@/types/book'

// 搜索书籍
export function searchBook(bookSourceUrl: string, keyword: string, page = 1) {
  return request.get<any, SearchBook[]>('/searchBook', {
    params: { bookSourceUrl, keyword, page }
  })
}

// 获取书籍详情
export function getBookInfo(bookSourceUrl: string, bookUrl: string) {
  return request.get<any, Book>('/getBookInfo', {
    params: { bookSourceUrl, bookUrl }
  })
}

// 获取章节目录
export function getChapterList(bookSourceUrl: string, bookUrl: string) {
  return request.get<any, BookChapter[]>('/getChapterList', {
    params: { bookSourceUrl, bookUrl }
  })
}

// 获取章节内容
export function getBookContent(params: {
  bookSourceUrl: string
  bookUrl: string
  chapterUrl: string
  chapterIndex?: number
}) {
  return request.get<any, { content: string }>('/getBookContent', { params })
}
