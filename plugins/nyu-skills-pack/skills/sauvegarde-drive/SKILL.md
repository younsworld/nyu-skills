---
name: sauvegarde-drive
description: Sauvegarde le travail de la session dans le dossier IA-Workspace de Google Drive, ou reprend une session précédente. À utiliser quand l'utilisateur dit "sauvegarde la session", "sauvegarde dans Drive", "range mon travail", "je m'arrête là", "reprends où j'en étais", "lis ETAT-ACTUEL", "qu'est-ce que je faisais", ou invoque /sauvegarde-drive. Gère les deux sens - écriture en fin de session et restauration de contexte en début de session.
---

# Sauvegarde & reprise — IA-Workspace

Cette skill maintient un workspace multi-appareils dans Google Drive : l'utilisateur
travaille depuis plusieurs machines (PC Windows, Mac, mobile) et doit pouvoir reprendre
son travail à l'identique n'importe où.

## Repères

**Racine du workspace :** dossier `IA-Workspace` dans Google Drive
(compte `<TON_EMAIL_GOOGLE>` — à adapter à ton propre compte).

```
IA-Workspace/
├── ETAT-ACTUEL.md      # fichier de reprise — le plus important
├── 00-INBOX/           # dépôt rapide, non classé
├── 01-PROJETS/         # un sous-dossier par projet
├── 02-JOURNAL/         # une note par session : AAAA-MM-JJ-sujet.md
├── 03-RESSOURCES/      # liens, sources, docs de référence
├── 04-CONFIG/          # inventaire plugins/skills, prompts réutilisables
└── 05-LIVRABLES/       # versions finies et propres
```

**Deux chemins d'accès selon le mode d'exécution :**

- Session **« On your computer »** ou dossier connecté → écrire directement dans le dossier
  local synchronisé (`G:\Mon Drive\IA-Workspace` sur Windows,
  `~/Library/CloudStorage/GoogleDrive-<TON_EMAIL_GOOGLE>/Mon Drive/IA-Workspace` sur Mac).
  Vérifier d'abord l'existence du chemin. C'est la voie à privilégier : plus rapide, et
  Google Drive gère la synchronisation.
- Session **cloud** sans dossier connecté → utiliser les outils du connecteur Google Drive
  (`mcp__Google_Drive__*`).

Toujours tester le chemin local en premier, basculer sur le connecteur en cas d'échec.

---

## Mode A — Reprise (début de session)

Déclencheurs : « reprends où j'en étais », « lis ETAT-ACTUEL », « qu'est-ce que je faisais »,
« continue », ou toute reprise après un changement de machine.

1. Lire `ETAT-ACTUEL.md` à la racine.
2. Lire la note de journal la plus récente dans `02-JOURNAL/` (tri alphabétique décroissant —
   le nommage `AAAA-MM-JJ` fait que le dernier alphabétiquement est le plus récent).
3. Si un projet est mentionné, lister `01-PROJETS/<projet>/` pour voir les fichiers.
4. Restituer à l'utilisateur, en **6 lignes maximum** :
   - sur quoi il travaillait
   - la prochaine action prévue
   - ce qui était bloqué, s'il y a lieu

   Ne pas paraphraser tout le fichier. L'utilisateur veut redémarrer, pas relire.
5. Enchaîner directement sur la prochaine action si elle est claire.

---

## Mode B — Sauvegarde (fin de session)

Déclencheurs : « sauvegarde la session », « range mon travail », « je m'arrête »,
« je pars au bootcamp », `/sauvegarde-drive`.

### 1. Ranger les fichiers produits

Pour chaque fichier créé ou modifié pendant la session :

| Nature du fichier | Destination |
|---|---|
| Rattaché à un projet identifié | `01-PROJETS/<projet>/` |
| Version finie, propre, partageable | `05-LIVRABLES/` |
| Doc de référence, source, résultat de recherche | `03-RESSOURCES/` |
| Prompt réutilisable, config | `04-CONFIG/` |
| Pas de place évidente | `00-INBOX/` |

Ne jamais bloquer sur le classement. En cas de doute : `00-INBOX/`. Un fichier mal rangé
mais présent vaut infiniment mieux qu'un fichier perdu.

### 2. Écrire la note de journal

Créer `02-JOURNAL/AAAA-MM-JJ-sujet-court.md` en suivant `02-JOURNAL/_TEMPLATE-session.md`.

Récupérer la date réelle via `date +%F` — ne jamais la deviner.

Si une note existe déjà pour aujourd'hui sur le même sujet, la compléter au lieu d'en créer
une seconde.

Remplir à partir de ce qui s'est réellement passé dans la conversation :

- **Ce que je voulais faire** — l'objectif de départ, tel que formulé par l'utilisateur
- **Ce qui a été fait** — actions et résultats concrets
- **Décisions et arbitrages** — ce qui a été choisi, ce qui a été écarté, pourquoi.
  C'est la partie la plus utile trois semaines plus tard.
- **Fichiers produits** — avec leur emplacement
- **Ressources** — les liens qui ont servi
- **Ce qui bloque** — questions ouvertes, erreurs non résolues
- **Prochaine étape** — la toute première chose à faire au prochain démarrage

Écrire au passé, factuellement. Pas de remplissage : une section vide se supprime.

### 3. Mettre à jour ETAT-ACTUEL.md

C'est l'étape critique — c'est ce fichier qui sera lu depuis l'autre machine.

- Mettre à jour la date et la machine
- Réécrire « Sur quoi je travaille en ce moment »
- Réécrire « Prochaine action » — numérotée, concrète, actionnable sans contexte
- Ajouter les nouvelles décisions structurantes au tableau (garder les anciennes)
- Mettre à jour « En attente / bloqué »

Ce fichier doit rester **court** : quelqu'un qui le lit à froid, sur une autre machine,
doit savoir en 30 secondes quoi faire ensuite. Il se réécrit, il ne s'empile pas.

### 4. Confirmer

Répondre en 3 lignes maximum : ce qui a été rangé, où, et la prochaine action enregistrée.

Si la session tourne en local, rappeler de vérifier que l'icône Google Drive affiche
« À jour » avant d'éteindre la machine — c'est la cause numéro un de fichiers manquants
sur l'autre appareil.

---

## Règles

- **Ne jamais écraser** un fichier existant sans l'avoir lu d'abord. Compléter, ne pas remplacer.
- **`ETAT-ACTUEL.md` est le seul fichier qui se réécrit intégralement.** Tout le reste s'ajoute.
- **Ne pas inventer.** Si la session n'a rien produit de notable, l'écrire tel quel —
  une note de journal honnête et courte vaut mieux qu'une note gonflée.
- **Ne pas demander de confirmation** pour chaque fichier. Ranger, puis résumer.
- **Toujours vérifier la date réelle** avec `date +%F` avant de nommer une note de journal.
