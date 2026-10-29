# Controls — Northline Design System (component spec)

**File key:** *(your Figma library's key — record it in `COMPANY-BUSINESS.md`, org-pack)*

## What this repo implements

| Area | Code |
|------|------|
| Tokens | `tokens.css` — `--ds-control-*`, `--ds-toggle-*`, `--ds-progress-*`, `--ds-loader-*`, `--ds-countdown-*`, `--ds-additional-background-positive` |
| Markup | `ds/Toggle.tsx`, `Radio.tsx`, `Checkbox.tsx`, `DragHandle.tsx`, `Swiper.tsx`, `Loader.tsx`, `ProgressBar.tsx`, `Tooltip.tsx`, `Separator.tsx`, `CountDown.tsx`, `Selector.tsx` |
| Visual rules | `ds.css` (`.ds-toggle`, `.ds-radio`, `.ds-checkbox`, …) |
| Catalog | Design Harness `#/design-system/controls` |

## API summary

| Component | Key props |
|-----------|-----------|
| `Toggle` | `size` sm\|lg · `checked` · `tone` positive\|negative · `label` |
| `Radio` | `checked` · `tone` black\|sea · `error` · `disabled` |
| `Checkbox` | `state` unchecked\|checked\|indeterminate · `tone` black\|sea · `error` |
| `DragHandle` | presentational grip |
| `Swiper` | `count` · `activeIndex` · `color` white\|black\|black-bg |
| `Loader` | `size` default\|sm\|xs |
| `ProgressBar` | `value` 0–1 · `size` mobile\|desktop |
| `Tooltip` | children |
| `Separator` | `type` basic\|or\|dark-text · `label` · padding flags |
| `CountDown` | `size` xl\|lg\|md\|sm\|xs · `label` · `progress` 0–1 |
| `Selector` | `options` · `value` · `onChange` |

### Token mapping (Figma → CSS)

| Figma | Token |
|-------|--------|
| Background/Additional/backgroundPositive | `--ds-additional-background-positive` |
| Background/Additional/backgroundNegative | `--ds-additional-background-negative` |
| Background/Additional/backgroundBlack / Sea | `--ds-additional-background-black` / `-sea` |
| Background/Core/backgroundQuaternary (toggle Off) | `--ds-core-background-quaternary` |
| Background/Core/backgroundSecondary (progress track / selector) | `--ds-core-background-secondary` |
| Border/Core/borderPrimary | `--ds-core-border-primary` |
| Content/Core/contentSecondary (toggle label) | `--ds-core-content-secondary` |

When values change in Figma, update **`tokens.css`** first, then **`ds.css`**, then refresh Design Harness.
