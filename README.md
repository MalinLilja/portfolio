# Malin Lilja – portfolio

Static portfolio site built with Astro and Tailwind CSS. The spec is in [docs/portfolio-spec.md](docs/portfolio-spec.md), and the rules for Claude Code are in [CLAUDE.md](CLAUDE.md).

## Editing text

All copy is in Markdown. Edit a file, save, and push; no code needed.

| What | File |
|---|---|
| Home page intro, experience, ILP "Coming soon" card, quote | `src/content/site/home.md` |
| Name, email, phone, LinkedIn, city | `src/content/site/profile.md` |
| CV on /about | `src/content/site/cv.md` |
| A case study | `src/content/work/<case>/index.md` |

- **Gaps:** write `[what's missing]` anywhere. It's hidden on the site until you replace it. If a gap sits mid-sentence, the sentence is cut back to the last comma, or hidden, so nothing reads as broken.
- **Images:** put the image in the case's folder and write `![Alt text describing the image](./file.jpg "Caption")`. Put two images on the same line for a side-by-side pair (before/after).
- **TL;DR, tags, accent colour, process steps and links** are in the block between the `---` lines at the top of each case file.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once) |
| `npm run dev` | Local site at http://localhost:4321 |
| `npm run build` | Build to `dist/`, then run the forbidden-terms check on the result |
| `npm run check:copy` | Forbidden-terms check on the source (also runs before every commit) |
| `npm run cv:pdf` | After a build: print /about to `public/malin-lilja-cv.pdf` with Chrome |

Design tokens (colours, type, radius, layout) live in `src/styles/tokens.css` and become Tailwind classes, e.g. `--color-surface` → `bg-surface`.

Forbidden terms live in `scripts/forbidden-terms.json`. Add ILP's internal system names there.
