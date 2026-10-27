---
name: performance
description: >-
  Latency, throughput, and cost of hot paths: measure before tuning, watch
  N+1 queries, payloads, and caching. Use when users report slowness, when
  changing hot loops, or when adding chatty integrations.
---

# Performance

## Bias

Measure first. Guessing the bottleneck wastes time.

## Checklist

1. What is the user-visible symptom (p95 latency, timeouts, cost spike)?
2. Where is time spent (DB, network, CPU, renders)?
3. Watch for N+1 queries, unbounded lists, over-fetching serializers, chatty vendor calls.
4. Prefer smaller payloads and pagination over loading everything.
5. Cache only with a clear invalidation story.
6. Confirm the fix with before/after numbers or a profile — staff `verification-floor`.

## Out of scope

- Premature micro-optimization of cold paths
- Infra scaling without app evidence (`devops`)
