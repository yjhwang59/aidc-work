# Prompt 模板

> 供 Cursor Agent 與 AI 輔助開發使用的標準 Prompt 模板

本文件中的模板專為 **AIDC.work** 專案設計，請搭配根目錄 `AGENTS.md` 與 `docs/` 文件使用。

---

## 1. 專案上下文 Prompt

在開始新任務前，貼上此 Prompt 讓 AI 理解專案背景。

```markdown
你正在協助開發 AIDC.work — Jack Y. J. Hwang 的企業 AI 發展顧問網站。

專案定位：
- 企業 AI 發展顧問網站
- 顧問內容資產庫（文章、案例、模板、課程）
- AI 開發成果展示平台

技術棧：Next.js App Router、TypeScript、Tailwind CSS、MDX/Markdown、靜態優先。
MVP 限制：無資料庫、無認證、無 CMS、不引入非必要依賴。

主要路由：/、/about、/services、/cases、/courses、/blog、/templates、/contact
內容目錄：content/blog、content/cases、content/courses、content/templates

品牌語氣：專業、務實、可信賴、清晰。主要語言為繁體中文。
定位語：協助企業從 AI 工具使用，走向 AI 系統開發與 AI Agent 工作流落地。

請先閱讀 AGENTS.md 與相關 docs/ 文件，再進行任務。
```

---

## 2. 新頁面開發 Prompt

```markdown
請為 AIDC.work 建立 [頁面名稱] 頁面。

路由：[/路由路徑]
參考文件：docs/site-map.md、docs/brand-guide.md

要求：
1. 使用 Next.js App Router + TypeScript + Tailwind CSS
2. 遵循靜態優先架構，不引入非必要依賴
3. 響應式設計（mobile-first）
4. 文案使用繁體中文，語氣專業務實
5. 不修改與此頁面無關的現有程式碼
6. 完成後說明新增/修改的檔案

頁面內容需求：
[描述此頁面應包含的區塊與內容]
```

---

## 3. 內容列表與詳情頁 Prompt

```markdown
請實作 AIDC.work 的 [blog/cases/courses/templates] 列表頁與 [slug] 詳情頁。

內容來源：content/[類型]/
參考文件：docs/site-map.md、docs/development-workflow.md

要求：
1. 從 content/ 目錄讀取 MDX/Markdown 檔案
2. 解析 frontmatter（title, description, date, tags, category）
3. 列表頁顯示標題、日期、摘要、標籤
4. 詳情頁渲染 MDX 內容
5. 使用靜態生成（generateStaticParams）
6. 不引入 CMS 或資料庫
7. TypeScript + Tailwind CSS

frontmatter 範本：
---
title: ""
description: ""
date: ""
author: "Jack Y. J. Hwang"
tags: []
category: ""
draft: false
---
```

---

## 4. 新增內容文章 Prompt

```markdown
請為 AIDC.work 撰寫一篇 [部落格文章/案例/課程說明/模板]。

主題：[主題]
目標讀者：[例如：企業技術主管]
內容支柱：[企業 AI 導入 / Vibe Coding / AI Agent 工作流 / 顧問模板]
參考文件：docs/content-strategy.md、docs/brand-guide.md

要求：
1. 使用繁體中文
2. 語氣專業、務實、可信賴，避免流行語堆砌
3. 包含完整 frontmatter
4. 建議 slug：[kebab-case-slug]
5. 文章結構清晰，有實質可帶走的觀點或步驟
6. 字數約 [800-1500] 字
7. 輸出為 MDX 格式，可直接放入 content/[類型]/ 目錄
```

---

## 5. UI 元件開發 Prompt

```markdown
請為 AIDC.work 建立 [元件名稱] 元件。

用途：[描述元件用途]
使用頁面：[列出會使用此元件的頁面]

要求：
1. TypeScript + Tailwind CSS
2. 遵循 docs/brand-guide.md 視覺方向（簡潔、專業）
3. 響應式設計
4. 可存取性基本考量（語意化 HTML、適當 aria）
5. 不引入額外 UI 函式庫（除非專案已有）
6. 保持最小必要 props 介面
```

---

## 6. Bug 修復 Prompt

```markdown
AIDC.work 出現以下問題：

問題描述：[描述]
重現步驟：[步驟]
預期行為：[預期]
實際行為：[實際]
相關檔案：[若已知]

請：
1. 診斷根本原因
2. 以最小變更範圍修復
3. 不引入非必要依賴
4. 確認 npm run build 可通過
5. 說明修改了哪些檔案與原因
```

---

## 7. 重構 Prompt

```markdown
請重構 AIDC.work 的 [模組/元件/功能]。

目前問題：[例如：重複邏輯、難以維護]
重構目標：[例如：抽取共用函式、改善型別安全]

限制：
1. 不改變外部行為與 API
2. 不引入非必要依賴
3. 保持最小 diff
4. 遵循現有專案慣例
5. 完成後列出變更檔案與重構理由
```

---

## 8. 文件撰寫 Prompt

```markdown
請為 AIDC.work 更新/新增 [文件名稱]。

文件路徑：docs/[檔名].md
參考：AGENTS.md、現有 docs/ 文件

要求：
1. 使用繁體中文
2. 符合 AIDC.work 定位（顧問網站、內容資產庫、成果展示）
3. 內容務實可執行，避免空泛描述
4. 與其他 docs/ 文件交叉引用
5. 不修改程式碼
```

---

## 9. 種子內容批次產生 Prompt

```markdown
請為 AIDC.work MVP 上線產生種子內容。

需要：
- 部落格文章 2 篇
- 案例研究 1 則
- 課程說明 1 門
- 模板 1 個

主題方向：
1. 企業 AI 導入路線圖入門
2. Vibe Coding 簡介與企業應用
3. 匿名製造業 AI 工作流案例
4. Vibe Coding 實戰工作坊
5. AI 導入評估檢核表

要求：
1. 每篇含完整 frontmatter
2. 繁體中文，符合 docs/brand-guide.md
3. 輸出 MDX 格式
4. 案例使用匿名處理
5. 建議的 slug 與檔案路徑
```

---

## 10. Code Review Prompt

```markdown
請審閱以下 AIDC.work 的變更：

[貼上 diff 或描述變更]

審閱重點：
1. 是否符合 AGENTS.md 與 docs/ 規範？
2. 是否引入非必要依賴？
3. TypeScript 型別是否安全？
4. 響應式與可存取性？
5. 文案是否為繁體中文且符合品牌語氣？
6. 變更範圍是否過大？
7. 有無敏感資訊？

請列出問題與改善建議，按嚴重程度排序。
```

---

## 使用建議

| 情境 | 建議模板 |
|------|----------|
| 新開發者 / 新 Agent 進入專案 | #1 專案上下文 |
| 建立新頁面 | #2 新頁面開發 |
| 實作內容系統 | #3 內容列表與詳情頁 |
| 撰寫文章或案例 | #4 新增內容文章 |
| 建立共用元件 | #5 UI 元件開發 |
| 修復問題 | #6 Bug 修復 |
| 改善程式結構 | #7 重構 |
| 更新文件 | #8 文件撰寫 |
| MVP 內容準備 | #9 種子內容批次產生 |
| PR 審閱 | #10 Code Review |

## 相關文件

- [AGENTS.md](../AGENTS.md)
- [開發流程](./development-workflow.md)
- [內容策略](./content-strategy.md)
- [品牌指南](./brand-guide.md)
