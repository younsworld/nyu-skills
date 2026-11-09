# nyu-skills

Un pack de **87 skills pour Claude Code**, regroupés dans un seul plugin : spécification, TDD, code review, ship, QA, design frontend, revues de plan, debug, iOS, documentation, recherche et sécurité.

## Installation

Dans Claude Code :

```
/plugin marketplace add younsworld/nyu-skills
/plugin install nyu-skills-pack@nyu-skills
```

Les skills s'appellent ensuite avec le préfixe du plugin, par exemple `/nyu-skills-pack:tdd`.

La liste complète des skills, par catégorie, est dans [plugins/nyu-skills-pack/README.md](plugins/nyu-skills-pack/README.md).

## Skills maison

- **app-market-research** : trouver une idée d'app iPhone depuis le Top Grossing de l'App Store, récupérer les avis négatifs des concurrents, les résumer dans `COMPLAINTS.md`, puis construire contre ces plaintes. Demande Node.js ; au premier usage, le skill installe ses dépendances.
- **sauvegarde-drive** : sauvegarder une session dans un dossier `IA-Workspace` de Google Drive et la reprendre depuis une autre machine. Remplace `<TON_EMAIL_GOOGLE>` dans le `SKILL.md` par ton compte.

## Crédits

La plupart de ces skills ne sont pas de moi : ce dépôt les regroupe pour les installer en une fois. Tout le mérite revient à leurs auteurs, et chaque skill reste sous la licence de son projet d'origine :

- [gstack](https://github.com/garrytan/gstack) de Garry Tan (MIT) : les skills marqués « (gstack) »
- [Les skills de Matt Pocock](https://github.com/mattpocock/skills) (MIT) : tdd, grill-me, to-spec, to-tickets, triage, wayfinder, codebase-design, etc.
- [impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0)
- [Agent-Reach](https://github.com/Panniantong/Agent-Reach) (MIT), graphify (Safi Shamsi), emil-design-eng (Emil Kowalski), design-taste-frontend

Pour les mises à jour, mieux vaut suivre les dépôts d'origine.
