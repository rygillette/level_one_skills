---
name: security
description: >-
  Deeper security review beyond the hard-safety floor: authZ design, sensitive
  data flows, vendor minimums, threat modeling, and compliance-sensitive
  changes. Use when touching identity, PII, payments, permissions, external
  integrations, or expanding model/tool data access.
---

# Security

`hard-safety` is the always-on bar. This skill is the deeper checklist for sensitive work.

## When to use

- Identity verification / government IDs / credit or fraud checks
- Serializers, list/detail APIs, LLM/MCP exposed views
- Role, group, or partner-scoped authorization
- Notifications carrying personal data
- New or changed vendor clients handling sensitive fields
- Agreements, disclosures, regulated calculations
- Deletion, export, or backfill of personal data
- Logging or debug paths that might echo payloads

Skip pure refactors with no data/auth/vendor surface change.

## Checklist

### 1. Secrets and config

- No secrets in source, tests, fixtures, commits, or chat
- New config uses the project’s secret store / env patterns

### 2. Sensitive data

- Know what counts as sensitive in this product (IDs, financial, health, location+identity, raw vendor payloads)
- Storage: prefer existing encryption/hashing patterns; no new plaintext sensitive columns casually
- Transit: minimum necessary per vendor
- Display: serializers/UI expose only what the surface needs
- Deletion: follow project process; stop for legal retention questions
- Model/tool access: do not weaken PII guards or schema exclusions without review

### 3. Authorization and automation

- Human access: verify the caller may see or mutate the resource
- Automation is fine when the job/webhook is designed for it
- Acting on behalf of another user only when explicitly scoped — do not generalize “admin can do anything”

### 4. Vendors

Before adding or changing an outbound call:

1. What fields does the vendor actually require?
2. Can we send less sensitive data than today?
3. Do retries duplicate writes?
4. Are errors logged without echoing full vendor bodies?

### 5. Legal and customer-facing copy

- Binding terms / regulated math → owning legal review path
- Customer-facing product copy → owning content owner
- Avoid misleading financial or privacy claims in UI labels

## Output for handoff

```
## Security
- Surfaces: …
- Sensitive fields touched: …
- AuthZ check: …
- Vendors: … or none
- Escalations: … or none
```
