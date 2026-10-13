#!/usr/bin/env node
// Forbidden-terms check from the spec's launch checklist.
//
//   node scripts/check-copy.mjs          checks src/ and public/ (pre-commit)
//   node scripts/check-copy.mjs --dist   also checks the built site in dist/
//
// Fails on: internal ILP names, the Amply email, "residential", Swedish personal
// identity numbers, the reference letter, and (in dist/) any [bracket] gap that
// reached a page. The ILP case is allowed: ILP approved its slides in writing.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const checkDist = process.argv.includes('--dist');
const terms = JSON.parse(readFileSync(join(root, 'scripts/forbidden-terms.json'), 'utf8'));
const forbidden = [...terms.ilpInternal, ...terms.other].filter(Boolean).map((t) => t.toLowerCase());

const TEXT = new Set(['.md', '.mdx', '.astro', '.ts', '.js', '.mjs', '.css', '.html', '.json', '.txt', '.xml', '.svg', '.yml', '.yaml']);
// YYMMDD-NNNN or YYYYMMDD-NNNN (with - or +), or 12 digits starting 19/20.
const PERSONAL_NUMBER = /\b(?:19|20)?\d{6}[-+]\d{4}\b|\b(?:19|20)\d{10}\b/;

const problems = [];
const report = (file, msg) => problems.push(`${relative(root, file)}: ${msg}`);

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

function checkText(file, text) {
  const lower = text.toLowerCase();
  for (const term of forbidden) if (lower.includes(term)) report(file, `contains forbidden term "${term}"`);
  const pn = text.match(PERSONAL_NUMBER);
  if (pn) report(file, `looks like a personal identity number: ${pn[0]}`);
}

// docs/ is left out: the spec quotes the forbidden terms on purpose, and it isn't deployed.
const sources = [join(root, 'src'), join(root, 'public')];
for (const dir of sources) {
  for (const file of walk(dir)) {
    if (/letter|reference|referens|intyg/i.test(basename(file))) report(file, 'looks like the reference letter; it must never be in the repo');
    if (TEXT.has(extname(file))) checkText(file, readFileSync(file, 'utf8'));
  }
}

if (checkDist) {
  const dist = join(root, 'dist');
  if (!existsSync(dist)) report(dist, 'missing; run the build first');
  for (const file of walk(dist)) {
    if (extname(file) !== '.html') continue;
    const html = readFileSync(file, 'utf8');
    checkText(file, html);
    const visible = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
      // tags, including attributes that contain ">" (e.g. Tailwind's [&>*] classes)
      .replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, ' ')
      .replace(/&#91;/g, '[');
    const gap = visible.match(/\[[^\]]{1,120}\]/);
    if (gap) report(file, `a [bracket] gap reached the page: ${gap[0]}`);
  }
}

if (problems.length) {
  console.error(`\ncheck-copy: ${problems.length} problem(s)\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error('');
  process.exit(1);
}
console.log(`check-copy: OK (${checkDist ? 'source and built site' : 'source'})`);
