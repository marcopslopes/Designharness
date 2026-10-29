# Scaling — responsive type sizes

## Summary

**Font scale variables** from the Breakpoint collection: how **typography sizes** change across **Desktop L**, **Desktop**, **Desktop S**, **Tablet**, and **Mobile**.


## Type size by breakpoint

Values are **font size** (px) per row. Row labels match token paths such as `font/h1/size`.

| Size token           | Desktop L | Desktop | Desktop S | Tablet | Mobile |
|----------------------|-----------|---------|-----------|--------|--------|
| `h1/size`            | 60px      | 60px    | 60px      | 40px   | 40px   |
| `h2/size`            | 48px      | 48px    | 48px      | 32px   | 32px   |
| `h3/size`            | 40px      | 40px    | 40px      | 24px   | 24px   |
| `h4/size`            | 32px      | 32px    | 24px      | 20px   | 20px   |
| `h5/size`            | 24px      | 24px    | 24px      | 18px   | 18px   |
| `h6/size`            | 20px      | 20px    | 20px      | 18px   | 18px   |
| `body large/size`    | 20px      | 20px    | 18px      | 18px   | 18px   |
| `body/size`          | 16px      | 16px    | 16px      | 16px   | 16px   |
| `label/size`         | 14px      | 14px    | 14px      | 14px   | 14px   |
| `label small/size`   | 12px      | 12px    | 12px      | 12px   | 12px   |

## Notes

- **Headings (`h1`–`h3`)** step down most noticeably on Tablet and Mobile in this matrix.
- **`body/size`**, **`label/size`**, and **`label small/size`** are **flat** across all five breakpoints in the exported frame (same px in every column).
- **`body large/size`** drops from **20px** to **18px** from Desktop S onward.
- In code/CSS these typically map under a `font/` prefix (for example `font/h1/size`); confirm naming in your token source.

## Semantic tokens referenced in the frame

| Token path        | Example fallback |
|-------------------|------------------|
| `border/default`  | `#a7aaae` |
| `bg/muted`        | `#eff0f0` |
| `surface/default` | `white` |
| `text/default`    | `#0c0d0e` |
| `text/secondary`  | `#83878e` |
| `text/muted`      | `#60646b` |
| `text/link/primary/default` | `#025e64` |
| `font/h3/size`    | `40px` (page title) |
| `font/body large/size` | `20px` (description) |
| `font/size/04`    | `20px` (links) |
| `font/label-small/size` | `12px` (row labels in table) |

## Typography styles (from design spec)

The frame references styles including **H1–H6**, **Body Large/Bold**, **Body/Bold**, **Label/Bold**, **Label Small/Bold**, and **Label Small/Regular**.

---

