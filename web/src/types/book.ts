// 书源
export interface BookSource {
  bookSourceUrl: string
  bookSourceName: string
  bookSourceGroup?: string
  bookSourceType?: number
  enabled?: boolean
  exploreUrl?: string
}

// 搜索结果书籍
export interface SearchBook {
  name: string
  author: string
  kind?: string
  bookUrl: string
  coverUrl?: string
  intro?: string
  latestChapterTitle?: string
  origin: string
  originName: string
  wordCount?: string
}

// 书籍详情
export interface Book extends SearchBook {
  tocUrl: string
  totalChapterNum?: number
}

// 章节
export interface BookChapter {
  url: string
  title: string
  index: number
  bookUrl: string
  isVolume?: boolean
}
