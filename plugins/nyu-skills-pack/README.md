# Nyu Skills Pack

87 skills regroupees en un seul plugin.

## Specification & planification

- **spec** — Turn vague intent into a precise, executable spec in five phases. (gstack)
- **to-spec** — Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
- **to-tickets** — Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured...
- **autoplan** — Auto-review pipeline — reads the full CEO, design, eng, and DX review skills from disk and runs them sequentially with auto-decisions using 6 decis...
- **plan-ceo-review** — CEO/founder-mode plan review. (gstack)
- **plan-design-review** — Designer's eye plan review — interactive, like CEO and Eng review. (gstack)
- **plan-devex-review** — Interactive developer experience plan review. (gstack)
- **plan-eng-review** — Eng manager-mode plan review. (gstack)
- **plan-tune** — Self-tuning question sensitivity + developer psychographic for gstack (v1: observational). (gstack)
- **wayfinder** — Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on your issue tracker, and resolve them one ...
- **grill-me** — A relentless interview to sharpen a plan or design.
- **grill-with-docs** — A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
- **grilling** — Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phr...
- **office-hours** — YC Office Hours — two modes. (gstack)
- **implement** — Implement a piece of work based on a spec or set of tickets.

## Code & architecture

- **codebase-design** — Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, deci...
- **domain-modeling** — Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectura...
- **improve-codebase-architecture** — Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **graphify** — Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the q...
- **tdd** — Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
- **code-review** — Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented...
- **review** — Pre-landing PR review. (gstack)
- **resolving-merge-conflicts** — Use when you need to resolve an in-progress git merge/rebase conflict.
- **migrate-to-shoehorn** — Migrate test files from `as` type assertions to @total-typescript/shoehorn. Use when user mentions shoehorn, wants to replace `as` in tests, or nee...
- **health** — Code quality dashboard. (gstack)
- **prototype** — Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or exp...

## Debug & investigation

- **diagnosing-bugs** — Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/fail...
- **investigate** — Systematic debugging with root cause investigation. (gstack)
- **benchmark** — Performance regression detection using the browse daemon. (gstack)
- **benchmark-models** — Cross-model benchmark for gstack skills. (gstack)

## Ship, deploy & QA

- **ship** — Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR. (gstack)
- **land-and-deploy** — Land and deploy workflow. (gstack)
- **setup-deploy** — Configure deployment settings for /land-and-deploy.
- **canary** — Post-deploy canary monitoring. (gstack)
- **qa** — Systematically QA test a web application and fix bugs found. (gstack)
- **qa-only** — Report-only QA testing. (gstack)
- **landing-report** — Read-only queue dashboard for workspace-aware ship. (gstack)
- **triage** — Move issues and external PRs through a state machine of triage roles — categorise, verify, grill if needed, and write agent-ready briefs.
- **setup-pre-commit** — Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when user wants to add pre-commit hook...
- **git-guardrails** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before they execute. Use when user wants to p...

## Design & frontend

- **impeccable** — Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract,...
- **design-consultation** — Design consultation: understands your product, researches the landscape, proposes a complete design system (aesthetic, typography, color, layout, s...
- **design-html** — Design finalization: generates production-quality Pretext-native HTML/CSS. (gstack)
- **design-review** — Designer's eye QA: finds visual inconsistency, spacing issues, hierarchy problems, AI slop patterns, and slow interactions — then fixes them. (gstack)
- **design-shotgun** — Design shotgun: generate multiple AI design variants, open a comparison board, collect structured feedback, and iterate. (gstack)
- **design-taste-frontend** — Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships inte...
- **emil-design-eng** — This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software fee...
- **diagram** — Turn an English description (or mermaid source) into a diagram triplet: the source, an editable .excalidraw file you can open (gstack)

## iOS

- **ios-clean** — Remove the DebugBridge SPM package and all #if DEBUG wiring from an iOS app. (gstack)
- **ios-design-review** — Visual design audit for iOS apps on real hardware. (gstack)
- **ios-fix** — Autonomous iOS bug fixer. (gstack)
- **ios-qa** — Live-device iOS QA for SwiftUI apps. (gstack)
- **ios-sync** — Regenerate the iOS debug bridge against the latest upstream gstack templates. (gstack)

## Navigation web & donnees

- **browse** — Fast headless browser for QA testing and site dogfooding. (gstack)
- **scrape** — Pull data from a web page. (gstack)
- **skillify** — Codify the most recent successful /scrape flow into a permanent browser-skill on disk. (gstack)
- **open-gstack-browser** — Launch GStack Browser — AI-controlled Chromium with the sidebar extension baked in.
- **pair-agent** — Pair a remote AI agent with your browser. (gstack)
- **setup-browser-cookies** — Import cookies from your real Chromium browser into the headless browse session. (gstack)
- **agent-reach** — MUST USE when user wants to 调研/research/搜索/search/查/找/look up anything on the internet — e.g. 全网调研 X / 帮我调研一下 X / 查一下 X / 搜搜 X / 看看大家怎么评价 X / X 上有什...
- **research** — Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic ...

## Documentation & apprentissage

- **document-generate** — Generate missing documentation from scratch for a feature, module, or entire project. (gstack)
- **document-release** — Post-ship documentation update. (gstack)
- **make-pdf** — Turn any markdown file into a publication-quality PDF. (gstack)
- **teach** — Teach the user a new skill or concept, within this workspace.
- **learn** — Manage project learnings.
- **scaffold-exercises** — Create exercise directory structures with sections, problems, solutions, and explainers that pass linting. Use when user wants to scaffold exercise...
- **writing-great-skills** — Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable.
- **retro** — Weekly engineering retrospective. (gstack)
- **handoff** — Compact the current conversation into a handoff document for another agent to pick up.

## Contexte & securite

- **context-save** — Save working context. (gstack)
- **context-restore** — Restore working context saved earlier by /context-save. (gstack)
- **cso** — Chief Security Officer mode. (gstack)
- **careful** — Safety guardrails for destructive commands. (gstack)
- **guard** — Full safety mode: destructive command warnings + directory-scoped edits. (gstack)
- **freeze** — Restrict file edits to a specific directory for the session. (gstack)
- **unfreeze** — Clear the freeze boundary set by /freeze, allowing edits to all directories again. (gstack)

## Setup & routeurs

- **gstack** — Router for the gstack skill suite. (gstack)
- **gstack-upgrade** — Upgrade gstack to the latest version.
- **ask-matt** — Ask which skill or flow fits your situation. A router over the skills in this repo.
- **setup-gbrain** — Set up gbrain for this coding agent: install the CLI, initialize a local PGLite or Supabase brain, register MCP, capture per-remote trust policy. (...
- **sync-gbrain** — Keep gbrain current with this repo's code and refresh agent search guidance in CLAUDE.md. Wraps the gstack-gbrain-sync orchestrator with state (gst...
- **setup-matt-pocock-skills** — Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first us...
- **codex** — OpenAI Codex CLI wrapper — three modes. (gstack)

## Autres

- **devex-review** — Live developer experience audit. (gstack)

## Mes skills perso

- **app-market-research** — Trouver et valider un marché d'app iPhone depuis l'App Store, résumer les avis des concurrents dans COMPLAINTS.md, puis construire contre leurs plaintes.
- **sauvegarde-drive** — Sauvegarder une session dans un dossier Google Drive (ETAT-ACTUEL.md + journal) et la reprendre depuis une autre machine.

## Note

Ces skills viennent d'un setup Claude Code oriente developpement (suite `gstack`). Certaines supposent un depot git, un projet iOS/Xcode ou des outils CLI installes localement — elles ne sont pleinement operationnelles que dans ce contexte.
