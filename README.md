# pedrobonini.com

Personal site and blog of Pedro Bonini. Built with Astro, deployed via Docker + Caddy on a personal VPS.

## Stack

- **Astro** with Content Collections and MDX
- **Caddy** as reverse proxy with automatic HTTPS
- **Docker Compose** for deployment
- **GitHub Actions** for CI/CD (build on runner, rsync to VPS)
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
│   ├── series/           # /series, /series/[slug]
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
4. `git commit && git push` — CI deploys to production

## Writing a series

1. Create `src/content/series/your-series-slug.md` with frontmatter:

```yaml
---
title: "Series title"
description: "What the series is about"
status: ongoing   # ongoing | completed | paused
startDate: 2026-05-01
lang: en
---

Body of the series intro (rendered on the series page).
```

2. In each post that belongs, add `series: your-series-slug` and `part: N`

## Deployment setup

### One-time VPS preparation

SSH into your VPS as a user with sudo. Install Docker + Compose if not present, then:

```bash
sudo mkdir -p /var/www/pedrobonini.com
sudo chown $USER:$USER /var/www/pedrobonini.com
cd /var/www/pedrobonini.com

# copy Caddyfile and docker-compose.yml from this repo to the VPS
# (do it manually the first time, or with scp)

mkdir dist
docker compose up -d
```

The site will fail to load until the first deploy fills `dist/`.

### GitHub Secrets

In your repo `Settings → Secrets and variables → Actions`, add:

| Secret | Value |
|---|---|
| `VPS_HOST` | IP or hostname of your VPS |
| `VPS_USER` | SSH username on the VPS |
| `VPS_SSH_PRIVATE_KEY` | Private key (paste contents of `~/.ssh/id_ed25519` or similar) |
| `VPS_SITE_PATH` | `/var/www/pedrobonini.com` |

Generate a dedicated SSH key for deploys (don't reuse your personal one):

```bash
ssh-keygen -t ed25519 -C "github-deploy" -f deploy_key
# upload deploy_key.pub to the VPS user's ~/.ssh/authorized_keys
# paste contents of deploy_key into VPS_SSH_PRIVATE_KEY secret
```

### DNS

Point an A record for `pedrobonini.com` (and `www`) to your VPS IP. Caddy handles Let's Encrypt automatically once DNS resolves.

### First deploy

Push to `main`. The GitHub Action will:

1. Install deps, run `npm run build`
2. rsync `./dist/` to `$VPS_SITE_PATH/dist/`
3. SSH in and restart the Caddy container

Caddy serves the new files instantly. No rebuild of the container needed.

## Customizations to make before going live

- Update `src/lib/config.ts` with real email/links
- Replace `[ano]`, `[N]` etc. in `src/pages/about.astro` and `src/pages/pt/sobre.astro`
- Add `public/cv-en.pdf` and `public/cv-pt.pdf`
- Add `public/favicon.svg`
- Adjust `Caddyfile` if your VPS uses different ports
- Consider adding [giscus](https://giscus.app) comments by wiring up a Discussions repo

## License

Code: MIT. Content: all rights reserved.
