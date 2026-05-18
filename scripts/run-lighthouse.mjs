import { once } from 'node:events';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT ?? 3000);
const baseURL = process.env.LIGHTHOUSE_BASE_URL ?? `http://127.0.0.1:${port}`;
const outDir = path.join(root, 'qa', 'lighthouse');
const chromePath =
  process.env.CHROME_PATH ??
  '/opt/data/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome';

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false, ...options });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))));
  });
}

function waitFor(url, timeoutMs = 120_000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) return resolve();
      } catch {}
      if (Date.now() - started > timeoutMs) return reject(new Error(`Timed out waiting for ${url}`));
      setTimeout(tick, 1_000);
    };
    tick();
  });
}

await mkdir(outDir, { recursive: true });
await run('npm', ['run', 'build']);

let server = null;
try {
  try {
    await waitFor(`${baseURL}/en`, 2_000);
    console.log(`Reusing existing server at ${baseURL}`);
  } catch {
    server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stdout.on('data', (data) => process.stdout.write(data));
    server.stderr.on('data', (data) => process.stderr.write(data));
    await waitFor(`${baseURL}/en`);
  }
  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    for (const locale of ['en', 'ar']) {
      const url = `${baseURL}/${locale}`;
      const result = await lighthouse(url, {
        port: chrome.port,
        output: ['html', 'json'],
        logLevel: 'warn',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      });
      const [html, json] = result.report;
      await writeFile(path.join(outDir, `${locale}.html`), html);
      await writeFile(path.join(outDir, `${locale}.json`), json);
      const cats = result.lhr.categories;
      console.log(`${locale}: performance=${Math.round(cats.performance.score * 100)} accessibility=${Math.round(cats.accessibility.score * 100)} best-practices=${Math.round(cats['best-practices'].score * 100)} seo=${Math.round(cats.seo.score * 100)}`);
    }
  } finally {
    await chrome.kill();
  }
} finally {
  if (server) {
    server.kill('SIGTERM');
    await Promise.race([
      once(server, 'exit'),
      new Promise((resolve) => setTimeout(resolve, 5_000)),
    ]);
  }
}
