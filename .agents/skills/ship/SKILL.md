---
name: ship
description: >-
  Package work for review and release: PR quality, verification notes,
  changelog/handoff, and release-task honesty. Use when opening or updating
  a PR, writing handoff, or preparing a merge. Complements verification-floor.
---

# Ship

## PR / handoff checklist

1. Summary explains **why**, not only what files changed.
2. Include `verification-floor` evidence (commands + scenario).
3. Map to acceptance criteria when they exist.
4. Call out risk, feature flags, and follow-ups explicitly.
5. **Pre-release / post-release tasks:** only include sections with real actionable items. Never pad with “None” / “N/A” checklists. Omit empty sections entirely when the project uses that convention.
6. Tag required human reviewers (copy, legal, security) when those surfaces changed.
7. Do not claim staging or full CI success you did not observe.

## Avoid

- Huge unrelated diffs
- Secrets or PII in PR text
- Placeholder release sections that waste release-owner time
