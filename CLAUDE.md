# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Quality inspection (质量检验) module embedded in the Apriso MES Portal. A standalone Vue 2 SPA with no router or Vuex — just a single view and components under one mount point.

## Build commands

Requires **Node.js 16.8.0**.

```bash
npm install        # install dependencies
npm run serve      # dev server with hot-reload
npm run build      # production build (outputs to dist/)
npm run lint       # ESLint check
```

## Tech stack

- Vue 2.6 + Element UI 2.15 (full import) + Vant 2.13 (on-demand via babel-plugin-import)
- vue-cli 5 + Babel + ESLint
- Less for styling
- `babel-plugin-import` configured for Vant on-demand (see babel.config.js)
- `jsconfig.json` sets `@/*` → `src/*` path alias

## Architecture

Single-view app — no Vue Router, no Vuex:

```
src/
  main.js            # entry: Vue.use(ElementUI), mounts App
  App.vue            # root: global Element UI overrides + renders HomeView
  views/
    HomeView.vue     # the only page: station select, table/form toggle, data flow hub
  components/
    HeaderInfo.vue       # search bar (order/month/VIN) + camera scan + station display
    SelectStation.vue    # facility → production line → work station cascading picker
    SpecialConfiguration.vue  # displays special config text for the current station
    TableContent.vue     # inspection item list table with OK/NG filtering
    FromQualitative.vue  # 定性 inspection form (DX type) — pass/fail + defects + images
    FromQuantitative.vue # 定量 inspection form (DL type) — measured value + auto-judge + defects + images
    MomUploaderPlus.vue  # unused: Vant-based image uploader (replaced by custom file input)
```

### Data flow

1. **Station selection**: `SelectStation` dialog → emits `updateStation` → `HomeView` saves to localStorage(`formLabelAlignStation`)
2. **Data loading**: `HomeView.getData()` calls `window.WorkStationFunc(valueObj, callback)` → returns order data with inspection items nested in `ResponseData[].DataList`
3. **Table/Form toggle**: `showTableContent` boolean switches between `TableContent` (list view) and `FromQualitative`/`FromQuantitative` (detail form)
4. **Form dispatch**: items with `Characteristicattr == 'DX'` render `FromQualitative`; `'DL'` renders `FromQuantitative`
5. **Save flow**: form submit → `window.StationInspectionAndPreservation()` for results + optionally `window.WreateIneligibleTicket()` for defect tickets (Andon/Quality/Both)
6. **Navigation**: "保存并继续" saves and auto-advances to next unfinished item via `clickNextFun()`

### Status codes

| Code | Meaning |
|------|---------|
| 0    | 未检测 |
| 8    | NG (不合格) |
| 14   | OK (合格) |

When `OrderStatus` is 8 or 14, the entire order is closed and forms become read-only (`isOrderFleg`).

### Apriso host integration

All backend communication goes through `window` global callbacks injected by the Apriso Portal:

| Global | Purpose |
|--------|---------|
| `window.getSelectionList(cb)` | Fetch facility/line/station tree |
| `window.WorkStationFunc(params, cb)` | Fetch inspection data for a station |
| `window.StationInspectionAndPreservation(data, cb)` | Save inspection result |
| `window.WreateIneligibleTicket(data, cb)` | Create defect/Andon ticket |
| `window.saveImgFils(fileObj, cb)` | Upload inspection images |
| `window.Operator` | Current operator name |
| `window.parent.OpenCamera(cb)` | Trigger camera scan (mobile app) |

These are the system boundary — they have no request/response types in the codebase. The callbacks receive `{ code: 0, msg: string, data: ... }` on success, non-zero code on failure.

### Image upload

Custom file input → `FileReader` → canvas resize/compress (JPEG quality 0.8) → base64 → `window.saveImgFils()`. Server paths containing `SharedFolder/` are rewritten to `[ServerPath]/` before saving. Max 30 images per inspection item.

### Mobile adaptations

- `HeaderInfo` detects mobile (iOS/Android userAgent) to show camera scan buttons
- Form components listen for keyboard resize events to adjust layout
- Vant UI is available for mobile-native components
