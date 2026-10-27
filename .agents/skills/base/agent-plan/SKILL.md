---
name: agent-plan
description: >-
  How the agent plans work before changing code or files: surface assumptions,
  prefer simplicity, make surgical diffs, and define verifiable success.
  Use on every request as standing base policy. Influenced by senior review
  habits — match the codebase, put logic in the right layer, watch edges.
---

# Agent plan

## Before you change anything

1. State assumptions explicitly. If uncertain, ask — do not pick silently among conflicting interpretations.
2. If a simpler approach meets the need, say so and prefer it.
3. Name success criteria you can verify (test, command output, observable behavior) — not “make it work.”
4. For multi-step work, sketch a short plan with a check per step.

## Simplicity and surgical change

- No features beyond the ask. No speculative abstraction or config.
- Touch only what you must. Match existing style and helpers; do not “improve” adjacent code.
- Prefer extending a shared method over copy-paste near-duplicates.
- Domain decisions belong in models/services with tests — not scattered in routes and one-off scripts.
- Prefer straightforward control flow over clever nesting.

## Edges that bite

- Money and quantities: be explicit about units; `0` is valid — never treat it as falsy by accident.
- Null/empty collections: prefer safe defaults (`[]`) so callers do not special-case.
- Deploy overlap: assume old and new code may run against mixed schema during rollout; keep expand/contract safety.
- Shared helpers: check call sites before widening behavior.
- External systems: ask whether retries create duplicates (webhooks, CRMs, backfills).

## Push back with evidence

Before a design you are unsure about:

1. Trace a similar path in the repo.
2. Name the failure mode (null, retry, stale deploy, wrong audience).
3. Prefer the smaller change that preserves correct behavior.

## After your own edits

Remove imports/symbols *your* change made unused. Do not delete unrelated dead code unless asked.
