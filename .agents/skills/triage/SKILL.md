---
name: triage
description: >-
  Turn messy bug reports, Slack threads, and vague asks into a clear problem
  statement before staffing product, investigation, or engineering. Use when
  the request lacks repro steps, actor, impact, or a single coherent question.
---

# Triage

## Goal

Produce a crisp problem statement others can act on. Do not jump to a large fix while the ask is mush.

## Checklist

1. **Source** — what was reported, by whom, with what artifacts (screenshots, IDs — redact PII).
2. **Symptom** — one sentence: what is wrong vs expected.
3. **Impact** — who is hurt; how often; workaround?
4. **Repro status** — known steps, unknown, or cannot reproduce yet.
5. **Urgency** — blocker vs annoyance; any deadline.
6. **Next staff** — usually `investigation` (unclear cause), `product` (unclear intent/scope), or `engineering` (clear small fix).

## Output

```
## Triage
- Symptom: …
- Impact: …
- Repro: …
- Hypotheses (optional): …
- Recommended next skill(s): …
- Blockers / questions: …
```

## Out of scope

- Deep bisect (`investigation`)
- Scope contracts for new features (`product`)
