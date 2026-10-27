# Dispatcher staffing scenarios

Manual spot-checks for Phase A. For each prompt, the agent should run `dispatcher` first, keep base skills on, and staff at least the jobs listed.

| # | Prompt gist | Expected jobs (minimum) |
|---|---|---|
| 1 | Fix a typo in the README | none or `ship` |
| 2 | “App crashes when I click save” + vague Slack paste | `triage`, then likely `investigation` |
| 3 | “Add dark mode to settings” | `product`, `design`, `engineering`, `qa` |
| 4 | “Is this endpoint safe to expose?” | `security` (maybe `engineering`) |
| 5 | “Write the PR and handoff for this branch” | `ship` (+ `verification-floor` as base) |
| 6 | “Add an index / migration for this slow query” | `database` (maybe `performance`, `engineering`) |

**Inclusive bias:** if Cursor already matched an extra job skill with justification, fold it into the plan rather than fighting it.
