---
name: engineering
description: >-
  Implement and change code to match the existing codebase: reuse helpers,
  put logic in the right layer, keep diffs surgical, and prove behavior with
  tests. Use when writing or modifying application code, refactors, or fixes
  after scope is clear. Complements agent-plan (how to plan) and qa/ship.
---

# Engineering

## Mindset

Prefer matching this codebase over inventing a parallel style. Influenced by senior review patterns: correctness at the edges, simple structure, no sharp leftovers.

## Checklist

1. **Find the pattern** — locate a neighboring feature and imitate its shape (helpers, factories, serializers, jobs).
2. **Right layer** — domain rules and derived values on models/services with tests; keep handlers thin.
3. **Slim contracts** — list/summary types stay lean; detail-only fields on detail endpoints.
4. **Edges** — money/units explicit; `0` valid; empty collections default safely; guard outbound calls that would always fail validation.
5. **Deploy safety** — migrations/backfills assume overlap of old and new code; staff `database` when schema/index/query shape is the point.
6. **Call sites** — before widening a shared method, check consumers (including other apps or entry points in the same repo).
7. **Tests** — complex rules, money math, and state transitions get tests next to the logic; don’t only cover happy path when eligibility/errors matter.
8. **Cleanup your mess** — remove dead branches you created; don’t leave broken unused paths.

## Avoid

- Speculative “flexible” components until a second real use appears
- Broad style/CSS overrides that fix one screen by risking others
- Misleading names (fake admin rows for system actors — prefer established `null` / `'system'` conventions)

## Handoff

When implementation is done, satisfy `verification-floor`. For schema/SQL/migration design, staff `database`. For PR/release packaging, staff `ship`.
