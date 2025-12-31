# BReader 网页版阅读器设计文档

## 项目概述

基于 reader-legado 后端，开发一个仿微信读书风格的网页版阅读器。

---

## 技术栈

| 层面 | 方案 | 说明 |
|------|------|------|
| 框架 | Vue 3 + TypeScript | 组件化开发，类型安全 |
| 构建工具 | Vite | 快速热更新 |
| UI 组件库 | 手写组件 | 高度定制微信读书风格 |
| 状态管理 | Pinia | Vue 3 官方推荐 |
| 路由 | Vue Router | 标准方案 |
| HTTP 请求 | Axios | 成熟稳定 |
| 样式方案 | SCSS + CSS Variables | 支持主题切换 |

---

## 页面规划

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| 登录 | /login | 用户登录 |
| 注册 | /register | 用户注册 |
| 书架 | / | 收藏的书籍列表（首页） |
| 搜索 | /search | 关键词搜索入口 |
| 搜索结果 | /search/result | 书籍列表展示 |
| 书籍详情 | /book/:id | 封面、简介、开始阅读 |
| 目录 | /book/:id/toc | 章节列表 |
| 阅读器 | /read/:bookId/:chapterId | 正文显示、翻页、设置 |
| 书源管理 | /sources | 本地导入/在线导入 |

---

## 前端项目结构

```
breader-web/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                # API 接口封装
│   │   ├── index.ts
│   │   ├── auth.ts         # 登录注册
│   │   ├── book.ts         # 书籍相关
│   │   ├── bookSource.ts   # 书源相关
│   │   └── types.ts        # 接口类型定义
│   ├── assets/             # 静态资源
│   │   ├── fonts/          # 字体文件
│   │   └── images/         # 图片
│   ├── components/         # 通用组件
│   │   ├── BookCard.vue    # 书籍卡片
│   │   ├── BookList.vue    # 书籍列表
│   │   ├── Loading.vue     # 加载状态
│   │   ├── NavBar.vue      # 顶部导航
│   │   ├── TabBar.vue      # 底部Tab
│   │   └── Empty.vue       # 空状态
│   ├── composables/        # 组合式函数
│   │   ├── useTheme.ts     # 主题切换
│   │   ├── useReader.ts    # 阅读器逻辑
│   │   └── useStorage.ts   # 本地存储
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── stores/             # Pinia 状态管理
│   │   ├── user.ts         # 用户状态
│   │   ├── book.ts         # 书籍状态
│   │   ├── bookshelf.ts    # 书架状态
│   │   └── reader.ts       # 阅读器状态
│   ├── styles/             # 全局样式
│   │   ├── variables.scss  # CSS 变量
│   │   ├── reset.scss      # 样式重置
│   │   ├── theme.scss      # 主题样式
│   │   └── global.scss     # 全局样式
│   ├── types/              # TypeScript 类型
│   │   ├── book.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # Axios 封装
│   │   ├── storage.ts      # 本地存储
│   │   └── format.ts       # 格式化工具
│   ├── views/              # 页面组件
│   │   ├── auth/
│   │   │   ├── Login.vue
│   │   │   └── Register.vue
│   │   ├── bookshelf/
│   │   │   └── Index.vue
│   │   ├── search/
│   │   │   ├── Index.vue
│   │   │   └── Result.vue
│   │   ├── book/
│   │   │   ├── Detail.vue
│   │   │   └── Toc.vue
│   │   ├── reader/
│   │   │   └── Index.vue
│   │   └── sources/
│   │       └── Index.vue
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 后端 API 需求

### 现有 API（reader-legado 已有）

| 接口 | 方法 | 功能 |
|------|------|------|
| /health | GET | 健康检查 |
| /getBookSources | GET | 获取书源列表 |
| /saveBookSource | POST | 保存书源 |
| /saveBookSources | POST | 批量保存书源 |
| /deleteBookSources | POST | 删除书源 |

### 需要新增的 API

| 接口 | 方法 | 功能 |
|------|------|------|
| /searchBook | GET | 搜索书籍 |
| /exploreBook | GET | 发现/分类浏览 |
| /getBookInfo | GET | 获取书籍详情 |
| /getChapterList | GET | 获取章节目录 |
| /getBookContent | GET | 获取章节正文 |
| /user/register | POST | 用户注册 |
| /user/login | POST | 用户登录 |
| /user/info | GET | 获取用户信息 |
| /bookshelf/list | GET | 获取书架列表 |
| /bookshelf/add | POST | 添加到书架 |
| /bookshelf/remove | POST | 从书架移除 |
| /bookshelf/progress | POST | 更新阅读进度 |

---

## 微信读书风格设计规范

### 配色方案

```scss
// 日间模式
$color-bg: #ffffff;
$color-bg-secondary: #f7f7f7;
$color-text: #333333;
$color-text-secondary: #999999;
$color-primary: #1e88e5;
$color-border: #e5e5e5;

// 夜间模式
$color-bg-dark: #1a1a1a;
$color-bg-secondary-dark: #2a2a2a;
$color-text-dark: #cccccc;
$color-text-secondary-dark: #666666;
```

### 字体

```scss
$font-family-reading: 'Source Han Serif SC', 'Noto Serif SC', serif;
$font-family-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 阅读器设置

- 字体大小: 16px - 28px
- 行高: 1.6 - 2.2
- 页边距: 16px - 48px
- 背景色: 白色/米黄/绿色/夜间

---

## 核心功能详细设计

### 1. 阅读器

- 翻页模式: 上下滚动 / 左右翻页
- 进度条显示
- 章节跳转
- 字体/字号/背景设置
- 阅读进度自动保存

### 2. 书架

- 网格/列表视图切换
- 最近阅读排序
- 阅读进度显示
- 长按管理（删除、置顶）

### 3. 搜索

- 多书源并行搜索
- 搜索历史
- 热门推荐

### 4. 书源管理

- 本地文件导入（JSON）
- 在线书源订阅
- 书源启用/禁用
- 书源排序

---

## 开发计划

### 第一阶段：基础框架
- [ ] 创建 Vue 3 项目
- [ ] 配置路由和状态管理
- [ ] 实现基础布局组件
- [ ] 封装 API 请求

### 第二阶段：后端 API
- [ ] 添加搜索接口
- [ ] 添加书籍详情接口
- [ ] 添加章节目录接口
- [ ] 添加章节内容接口

### 第三阶段：核心页面
- [ ] 书架页面
- [ ] 搜索页面
- [ ] 书籍详情页
- [ ] 阅读器页面

### 第四阶段：用户系统
- [ ] 登录注册
- [ ] 书架同步
- [ ] 阅读进度同步

### 第五阶段：优化完善
- [ ] 主题切换
- [ ] 性能优化
- [ ] PWA 支持
