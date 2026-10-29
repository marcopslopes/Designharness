---
label: Host a viewing copy
hint: Put the app on a static host so people can browse your prototypes from a link.
---

# Host a viewing copy

`npm run build` turns the Design Harness app into a static website in `dist/`. Put that folder on any static host and people can open your prototypes, design system, and docs from a link, without cloning the repo or running anything.

## What's in a hosted copy

A hosted copy is for viewing. Settings, adding company files, and usage stats only work in `npm run dev`, because they write files on your computer.

It includes:

- every project committed in `projects/`: screens, briefs, case studies, and docs, whether or not it's listed in the Prototypes tab
- the design system, the skills, and the documentation
- the app name and theme from `harness.config.local.json`
- anything in `public/`, including pages copied there by `publish-project`

It never includes your profile, your company pack in `context/org-pack.local/`, your notes in `designer-context.local/`, `projects.local/`, or the harness logs.

**If your projects show real company work, host the copy privately.** Use your host's password protection or single sign-on, or an internal server, rather than a public URL. Anyone with a public link can open every project in the build.

## Before you deploy

```bash
npm run build
npm run preview
```

`npm run preview` serves the build at [localhost:3002](http://localhost:3002), so you can check it before anyone else sees it. Every page address comes after a `#`, such as `/#/playground`, so no host needs redirect rules.

Licensed webfonts in `public/fonts/` are gitignored. A host that builds from your repository uses the default type stack unless you add the fonts to a private copy.

## Vercel, Netlify, or Cloudflare Pages

Connect the repository and use these settings. Each host picks a supported Node version from `.nvmrc` or `package.json`.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output folder | `dist` |
| Install command | `npm ci --ignore-scripts` |

`--ignore-scripts` skips the Git hook setup, which a build server doesn't need.

## GitHub Pages

GitHub Pages serves a repository from a subfolder, such as `https://<you>.github.io/design-harness/`, so the build needs that path:

```bash
npm run build -- --base=/design-harness/
```

To deploy on every push to `main`, add `.github/workflows/pages.yml` and set **Settings → Pages → Source** to **GitHub Actions**:

```yaml
name: Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-24.04
    environment: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci --ignore-scripts
      - run: npm run build -- --base=/${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

GitHub Pages sites are public on free plans. Keep company work off them.

## Docker

The `Dockerfile` builds the app and serves it with nginx on port 8080:

```bash
docker build -t design-harness .
docker run --rm -p 8080:8080 design-harness
```

Your private files are excluded from the image by `.dockerignore`.

## Any web server

Copy the contents of `dist/` to any folder a web server can serve. If it's not the site's root, build with that folder as the base, for example `npm run build -- --base=/prototypes/`.

## Related

- [The manual](manual.md)
- [publish-project](../skills/publish-project.md) copies one finished deck or case study into `public/` for the next build
- [Use it with a team](../../INSTALL.md#use-it-with-a-team)
