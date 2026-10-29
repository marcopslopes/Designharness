# Licensed webfonts

This folder is for licensed brand **WOFF2** files your team owns. It ships
empty, and the files you add here are gitignored, so they never reach a public
copy of the repo.

The harness doesn't need anything here. Its default type stack is set in
`context/design-system/tokens.css` (`--font-family-text`), and Design Harness
renders with it when this folder is empty.

To use your brand face:

1. Put the WOFF2 files next to this README. They're served as `/fonts/…`.
2. Add `@font-face` rules for them in `tokens.css`, and put the family name
   first in `--font-family-text`.
3. Record the typeface in your org pack's `COMPANY-BUSINESS.md`.

Keep usage within the terms of your font licence.
