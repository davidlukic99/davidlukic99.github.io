# davidlukic99.github.io

Personal portfolio — Senior AI Engineer · LLM & Multi-Agent Systems.

Live at https://davidlukic99.github.io.

## Stack

- **Astro 5** — static site generator, zero-JS by default
- **Tailwind 4** — CSS-first design tokens
- **astro-icon** — inline SVG icons (Lucide, Simple Icons)
- **Geist Sans / Geist Mono** — self-hosted via `@fontsource`
- Deployed via **GitHub Actions** to GitHub Pages

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output in dist/
npm run preview    # serve the built dist/
```

Requires Node `>=22.12`.

## Updating content

Content is data-driven — update JSON files, not component markup:

- `src/content/experience.json` — roles, periods, highlights, stack
- `src/content/projects.json`  — featured work
- `src/content/skills.json`    — grouped tech stack

Design tokens live in `src/styles/global.css` (`@theme` block).

## Deploy

Commits to `master` trigger `.github/workflows/deploy.yml`, which builds the site
and publishes to GitHub Pages.

**One-time setup** in GitHub: *Settings → Pages → Build and deployment →
Source: **GitHub Actions***.

## CV

The source of truth is `public/David_Lukic.pdf`, served at
`https://davidlukic99.github.io/David_Lukic.pdf`.
