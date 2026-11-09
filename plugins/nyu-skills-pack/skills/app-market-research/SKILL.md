---
name: app-market-research
description: Trouver et valider un marché d'app iPhone à partir de l'App Store, puis garder le build aligné sur les plaintes des utilisateurs du concurrent. Utiliser quand l'utilisateur veut trouver une idée d'app, analyser une catégorie App Store (Top Grossing, apps mal notées), récupérer et résumer les avis d'apps concurrentes, produire ou mettre à jour COMPLAINTS.md, ou vérifier qu'une fonctionnalité répond aux plaintes du concurrent.
---

# App market research

Pipeline en 3 temps : **trouver** un marché → **valider** la demande avec les avis → **construire** contre les plaintes.
Les scripts vivent dans `${CLAUDE_SKILL_DIR}/scripts/`. Au premier usage, si `node_modules` manque dans ce dossier, lancer `npm install --prefix "${CLAUDE_SKILL_DIR}/scripts"`.
Ils écrivent dans `./out/` du dossier courant : lance-les depuis le dossier du projet.

## 1. Trouver le marché

```bash
node ${CLAUDE_SKILL_DIR}/scripts/discover.mjs --category UTILITIES --country fr --num 100
```

- Options : `--category` (nom `store.category`, ex. UTILITIES, PRODUCTIVITY, HEALTH_AND_FITNESS, PHOTO_AND_VIDEO, FINANCE), `--country` (fr, us…), `--max-score 3.5`, `--similar 5`.
- Sortie : `out/discover-<cat>-<pays>-<date>.md|json` — candidates < 3,5★, ⚠️ si pas de MAJ depuis 6 mois, et les « Vous aimerez aussi » de chaque candidate (autres marchés à creuser).
- Le classement est un Top Grossing (proxy des revenus). Pour de vrais chiffres de revenus, l'utilisateur doit passer par Appfigures/Sensor Tower (payant) : le dire, ne pas inventer de chiffres.
- Lancer aussi sur `--country us` : le marché FR seul est petit.

## 2. Valider la demande

```bash
# Les 20 premières apps du classement
node ${CLAUDE_SKILL_DIR}/scripts/reviews.mjs --from out/discover-....json --top 20 --name <marche>
# Ou des apps précises (ids App Store)
node ${CLAUDE_SKILL_DIR}/scripts/reviews.mjs 1617628812 284882215 --country fr --name <marche>
```

- Apple ne sert que les ~500 avis les plus récents par app et par pays (`--pages` max 10 × 50).
- Sortie : `out/negative-<marche>.md` (avis 1-2★ groupés par app) et `out/reviews-<marche>.json` (tout).

Puis lire `out/negative-<marche>.md` en entier (par morceaux s'il est gros) et écrire **`COMPLAINTS.md`** à la racine du projet :

```markdown
# Plaintes — <marché> (<date>, <N> avis 1-2★ sur <M>)

## 1. <plainte en une ligne> — <n> avis (<apps concernées>)
Type : prix | bug | UX | pub | confidentialité | fonctionnalité manquante
> « citation exacte » — <app>, <note>★
> « citation exacte » — <app>, <note>★
> « citation exacte » — <app>, <note>★
Ce qu'on fait à la place : <réponse produit concrète>

... (5 plaintes, triées par volume)

## Signal de demande
- Plaintes sur le prix alors que les gens paient → demande réelle.
- Plaintes sur les bugs → porte d'entrée.
- Verdict : <go / à creuser / non>, en une phrase justifiée par les chiffres ci-dessus.
```

Règles : citations **exactes** (copiées des avis, langue d'origine), comptages réels (pas d'estimation au doigt mouillé), 5 plaintes maximum.

Compléter avec Reddit : chercher `alternative to <app>` (skill agent-reach si disponible) et ajouter une section « Reddit » avec les liens des fils, qui sont autant de clients potentiels.

## 3. Construire contre les plaintes

Quand un `COMPLAINTS.md` existe dans le projet :

- Avant de concevoir ou de livrer une fonctionnalité, la relire contre les 5 plaintes : dire laquelle elle résout, ou si elle n'en touche aucune (et en parler à l'utilisateur dans ce cas).
- Ne jamais reproduire un comportement listé comme plainte (paywall à l'ouverture, pubs intrusives, déconnexions…).
- Prévoir un import depuis le concurrent principal quand c'est techniquement possible (export fichier, CSV, partage), pour que changer d'app prenne 10 secondes.
- Les captures App Store et la fiche reprennent les plaintes en positif (« sans pub », « marche hors ligne », « résiliable quand tu veux »).
- Paywall après la première réussite de l'utilisateur, jamais au premier lancement ; demande d'avis juste après une réussite, jamais après une erreur.
