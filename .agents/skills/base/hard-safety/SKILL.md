---
name: hard-safety
description: >-
  Thin always-on safety floor for agent work: no secrets in code or logs, no
  PII dumps, minimum data to vendors, no acting outside explicit scope. Use on
  every request. Deep threat modeling and auth design belong in the security
  job skill — this skill is the hard never/always bar.
---

# Hard safety

Standing constraints. Violating these is never “helpful.”

## Never

- Hardcode secrets, API keys, tokens, or passwords — use the project’s secret/config mechanism
- Log, commit, or paste full sensitive PII (government IDs, full account numbers, raw identity-verification payloads, full addresses when identity-tied, etc.) into code, PRs, issues, or chat
- Dump request bodies, SQL rows, or vendor responses that may contain PII into logs
- Act on behalf of an end user unless the route/job is **explicitly** designed for that automation
- Ship legal/binding/regulatory language or regulated calculations without the owning human review path the project defines
- Weaken established PII guards, allowlists, or schema exclusion policies without calling that out for owner review

## Always

- Send external vendors the **minimum** fields their API requires
- Check authorization on the surfaces you touch — role and ownership must match intent
- Prefer opaque IDs in logs and errors; redact sensitive fields in serializers and error payloads
- Follow the project’s deletion/anonymization process when removing personal data; stop and ask when retention or legal holds may apply

## Logging

Structured logs with entity type + id + non-sensitive status are fine. **Payload dumps are not.**

## Escalate to `security`

When the change involves threat modeling, new authZ models, new vendors handling sensitive data, money movement, or expanding LLM/MCP data exposure — staff `security` and go deeper than this floor.
