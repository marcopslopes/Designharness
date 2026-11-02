# Routing log — everyday-banking-dashboard

Detailed, task-scoped view of every routing decision made within this task. Every line here also gets a matching one-line entry in the global `harness/logs/routing-log.md`.

| Date | Request | Intent classified | Chain run | Why |
|---|---|---|---|---|
| 2026-11-01 | "build a dashboard for my banking app as a concept" | new project | design-kickoff | Why picked: balance + recent activity at a glance. Separate from mobile-banking-dashboard. Next: structure step (2 options) |
| 2026-11-01 | structure step | design-kickoff | single balance + quick actions + 5 recent transactions | PLAN: ui-agent → design-system → mobile-shell → icon-usage; audit deferred (on-share). Waiting for go |

| 2026-11-01 | go | build | ui-agent → design-system → mobile-shell → icon-usage | BankingHomePage. Audit deferred (on-share). See all has no destination. |
| 2026-11-01 | a list of contacts to send money | new screen on this project | design-kickoff | Why picked: saved payees. Transfers were out; the list behind Send is now in. Next: structure step |
| 2026-11-01 | structure step | design-kickoff | search + Add a recipient + flat list, account on the row | PLAN: ui-agent → design-system → mobile-shell → icon-usage, plus storyboard. Audit deferred. Waiting for go |
| 2026-11-01 | structure pick trade-off | design-kickoff New surface | You picked search. You give up recent payees without typing. Parked the recent-first list. | Fired because the designer asked. It names the cost of the pick. |
| 2026-11-01 | go | build | ui-agent → design-system → mobile-shell → icon-usage | SendListPage. Home Send opens it. Audit deferred (on-share). |
| 2026-11-01 | build the case study for this screen | case-study | outline in chat | Chapter 3 skipped (no quotes, numbers, or tables in findings). Waiting for go. |
| 2026-11-01 | go on the outline | case-study | case-study.md DRAFT | Chapters 1, 2, 4–8. Chapter 3 skipped. Format offer next. |
| 2026-11-01 | prose | writing, case-study mode | waiting on audience and length | case-study.md is the source. Not slides. |
| 2026-11-01 | write the article | writing, case-study mode | artifacts/everyday-banking-dashboard-case-study.md | DRAFT. Peer reader, full article. Outline approved. |
| 2026-11-01 | does this sound like you? | writing | yes | Draft stands. No voice file written. |
| 2026-11-01 | critique the home banking app | design critique | ux-pattern → content | Design Harness prototype, not Figma. Home and the send list it opens. Waiting for go. |
| 2026-11-01 | go | design critique | ux-pattern → content | Written findings. DD-001–DD-007. No blockers. Report offer next. |
| 2026-11-01 | yes, HTML report | review-report | artifacts/reports/everyday-banking-dashboard.html | Flow template. Local serve on 4187. |
| 2026-11-01 | move login into this project | harness review | — | LoginPage, storyboard, snapshot, 2 decisions, 3 parked, 4 sources moved from banking-login. Its case study and article kept as artifacts/login-*-draft.md. banking-login deleted (designer yes). |
| 2026-11-02 | fold the login drafts into the case study | case study (update) | case-study | case-study.md updated in place; article not re-rendered yet. |
| 2026-11-02 | rewrite the article, delete the login drafts | writing | artifacts/everyday-banking-dashboard-case-study.md | Login folded in. Both login drafts deleted (designer yes). |
