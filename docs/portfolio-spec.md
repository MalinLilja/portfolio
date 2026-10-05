# Malin Lilja – Portfolio website spec

Oct 1, 2026 · @Malin

## Purpose and goals

Build a fast, hand-coded portfolio site that gets Malin shortlisted for senior and lead UX/product roles, replacing malinlilja.myportfolio.com. A recruiter should understand who she is and see a result within 10 seconds, and a hiring manager should be able to read one case study end to end in 5 minutes.

Positioning line: I design complex tools for the experts who use them.

Three threads every page should reinforce:

- Complex tools for expert users (VFX planning, freight optimization, insurance, residual values, SaaS appointments)
- Design systems (InUse thesis, Qmatic, SmartOpt, ILP)
- Leadership (Agile Team Lead, project manager, product owner, design lead)

Audiences, in priority order:

| Audience | Time on site | What they need |
|---|---|---|
| Recruiter | 30 s – 2 min | Title, seniority, years, domains, contact, a downloadable CV |
| Hiring manager | 5 – 15 min | 2–3 case studies with problem, role, decisions and outcome |
| Design peers in the interview loop | 15+ min | Process depth, artefacts, reflection |

Success criteria:

- Every case study is reachable in one click from the home page.
- The CV exists as a readable HTML page and a text-based PDF that applicant tracking systems can parse.
- Lighthouse scores of 95+ for performance, accessibility, best practices and SEO.
- The site looks deliberate and memorable, not like a template, while staying easy to scan.

## Content and site map

Keep the site to five page types. All copy comes from the two working docs, "Malin Lilja – CV" and "Malin Lilja – Portfolio & case studies", exported to Markdown, so the site never becomes a second source of truth.

| Page | URL | Source of copy | Status |
|---|---|---|---|
| Home | / | Portfolio doc: Home page | Copy drafted |
| Case study: ILP VFX | /work/ilp | Portfolio doc: ILP case | Hidden until ILP approves |
| Case study: Qmatic | /work/qmatic | Portfolio doc: Qmatic case | Needs numbers |
| Case study: SmartOpt | /work/smartopt | Portfolio doc: SmartOpt case | Needs timeline, numbers |
| Case study: Länsförsäkringar | /work/lansforsakringar | Portfolio doc: Länsförsäkringar case | Needs one outcome |
| Case study: Ziklo | /work/ziklo | Portfolio doc: Ziklo case | Needs adoption result |
| About + CV | /about | CV doc | Copy drafted |
| CV download | /malin-lilja-cv.pdf | Exported from the CV doc | Re-export as text-based PDF |
| 404 | /404 | New, one line + link home | To write |

Case study order on the home page: ILP VFX (once approved), Qmatic, SmartOpt, Länsförsäkringar, Ziklo. Until ILP is approved, show it as a non-clickable "Coming soon" card, as the current portfolio does.

Possible later addition: the ILP render manager project (interface and user adoption) as a short second ILP story, once ILP approval covers it.

Content rules that apply to every page:

- No internal ILP system names, internal URLs or business plans in public text.
- Never publish the ILP reference letter itself; it contains a personal identity number. Use the short quote from Martin Knopf only.
- Use liljacmalin@gmail.com everywhere, never the Amply address.
- Ziklo is about "residual value", never "residential".
- Title for ILP: Senior UX Designer.
- No invented numbers. Gaps stay as [brackets] in the docs and are hidden from the site until filled.

## Page specifications

### Home

The home page answers "who, what level, what proof" above the fold on a 1440 × 900 screen.

- Header: name, "UX & Product Designer", links to Work, About, CV (PDF) and email. Sticky on scroll, collapses to a menu under 720 px.
- Hero: photo, the positioning line as the H1, then the 2-sentence intro (7 years, domains, research to shipped product).
- Selected work: one card per case study with logo or hero image, client, one-line result and role tags. Cards link to the case study; ILP shows "Coming soon" until approved.
- Experience strip: the four roles with years, as on the current home page.
- Quote: the short Martin Knopf quote with name and title.
- Footer: email, LinkedIn, phone, Göteborg, CV download.

### Case study template

One reusable layout, filled from a Markdown/MDX file per case. It follows the agreed case study structure.

- Hero: title as an outcome ("Helping shipping companies order the most profitable speed"), tags, one large image.
- TL;DR box: company, role, timeline, team, problem, what I did, result. Scannable in 20 seconds.
- Problem
- My role
- Phases or key decisions: each with a heading, 2–4 short paragraphs or bullets, and a visual with a caption.
- Outcome: bullets, numbers where they exist.
- Reflection: 2–3 sentences.
- Next case link and back to all work.

Components the template needs: TL;DR box, image with caption, side-by-side image pair (before/after), quote, process stepper (like the SmartOpt Research → Delivery list), external link button.

Each case can set an accent colour from the client's brand (SmartOpt mint, Qmatic green, Länsförsäkringar blue), while layout and type stay the same.

### About + CV

The full CV as real HTML text, so search engines and recruiters' tools can read it: profile, experience, education, skills, tools, languages. A prominent "Download CV (PDF)" button. A short personal line at the end (illustration, Python).

### Contact

No form, to avoid spam and backend work. A mailto: link, LinkedIn and phone in the footer of every page.

## Visual design direction

Carry over the identity from the current CV and portfolio so everything Malin sends looks like one brand. Design the key screens in Figma first, then let Claude Code build from them.

Keep from the current identity:

- Near-black background with a soft blue-to-lavender gradient panel
- Wide, extended display typeface for the name and headings; light humanist sans for body text
- The row of small four-point stars as a section divider
- Rounded-corner portrait photo
- Per-case colour theming (dark navy and mint for SmartOpt, light blue for Länsförsäkringar)

Improve for the web:

- Raise body text to 17–18 px with 1.6 line height; the current slides use small, light text that is hard to read.
- Check every colour pair for WCAG AA contrast (4.5:1 for body text), especially grey text on the gradient.
- Offer a light theme or at least make sure light case study pages (Qmatic, Länsförsäkringar) sit comfortably next to dark ones.
- Add subtle motion only where it helps: card hover, image fade-in. Respect prefers-reduced-motion.

Design tokens to define in Figma and mirror in code:

| Token group | Examples |
|---|---|
| Colour | bg, surface, text, text-muted, accent, gradient-start, gradient-end, per-case accent |
| Type | display font, body font, scale (e.g. 14 / 17 / 22 / 32 / 48 / 72 px) |
| Space | 4 px base grid: 4, 8, 12, 16, 24, 32, 48, 64, 96 |
| Radius | 8 px cards, 16 px photo and large images |
| Layout | max content width 1200 px, reading width 680 px, breakpoints 720 and 1080 px |

Open question: which fonts the current portfolio uses, and whether their licences allow web use. If not, pick free alternatives from Google Fonts that match the wide display style.

## Functional and technical requirements

The site is static: no login, no database, no form. That keeps it fast, cheap and safe.

| Area | Requirement |
|---|---|
| Performance | Images in AVIF/WebP with set width and height; lazy-load below the fold; under 1 MB per page on first load |
| Responsive | Works from 360 px phones to 1920 px screens; case study images readable on mobile (tap to enlarge) |
| Accessibility | WCAG 2.1 AA: semantic headings, alt text on every image, visible focus states, keyboard navigation, skip link, reduced motion |
| SEO and sharing | Unique title and description per page; Open Graph image per case study; sitemap.xml; "Malin Lilja UX designer Göteborg" in the home page title |
| ATS and recruiters | CV as HTML text on /about and as a text-based PDF; job titles must be selectable text, not images or outlined fonts |
| Privacy | No cookie banner needed if analytics are cookieless; no personal identity number or home address anywhere; consider leaving the street address off the public CV |
| Analytics | Optional, cookieless (e.g. Plausible, Umami or the host's built-in analytics) to see which case studies get read |
| Confidential work | ILP case not built into public pages until approved; keep its draft out of the deployed site, not just hidden with CSS |
| Maintenance | Malin can change copy by editing a Markdown file and pushing; no code knowledge needed for text edits |

The CV PDF note matters: the current PDF export garbles job titles when text is extracted ("Seniores igner"), so ATS tools may misread them. Export from Figma with text kept as text, or generate the PDF from the /about page.

## Recommended tech stack and hosting

Recommendation: Astro with Markdown/MDX content, plain CSS with custom properties for the tokens, deployed on Vercel or Netlify from a GitHub repo, on your own domain. Astro is built for content sites, ships almost no JavaScript, and Claude Code knows it well.

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro | Static output, content collections for case studies, built-in image optimisation |
| Content | One .md/.mdx file per case study, front matter for TL;DR fields | Copy pastes straight from the docs' Markdown export; Malin edits text without touching code |
| Styling | CSS custom properties (tokens) + scoped component CSS | Tokens map 1:1 to Figma variables; no framework lock-in. Tailwind is fine if you prefer it |
| Interactivity | Minimal vanilla JS (menu, image zoom) | Fast pages, fewer things to break |
| Code hosting | GitHub (private repo) | Version history, and every branch gets a preview link |
| Hosting | Vercel or Netlify, free tier | Automatic deploys on push, HTTPS, preview URLs to share drafts |
| Domain | e.g. malinlilja.se or malinlilja.com | Check availability; around 100–200 SEK per year |

Decision: build in code with Claude Code, with Figma as the source of truth for look and feel. No-code builders like Framer or Adobe Portfolio are ruled out, since they don't support a Figma-to-code iteration loop you control.

Things you need installed: Node.js (LTS), Git, a GitHub account, a code editor (VS Code or Cursor) and Claude Code. Check current install steps in the Claude Code docs.

## Working with Claude Code

Treat Claude Code like a developer on your team: you are the designer and product owner, it builds. The better your brief (this spec, Figma frames, a CLAUDE.md file), the less you correct afterwards.

### Tools and skills to set up

| Tool or skill | What it gives you | How to use it |
|---|---|---|
| CLAUDE.md in the repo root | Standing project rules Claude Code reads every session | Paste the starter below; update it whenever you correct Claude twice |
| Figma MCP server (Figma's Dev Mode / remote MCP) | Claude Code reads your frames, variables and components directly | Design home and case study frames with variables, then ask Claude to build from the frame link |
| Figma's design-to-code skills | Guidance for turning frames into code with your tokens | Load when implementing a Figma frame |
| frontend-design skill (Anthropic) | Distinctive, intentional visual choices instead of template defaults | Ask Claude to use it for layout, type and motion details |
| Playwright MCP | Claude opens the site in a browser, takes screenshots, checks breakpoints | "Screenshot home at 375, 768 and 1440 px and compare with the Figma frame" |
| Design plugin skills: design-critique, accessibility-review, ux-copy | Critique of layouts, WCAG AA audits, tightening microcopy | Run accessibility-review before every launch; design-critique on each new page |
| Your own skill: case-study | Your case study structure and writing rules, applied every time | Build it with the skill-creator skill from your project instructions |
| Slash commands | Repeatable tasks in one line | e.g. /new-case (scaffold an MDX file) and /check-copy (scan for forbidden terms and [brackets]) |
| A review subagent | A second pass that checks work against this spec | "Use a subagent to review the page against the spec and CLAUDE.md before you finish" |
| A hook or pre-commit check | Blocks a commit if forbidden strings appear | Grep for internal ILP names, the Amply email, "residential" and personal numbers |
| Plan mode | Claude proposes a plan before touching files | Use for anything bigger than one component |

Check the Claude Code docs for current setup of MCP servers, skills, slash commands, subagents and hooks, since these change often.

### CLAUDE.md starter

The starter lives in the repo as `CLAUDE.md` (repo root).

### Workflow, step by step

- Design in Figma: home, case study template, about, mobile versions. Set colours, type and spacing as variables.
- Brief Claude: put this spec in the repo as docs/portfolio-spec.md and add CLAUDE.md.
- Plan: in plan mode, ask for a file structure and component list. Correct it before any code exists.
- Build tokens and layout first, then one component at a time, each checked against Figma with screenshots.
- Pour in content from the Markdown export of your docs.
- Review: run accessibility-review and design-critique, then a Lighthouse audit.
- Deploy a preview, send it to two people you trust, fix, then point the domain.

### Iterating on look and feel from Figma

Figma owns the look; code follows. Every visual change starts in Figma, and Claude Code carries it over. Text changes go the other way: they start in the docs and land in the Markdown content files.

Set up the Figma file so Claude can read it cleanly:

- Name Figma variables exactly like the CSS tokens (color/accent → --color-accent, space/16 → --space-16). Then a variable change in Figma maps to one line in tokens.css.
- Name Figma components like the code components (Card, TldrBox, CaseHero, ImagePair). Use Figma's Code Connect to link them, so Claude knows which file each component lives in.
- Use auto layout everywhere; fixed positioning in Figma turns into fragile CSS.
- Keep one page per site page (Home, Case study, About), each with desktop and mobile frames.
- Add a "Changes" section or annotations on frames you've updated, so you can point Claude at exactly what moved.

The iteration loop:

- Change the design in Figma: a variable, a component or a frame.
- Copy the link to the changed frame or component.
- Ask Claude Code to compare it with the current build and list the differences before changing anything.
- Approve or adjust the list, then let it update tokens.css and the affected components.
- Claude screenshots the page at 375, 768 and 1440 px and compares with the frame.
- Check the preview deploy on your phone, then merge.

Iteration prompts:

- "I've updated the colour and type variables in Figma. Read them through the Figma MCP, show me a diff against tokens.css, then apply it."
- "Here's the updated Card component: [link]. List what's different from src/components/Card.astro, then update it. Don't touch other components."
- "Compare the live home page with this frame at 1440 and 375 px: [link]. Give me a list of mismatches in spacing, type and colour, most visible first."
- "Try two variants of the case study hero based on this frame: [link]. Put them on separate branches so I can compare the preview links."

Tip: when Claude gets a detail wrong twice, add the rule to CLAUDE.md (for example "card images always use 16:10 and object-fit cover"), so it sticks in later sessions.

### Example prompts

- "Read docs/portfolio-spec.md and CLAUDE.md. In plan mode, propose the Astro project structure, components and content schema for the case studies. Don't write code yet."
- "Build the home page from this Figma frame: [link]. Use the tokens in tokens.css. Screenshot at 375 and 1440 px and list any differences from the frame."
- "Create the case study template from the spec's section order. TL;DR fields come from front matter. Hide any text in [brackets]."
- "Run an accessibility review of /work/smartopt against WCAG 2.1 AA and fix what you find. Tell me about anything that needs a design decision."
- "Search the whole repo for forbidden terms from CLAUDE.md and report every hit."

### Skills to grow yourself

You don't need to become a developer, but these make you a much better director of Claude Code: basic Git (commit, branch, push, revert), reading a terminal error well enough to paste it back, how HTML structure and CSS layout (flexbox, grid) work, Figma variables and auto layout that map cleanly to code, and running Lighthouse in Chrome DevTools. Your basic Python already gives you the habit of reading code; HTML and CSS are easier.

## Build plan, launch checklist and open items

Aim for a first launch with home, about/CV and three finished case studies, then add the rest. A live site with three strong cases beats a perfect site that isn't public.

Build order:

- Set up tools: Node, Git, GitHub, Claude Code, Figma MCP, Playwright MCP.
- Figma: tokens as variables, home and case study frames, desktop and mobile.
- Repo: Astro project, CLAUDE.md, spec, tokens.css, forbidden-terms check.
- Layout and components: header, footer, cards, TL;DR box, image components.
- Home and about/CV pages with real copy.
- First three case studies: Qmatic, SmartOpt, Ziklo or Länsförsäkringar, whichever has the fewest [brackets] left.
- Review, deploy preview, feedback round, launch on your domain.
- Add remaining cases; add ILP when approved.

Launch checklist:

- ☐ No [brackets] visible on any public page
- ☐ Forbidden-terms check passes (internal ILP names, Amply email, "residential", personal numbers)
- ☐ ILP case not deployed, or ILP has approved it in writing
- ☐ CV PDF passes a copy-paste test: job titles come out as clean text
- ☐ Accessibility review done, no AA failures
- ☐ Lighthouse 95+ on home and one case study
- ☐ Every image has alt text and a caption where it shows an artefact
- ☐ Open Graph images show correctly when the link is pasted into LinkedIn
- ☐ Tested on a real phone and in Safari, Chrome and Firefox
- ☐ Portfolio link updated on CV, LinkedIn and cover letter template
- ☐ Old Adobe Portfolio redirects or links to the new site

Open items:

- ☐ Numbers and outcomes for the [brackets], especially Qmatic and ILP
- ☐ One key design decision and a reflection per case study
- ☐ Font names and web licences from the current portfolio
- ☐ Domain choice and availability
- ☐ Whether to keep the street address on the public CV
- ☐ ILP approval, and whether it also covers the render manager project
