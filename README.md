# pedrobonini.com

Personal site and blog of Pedro Bonini. Built with Astro, hosted on GitHub Pages.

## Stack

- **Astro** with Content Collections and MDX
- **GitHub Pages** for hosting
- **GitHub Actions** for CI/CD (build + deploy on push to `main`)
- Static site, dark mode, RSS, sitemap, bilingual (en default, pt at `/pt`)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build to ./dist
npm run preview  # preview the build
```

## Project structure

```
src/
├── content/
│   ├── posts/      # one .md per blog post (en or pt)
│   ├── series/     # multi-part collections
│   ├── projects/   # project entries
│   └── config.ts   # zod schemas
├── layouts/
│   ├── BaseLayout.astro
│   └── PostLayout.astro
├── pages/
│   ├── index.astro       # / (en home)
│   ├── about.astro
│   ├── uses.astro
│   ├── blog/             # /blog, /blog/[slug]
│   ├── projects/         # /projects
│   ├── rss.xml.js
│   ├── 404.astro
│   └── pt/               # /pt mirror of all en pages
├── components/
├── lib/config.ts         # site-wide constants
└── styles/global.css
```

## Writing a post

1. Create `src/content/posts/YYYY-MM-DD-slug.md` (or `.mdx` for embeds)
2. Frontmatter:

```yaml
---
title: "Your title"
description: "One-sentence summary"
pubDate: 2026-05-22
category: ai-agents   # ai-agents | engineering | career | personal
lang: en              # en | pt
tags: ["tag-1", "tag-2"]
series: "series-slug"  # optional
part: 1                # optional
draft: false           # set true to hide from build
---
```

3. Write the body in markdown
4. `git commit && git push` — GitHub Actions deploys to production

## Deployment

The site deploys automatically on every push to `main` via `.github/workflows/deploy.yml`:

1. Install deps, run `npm run build`
2. Upload `./dist` as a Pages artifact
3. `actions/deploy-pages` publishes it

### One-time setup (already done for this repo)

1. **Repo settings → Pages → Source**: set to "GitHub Actions"
2. **Custom domain**: `public/CNAME` contains `pedrobonini.com`
3. **DNS**: point `pedrobonini.com` to GitHub Pages
   - Apex (`pedrobonini.com`): A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or `www` subdomain: CNAME to `phfbonini.github.io`
4. **Enforce HTTPS**: enable in repo settings after DNS resolves

## Customizations to make before going live

- Replace `[ano]`, `[N]` etc. in `src/pages/about.astro` and `src/pages/pt/sobre.astro`
- Add `public/cv-en.pdf` and `public/cv-pt.pdf`
- Add real project entries in `src/content/projects/`
- Consider adding [giscus](https://giscus.app) comments by wiring up a Discussions repo

## License

Code: MIT. Content: all rights reserved.
