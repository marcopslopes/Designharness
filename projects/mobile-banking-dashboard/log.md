# Routing log — mobile-banking-dashboard

Detailed, task-scoped view of every routing decision made within this task. Every line here also gets a matching one-line entry in the global `harness/logs/routing-log.md`.

| Date | Request | Intent classified | Chain run | Why |
|---|---|---|---|---|
| 2026-10-15 | "I want to build a dashboard view for mobile banking" | net-new project | design-kickoff Step 0 | No folder or PRD existed; asking the 3 framing questions |
| 2026-10-15 | Slack sweep | design-kickoff Step 1 (partial) | research-agent (Slack only) | Found Northline Wallet (live, owned by Finance) + provider balance/payout pain; Atlassian not connected |
| 2026-10-15 | PRD drafted | design-kickoff Steps 1c–2 | assumption-mapper, research-artifacts (job stories), PRD → brief.md DRAFT | Gate question pending |
| 2026-10-15 | Gate approved | design-kickoff Step 3 → Step 4 flags | — | Jobs present; objects + strategy missing → AskQuestion |
| 2026-10-15 | Conceptual model | design-kickoff Step 4 | conceptual-model | Wallet / Transaction / Payout / Hold (provisional) / Payout method; vocabulary set |
| 2026-10-15 | Step 4 → screens chosen | design-kickoff | PLAN: ui-agent → icon-usage → ux-pattern → audit | waiting for go |
| 2026-10-15 | Screens built | ui-agent → icon-usage → ux-pattern | WalletHomePage (iOS) + WalletHomeAndroidPage; 1 finding fixed, 5 open | audit deferred (on-share) |
| 2026-10-15 | States + review fixes | ui-agent + content | 3 states, hero merged, Payout Settings row, per-row ready dates | desktop deferred; audit on-share |
| 2026-10-15 | Storyboard added | mobile-shell (ui-agent 6.5) | WalletHome.storyboard.ts, 7 steps, spotlights verified | |
| 2026-10-15 | Case study requested | case-study | | |
| 2026-10-15 | Case study written | case-study | case-study.md, 8 chapters | One public copy in projects/ (designer) |
| 2026-10-15 | Format: prose | writing (case-study mode) | Step 0 + 2.5 proposal | designer picked prose at case-study offer |
| 2026-10-15 | Article written | writing (case-study mode) | artifacts/mobile-banking-dashboard-case-study.md, ~1,000 words, DRAFT | public, colleagues by role; title "Nobody asked for a dashboard"; voice check: designer "yes" |
| 2026-10-15 | "all needs to be fictional" | project correction | all .md files retold at Northline | names, channels, figures and partners replaced with fictional ones; fictional-example banner added |
| 2026-10-15 | Process article written | writing (essay mode) | docs/how-this-project-ran.md, DRAFT | designer: new-to-harness designers, full length, project sidebar |
| 2026-10-15 | Screenshots in process article | writing (iterate) | 13 PNGs in artifacts/snapshots/how-it-ran/, captioned; markdown image styling added to chrome.css | md files shown in a file-view frame; no competitor imagery |
| 2026-10-15 | "add which files show where, plain language" | writing (iterate) | §9 of docs/how-this-project-ran.md now covers gallery vs prototype app vs notes; gallery conditions kept as subsection | sourced from galleryData.ts / projectsIndex.ts |
| 2026-10-15 | "add a diagram of the harness flow" | writing (iterate) | inline mermaid flowchart after the intro of docs/how-this-project-ran.md; hexagons = designer questions | separate .mermaid page removed at designer request |
| 2026-10-15 | Phase 2 Stage A done — presenter skill + Variants and Compare pages | harness-audit → ui-agent → presenter | screens/WalletHome.variants.ts, screens/WalletHome.compare.ts; WalletHomePage/Android take status + lead props; walletDataFor() in wallet-home-data.ts; state files use it | balance-first rebuilt as lead="balance" from decisions.md (Review fixes); prospective evals #84–86 pass |
| 2026-10-15 | "nothing like the templates" | ui-agent → presenter | Variants + Compare rebuilt full-window: canvas + docked right panel with Chip options; hairline-split frames, numbers only, Notes popover for names/chosen/source; keyboard button bottom right (native popover) | layout read from explorer-templates source; no template code copied; P in Compare now hides the bar |
| 2026-10-15 | Phase 2 Stage B — Stage + Ideas | ui-agent → presenter | screens/WalletHome.stage.ts (4 research tasks tied to job stories, iOS/Android scenarios), screens/WalletHome.ideas.ts (5 ideas in 2 groups, Status notes cite decisions.md); StagePage + IdeasPage in PresentationPages.tsx | Stage drawer on \, R only while open; Ideas ← → wrap with ?item= |
| 2026-10-15 | Phase 2 Stage C | ui-agent → presenter → case-study | WalletHome.storyboard.ts: starts (normal week / paused / returned) + notes on 4 steps from findings.md; case-study.md ch 4 embeds balance-first live + Compare link, ch 6 embeds iOS + links to storyboard/variants/compare/ideas/stage; StoryboardPage + DesignHarnessMarkdown + ScreenEmbed extended | Stage page tab now reads 'Prototype' |
| 2026-10-15 | Phase 3 — case-study slides on presenter | presenter → ui-agent | caseStudySlides.ts parser + CaseStudySlidesPage (full-window, zoom-scaled 80×45rem slide, live FittedScreen on screen slides, keys ← → Space PgUp/PgDn Home End F, ?slide=N); sidebar Case study › Slides now live from case-study.md | 23 slides, all fit; CSS zoom instead of transform so embedded iframes paint |
| 2026-10-15 | revert Phase 3 | presenter → deck-builder | live Slides page removed; case-study slides stay on deck-builder | wallet has no case-study deck yet — build with deck-builder when wanted |
| 2026-10-15 | case-study deck | deck-builder | outline drafted from case-study.md | waiting for go |
| 2026-10-15 | case-study deck | deck-builder | 17 slides, light, live phones on 11/13/14, notes on every slide; all slides fit; overview jump and in-harness Slide deck checked | not published; presenter mode (S) off in this harness |
| 2026-10-15 | question: is all this built per project? | follow-up | explained per-skill, opt-in; asked designer to reload for Slide deck | — |
| 2026-10-15 | storyboard + case study by default | harness change (ui-agent, mobile-shell, case-study, settings) | designer ask from this project; Settings shows both toggles on | — |
| 2026-10-16 | states → props | ui-agent | state files removed; States sidebar section gone; links use screens/…?prop=value | — |
| 2026-10-16 | Copy for… menu on project pages | ui-agent | Google Docs + Confluence get formatted text, Notion gets Markdown; live links kept | — |
| 2026-10-16 | Android DS vs iOS-only? (wallet Android screenshot) | design-system | one Mobile system; Android page still uses iOS PhoneShell | waiting on whether to add an Android frame |
| 2026-10-16 | remove Android artifacts | ui-agent | deleted WalletHomeAndroidPage; Variants, Compare, Stage, case study, article, deck, and how-this-project-ran no longer offer Android | audit deferred (on-share) |
| 2026-10-17 | tab bar is the old business app | ui-agent → mobile-shell → icon-usage | Wallet home uses Home, Activity, Wallet, Cards, Account; no ProApp chrome | audit deferred (on-share) |
| 2026-10-17 | sample payments aren't store services | content → ui-agent | Balayage, plumbing, facial, colour replaced with invoices, consulting, workshop | older projects unchanged |
| 2026-10-17 | build desktop prototypes as well | ui-agent → design-system → desktop patterns | WalletHomeDesktopPage in DesktopShell; iOS/Desktop switch on Wallet home | audit deferred (on-share) |
| 2026-10-17 | make the desktop wallet better, check Mobbin | ui-agent (desktop patterns + design-system) | summary row + pending table; phone column unchanged | audit deferred (on-share) |
| 2026-10-17 | preview the desktop wallet in the browser, without the shell | ui-agent | Preview link; ?embed=1 drops harness chrome and the fake browser frame | audit deferred (on-share) |
| 2026-10-17 | sidebar should split a prototype into desktop and mobile | ui-agent → icon-usage | Wallet home lists Mobile and Desktop; same rule for every project | audit deferred (on-share) |
| 2026-10-17 | drop the Wallet home name row | ui-agent micro-edit | sidebar shows Mobile and Desktop only | audit deferred (on-share) |
| 2026-10-17 | platform switch is not a breadcrumb | ui-agent | top bar is a Mobile/Desktop toggle | audit deferred (on-share) |
| 2026-10-17 | top bar must use the harness design system | ui-agent + design-system | harness Segmented and ghost Button; product kit control removed | audit deferred (on-share) |
| 2026-10-17 | color sidebar and rail icons on hover and active | ui-agent micro-edit | harness accent on the icon; audit deferred (on-share) |
| 2026-10-17 | different icon colours on hover | ui-agent micro-edit | each row uses an existing kit hue; audit deferred (on-share) |
| 2026-10-17 | could Quartz ideas fit Harness or Desktop | inspiration-scouting | locked: Quartz shape for missing Desktop pieces; sentence case, one primary, status word on the Harness frame | not built yet |
| 2026-10-17 | mobile and desktop should share one language | design-system | Desktop keeps Mobile's tokens and components; layout can change | written into both system files |
| 2026-10-18 | is border the same on mobile and desktop | design-system | one border scale; Desktop theme now lists Border from Mobile | the foundation page stays on the Mobile sidebar |
| 2026-10-18 | the whole design system is shared, not only border | design-system | Desktop lists the same foundations and components and shows those pages in its sidebar | layout pieces stay desktop-only |
| 2026-10-18 | apply recent DS updates to Wallet home, mobile and desktop | MATCHED ui-agent + design-system + mobile-shell | Hold sheet uses catalog enter/exit on both. Phone Payout Settings is SettingsRow. Tracker, pending rows, tab bar unchanged. Audit deferred (on-share) |
| 2026-10-18 | Wallet home still not the same DS components | MATCHED ui-agent + design-system + mobile-shell + icon-usage | Phone uses LargeTitleHeader, TabBar, Card, List, SettingsRow. Desktop uses SettingsRow and List. Tracker stays custom. Audit deferred (on-share) |
| 2026-10-20 | add the "start without building a useless prototype" comparison to how-this-project-ran | writing (iterate) | new §11 "Why start here, and not with a prototype" in docs/how-this-project-ran.md | outside tool described generically; page is public |
