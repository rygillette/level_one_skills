---
name: product
description: >-
  Clarify who is affected, which product surfaces change, whether scope is
  global or segmented, blast radius, and acceptance as a contract before
  coding or filing work. Use when requirements are ambiguous, multi-audience,
  multi-surface, or when “user” is too vague. Complements triage and engineering.
---

# Product

Upstream of coding. Goal: get **who / where / what’s in / what’s out** right.

## When to use

- Feature or bug touches more than one audience or UI surface
- Ticket is thin, contradictory, or missing actor/surface
- Behavior may differ by customer segment, tenant, partner, or program
- Notifications, eligibility, money display, identity, or multi-surface consistency

Skip pure chores unless audience or behavior is unclear.

## Checklist (in order)

### 1. Name the actors

Who is affected? “User” is not enough — distinguish end customers, internal operators, partner/admin roles, and system/automation actors. Call out dual roles when one person wears two hats.

### 2. Name the surfaces

Which products or apps must change together? If the same fact (money, status, role) appears in more than one place, specify **each** surface. Don’t ship one and leave another inconsistent unless explicitly deferred.

### 3. Scope: global vs segmented

Default assumption: **not global**. Ask whether this is configuration per tenant/partner/program, which segments are in vs out, and whether a risky change should roll out to one segment first.

### 4. Trace blast radius

List downstream consumers: external vendors, eligibility/rules engines, notifications, identity/match logic, reporting and stored amounts.

### 5. Acceptance as a contract

Prefer Given / When / Then. Include exact user-facing copy when errors/ineligibility matter; explicit **No** / deferred items; ops escape hatches when vendors disagree. Bad: “works.” Good: constrains behavior, audiences, surfaces, or sequencing.

### 6. Stop and ask when missing

- Actor or dual-role behavior
- Which segments are in vs out
- Whether it must be configurable vs hardcoded global
- Conflicting vendor or compliance constraints
- Which surfaces must stay in sync

## Output (when scope is unclear)

Emit briefly, then proceed or file work:

1. **Actors** —
2. **Surfaces** —
3. **Scope** — (global vs segmented; who is in)
4. **In / deferred / No** —
5. **Blast radius** —
6. **Open questions** — (blockers only)
