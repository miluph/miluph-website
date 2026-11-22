# miluph website
 
Source of the documentation and project website for the **miluph** family of simulation codes, developed in the computational astrophysics group (AM10/CP) at the University of Tübingen.
 
Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
 
**Live site:** https://miluph.github.io/miluph-website/ (planned custom domain: https://miluph.cp.physik.uni-tuebingen.de)
 
## Contents
 
The documentation lives in `src/content/docs/` and is organised by project:
 
| Section | Folder | Description |
|---|---|---|
| What is miluph? | `what-is-miluph/` | Background: SPH and MPM basics, our research |
| miluphcuda | `miluphcuda/` | GPU-accelerated SPH code: features and examples |
| miluphpc | `miluphpc/` | Parallel SPH code: how it works |
| miluph-studio | `miluph-studio/` | GUI for running miluphcuda on remote HPC systems: installation and quick guide |
| smashmpm | `smashmpm/` | Material point method code |
| About | `about.md` | About the group and project |
 
## Project structure
 
```text
.
├── public/                 # Static files (favicon, ...)
├── src/
│   ├── assets/             # Images and logos (light/dark variants)
│   ├── components/         # Custom Astro components (e.g. Footer)
│   ├── content/docs/       # Documentation pages (.md / .mdx)
│   └── content.config.ts   # Content collection configuration
├── astro.config.mjs        # Astro / Starlight configuration (site, sidebar, ...)
└── package.json
```
 
Every `.md` or `.mdx` file in `src/content/docs/` becomes a page, with the route taken from its file path.
 
## Local development
 
Requirements: [Node.js](https://nodejs.org) (current LTS) and npm.
 
```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # production build into ./dist/
npm run preview    # serve the production build locally
```
 
Please run `npm run build` before pushing, since broken links and invalid frontmatter show up there.
 
## Writing and editing pages
 
1. Create or edit a file in `src/content/docs/<section>/`.
2. Start each page with frontmatter:
```md
---
title: Page title
description: One-sentence summary used for search engines and previews.
---
```
 
3. Add new pages to the sidebar in `astro.config.mjs` if the section is not auto-generated.
4. Put images in `src/assets/` and import or reference them relatively, so Astro can optimise them.
If `base` is set in `astro.config.mjs` (needed on `github.io/<repo>` URLs), internal links must include it. Relative links between docs pages avoid the problem.
 
## Deployment
 
The site is deployed to GitHub Pages by GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`). In the repository settings, **Pages → Source** must be set to **GitHub Actions**.
 
For a custom domain:
 
1. Put the domain name in `public/CNAME`.
2. Set `site` in `astro.config.mjs` to the domain and remove `base`.
3. Point a DNS `CNAME` record to `miluph.github.io`.
4. Enable *Enforce HTTPS* in the Pages settings.
## Contributing
 
Corrections and additions are welcome. Open an issue or a pull request, and keep changes to one topic per PR.
 
## Contact
 
Computational Astrophysics group (AM10/CP), Institute for Astronomy and Astrophysics, University of Tübingen.

## License

Website code is licensed under the MIT License (see `LICENSE`).
