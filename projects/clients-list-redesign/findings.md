
## 2026-10-09 — ui-agent (micro-edit) + audit close: dead link removed

- Client rows linked to `#/playground/client-contact-edit`, which no longer exists. Rows are now static (`div`, no chevron) instead of buttons that go nowhere; the intro line no longer mentions that route. Unused `.clients-list-proto__row-button` / `__chev` CSS removed.
- Audit: design-detector clean (no new raw values), tsc + eslint clean on the project, verified in the browser (6 rows, 0 interactive).

## 2026-10-09 — ui-agent + content + audit close: "No clients yet" state

- **Built:** `screens/states/ClientsListNoClientsYetPage.tsx` (`clients={[]}`). The main screen now branches on an empty list: header keeps the title only; search, segment tabs, list and re-engage tip are replaced by the DS `EmptyState` in a `Card`. Without the branch, an empty list showed "0 total", empty tabs and a "0 clients haven't booked" tip.
- **Copy (content skill, provider, US English, empty-state tone "helpful, low-pressure"):** title "No clients yet"; body "Add your first client, or import your existing list to bring everyone in at once."; primary "Add client"; secondary "Import clients" — same labels as the header actions so there's one vocabulary.
- **Build notes:** new buttons use `intent` + `startIcon` (the `variant`/`tone` props are deprecated). `EmptyState` stacks full-width actions (mobile default); `.clients-list-proto__empty-state .ds-empty__actions` puts them in a row for web, tokens only.
- **Audit:** Check 1 clean (`design:check` no new raw values); Check 3 clean (sentence case, "clients", no exclamation). ADVISORY Check 2: `EmptyState` renders its title as `h3` under the page `h1` (skips `h2`) — DS component's fixed level, not changed here. ADVISORY Check 5: Add/Import do nothing, same as the main screen.
- **Snapshot export:** not run — Playwright browser not installed locally (`npx playwright install chromium` to enable).

## 2026-10-10 — Project pages round 1 pilot (ui-agent + content + audit)

- **Built:** `about.md` (front page: what this is, then a tour with live embeds of the list, the flow, 3 states and the layout fork); `docs/project-context.md` (problem, who it's for, what it's trying to do, assumptions, open questions); `docs/client-segments-flow.mermaid` (open list → any clients? → segment → inactive → message → books again). The brief is unchanged and now opens as "Project facts".
- **Copy (content skill, internal project docs, provider audience, US English):** sentence case, spaced en dashes, "clients" never "customers", "booking" for the provider's side, no bold for emphasis. Everything is labelled as read from the screens – kickoff hasn't run, nothing is from research.
- **Archetype and pillar:** [redacted 2026-10-10 — named private org-pack terms; project reframed as a generic banking example]
- **Audit — PASS (0 blocking, 4 advisory).** Check 1: `npm run design:detect -- src/design-harness/styles/chrome.css` exit 0; `design:check` no new raw values. Check 2: facts strip is a `dl`; diagrams are a labelled `figure` with Mermaid's own `accTitle`/`accDescr`; diagrams keep the light prototype surface in dark chrome (arrows were near-invisible before).
  - ADVISORY Minor `[House: COMPANY-ARCHETYPES — name the archetype]`: [redacted 2026-10-10 — resolved by the banking reframe; header comment no longer names archetypes]
  - ADVISORY Minor `[COPY-PROCESS]`: the screen's intro paragraph talks about how it was built ("built via the ui-agent skill…") and shows in every embed on the About page. Planned for a later round (skill-talk off screens).
  - ADVISORY Note: the facts strip shows the brief's raw status ("STUB — kickoff not yet started") – honest, but reads like a code. Clears when kickoff runs.
  - ADVISORY Note `[UX Heuristic: Recognition over recall]`: About embeds the full main screen and each state at full height – a long scroll. A smaller thumbnail embed would help as projects grow.
- **Gallery (Step 3.5):** skipped – `Gallery: hidden`, designer unresolved.

## 2026-10-10 — brief filled + phone version

- Brief filled from the screens and project context, every line marked as an assumption (designer chose: still an example).
- New `screens/ClientsListMobilePage.tsx`: PhoneShell + shared pro-app chrome (top bar, capsule, search, segmented, client rows, Add/Import FABs); same data file as web. No new CSS.
- Flag: private org-pack terms appear in tracked `docs/discovery/project-context.md` and `findings.md` (committed in 32d0f6f).

## 2026-10-15 — case study example

- `case-study.md` written from brief, findings, decisions, log and about. Skipped: RACI (no people named), Evidence (nothing researched).
- Rendered twice from that file: a 12-slide deck (`artifacts/decks/clients-list-redesign-case-study.html`) and a DRAFT article (`artifacts/clients-list-redesign-case-study.md`).
- Gap the case study surfaced: why the single-card layout won isn't recorded anywhere.

## 2026-10-15 — project context page removed

- `docs/discovery/project-context.md` deleted: every section repeated `brief.md`, which already shows as Project facts. About, case study, deck and article now point at Project facts. The template starter is gone too.

### 2026-10-16 — states moved to props

The `screens/states/` files are gone (harness rule change). Each state is now a link to the screen with a prop; see `case-study.md` and `about.md` for the new links.
