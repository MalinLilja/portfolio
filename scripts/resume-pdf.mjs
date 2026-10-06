#!/usr/bin/env node
// Prints /resume to public/malin-lilja-resume.pdf with a local Chrome or Edge, so the
// CV PDF is real text that applicant tracking systems can read.
//
//   npm run build && npm run resume:pdf
//
// Set CHROME_PATH if the browser isn't found.

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'public', 'malin-lilja-resume.pdf');
const port = 4399;

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('resume-pdf: no Chrome or Edge found. Set CHROME_PATH.');
  process.exit(1);
}
if (!existsSync(join(root, 'dist', 'resume.html'))) {
  console.error('resume-pdf: dist/resume.html is missing. Run npm run build first.');
  process.exit(1);
}

const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { cwd: root, shell: true, stdio: 'ignore' });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://localhost:${port}/resume`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('preview server did not start');
}

try {
  await waitForServer();
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${out}`,
    `http://localhost:${port}/resume`,
  ], { stdio: 'ignore' });
  console.log(`resume-pdf: wrote ${out} (${Math.round(statSync(out).size / 1024)} kB)`);
} finally {
  if (process.platform === 'win32') {
    try { execFileSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' }); } catch {}
  } else server.kill();
}
