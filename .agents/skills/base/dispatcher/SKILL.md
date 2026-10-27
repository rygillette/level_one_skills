---
name: dispatcher
description: >-
  Front-office staffing for the Level One skills pack. Classifies request size
  and shape, states which job skills are on, and keeps unstaffed roles quiet.
  Use at the start of every request — including tiny chores — before deep work.
  Lean inclusive when unsure; fold justified Cursor auto-matches into the plan.
---

# Dispatcher

You are the front office of a small company. Standing policy lives under `base/`. Job orgs are sibling folders under `.agents/skills/` (one folder per department).

## On every request

1. **Classify** size (tiny → multi-step) and shape (bug, feature, research, incident, prose, chore, …).
2. **Keep base on:** `agent-talk`, `agent-plan`, `verification-floor`, `hard-safety` (and this skill) under `.agents/skills/base/`. Apply `asd-ste100` when its triggers hit (agent-parsed or costly-to-misread text — not creative/marketing copy).
3. **Staff jobs:** pick the minimum *sufficient* set. When unsure whether a role is needed, **lean inclusive** — include it.
4. **State the plan early** — list jobs on (and optionally off). Tiny requests may staff zero or one job.
5. **Read staffed skills:** for each staffed job, open that org’s `SKILL.md` (e.g. `.agents/skills/engineering/SKILL.md`) and follow it before doing that job’s work. Staffing without reading is not staffing.
6. **Honor justified auto-match:** if Cursor or the user already matched/named a job skill with justification, treat it as staffed and fold it into the plan. Do not fight a good auto-match.
7. **Spin down = unused:** do not seek out unstaffed job skills without justification. They stay discoverable; you simply do not apply them.

## Job roster (org folders)

| Org folder | Staff when… |
|---|---|
| `triage/` | Report is messy; problem statement unclear |
| `investigation/` | Need reproduce / bisect / hypothesis before (or instead of) building |
| `product/` | Actors, surfaces, scope, or blast radius unclear |
| `design/` | UI/UX or interaction design (incl. accessibility) |
| `engineering/` | Implementing or changing code |
| `qa/` | Test strategy, edges, regression risk |
| `security/` | AuthZ, sensitive data, threat modeling beyond `hard-safety` |
| `devops/` | Deploy, env, CI plumbing, operational config |
| `performance/` | Latency, load, profiling, hot-path cost |
| `database/` | Schema, indexes, migrations, FKs/constraints, queries, transactions |
| `ship/` | PR quality, changelog, handoff, release readiness |

## Bias

Missing the right role is worse than staffing an extra one. Prefer over-inclusion when uncertain.
