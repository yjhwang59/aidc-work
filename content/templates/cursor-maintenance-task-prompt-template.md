---
title: "Cursor 維護任務提示詞範本"
description: "標準化的 Cursor Agent 提示詞模板，適用於 bug 修復、小型重構、內容更新等日常維護任務，確保 AI 產出品質一致。"
date: "2026-06-05"
author: "Jack Y. J. Hwang"
format: "Markdown"
tags: ["Cursor", "Prompt", "維護任務", "Vibe Coding"]
category: "開發工具"
draft: false
---

## 用途

本範本供團隊在 Cursor 中執行日常維護任務時使用。透過標準化提示詞結構，讓 AI Agent 每次都能：

- 理解任務脈絡與限制
- 遵循專案慣例
- 產出可審閱、可追溯的變更
- 避免過度修改或引入非必要依賴

**適用場景**：Bug 修復、小型功能調整、內容更新、lint 修復、文件補充。

---

## 使用方式

1. 複製下方「通用維護任務範本」
2. 將 `[方括號]` 內容替換為實際資訊
3. 在 Cursor Agent 模式中貼上並執行
4. 審閱 diff 後，依專案流程提交 PR

---

## 通用維護任務範本

```markdown
請協助完成以下維護任務。

## 任務描述

[簡述要解決的問題或要做的變更，1–3 句話]

## 預期結果

- [驗收條件 1]
- [驗收條件 2]
- [驗收條件 3]

## 相關檔案（若已知）

- [檔案路徑 1]
- [檔案路徑 2]

## 限制條件

- 最小變更範圍，不修改無關檔案
- 不引入新的 npm 依賴（除非任務明確需要）
- 遵循現有專案慣例與程式碼風格
- [其他專案特定限制]

## 執行步驟

1. 先閱讀相關檔案與 AGENTS.md / docs/ 中的專案規範
2. 規劃變更範圍並說明做法
3. 實作變更
4. 執行 `npm run build`（與 lint，若專案有設定）確認無誤
5. 列出修改的檔案與變更摘要

## 輸出要求

- 使用繁體中文說明
- 變更摘要聚焦「為什麼改」而非只列檔名
- 若有未完成的項目或需要人工確認的地方，明確標註
```

---

## 情境範本

### Bug 修復

```markdown
請修復以下問題。

## 問題描述

[描述 bug 現象]

## 重現步驟

1. [步驟 1]
2. [步驟 2]

## 預期行為

[應該發生什麼]

## 實際行為

[目前發生什麼]

## 相關檔案

- [可能相關的檔案]

## 限制

- 以最小變更修復根本原因，不做順便重構
- 修復後執行 `npm run build` 確認通過
- 說明根本原因與修復方式
```

### 內容新增

```markdown
請為 [blog/cases/courses/templates] 新增一篇內容。

## 主題

[內容主題]

## 要求

- 使用繁體中文
- 包含完整 frontmatter（title, description, date, author, tags, category, draft）
- 檔名使用 kebab-case 英文 slug
- 符合 docs/content-strategy.md 的撰寫規範
- 案例需去識別化，不使用真實客戶資料
- 輸出為 Markdown 格式，放入 content/[類型]/ 目錄

## 參考

- docs/brand-guide.md
- docs/content-strategy.md
- 現有 content/ 下的範例檔案
```

### 小型重構

```markdown
請重構 [模組/元件名稱]。

## 目前問題

[例如：重複邏輯、難以測試、命名不一致]

## 重構目標

[例如：抽取共用函式、改善型別安全]

## 限制

- 不改變外部行為與公開 API
- 不引入非必要依賴
- 保持最小 diff
- 重構後執行 `npm run build` 確認通過
- 說明重構理由與變更檔案清單
```

### Lint / Type 錯誤批次修復

```markdown
請修復以下 lint / TypeScript 錯誤。

## 錯誤清單

[貼上錯誤訊息或指出相關檔案]

## 限制

- 只修復錯誤，不做無關重構
- 不修復與本次任務無關的既有警告
- 修復後執行 `npm run lint` 與 `npm run build` 確認通過
```

---

## 品質檢核（任務完成後自問）

- [ ] 變更範圍是否聚焦在任務本身？
- [ ] 是否遵循專案既有慣例？
- [ ] `npm run build` 是否通過？
- [ ] commit message / PR 說明是否清楚？
- [ ] 有無需要人工進一步確認的項目？

---

## 進階建議

### 在 repo 中維護 AGENTS.md

將專案目標、技術限制、命名慣例寫入 `AGENTS.md`，Cursor Agent 會自動參考，減少每次重複說明的成本。

### 任務拆小

一個提示詞對應一個 PR 主題。巨型任務拆成多個小任務，審閱與 rollback 都更容易。

### 保留好的對話

若某次提示詞產出特別好，將其整理進本範本，讓團隊共用。

---

相關資源：[Cursor、Codex、GitHub 的 AI 開發工作流](/blog/cursor-codex-github-ai-dev-workflow)
