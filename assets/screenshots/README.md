# AshOS Customs — website screenshots

Replace these placeholder files with **Marketing Mode** captures from the desktop application (`run_marketing_mode.bat`).

## Recommended capture settings

- Resolution: **1920×1080** (or 1440×900 minimum)
- Window: maximised, consistent display scaling (100%)
- Use **Load Demo Data** for fictional Northstar Performance Ltd content (no real PII)
- No debug banners, dev tools, or error popups visible

## Target dimensions on site

| File | Used on page | Suggested crop aspect |
|------|----------------|----------------------|
| `shipment-review.png` | Hero (primary), Software | 16:10 |
| `ai-review.png` | Software — AI Review | 16:10 |
| `resolve-items.png` | Software — Resolve Items | 16:10 |
| `impact-dashboard.png` | Software — Business Impact | 16:10 |
| `product-knowledge.png` | Software — Product Knowledge | 16:10 |
| `commercial-invoice.png` | Software — generated invoice / hero alternate | 16:10 |

## File names

The HTML references **`.png`** files. Drop exported PNGs here with exactly these names:

- `shipment-review.png`
- `ai-review.png`
- `resolve-items.png`
- `impact-dashboard.png`
- `product-knowledge.png`
- `commercial-invoice.png`

Until PNGs are added, the site uses `.svg` placeholders with the same basename (see `script.js` fallback).

## Export tip

Save from Windows Snipping Tool or Snip & Sketch as PNG. Compress with squoosh.app if file size exceeds ~400 KB per image.
