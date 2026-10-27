---
name: devops
description: >-
  Environments, deploy wiring, CI plumbing, and operational configuration.
  Use when changing pipelines, infra-as-code, env/config delivery, release
  automation, or runtime operations — not for pure feature code inside an
  already-wired service.
---

# Devops

## Checklist

1. Which environments are affected (local, CI, staging, production)?
2. Are secrets injected via the approved mechanism (never committed)?
3. Will old and new app versions overlap during deploy? Keep expand/contract safe.
4. Do health checks, rollbacks, and observability still make sense?
5. Idempotency: can the pipeline or job be re-run safely?
6. Document the operator steps if humans must click something at release time.

## Out of scope

- Application feature logic (`engineering`)
- Load testing strategy (`performance`)
- PR narrative (`ship`)
