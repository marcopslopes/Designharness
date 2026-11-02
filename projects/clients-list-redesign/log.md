| 2026-10-09 21:31 | PLAN | more states (ui-agent + content + audit) and contact-edit link fix proposed — awaiting go |
| 2026-10-09 21:55 | ui-agent → audit | dead contact-edit link removed; rows static; verified |
| 2026-10-09 | ui-agent + content + audit | "No clients yet" state built (empty-list branch on main screen); snapshot export skipped (no Playwright browser) |
| 2026-10-10 | ui-agent + content + audit (plan approved) | pilot for project pages round 1 (About, docs/, flow diagram) |
| 2026-10-10 | ui-agent + content + audit | project pages round 1 built: about.md, docs/project-context.md, docs/client-segments-flow.mermaid; audit PASS 0/4 |
| 2026-10-10 | ui-agent + design-system | Design Harness IA rebuilt to match the reference starter (Home search panel, Prototypes, Design system, Documentation tabs); pilot docs moved to docs/discovery/ → "Discovery" group |
| 2026-10-10 | ui-agent + design-system | Design Harness rebuilt to match the reference starter fully: flat frame, plain doc pages with On this page, one flat Artifacts list with icons, About page without repeated cards |
| 2026-10-10 | ui-agent + design-system | Typography match to the reference starter started — its scale measured; font + off-scale sizes gated |
| 2026-10-10 | ui-agent + design-system | Design Harness typography matched to the reference starter: Geist on the frame (prototypes stay Inter), 12px sidebar, 32/24px titles, 20px doc headings, 14px body |
| 2026-10-10 | ui-agent + design-system | Prefer prior layout (Project facts screenshot) — clarifying which layout before edits |
| 2026-10-10 | ui-agent + design-system | Restore floating side panel and main container; keep current IA, type, and pages |
| 2026-10-10 | ui-agent + design-system | Removed elevation shadows from the side panel and main container |
| 2026-10-10 | ui-agent + design-system | Shell panel border set to --color-border-default so the containers stay visible without a shadow |
| 2026-10-10 | ui-agent + design-system | Shell container border lightened to a mix of --color-border-default and the canvas |
| 2026-10-10 | ui-agent + design-system | Looking at a reference help-centre shell style to apply to the Design Harness frame |
| 2026-10-10 | ui-agent + design-system | Shell panels set to white on an almost-white canvas, with a hairline and 1–2px shadow |
| 2026-10-10 | ui-agent + design-system | Home restyled as a centred mark, title, and search card |
| 2026-10-10 | ui-agent + design-system | Home has a pointer-following reveal of faint studio text, using a canvas mask |
| 2026-10-10 | ui-agent + design-system | Design Harness accent set to rgb(0, 80, 50) via a lab token; product brand left as-is |
| 2026-10-10 | ui-agent + design-system | Rail inner edge removed; shell panels use a flat border instead of the whisper shadow |
| 2026-10-10 | ui-agent + design-system | Shell panel border lightened to a 22% mix of --color-border-default |
| 2026-10-10 | ui-agent + design-system | Shell panel border lightened again to a 10% mix of --color-border-default |
| 2026-10-10 | ui-agent + design-system | Rail uses the starter icons: D mark, search, cursor-in-window, shapes, open book |
| 2026-10-10 | ui-agent + design-system | Documentation uses the manual layout: loose tabs, grey current page, our handbook in the article |
| 2026-10-10 | ui-agent + design-system | Context and skills is a file list: Resources, search, document icons, Agents folded |
| 2026-10-10 | MATCHED ui-agent + design-system (micro-edit lane, audit deferred) + docs-freshness (inventory only) | Context & skills now lists every harness skill, agent, reference and the orchestrator from the source files; docs/ inventory drafted, nothing deleted |
| 2026-10-10 | MATCHED docs-freshness (designer approved archive) | Moved 44 files (35 docs + article assets) into docs/_archive/{audits,drafts,distribution,figma-copies} with a README; nothing deleted |
| 2026-10-10 | MATCHED ui-agent + design-system (Design Harness Manual IA cleanup; plan shown, awaiting go) | Manual tab: overview is a 70-row table + changelog, flat sidebar, HOWTO guides not rendered in-app |
| 2026-10-10 | MATCHED ui-agent + design-system (designer chose full Manual cleanup) | Manual: 59 HOWTO guides render in-app under 8 folded topics + Connect your tools; overview is a short topic index (README tables + changelog hidden, file untouched); guide links open in-app, harness file links open in Context & skills; tsc + design:check clean |
| 2026-10-10 | MATCHED ui-agent (micro-edit) | Manual: removed Designer briefing entry — public/how-to/designer-briefing.html was deleted in the de-branding sweep (private copy in projects.local/public-exports/), so the iframe showed Design Harness home |
| 2026-10-10 | MATCHED ui-agent + design-system (micro-edit, audit deferred) | Prototypes → By designer view tidy-up to match All prototypes cards |
| 2026-10-10 | MATCHED ui-agent + design-system (micro-edit, audit deferred) | By designer + designer page now use the All-prototypes card and page frame; removed repeated discipline, intro note, Designers heading; gallery people are still the fictional examples |
| 2026-10-10 | MATCHED ui-agent (micro-edit, audit deferred) | Designer page project cards now link to the same project page as All prototypes; removed the detail modal and its CSS; fictional example projects show as non-clickable cards |
| 2026-10-10 | MATCHED ui-agent (question only, no edit) | Explained which project files Design Harness shows as artifacts |
| 2026-10-10 | MATCHED iterating row: ui-agent → design-system → mobile-shell or responsive-patterns → audit (deferred); brief fill = design-kickoff/brief, plan shown, awaiting go | clients-list-redesign: designer brief + mobile version |
| 2026-10-10 | MATCHED ui-agent + design-system + mobile-shell (audit deferred) | clients-list-redesign: brief filled as assumptions; ClientsListMobilePage added in PhoneShell; about.md links it |
| 2026-10-10 | MATCHED iterating (ui-agent micro-edit, audit deferred) | Design Harness project sidebar: group screens/<folder>/ into their own sections; clients-list-redesign split into desktop/ and mobile/ |
| 2026-10-10 | MATCHED iterating (ui-agent micro-edit) | clients-list-redesign: removed build-notes intros from desktop screens; DesktopShell ask PAUSED — conflicts with ui-agent/references/desktop-web-patterns.md 'Do not build a DesktopShell' |
| 2026-10-10 | MATCHED iterating (ui-agent + mobile-shell) | DesktopShell built (designer override of desktop-web-patterns rule, doc updated); clients-list desktop screens + states wrapped |
| 2026-10-10 | MATCHED iterating (ui-agent micro-edit) | clients-list layout fork: comparison tabs moved outside DesktopShell; DesktopShell gets macOS title bar (traffic lights, nav buttons, URL field) |
| 2026-10-10 | MATCHED iterating (micro-edit) | DesktopShell borders softened to subtle |
| 2026-10-10 | MATCHED iterating (design-system micro-edit) | Design Harness frame page bg --kit-bg cream #fafaf7 → light grey #f5f5f5; DesktopShell screen → background-secondary |
| 2026-10-10 | MATCHED iterating — scope question | clients-list-redesign: designer wants it off the booking-app framing, maybe banking; AskQuestion on scope |
| 2026-10-10 | MATCHED iterating (ui-agent + content) | clients-list-redesign reframed as bank RM client book (Premium/New/Dormant), own nav, docs rewritten, private-pack terms redacted |
| 2026-10-10 | MATCHED iterating (micro-edit) | clients-list mobile: Import + Add FABs replaced by one sparkles assistant FAB |
| 2026-10-10 | MATCHED iterating — exploration | Designer asks to reuse the Machina clients-tab storyboard layout (phone + why-citations) for all mobile prototypes; reading source only, port 3001 not touched |
| 2026-10-10 | MATCHED iterating (ui-agent + mobile-shell) | Shared Design Harness Storyboard (StoryboardPage, storyboard.ts, discovery, sidebar, storyboard.css); first storyboard on clients-list mobile; mobile-shell SKILL.md documents opt-in |
| 2026-10-15 | MATCHED case-study → deck-builder (± writing) — PLAN | Example case study + renders to preview the Phase 1 split; waiting for go |
| 2026-10-15 | MATCHED case-study → deck-builder → writing | Wrote case-study.md, 12-slide case-study deck (artifacts/decks/clients-list-redesign-case-study.html, all slides screenshot-checked) and DRAFT article (artifacts/clients-list-redesign-case-study.md) |
| 2026-10-15 | MATCHED iterating — scope question | Case-study outputs not in sidebar; asking how to surface them |
| 2026-10-15 | MATCHED iterating (ui-agent) | Case study section added to the project sidebar: Story, Slides, Article |
| 2026-10-15 | MATCHED iterating | Project context page removed (duplicated the brief); About now links to Project facts |
| 2026-10-16 | states → props | ui-agent | state files removed; States sidebar section gone; links use screens/…?prop=value | — |
| 2026-11-02 | PLAN case-study → ui-agent | Board story page now renders case-study.md: framing, problem, what we tried, what we chose, what should change, still open, not yet | — |
