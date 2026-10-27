---
name: investigation
description: >-
  Detective work before (or instead of) building: reproduce, gather evidence,
  bisect, form and test hypotheses. Use for bugs, incidents, and “it broke”
  reports where the cause is unclear. Prefer this over speculative coding.
---

# Investigation

## Process

1. **Restate the symptom** — what fails, for whom, since when.
2. **Reproduce** — minimal steps; note environment. If unreproducible, say what you tried.
3. **Collect evidence** — logs (redacted), stack traces, failing tests, recent diffs. Opaque IDs only for people.
4. **Hypothesize** — one leading theory; what would falsify it.
5. **Bisect** — recent commits, feature flags, data shape changes, vendor outages.
6. **Conclude** — root cause (or remaining unknowns) before large fixes.
7. **Fix or hand off** — small confirmed fix via `engineering`, or clear report for humans.

## Avoid

- Rewriting large areas “while you’re here” before the cause is known
- Logging raw PII while debugging (`hard-safety`)

## Related

- Messy report with no clear symptom → staff `triage` first
- Confirmed code fix → `engineering` + `qa`
