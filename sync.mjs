// Pulls each script's README and docs/*.md from GitHub into this site (docs/<script>/), rewriting relative links:
// images/videos -> raw.githubusercontent, other repo files -> github blob pages, sibling docs/*.md -> local pages.
// Run locally (`node sync.mjs`, GITHUB_TOKEN optional) or from the sync workflow. Hand-written pages are never touched.
import { mkdir, writeFile } from 'node:fs/promises';

const OWNER = 'Epixx1337';
const REPOS = ['qbx_propplacer', 'qbx_appearance', 'qbx_properties', 'qbx_skills', 'qbx_core'];
const headers = { 'User-Agent': 'epixx-docs-sync', Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };

const IMG = /\.(png|jpe?g|gif|webp|svg|mp4|webm)$/i;

function rewrite(md, repo) {
  const raw = `https://raw.githubusercontent.com/${OWNER}/${repo}/main/`;
  const blob = `https://github.com/${OWNER}/${repo}/blob/main/`;
  const fix = path => {
    const clean = path.replace(/^\.\//, '');
    if (/^(https?:|#|mailto:)/i.test(clean)) return path;
    if (IMG.test(clean)) return raw + clean;
    if (/^docs\/[^/]+\.md$/i.test(clean)) return clean.slice(5); // sibling page in this folder
    if (/\.md$/i.test(clean)) return blob + clean;
    return blob + clean;
  };
  return md
    .replace(/(!?\[[^\]]*\]\()(<?)([^)\s>]+)(>?)([^)]*\))/g, (m, pre, lt, path, gt, post) => pre + lt + fix(path) + gt + post)
    .replace(/(<img[^>]*src=")([^"]+)(")/g, (m, pre, path, post) => pre + fix(path) + post);
}

async function gh(path) {
  const r = await fetch('https://api.github.com' + path, { headers });
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r.json();
}

for (const repo of REPOS) {
  const dir = `docs/${repo}`;
  await mkdir(dir, { recursive: true });
  const readme = await gh(`/repos/${OWNER}/${repo}/readme`);
  await writeFile(`${dir}/readme.md`, `---\ntitle: Full reference\n---\n\n!!! info "Mirrored from GitHub"\n    This page mirrors the [${repo} README](https://github.com/${OWNER}/${repo}#readme) and is refreshed automatically.\n\n` + rewrite(Buffer.from(readme.content, 'base64').toString('utf8'), repo));
  console.log(`${repo}: readme.md`);
  const tree = await gh(`/repos/${OWNER}/${repo}/git/trees/main?recursive=1`);
  for (const f of (tree.tree || []).filter(t => t.type === 'blob' && /^docs\/[^/]+\.md$/i.test(t.path))) {
    const file = await gh(`/repos/${OWNER}/${repo}/contents/${f.path}?ref=main`);
    const name = f.path.slice(5);
    await writeFile(`${dir}/${name}`, rewrite(Buffer.from(file.content, 'base64').toString('utf8'), repo));
    console.log(`${repo}: ${name}`);
  }
}
console.log('sync complete');
