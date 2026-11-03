---
label: Using it as a team
hint: Several designers in one copy of the harness, without stepping on each other.
---

# Using it as a team

The harness is a folder in Git. A team shares one copy of it in a GitHub
repository, and each designer clones that copy. The harness does not run Git
for you: committing, branching and pushing are your own steps. This page is
for whoever sets the repository up.

## Set up the team repository

1. Make the team's copy: fork the harness on GitHub (or push a clone to a new
   private repository). Keep it private if projects will hold company work.
2. Each designer clones it, runs `npm install` (which also installs the
   pre-commit checks), and says hi to run onboarding once. Profiles, journals
   and settings stay on each laptop.

## Protect `main` on GitHub

In the team repository, go to **Settings → Rules → Rulesets** (or
**Settings → Branches** on older plans), add a rule for `main`, and turn on:

- **Require a pull request before merging.** Work reaches `main` only through
  a reviewed pull request.
- **Block force pushes** and **restrict deletions.**
- Optionally, **require status checks**: if you run CI, pick the lint, test
  and build jobs.

Then in **Settings → General**, turn on **Automatically delete head branches**
so merged branches tidy themselves away.

## Working side by side

A branch per designer per project (for example `ana/invite-friends`) keeps
work apart. Every prototype, project and gallery card is its own file, so
merging two designers' work rarely conflicts. The three files people append
to most, `projects/*/log.md`, `findings.md` and `sources.md`, merge by keeping
both sides' new lines (`.gitattributes`), so they don't conflict either.

Saying "share this" in a chat does not push anything. The agent says so in
one line and points to "publish" when you want a share URL.

## Taking harness updates

Follow [INSTALL.md](../../INSTALL.md) § Taking updates, on a branch, and open a
pull request into `main` like any other change.
[RELEASE-NOTES.md](../../RELEASE-NOTES.md) says what changed.

## Cloud and background agents

A cloud session has no designer profile, so onboarding is skipped.
