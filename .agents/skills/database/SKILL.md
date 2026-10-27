---
name: database
description: >-
  Review and advise on database schema and access: indexes, migrations, column
  types, foreign keys, constraints, transactions, queries, and expand/contract
  safety. Use when changing or reviewing tables, SQL, ORMs, backfills, or
  query performance tied to the data model. Complements engineering,
  performance, security, and devops.
---

# Database

Domain-generic DBA judgment for application databases. Prefer the project’s existing migration/ORM tooling and naming; do not invent a parallel stack.

## When to use

- Adding or changing tables, columns, indexes, or constraints
- Writing or reviewing migrations, backfills, or data fixes
- Choosing types, nullability, defaults, or foreign keys
- Query design, N+1/ORM issues, or `EXPLAIN`-style plan review
- Transaction boundaries, locking, or deadlock risk
- Connection/pool behavior affecting correctness or latency

Skip pure app-layer refactors with no schema or query shape change (staff `engineering` instead).

## Checklist

### 1. Schema shape

- Column types match the domain (money, time, ids, enums) and stay consistent with neighboring tables
- Nullability and defaults are intentional; document what “missing” means for readers of the data
- Prefer explicit FKs when referential integrity matters; note cascade/delete behavior
- Unique / check / exclusion constraints: enforce in the DB when the invariant must hold under concurrency

### 2. Indexes

- Index for real access paths (filters, joins, order/limit), not speculative “index everything”
- Watch composite key order, covering vs filter indexes, and write amplification
- Partial/unique indexes when the engine and workload justify them
- Confirm new indexes won’t lock unacceptably on large tables (online/concurrent options when available)

### 3. Migrations & expand/contract

- Assume old and new app code may run against the schema during deploy
- Prefer expand → migrate data → contract; avoid destructive one-shot changes without a safe window
- Separately consider: schema DDL vs data backfill (batching, throttling, resumability)
- Backfills and jobs should be idempotent where retries happen

### 4. Querying

- Prefer clear, bounded queries; avoid unbounded scans and `SELECT *` on wide tables in hot paths
- Use the project’s query/ORM patterns; push filters to the database when that is the source of truth
- For slow paths: reason with plans (`EXPLAIN` / equivalent), not guesses alone
- Pagination and stable ordering for list endpoints

### 5. Transactions, pools, lifecycle

- Keep transactions short; don’t hold locks while doing remote I/O
- Name isolation needs only when the workload requires it (e.g. avoid lost updates)
- Connection pool: timeouts, size, and not leaking connections across await boundaries
- Large-table / retention / soft-delete vs hard-delete: choose deliberately; staff `security` when deletion or sensitive columns are involved

## Boundaries

| Concern | Hand off to |
|---|---|
| AuthZ, PII columns, encryption at rest policy | `security` / `hard-safety` |
| App-only latency unrelated to schema/SQL | `performance` |
| Migration runners, env DB URLs, CI DB services | `devops` |
| Domain API behavior around the data | `engineering` |
| Proving the migration/tests ran | `verification-floor` |

## Out of scope (v1)

- Full warehouse / ETL / BI dimensional modeling
- Vendor-specific cluster ops runbooks unless the consuming repo already uses that engine

## Output (when advising)

Keep it short:

1. **Risk** — what can break (data, locks, deploy overlap)
2. **Recommendation** — schema/index/query/migration shape
3. **Rollout** — expand/contract or backfill notes
4. **Verify** — how to confirm (migration dry-run, plan, tests)
