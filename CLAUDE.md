# Malin Lilja – portfolio site

## What this is
Static portfolio for a senior UX & product designer, aimed at recruiters and hiring managers.
Positioning: "I design complex tools for the experts who use them."
Spec: docs/portfolio-spec.md (read before larger changes).

## Stack
Astro, Markdown content in src/content/, Tailwind CSS v4. The design tokens in src/styles/tokens.css are the Tailwind @theme.
Commands: npm run dev | npm run build | npm run preview | npm run check:copy

## Where things live
- src/content/work/<slug>/index.md – one case study per folder, images next to it. Front matter holds the card, TL;DR, accent colour and process steps.
- src/content/site/home.md, src/content/site/cv.md – home page and CV copy.
- src/components/ – Header, Footer, WorkCard, ExperienceStrip, Quote, TldrBox, ProcessStepper, LinkButton, StarDivider.
- src/lib/brackets.ts and src/lib/markdown-plugins.mjs – hide [bracketed] gaps; turn image-only paragraphs into figures (title → caption, two images → side-by-side pair).
- scripts/check-copy.mjs – forbidden-terms check. Runs after every build and on demand.

## Rules
- Never change copy in content files unless asked. Copy is owned by Malin.
- Never invent numbers, results or quotes. Leave [brackets] in place and hide them from rendered output.
- Never use internal ILP system names, internal URLs or business plans.
- Never add the reference letter file, personal identity numbers or the Amply email.
- Email is liljacmalin@gmail.com. Ziklo copy says "residual value".
- The ILP case must not exist in src/content/work/ until ILP has approved it in writing. It is a "Coming soon" card only.
- Style with Tailwind utility classes in the markup. Only token classes exist (the default palette and type scale are off): bg-surface, text-text-muted, text-22, rounded-card, font-display, max-w-reading.
- Spacing uses Tailwind's 4 px grid: Figma space/16 → p-4, space/48 → mt-12. Breakpoints: md = 720px, lg = 1080px.
- No hard-coded colours. A new colour is a new token in tokens.css (and a Figma variable).
- Custom CSS only where utilities can't reach: Markdown output (.prose, .figure in global.css) and print styles.
- WCAG 2.1 AA: semantic HTML, alt text, focus states, reduced motion.
- Minimal JavaScript. No new dependencies without asking.

## Workflow
- Plan first for anything touching more than one component.
- After UI changes: build, screenshot at 375/768/1440 px, compare with the Figma frame.
- Small commits with clear messages.
