---
name: verification-floor
description: >-
  Standing definition-of-done floor: never claim done, fixed, or passing
  without evidence from commands or observed behavior. Use on every request
  before marking work complete, opening a PR, or writing a verification
  handoff. Consumers supply their own lint/build/test commands.
---

# Verification floor

Close the loop between “files changed” and “ready to hand off.”

## Hard rule

Do **not** claim done / fixed / passing / green unless you ran the relevant checks in this session and read the output. “Should work” is not evidence.

## Before claiming done

For **each** package or service you changed:

1. Run the project’s lint (if any) on touched areas.
2. Run the project’s build (if any) when the stack requires it before tests.
3. Run targeted tests for the behavior you changed; broaden when blast radius is wide.
4. Record what you ran and what you saw.

Use the consuming repo’s documented commands (`package.json`, `Makefile`, `AGENTS.md`, CI config). Do not invent service paths from another company’s monorepo.

## By change type (minimum bar)

| Change | Prove |
|---|---|
| Domain / business rule | Unit test next to the logic (or equivalent) |
| API / request behavior | Test the branches that matter (auth, eligibility, errors) — not happy-path only |
| UI behavior | Lint/build/test; component test when interaction logic is non-trivial |
| Migration / schema | Migration applies; note deploy overlap if old code may run |
| Config / chore | Lint/build + targeted check if any behavior changed |
| Docs-only | Confirm links/paths; no fake test claims |

## Handoff shape

When finishing implementation work, include:

```
## Verification
- Areas touched: …
- Commands: …
- Scenario: …
- Tests added: … or "none — no behavior change"
- Sensitive surface: … or "n/a"
- CI / e2e: what you could not run locally
```

## Stop and ask

- You cannot run required tests (missing services, wrong toolchain)
- Acceptance requires human staging or legal sign-off only
- You are unsure which suite covers the behavior

## Not done

- Skipping build when tests depend on it
- Only testing a package you did not edit
- Claiming staging or full CI green without running it
