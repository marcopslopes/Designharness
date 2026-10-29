# `src/design-harness/styles/` — Design Harness chrome + prototype CSS (+ lab tokens)

Three-layer IA (see `harness/skills/design-system/GUIDE.md` and
`harness/skills/design-system/SKILL.md`):

| Layer | Lives here? | Path |
|-------|-------------|------|
| Real design system | **No** | `context/design-system/tokens.css` + `ds/` |
| Lab / prototype tokens | **Yes** | `tokens.lab.css` (not Foundations — do not treat as DS) |
| Design Harness catalog chrome | **Yes** | `chrome.css` (+ `phone-shell.css` for shared device frame) |
| Per-prototype | **Yes** | `prototypes/<feature>.css` |

## Rules

- Consume Foundations/DS from `tokens.css` first; use `tokens.lab.css` only
  for documented lab vars (phone shell, screen-one-off heroes, etc.).
- Do not invent hex/`px`/undefined vars in chrome or prototypes.
- New prototype styles → a file under `prototypes/`, then one `@import` in
  `index.css` (keep cascade order intentional).
- Promote a lab token into `context/design-system/tokens.css` only when it
  is Figma-backed Foundations or a documented DS component token.

## Entry

`src/index.css` loads `tokens.css` then `tokens.lab.css`.
`src/design-harness.css` re-exports `./design-harness/styles/index.css` for chrome +
prototypes.
