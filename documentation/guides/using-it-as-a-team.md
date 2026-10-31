---
label: Using it as a team
hint: Several designers in one copy of the harness, without stepping on each other.
---

# Using it as a team

The harness is a folder in Git. A team shares one copy of it in a GitHub
repository, each designer clones that copy, and Git autopilot keeps everyone
on their own branches. Designers don't type Git commands; this page is for
whoever sets the repository up.

## Set up the team repository

1. Make the team's copy: fork the harness on GitHub (or push a clone to a new
   private repository). Keep it private if projects will hold company work.
2. Each designer clones it, runs `npm install` (which also installs the
   pre-commit checks), and says hi to run onboarding once. Profiles, journals
   and settings stay on each laptop.

## Protect `main` on GitHub

Autopilot never pushes `main`, but people and other tools can. In the team
repository, go to **Settings → Rules → Rulesets** (or **Settings → Branches**
on older plans), add a rule for `main`, and turn on:

- **Require a pull request before merging.** Work reaches `main` only through
  a reviewed pull request, which is what "share this" opens.
- **Block force pushes** and **restrict deletions.**
- Optionally, **require status checks**: if you run CI, pick the lint, test
  and build jobs.

Then in **Settings → General**, turn on **Automatically delete head branches**
so merged project branches tidy themselves away.

## How the branches work

| Who | Branch | Made by |
|---|---|---|
| A designer's project | `<first name>/<slug>`, from `main` | starting the project |
| A suggested harness change | `<first name>/harness-<slug>`, from `main` | "suggest it to the harness" at wrap up |

Two designers on the same project each get their own branch, and every
prototype, project and gallery card is its own file, so merging both rarely
conflicts. The three files people append to most, `projects/*/log.md`,
`findings.md` and `sources.md`, merge by keeping both sides' new lines
(`.gitattributes`), so they don't conflict either.

In Claude Code, each chat starts with a warning when the folder is on `main`
or 50 or more commits behind `origin/main`. Say **"bring in the latest main"** to bring
`main` into your project branch. A real conflict stops and lists the files;
nothing is resolved without asking.

## Taking harness updates

Say **"update my harness"**. It adds the harness's GitHub repository as the
`upstream` remote if it isn't there yet, merges its `main` into the current
branch, keeps your team's `projects/` and everyone's `*.local` files as they
are, and runs `npm install` if dependencies changed. A real conflict stops
and lists the files. Do it on a branch and open a pull request into `main`
like any other change. [RELEASE-NOTES.md](../../RELEASE-NOTES.md) says what changed.

The manual route in [INSTALL.md](../../INSTALL.md) § Taking updates still works.

## Changing the harness itself

Edits outside `projects/` (a skill, a rule, the app) are harness changes. When
one is made on a project branch, wrap up asks once:

- **Keep it local**: it stays in that designer's copy, uncommitted.
- **Suggest it to the harness**: it moves to its own branch from `main`, is
  pushed, and opens a pull request against the harness repository (with the
  [GitHub CLI](https://cli.github.com) signed in; otherwise you get the link to
  the pull request form). Your team can merge the same branch into its own
  `main` too.

## Two projects at once

Say **"work on another project in parallel"**. It makes a second folder next
to this one on that project's branch and links in the profile, journal,
settings, company pack and `node_modules`, so the second window knows who you
are. Open it in its own editor window.

## Cloud and background agents

A cloud session has no designer profile. Autopilot uses `git config user.name`
for the branch name instead, and onboarding is skipped.

## Optional: a commit message hook

Autopilot writes plain one-line commit messages with a `Git-Autopilot:`
trailer. If your team enforces a message format, add a `commit-msg` hook in
your own copy. The harness doesn't ship one, so nothing is enforced by
default.

## Turning autopilot off

Settings → "Handle Git for me", or `- Git autopilot: off` in
`designer-profile.local.md`. Either one turns it off for that designer only.
