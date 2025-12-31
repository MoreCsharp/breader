import request from '@/utils/request'
import type { BookSource } from '@/types/book'

// 获取书源列表
export function getBookSources() {
  return request.get<any, BookSource[]>('/getBookSources')
}

// 保存书源
export function saveBookSources(sources: BookSource[]) {
  return request.post('/saveBookSources', sources)
}

// 删除书源
export function deleteBookSources(sources: BookSource[]) {
  return request.post('/deleteBookSources', sources)
}
