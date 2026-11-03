# Release notes

What changed in the harness and Design Harness, newest first. Add an entry when a change affects what designers see or do. Older weeks are grouped by week.

Each release is a version in `package.json` and a matching Git tag, such as `v0.1.0`. New entries go under a date heading above the latest version until the next release.

### 3 November 2026

- **Each fact in the brief has one place.** The why (Problem, For whom, What changes) lives under `## Why`, success is the Outcome row of How we'd know, and the owner is the Designer under Ownership. `## Ship` keeps only Review, Exposure, and Decision. The gallery and the project page read the same lines. Older briefs with a Case study summary still show.
- **The harness no longer runs Git.** Committing, branching, and pushing are yours for now, so a plan for team Git can start from scratch. "Wrap up" writes the journal entry and the handoff note and commits nothing. "Share this" says in one line that the harness doesn't push yet, and points to "publish" for a share URL. Audit no longer asks to commit and push after a pass. Settings no longer has "Handle Git for me", and continue, undo, update, and a second folder are gone. The New project button still makes the folder from the template.
- **The ship packet is only for publish.** Publish refuses without a why, a success line, an owner, a review date, and an audit PASS. Nothing else runs it.
- **Trigger phrases are written once.** Common requests are in the orchestrator table, everything else is in its group in `routes.md`, and `routing-notes.md` keeps only the notes behind each route.
- **Go wide reads as five steps.** Plan and type, ideas, three directions, build into the screen and Compare, then pick. Still two questions. Its `decisions.md` entry is written when Compare opens (Chosen: pending), so the Compare page's source link works, and it keeps every idea with its tags.
- **Fewer working notes in replies.** A matching token says nothing, a nearest swap is one line, and the Token check block shows only for a real gap. A build names the person from the brief, and no longer explains that the example archetypes don't fit.
- **No Decisions card on the board.** The story's "What we chose" already says it. Boards saved before this drop the card on the next open.

### 2 November 2026

- **The harness in one picture.** Documentation → Start here has a one-page map of the six parts (orchestrator, skills, memory, context, projects, the app) and the steps a project goes through.
- **Each project board tells its story.** The board opens with a story row (the problem, what we chose, what's next), then a Prototype row with each screen once, then the written sources as small cards. A saved board that had the first screen twice keeps only the Prototype row copy.
- **The brief says how we'd know.** Kickoff writes a proposed table of what would change for the person, how to measure it, and what not to break. Correct any row, or leave it.
- **A share checks what the work is for.** The ship packet reads the why, the success line, the owner, and a review date before a share or a publish.
- **Go wide builds real directions.** "Show me 15 ways to make X better" asks the variation type, groups ideas from the research into three directions, builds them into the real screen, and opens them side by side in Compare. Then you pick one. The wallet home has three directions this way.
- **A new example project: travel.** An itinerary screen for a traveler who knows where they're going, with its brief, sources, and storyboard.

### 1 November 2026

- **Decisions on the project page.** Each project lists **Decisions** under Project facts (and on its board until 3 November): every dated entry in `decisions.md`, with what was chosen, what was rejected, and why. Findings, sources, the log, and raw notes stay off the page.
- **Raw notes stay next to the project.** Pasted transcripts and threads save to the project's `raw/` folder, which is never committed. Settings → "Share raw notes with the team" commits the ones that name no one. Every file gets a line in `sources.md`, which agents read first.
- **The docs reminder waits for wrap up.** A normal reply no longer ends with "docs freshness still due." Say "wrap up" and it appears once, if that session changed routing or a skill and the log has no line for today.
- **Kickoff is one file.** A new or ambiguous request reads the profile and existing briefs, finds three references, and asks one why question before it writes anything. A small tweak skips that and just does the change. Name, requester, and hands-on level are not questions. A new screen lists what is on it and two options before the build. Deleting or overwriting waits for a yes. A project branch starts only when Git autopilot is on. Wayfinding and "which research method" are their own routes, not kickoff. The brief includes a guessed "How we'd know" line (a table from 2 November).

### 31 October 2026

- **Share this only pushes a project branch.** On `simplify` or `main` it stops. The agent runs one command and passes the line back; it does not read the script.
- **Handle Git for me starts off.** "Wrap up" still saves the project, and "share this" still pushes it. A branch per project, continue, undo, update, and a second folder stay off until you turn the setting on.
- **One way to end a session.** "Wrap up" and "journal this" do the same thing: the journal entry, a handoff note in the project log, and a save. "Context is full, write a handoff" is only for picking up mid-task in a fresh chat.
- **Git does less on its own.** A new project still gets its branch, "wrap up" still saves, and "share this" still pushes. Bringing in main, undo, harness updates, a parallel folder, and the Git check-up run only when you ask. Cursor no longer runs a Git check at the start of every chat.
- **Old review files stay as pointers.** A critique still goes to the pattern skill. The old review file no longer contains a second playbook. The public skill count leaves those two pointers out.
- **One owner per project file.** The brief's truth block is status, assumptions, unknowns, and evidence. Findings are the detail behind evidence. Decisions, including a wayfinding map, live in `decisions.md`. Raw test results live under `testing/`, and a short version goes in the truth block. A personal journal is never a project source.
- **A critique loads its rule with the critique.** The Figma critique instructions sit in the pattern skill, and load when you ask for a critique. They are not in every chat.
- **Long rules load only when the turn needs them.** Intake, the plan gate, a missed route, project state, and the design-system rules are separate files. A screen edit still waits for the prototype skill. The design-thinking model loads for discovery, strategy, kickoff, and critique.
- **A critique files the small findings itself.** Non-blocking critique findings go on the project's debt register, with the line "Logged the non-blocking findings in the project debt register." A question appears only when a finding is blocking. The pre-share audit still asks what to do with its advisories.
- **Company projects stay off the public repo.** With "This repo is public" on (the default), a project started from Slack, Jira, Confluence, Notion, or Drive is saved under `projects.local/`, which Git does not track, and the line is "Saved locally, since this repo is public." Tracked projects stay the fictional examples. Turn the setting off on a private copy.
- **No Git remote, no warning.** With `origin` removed, the opening line, catch-up, and the origin check stay quiet instead of reporting an error.
- **A first message with no profile still gets done.** The agent asks your role once, then does the request in the same turn. A run with nobody to answer uses product design and writes no profile. The "you're on main" line is one sentence and never a question.
- **The PRD check is only for a new product bet.** "Let's start working on…" and "let's explore payouts" still stop to ask if the brief is good enough. A question, a lookup, an iteration, a critique, copy, or an import does not.
- **Two old skills no longer catch phrases.** Workload questions go to the workload skill, and a critique of existing work goes to the pattern critique. The old files stay so existing links still open.
- **A screen edit waits until the prototype skill is open.** Claude Code blocks a write under `projects/*/screens/` or a `.tsx` file under `src/` until this chat has read the prototype skill. The message is "Load ui-agent first." Cursor runs the same check, but a known Cursor bug can let the write through (see `KNOWN-ISSUES.md`).
- **A pasted interview is a synthesis, even when the text is already in the chat.** "Anything interesting?" on a transcript, interview notes, or survey opens the research synthesis skill before the answer.
- **A build and a critique read less before they start.** The prototype skill no longer preloads the orchestrator, the token file, and both company packs. A critique reads the pattern pack and the screen, and opens an archetype only when a finding needs it. A new screen in a chat with nobody to answer stops at the plan.

### 30 October 2026

- **Git runs itself.** (Off by default from 31 October.) Starting a project (in chat, or with the new **New project** button on Prototypes) puts it on your own branch, `<your first name>/<slug>`, from main, with the line "Working on ana/<slug>." "Continue X" switches back to it and merges in main once it's a day behind; a conflict stops and lists the files. "Wrap up" saves only that project's folder, with the journal's one-line summary. "Undo the last change" shows the last save and takes it back. "Share this" pushes the branch and gives you the pull request link. Nothing is pushed unless you say share, never to main, never with force; your journal, profile and logs are never committed. Settings → "Handle Git for me", or `- Git autopilot: off` in your profile, turns it off.
- **Made for teams.** Each chat starts with a warning if you're on main or 50+ commits behind. "Update my harness" brings in the latest harness and leaves your team's projects alone. "Work on another project in parallel" opens a second folder on its own branch that already knows who you are. If you change the harness itself on a project branch, wrap up asks whether to keep it local or suggest it to the harness as a pull request. Two people adding to the same project `log.md`, `findings.md` or `sources.md` no longer conflict. New guide: "Using it as a team".
- **One file per prototype and per designer card.** New prototypes only ever live in `projects/<slug>/screens/` (no route list to edit), and each Team Gallery designer is one small file in `src/design-harness/gallery-designers/` with name, role, focus areas and avatar, so two people adding at once never touch the same file.

### 29 October 2026

- An override that holds for the whole project ("don't use 'check in'") now goes to the project's `decisions.md` as well as the journal, and `content` and `ui-agent` read its last 10 entries before writing.
- **The agent can learn your rules.** When you correct its output with a rule you'd want every time ("no borders on cards"), it asks once: "Save as a preference? [Yes / Just this time]". Saved rules go to `designer-context.local/preferences.md`, grouped by prototype, copy, Figma, writing, and Slack/docs. The prototype, copy, critique, writing, and docs skills each read only their own section first, and say "Following your preference: …" whenever a saved rule applies. Nothing is saved without your Yes, and Claude Code's own auto memory is off in this repo so rules don't land anywhere else.
- **A session journal replaces design memory.** Say "journal this" or "wrap up" and the agent writes a short entry to `designer-context.local/journal/YYYY-MM-DD-<project>.md`: what you asked, what got built, where you overrode it (in your words), what you decided, and links to any screenshots it saved. The next session on that project reads the latest entry and `decisions.md`, and `case-study` reads every entry for the project. `design-memory` is gone; an old `design-record.md` is no longer read.
- **"Wrap up" ends a session cleanly.** It writes the journal entry and adds a handoff row to the project's `log.md`: what's done, what's next, and the open questions from the brief's truth block.
- **Claude Code shows how full the chat is.** A status line shows context use, warns at 50%, and from 60% says "Good moment for a handoff. Say 'wrap up' and start a new chat." Cursor can't read context use, so it still suggests a handoff after about 15–20 turns (see `KNOWN-ISSUES.md`). The Settings switch turns both off.

### 28 October 2026

- **A design board.** The rail has a new Design board (`#/board`): an infinite canvas with pages, sticky notes, text, frames, shapes, arrows and a pen. Drop or paste images and files (PDFs preview inline), embed Figma, FigJam or Miro links, and place live prototype screens from your projects — double-click one to tap through it. Pan with space-drag or two fingers, zoom with ⌘-scroll or a pinch, and undo with ⌘Z. The board saves in this browser; export and import it as a file from the ⋯ menu.

### 27 October 2026

- **Less logging on every message.** The agent no longer writes a routing line for every request. The skill-usage hook already records each skill the agent loads, so the routing log now only gets fallbacks, wrong matches, and approved plans. Project `log.md` files are unchanged.
- **The keyword hint hook is gone.** It guessed skills from loose keyword matches and often guessed wrong, for example on pasted transcripts.
- **A cost benchmark.** `npm run benchmark` runs six everyday tasks as fresh Claude Code chats and records steps, tokens, cost, time, and whether the right skill loaded. See `harness/harness-audit/references/benchmark.md`.

## 0.1.0 — 21 October 2026

The first public release: 70 skills, Design Harness, the example company pack, and two example projects.

### 21 October 2026

- **Releases have version numbers.** This is 0.1.0, tagged `v0.1.0`. `INSTALL.md` shows how to update to a release tag, and `CONTRIBUTING.md` how to make one.
- **Automated tests run in CI.** `npm test` checks the settings endpoint (including refusing other websites), the design detector, the docs check, and how projects become routes. CI runs it with lint and the build.
- **Node 22 is pinned.** `.nvmrc` sets the version, and CI reads it.
- **"Unassigned" isn't a designer.** A brief with `Designer: unassigned`, `TBD`, `none`, or `-` no longer gets its own person in the Prototypes gallery. The project waits in the "needs a designer" note instead.
- **The navigation styles are 6,400 lines shorter.** Rules for classes no screen uses are gone from `navigation-profile.css`, and every page looks the same. The old skill dispatcher in `legacy/` is removed too.
- **There's a short manual.** Six chapters, from install to sharing work with your team, at the top of Documentation. The installation guide opens in the app too, and links to a section of the same page scroll there instead of going home.
- **You can host a viewing copy.** A new guide covers Vercel, Netlify, Cloudflare Pages, GitHub Pages, Docker, and any web server, and says what a hosted copy includes. The app works from a subfolder, and Docker never sees your profile, private notes, or local company pack.
- **Release note dates are right again.** The newsroom example showed the version heading as every entry's date.
- **Every chat starts lighter again.** The orchestrator is 28% shorter (12,200 words to 8,800). Onboarding order, resume checks, people lookup, critique details, the autonomy dial, remote sync, and handoff patterns each moved to their own file under `harness/references/`, which the agent opens only when that situation comes up. Every routing row and trigger is unchanged, and a routing check across 12 situations gave the same results.
- **Credits for the projects the harness learned from.** The README has an Acknowledgements section that separates adapted text from inspiration. Every file with adapted text credits its source and license at the end.
- **Examples use only the Northline pack.** Onboarding's squad pickers, the profile template, workload scope, the payments taxonomy example, and the mobile banking example now use Northline's domains and squads (the pack gained a Finance domain with Payments and Wallet, and a Trade customers domain). The signals sample data and its browser page are gone; nothing used them.
- **Code has one format.** Prettier formats TypeScript, CSS, and scripts. Run `npm run format` before committing, and CI runs `npm run format:check`.
- **Documentation works on a fresh clone.** The general guides, tool setup pages, and maintainer notes moved from the private `docs/` folder into `documentation/`, so the Documentation tab is no longer empty for anyone who clones the repo. New guide: How the harness works. Onboarding and agents-vs-skills are each one guide now, and the examples use the Northline company instead of real teams and tickets.
- **Settings only accepts its own pages.** While `npm run dev` runs, other websites open in your browser can no longer change your profile or company pack through the settings endpoint. `SECURITY.md` explains how to report a problem and what the harness trusts.
- **The Docker image is generic.** It builds the app and serves it with nginx on port 8080, without the old company hosting notes or checks for deleted projects.
- **The old UI kit reference files are gone.** The design system reads only the Design Harness kit tokens. Licensed fonts dropped in `public/fonts/` are now gitignored.
- **Leftovers from deleted prototypes are gone.** About 9,000 lines of checkout and referral styles, three unused screen files, 13 unused images, and the overview thumbnail script are removed. Examples in skills and guides use made-up project names instead of old real ones, and the guides point to the phone and desktop frames the live prototypes use.
- **The build checks every Markdown link.** `npm run build` fails if a tracked doc links a file a fresh clone doesn't have, including anything in `docs/`.

### 20 October 2026

- **The Skills headline matches Documentation.** Same size and weight. The search is gone, the title and the three start cards sit lower, and those cards use the same bordered cards as Documentation.
- **System and skill cards match Documentation.** The drawings are off the system cards. Both grids use the same icon, title, and short line as the Documentation cards. Copy for chat stays on the skill page.
- **The Skills home has a proper welcome.** It opens like Documentation, with the faint grid and a headline: "Pick a task. Find your skill." The line under it counts the skills, so the number stays right as skills are added.
- **Skill guides live on the skill page.** Documentation no longer lists a second copy of each skill's guide; open the skill in Skills to read it. Old guide links take you there. Documentation keeps the general guides: start here, working with the harness, connecting tools, and internals. Guides now sit next to each skill as `GUIDE.md`, so they ship with the skills package.
- **Four prototypes are off the Prototypes page.** Calendar settings, Checkout, the city referral leaderboard, and referral entry points are no longer in the list. Clients list and the mobile banking dashboard stay.
- **The orchestrator is a third lighter.** Each routing row keeps its trigger phrases and one short line; the full notes moved to `harness/references/routing-notes.md`, read once a row matches. The file index moved to `harness/references/related-files.md`. Every chat starts about 10k tokens lighter, and routing is unchanged.
- **Personal credits are off the public harness.** The license, plugins, skill package, and the example project no longer name a person. The app on this machine loads the example company pack.

### 19 October 2026

- **The home page background is clear.** The faint text that followed the pointer is gone.
- **The home page game is gone.** The ball, paddle, and score are off the home page. The name is plain text again.
- **Home cards match the skill cards.** The three ways to add company context are the smaller sunken cards, with a chevron. The “Give the harness your company context” line is gone.
- **Search results hang from the search box.** Matches open out of the field instead of pushing the page down. The cards underneath stay put.
- **The home cards line up with the search.** The three context cards are the same width as the search box.

### 18 October 2026

- **Every system home opens the same way.** Brand, Harness, and Harness brand now start with the same card and Bring your system row that Mobile and Desktop already had. Each card says what that system is for.

- **The home page plays.** A ball knocks letters out of the name. Move the pointer and a paddle follows, so you can send the ball back. The score sits at the top. Search, shortcuts, and the cards stay where they are, and the ball bounces off them. If reduced motion is on, the title stays still.

- **Drawings on the Systems page.** Each system card shows a line drawing of that system, and the black panel at the top shows the same drawing in white on black.

- **Skills has its own icon.** The rail now has Skills, next to Documentation. It opens a catalog: search, Craft / Product / Harness filters, and one card per skill. The header offers three ways to start: a project, a screen, or the check before sharing. A skill page lists up to three things you can say; each copies a prompt for Cursor, Claude Code, or Codex. Each card has its own icon, the group badge sits under the description, and **Copy for chat** is a quiet action that copies a line you paste into Cursor, Claude Code, or Codex. Documentation is the manual, plus platform, references, and agents. The skills graph, assistant, and usage dashboard sit with Skills.
- **Five habits, folded into skills you already have.** Ask to grill a plan and you get one question at a time until you both describe the decision the same way. Ask to wayfind a foggy effort and you get a map of named decisions, with no screens and no PRD until the way is clear. Variants shown side by side have to be different directions — a recolor is one direction. A first-run or empty state can take a point of view; settings, lists, and forms stay quiet, both inside the tokens you already have. Custom motion is for the gap the sheet, the menu, the pill, or the platform doesn't already cover.
- **Mobile lists the skills that shape it.** Interaction design, motion, and icon usage now sit with the other Mobile skills. Choosing one opens that skill on the system, and a link inside it stays on that page.

- **Skills in the sidebar are grouped.** Under Context & skills, the skill list folds into Craft, Product, and Harness, the same way the manual folds into topics.
- **Nested corners and icon alignment are checked.** When a rounded surface sits inside another, the outer corner is the inner corner plus the padding, using radius tokens that already exist. A button with an icon gets slightly less padding on the icon side. A play icon sits slightly toward its point.
- **A few motions stay out.** Icons do not grow from a tiny scale or fade through a blur, and titles do not arrive one word at a time.

### 17 October 2026

- **Two-tone icons on the frame.** The side menu, sidebars, system cards, docs, and settings now use a stroke plus a softer second line. In the side menu and sidebars they stay grey until you hover or select a row, and then each icon takes its own colour. Those icons are a step smaller than the ones on the page. Screens inside a prototype are unchanged.

### 15 October 2026

- **Prototypes sit in the middle of the page.** A screen that is a phone or a desktop window is centred in the canvas, across and down. On a short window the phone scales down and the frame stays around the screen. A screen taller than the window stays at the top so you can still scroll to it. Write-ups and review boards are unchanged.
- **"On this page" moved to the left, and you can hide it.** On any doc page, the section list now sits to the left of the text instead of floating over the right edge. The `< >` button next to the page title slides it in or out, and the page remembers your choice.
- **New skill: `case-study`.** Ask to "start the case study" and the harness writes the project's story once, in eight fixed chapters (opening, problem, evidence, options, decision, live prototype, outcome, sources), each ending with the file it came from. It shows you the outline first. Slides (`deck-builder`) and articles (`writing`) are now made from that one file, so they tell the same story. The slides look the same as before.
- **Screenshots in docs look right.** Images in project docs fit the page width instead of spilling over. Put two or three images on consecutive lines and they sit side by side. Add `#device` to the end of a phone screenshot's path to drop the border around it.
- **Breadcrumbs and export on project pages.** About, Project facts, docs, Case study and Article now show where you are (Prototypes / project) and three actions: download the Markdown, download a standalone HTML file, or **Copy for…** Google Docs, Confluence or Notion (each gets the format it pastes best: formatted text for Docs and Confluence, Markdown for Notion, so headings, lists and tables survive). In exported files, embedded screens become links to the live screen.
- **States are links now, not files.** A screen's empty, error and other states are options on the screen itself, so a project no longer gets a States section with one page per state. Open a state with a link such as `screens/WalletHomePage.tsx?status=paused`, or flip through them all in Variants. The two example projects were moved over.
- **Storyboards and case studies are built for you.** After a new phone screen is built, the harness adds its storyboard instead of asking. Once a project has a decision logged, it writes the case study as a draft, then asks whether you want slides or an article. Both are on by default; turn either off in Settings ("Build a storyboard", "Write the case study") to be asked first. Every behaviour setting now has an ⓘ next to its name that says what On and Off each do.
- **A second worked example.** `mobile-banking-dashboard` is a full project run for the fictional company Northline: brief, research, conceptual model, iOS and Android screens, error states, a storyboard, a case study and a 17-slide case-study deck with the screens live inside it. Its page "How this project ran" walks through every question the harness asked and what each answer changed, with screenshots and a flow diagram.
- **New skill: `presenter`, and a Present section in each project.** Ask "how should I show this to the PM?" and the harness picks a way to show screens you've already built. They open full-window, like a tool, with a keyboard button bottom right listing the shortcuts. **Variants** puts one screen on a canvas with a control panel docked on the right, so you can switch platform, state and options; the link keeps your choices. **Compare** puts 2–4 live screens edge to edge, numbered but not named, so the labels don't sway a first look. Names, notes and the chosen one (from `decisions.md`) sit behind **Notes**. Use ← → to move between comparisons. **Stage** is for research: participants see only the prototype, and you press `\` for a hidden drawer to jump between tasks, reset one, or switch to Android. **Ideas** lists every idea on the left, shows one live at a time, and says on the right why it was kept or dropped. All four use your real screens, never copies. See them on the wallet example under Present.
- **Storyboards can start from a state, and steps can carry notes.** A "Start from" list on the first step replays the walkthrough with the screen in another state, such as payouts paused. If a step's part of the screen isn't shown in that state, the page says so. Each step can also hold notes behind a "Notes" toggle: review findings, open questions, quotes.
- **Case studies embed live screens and link to every view.** In a case study, `![…](screens/WalletHomePage.tsx?lead=balance)` embeds a screen in a given state or option, and `[…](screens/WalletHome.compare.ts)` links to that presentation. The wallet case study shows the rejected layout live next to the decision.
### 11 October 2026

- **The harness says where a project stands.** When you pick a project up, or ask to continue one, the first reply opens with one line: the stage (kickoff, framed, modelling, building, reviewing, handoff, testing, or closed), what decided it, and what runs next. It's worked out from the project's files, so there's nothing to fill in. If it's wrong, say so and carry on.
- **Pasted material is kept, not just summarized.** When you paste a transcript, thread or doc text for a project, or attach a file, the harness saves the original word for word in the project's local inbox before summarizing it. The summary cites the file, so you can check who said what later. The inbox stays on your machine and is never pushed.
- **Brand book in the sidebar.** On Brand, the book is its own section — The book, Principles, Logo, Colour, Type, Imagery, Voice, and In use — the same way Theme lists its parts. Marketing blocks stay under Components.

- **New documentation home.** The Documentation page opens with a short header, Start-here cards for new designers, and one card per topic. The full guide list lives in the sidebar.
- **Release notes.** This page, linked from the top right of the Documentation home. Every important harness change now gets an entry here, and the pre-commit check reminds you when one is missing.
- **Dark mode moved to the icon rail.** The theme switch is now an icon below Settings instead of a button at the bottom of the sidebar.
- **Design systems: Mobile, Desktop, Brand, and Harness.** Each has its own sidebar and overview, a page for every theme value, asset, and component, and placeholders for what isn't built yet. Harness's pages show live demos of the real frame components.
- **Search from anywhere with ⌘K.** Press ⌘K (Ctrl+K on Windows) or the search icon in the rail to search prototypes, systems, and docs. Results show where each page lives.
- **A warmer frame.** The frame now uses a warm off-white page, blue-black text and buttons, and warm grey for supporting text, with a matching dark mode. Prototypes keep their own look.
- **New doc parts.** Breadcrumbs above system pages, callouts (start a quote with `> [!NOTE]` or `> [!WARNING]` in any doc), a menu button, arrow buttons, sand and dark bands, and a forest closing card. See them live under Systems › Harness › Components.
- **Harness brand.** A new system for Design Harness's own marketing: wordmark, highlighted headlines, hero, split section, feature row, live stat row, quote, FAQ, closing card with media, and footer. Under Systems › Harness brand.
- **An example brand book.** The Brand system now shows a full brand book for Northline, the fictional example company: logo rules, colours with measured contrast, a serif and sans type scale, imagery briefs, voice, and the marketing blocks in brand colours. Open Systems › Brand › Brand book. No prototype uses it until you swap in your own brand.
- **Nine premade marketing blocks.** Hero with stats, product cards, benefit columns, icon features, quote band, big stats, story cards with filters, newsroom and logo grid. Shared by Harness brand and the brand book. Photo slots show the brief, and quotes, logos and portraits stay placeholders until they're real. Harness's newsroom shows the latest release notes.
- **Read and replace docs from any system.** Every Context and Skills line on a system now opens the document itself, with Use in chat, Download and View source in the top bar. Company pack files get **Replace with yours**: pick a Markdown file and it's saved to your local company pack, with the old copy kept in `.backups/`. Brand now lists Northline's content guidelines, vocabulary and localization too. Skill pages share the same toolbar.
- **Studio OS is now Design Harness — everywhere.** The visible name, search copy, docs, skills, CSS classes (`design-harness-*`), file paths (`src/design-harness/`), settings config (`harness.config.local.json`), and the frame systems (Harness / Harness brand). Code and comments match the product name.

### 10 October 2026

- **Design Harness look and navigation rebuilt.** New green accent, a new icon rail, and rebuilt Manual and Context & skills sections.
- **Settings page.** Turn harness behaviours on or off from Design Harness, such as when the pre-share audit runs, storyboard offers, variant forks, and the long-session handoff nudge.
- **Project pages have a front page.** Each project opens on its About page, with Project facts, docs, Mermaid diagrams, and screens listed in one sidebar.
- **Docs appear on their own.** How-to guides and foundation pages are picked up from their folders, so there are no lists to keep up to date. Old how-to addresses redirect to the new ones.

### 9 October 2026

- **Screens can show in docs.** Write `![Label](screens/Name.tsx)` in a project doc to show the live screen instead of a screenshot.
- **Screen states are files.** Empty, no-results, and other states each get their own file under `screens/states/`.
- **One page per project.** Prototypes are found from `projects/*/screens`, and each project gets its own sidebar.
- **Team Gallery reads from the brief.** Project cards come from each project's `brief.md`, so there's no copying step.
- **Builds stop on new raw design values.** A hard-coded colour or size that has a token now fails the build and the pre-commit check. The 25 values that were already there are recorded as known debt.
- **Product prototypes stay light** when Design Harness itself is in dark mode.
- **The harness is company-neutral.** Examples use fictional names, squads, and ticket keys. Your real company details live in your local company pack.
- **Shorter orchestrator.** Token tables, component reference, and context architecture moved out of `ORCHESTRATOR.md` into reference files.

### Week of 14 September 2026

- **Machina is now Design Harness.** The prototype app was renamed across the repo.
- **New sidebar.** An icon rail on the left with a content tree next to it.
- **Prototypes grid.** Search, category filters, and the designer's name on each card.
- **Team Gallery sidebar** reorganised so each designer's work is easier to find.

### Week of 31 August 2026

- **New skills:** `critique-prep` (a presenter script for design critique; it never critiques the work) and `design-handoff`.
- **Kickoff goes deeper.** `design-kickoff` writes job stories, runs object-model checks, and offers the deeper layers when they're missing.
- **More review checks:** service blueprints, error prevention, and an ethics check.
- **Better writing checks.** The shared anti-AI-writing checklist and the `content` skill picked up more patterns to catch.
- **Gates are described honestly.** Docs no longer call a written rule "enforced" unless something actually blocks it.

### Week of 24 August 2026

- **New thinking skills:** `conceptual-model` (objects, relationships, states, vocabulary), `diagnostic` (finds the weakest design layer and what to run next), `product-strategy`, and breadboarding in `ux-pattern`.
- **Company pack builder.** `org-pack-builder` builds your local company pack from Jira, Notion, Figma, and Slack, from an interview, or from files.
- **Figma skills:** token sync, asset sync, Code Connect mapping, and library search before creating components.
- **Setup.** A `harness-setup` skill runs during onboarding, plus an `INSTALL.md` guide and public documentation for every skill.
- **Skills view in Design Harness.** A skill graph, an assistant, and a usage dashboard.
- **Self-improvement loops.** Skills end by proposing one concrete fix to themselves when something broke, and only edit after you approve.

### Week of 17 August 2026

- **Review a live page.** `live-page-review` captures a URL (screenshot, page structure, accessibility tree) and hands it to the right critique.
- **Review reports.** `review-report` turns existing findings into a scrollable HTML report.

### Week of 10 August 2026

- **Portable harness.** Company knowledge moved into an org pack, so the harness itself is generic. A fictional example pack ships for fresh clones.
- **Design thinking model and skill contracts** added to the orchestrator.
- **Design Harness kit is the design-system source.** Core primitives were ported to it, with colour and depth showcases.
- **Micro-edit lane.** Small tweaks to an existing screen skip the full pre-share audit until you're ready to share. Long sessions get a one-time handoff nudge.
- **18 bugs fixed** from a full-repo audit, and a new guide explaining agents vs. skills.

### Week of 3 August 2026

- **Research skills:** assumption mapper, research question sharpener, usability test guide, research synthesis, insight writer, screener builder, decision-first research, IA methods, research artifacts, research summary, research shareout, and workshop whiteboard.
- **Planning, people, and craft skills:** roadmap prioritisation, goal setting, stakeholder alignment, people coaching, accessibility decisions, design rationale, and motion modes.
- **Writing and sharing skills:** `writing` for long-form prose, `deck-builder` (with presenter mode), `confluence-brief`, `ticket-create`, `publish-project`, and `session-handoff`.
- **Link catalogs.** Links you paste for a project are saved to its `sources.md`. Team-wide and personal links have their own homes.
- **Token checks run on their own.** The design detector flags raw values that already have a token, and a pre-write hook tries to block new ones.
- **Critique isolation.** When a critique and an audit run on the same work, they run separately and are combined only at the end.
- **Build format is asked first.** For multi-screen builds, `ui-agent` asks whether you want a review board or a clickable prototype before building.
- **Routing evals.** Any change to routing is checked against a fixed set of test prompts before it's called done.
- **Every skill has a test scenario.**

### Week of 27 July 2026

- **Project debt register.** Deferred fixes go to each project's `debt.md` instead of getting lost.
- **Accessibility checks** follow the POUR principles (perceivable, operable, understandable, robust).
- **Design memory** keeps an observational record of past decisions.

### Week of 20 July 2026

- **Design-system skill.** Checks whether a token exists before any style is written, and keeps design-system, Design Harness, and prototype styles in separate layers.
- **Design-system components:** buttons, chips, and controls, synced with Figma primitives and calendar colours.
- **How-to docs hub** for setting up MCPs and tools.
- **Critiques always use the harness.** "Any thoughts?" and "quick gut check" now load the critique skills instead of getting an off-the-cuff answer.
- **Figma critique options.** Dropping a Figma link asks whether you want written findings, canvas annotations, or both. `figma-ux-audit` places annotation cards on the canvas.
- **First look.** Critiques start by naming what kind of work it is (Figma exploration, prototype, live product, or competitor), then a short first-look summary.

### Week of 13 July 2026

- **Designer onboarding.** A first-run greeting, a check of which tools are connected, and a handoff that reads your current workload. Onboarding asks one question and defers the rest.
- **Clickable answers.** Questions with set options show as buttons instead of numbered lists.
- **Manager mode.** A manager role, a manager view of workload, and `manager-1on1-prep`.
- **New skills:** `scheduling`, `competitor-scan`, and `benchmark`.
- **Variant forks.** When a layout is genuinely ambiguous, `ui-agent` builds real variants and lets you pick.
- **Team and people lookup** answers "who's on this squad" directly, without running a skill chain.
- **Platform behaviour guides** for iOS, Android, and desktop web, plus pattern and icon checks in the pre-share audit.
- **Team Gallery.** A page per designer showing their projects.
- **Repo reorganised** into `context/`, `projects/`, and `harness/`, with one orchestrator file holding the rules.

### Week of 6 July 2026

- **The orchestrator.** Requests are routed to the right skill through one routing table.
- **Design kickoff.** `design-kickoff` is the front door for new work: research, a brief, and a check-in before building.
- **Icons go through one component,** backed by Tabler Icons, with an `icon-usage` skill.
- **Shared phone frame.** Mobile prototypes all use one `PhoneShell`.

### Weeks of 15 June to 29 June 2026

- **First version.** The design-system lab, the research agent, and project briefing.
- **Prototype app redesign** with new navigation, foundations, and design tokens.
- **Company context files** (business, voice, archetypes, patterns), and the first `audit` and `content` skills.
