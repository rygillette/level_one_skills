---
name: design
description: >-
  UX and UI judgment for product surfaces: clarity, hierarchy, consistency with
  the existing design system, and basic accessibility. Use when changing
  layouts, flows, visual hierarchy, or interaction patterns — not for pure
  backend chores.
---

# Design

## Principles

- Prefer the existing design system and neighboring screens over one-off styling.
- One job per view/section; reduce competing CTAs and clutter.
- Accessibility is in scope: keyboard reachability, labels, contrast, don’t rely on color alone for meaning.
- Customer-facing copy changes may need a designated human reviewer — flag that in handoff rather than inventing brand voice.

## Checklist

1. What is the primary action on this screen?
2. Does the change match established patterns (spacing, typography, components)?
3. Empty, loading, and error states considered?
4. Mobile / narrow widths if the surface is responsive?
5. Any accessibility regression (focus trap, missing labels, motion)?

## Out of scope

- Deep visual brand redesign without a design brief
- Pure API/domain work (`engineering`)
