// Étape 2 : récupérer les avis d'un marché.
// Récupère les avis récents (jusqu'à 10 pages × 50 par app, limite Apple) et écrit les avis 1-2★
// dans un fichier prêt à donner à l'agent pour en tirer les 5 plaintes.
//
// Usage : node reviews.mjs <id> [<id> ...] [--country fr] [--pages 10] [--name mon-marche]
//         node reviews.mjs --from out/discover-....json [--top 20]   (prend les N premières du Top Grossing)
import store from 'app-store-scraper';
import fs from 'node:fs';

const argv = process.argv.slice(2);
const opt = {};
const ids = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i];
  else ids.push(...argv[i].split(/[\s,]+/).filter(Boolean).map(Number));
}
const country = opt.country || 'fr';
const pages = Math.min(Number(opt.pages || 10), 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets = ids.map((id) => ({ id }));
if (opt.from) {
  const d = JSON.parse(fs.readFileSync(opt.from, 'utf8'));
  targets = d.apps.slice(0, Number(opt.top || 20)).map((a) => ({ id: a.id, title: a.title }));
}
if (!targets.length) {
  console.error('Donne des ids d’apps ou --from out/discover-....json');
  process.exit(1);
}

const all = [];
for (const t of targets) {
  if (!t.title) {
    try {
      t.title = (await store.app({ id: t.id, country })).title;
    } catch {
      t.title = String(t.id);
    }
  }
  let n = 0;
  for (let page = 1; page <= pages; page++) {
    let batch;
    try {
      batch = await store.reviews({ id: t.id, country, page, sort: store.sort.RECENT });
    } catch {
      break;
    }
    if (!batch?.length) break;
    for (const r of batch) all.push({ appId: t.id, app: t.title, score: r.score, title: r.title, text: r.text, version: r.version, date: r.updated });
    n += batch.length;
    await sleep(300);
  }
  console.log(`${t.title}: ${n} avis`);
}

const name = opt.name || `market-${country}-${new Date().toISOString().slice(0, 10)}`;
fs.mkdirSync('out', { recursive: true });
fs.writeFileSync(`out/reviews-${name}.json`, JSON.stringify(all, null, 2));

const neg = all.filter((r) => r.score <= 2);
const byApp = Object.groupBy(neg, (r) => r.app);
let md = `# Avis 1-2★ — ${name}\n\n${neg.length} avis négatifs sur ${all.length} au total.\n`;
for (const [app, rs] of Object.entries(byApp)) {
  md += `\n## ${app} (${rs.length})\n\n`;
  md += rs.map((r) => `- [${r.score}★ v${r.version ?? '?'}] **${r.title?.trim() ?? ''}** — ${r.text?.replace(/\s+/g, ' ').trim()}`).join('\n') + '\n';
}
fs.writeFileSync(`out/negative-${name}.md`, md);
console.log(`\n${neg.length} avis 1-2★ / ${all.length} → out/negative-${name}.md`);
