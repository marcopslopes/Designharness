# Team and Git plan — inputs (DRAFT)

**Status:** draft input, 2026-11-03. This is not a plan and not a
decision. It collects what two other projects do and where we stand, so
the designer can decide the team plan from scratch.

**Why now:** the harness removed its own Git handling on purpose. The
agent no longer branches, commits or pushes. That leaves a clean slate
for a team plan.

**Sources (both MIT, read only, paraphrased here):**

- Pat Morgan's [Design Studio](https://github.com/itspatmorgan/design-studio)
- Pedro Mello Silva's [design-harness](https://github.com/mellosilvapedro-eng/design-harness)

No text was copied. Where this page describes their approach, it is a
summary in our words.

---

## How Design Studio does team work

Design Studio is a prototype sandbox that one person or a whole team runs
from one Git repository.

**Identity.** Each person has a profile file, `contributors/<key>.json`,
with a name, email, GitHub username, a permanent ID, and personal
preferences. A command, `pnpm join`, creates it. It reads the Git name and
email, checks for clashes, and never overwrites someone else's entry. A
profile holds identity and preferences only, never permissions.

**Ownership and roles.** Permissions live in one shared file,
`studio.config.json`. It lists `admins` and, per design system, its
`systemMaintainers`. A `usage` field says `personal` or `team`. In
personal use the one registered person is admin. In team use there are
three levels:

- A contributor edits their own prototypes and their own profile.
- A system maintainer also edits the one system they're assigned.
- An admin edits anything, including settings and permissions.

Each prototype records its owner's permanent ID. Moving a folder doesn't
change who owns it.

**Outside your scope, propose.** When a change falls outside the person's
scope, the agent prepares a pull request for the owner to review. It
doesn't change someone else's working branch by default.

**Checks enforce it.** A local hook reports scope problems. In CI, a
GitHub Actions job checks every pull request and push to `main`. It
judges permissions from the *before* side of the change, so a pull
request can't grant itself rights. The project is clear that this is a
workflow guide, not security: branch protection and required reviews on
GitHub stay the admin's job.

**Team guidance file.** `AGENTS.team.md` is where a team writes its own
rules for agents. A sync command builds `AGENTS.md` from the platform's
rules plus this file. Updates never overwrite the team file.

**Keeping and sharing work.** The agent runs the build, commits finished
work with a short message, and pushes only when asked. Publishing a
viewing site is a separate step from sharing in Git.

**Taking updates.** An ownership page splits the repo into tiers: platform
code from upstream, team content and settings, generated files, and
starter examples the team may adapt. Updates are plain, manual Git:

1. Save local work in Git first.
2. Fetch a release tag from the upstream remote onto an upgrade branch.
3. Review the whole merge, even clean parts, because Git doesn't know
   which samples the team changed or deleted.
4. Resolve conflicts on that branch. If intent is unclear, leave it for
   review rather than discard local files.
5. Reinstall, sync, test and build. Review, then merge into the team's
   branch. Push only when asked.

## How Pedro's design-harness does it

Pedro's harness is a personal design harness. It doesn't share one repo
among designers. Team work happens in the **team's real code repo**,
through a `design-engineer` agent and a `design-engineering` skill.

**Two outputs, in order.**

1. **Local first.** Build the design in the target repo and run it. Return
   a `localhost` URL that is checked to load. The design is judged here.
2. **Branch and pull request, only on the designer's go.** A second step
   makes a branch, commits, and opens a pull request. Nothing goes to
   GitHub before the designer has seen it locally.

**Never disturb the checkout.** Before building, the agent checks
`git status`, the branch, the remote and the commit email. If the checkout
has uncommitted work or isn't on the default branch, it works in a
separate Git worktree. It never stashes, resets or switches branches in
the designer's checkout. It never commits to the default branch.

**The repo governs.** The agent reads the target repo's own `AGENTS.md` /
`CLAUDE.md`, uses its components, tokens and scripts, and runs its checks
(types, lint, tests) before a pull request.

**Accounts are a leak risk.** With both a personal and a work GitHub
account signed in, the agent picks the account per command and never
changes the global one. It checks the commit email before the first
commit, because a work email on a public personal repo can't be taken
back.

**The pull request is the handoff.** For work repos, the pull request
description is the developer handoff. It covers what this is, decisions
and rejected options, which system components were used, new standalone
components, states, the mock data shape, deviations from Figma, how to
check it, and what is still open. A personal repo gets a short version.

---

## The jobs a team needs, and where we stand

| Job | What it means | Our state today |
|---|---|---|
| Identity and ownership | Who is who, who owns which project | Each designer has a local profile (`designer-profile.local.md`, never shared). Shared ownership is the Ownership section of each committed `projects/<slug>/brief.md`; the gallery reads it. No roles, no permission file, no checks on who edits what. |
| Keeping work | Work is saved and recoverable | The designer's own commits. The agent never runs `git switch`, `commit`, `revert`, `merge` or `push` (`AGENTS.md` § Git). Private files (`*.local*`, `designer-context.local/`, `projects.local/`) stay out of Git by design. |
| Sharing with teammates | Others can see and build on it | The team's own Git remote is the only sync (`harness/references/remote-sync.md`). "Share this" gets one line saying the harness doesn't push, and points to "publish" for a share URL. The [team guide](../guides/using-it-as-a-team.md) suggests a branch per designer per project. Append-heavy files merge by keeping both sides. |
| Review | Someone checks work before it lands | The team guide asks the team to protect `main` on GitHub and require a pull request. `audit` checks the work itself before sharing. Nothing in the harness writes or drafts a pull request, and there is no handoff format for one. |
| Taking upstream updates without losing changes | New harness releases, local edits kept | `INSTALL.md` § Taking updates: fetch a release tag on an upgrade branch, merge, review, build. The designer runs the Git steps. No written split between harness-owned and team-owned paths. |

---

## Open questions for the designer

Each is a decision, not a recommendation.

1. **Who runs Git?** Stay as today (designer only), or let the agent run
   some steps on an explicit go, as both sources do (commit, then push or
   open a pull request only when asked)? If yes, which steps?
2. **Where does team work live?** One shared harness repo for all
   designers (Design Studio's model), the team's product repo (Pedro's
   model), or both for different kinds of work?
3. **Do we need roles?** Is the Ownership line in `brief.md` enough, or do
   we want admins / maintainers in a shared file? If roles, should a check
   enforce them, or are they guidance only?
4. **How does a teammate join?** Onboarding today is local only. Should
   joining also add a shared, committed entry (name, handle) so the
   gallery and ownership can point at a stable ID?
5. **What does review look like?** Do we want a pull request description
   format that doubles as the developer handoff, and should the agent
   draft it for the designer to paste?
6. **The designer's checkout.** If the agent ever touches Git, should it
   use a worktree whenever the checkout isn't clean, like Pedro's harness?
7. **Ownership tiers for updates.** Should we write down which paths come
   from the harness and which belong to the team, so upgrades know what to
   review with care?
8. **A team rules file.** Do we want a team-owned guidance file that
   updates never overwrite, like `AGENTS.team.md`?
9. **Accounts and emails.** Do designers mix personal and work GitHub
   accounts on one laptop? If so, do we need a commit-email check?
