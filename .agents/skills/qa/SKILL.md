---
name: qa
description: >-
  Test strategy, edge cases, and regression risk for a change. Use when
  deciding what to test, reviewing coverage, or when engineering changes
  eligibility, money, auth, or multi-branch behavior. Complements
  verification-floor (must run checks) with what is worth testing.
---

# QA

## Focus

- What can go wrong for each actor/surface named by `product`?
- Which branches are the point of the change (auth, eligibility, errors) vs scenic happy path?
- What regressions would a reviewer fear given neighboring code?

## Checklist

1. List critical paths and failure modes before or while implementing.
2. Prefer tests next to domain logic for rules, money math, and state transitions.
3. Keep request/UI tests thin but cover the branches that matter.
4. For UI: if interaction or conditional logic landed in a component, add or extend a component test.
5. Note what you **cannot** run locally (full e2e, staging) so handoff is honest.
6. Pair with `verification-floor` — strategy without executed commands is incomplete.

## Out of scope

- Replacing `investigation` (reproduce first when the bug is unclear)
- Writing the PR narrative (`ship`)
