// Étape 1 : trouver les marchés.
// Top Grossing d'une catégorie → garde les apps < 3,5★, signale celles pas mises à jour depuis 6 mois,
// et liste les apps « Vous aimerez aussi » des meilleures candidates.
//
// Usage : node discover.mjs [--category UTILITIES] [--country fr] [--num 100] [--max-score 3.5] [--similar 5]
import store from 'app-store-scraper';
import fs from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]]] : acc), [])
);
const category = (args.category || 'UTILITIES').toUpperCase();
const country = args.country || 'fr';
const num = Number(args.num || 100);
const maxScore = Number(args['max-score'] || 3.5);
const similarCount = Number(args.similar || 5);
if (!(category in store.category)) {
  console.error(`Catégorie inconnue. Choix : ${Object.keys(store.category).join(', ')}`);
  process.exit(1);
}

const SIX_MONTHS = 1000 * 60 * 60 * 24 * 182;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const list = await store.list({
  collection: store.collection.TOP_GROSSING_IOS,
  category: store.category[category],
  country,
  num,
  fullDetail: true,
});

const apps = list.map((a, i) => ({
  rank: i + 1,
  id: a.id,
  appId: a.appId,
  title: a.title,
  developer: a.developer,
  score: a.score != null ? Math.round(a.score * 100) / 100 : null,
  reviews: a.reviews,
  updated: a.updated,
  stale: a.updated ? Date.now() - new Date(a.updated).getTime() > SIX_MONTHS : null,
  url: a.url,
}));

const candidates = apps.filter((a) => a.score > 0 && a.reviews > 0 && a.score < maxScore);

// « Vous aimerez aussi » pour les meilleures candidates
for (const c of candidates.slice(0, similarCount)) {
  try {
    const sim = await store.similar({ id: c.id, country });
    c.similar = sim.slice(0, 10).map((s) => ({ id: s.id, title: s.title, score: s.score }));
  } catch (e) {
    c.similar = [];
  }
  await sleep(400);
}

const date = new Date().toISOString().slice(0, 10);
fs.mkdirSync('out', { recursive: true });
const base = `out/discover-${category.toLowerCase()}-${country}-${date}`;
fs.writeFileSync(`${base}.json`, JSON.stringify({ category, country, maxScore, apps, candidates }, null, 2));

const fmt = (a) =>
  `| ${a.rank} | ${a.title} | ${a.score ?? '?'} | ${a.reviews ?? '?'} | ${a.updated?.slice(0, 10) ?? '?'}${a.stale ? ' ⚠️' : ''} | ${a.id} |`;
let md = `# Marchés — ${category} (${country.toUpperCase()}), Top Grossing, ${date}\n\n`;
md += `## Candidates (< ${maxScore}★) — ${candidates.length}/${apps.length}\n\n⚠️ = pas de mise à jour depuis 6 mois\n\n`;
md += `| Rang | App | Note | Avis | MAJ | id |\n|---|---|---|---|---|---|\n${candidates.map(fmt).join('\n')}\n`;
for (const c of candidates.filter((c) => c.similar?.length)) {
  md += `\n### « Vous aimerez aussi » — ${c.title}\n\n${c.similar.map((s) => `- ${s.title} (${s.score?.toFixed?.(2) ?? '?'}★, id ${s.id})`).join('\n')}\n`;
}
md += `\n## Top ${apps.length} complet\n\n| Rang | App | Note | Avis | MAJ | id |\n|---|---|---|---|---|---|\n${apps.map(fmt).join('\n')}\n`;
fs.writeFileSync(`${base}.md`, md);

console.log(`${candidates.length} candidates sur ${apps.length} → ${base}.md`);
for (const c of candidates) console.log(`#${c.rank} ${c.title} — ${c.score}★${c.stale ? ' ⚠️ stale' : ''} (id ${c.id})`);
