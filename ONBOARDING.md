# Onboarding — Shopdeck Design System

A shadcn-style component library (**Next.js 16 · React 19 · Tailwind v4 · Base UI**)
with components synced 1:1 from Figma (Chat UX). This guide gets you productive fast.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000  → the live component gallery
npm run build        # runs the design-os guardrail first (prebuild), then builds
npm run check        # design-os sync (blocking) + token-drift report
```

Screens live under `src/app/*`: `/home`, `/hits`, `/chat`, `/artifacts` (Collections),
`/onboarding`, `/ob`, `/stories`, `/login`. The gallery is `/` (full, incl. **AI Design OS**)
and `/components` (filtered).

## The one rule: build with the system, not from scratch

The machine-readable source of truth is **`src/lib/design-os.ts`** (rendered live as the
**AI Design OS** gallery entry). When building any screen, follow the pipeline:

> **Product intent → pick a Layout archetype → pick a Pattern → assemble Components
> (obey their intelligence) → style ONLY with tokens → production-ready UI.**

1. **Component intelligence** — every component declares `purpose / useWhen / avoidWhen /
   priority / pairsWith`. Pick by *intent*, not looks. Never use a component listed under
   another's `avoidWhen`.
2. **Patterns** — prefer a ready composition from `PATTERNS` over assembling from scratch.
3. **Layout rules** — pick a `LAYOUT_RULES` archetype and obey the global rules: **px-4
   gutters · 24px section spacing (`space-y-6`) · 12px card gap (`gap-3`) · one primary
   gradient CTA per screen · sticky header · safe-area insets.**
4. **Tokens — never invent** spacing, radius, shadow, or colour. Use the scales in
   `AGENTS.md` + the `type-*` / colour / `bg-gradient-*` / `shadow-*` utilities defined in
   `src/app/globals.css`.

`AGENTS.md` is the detailed prose companion (per-component API + token scales). It and the
gallery `REGISTRY` are **views** of `design-os.ts` — that file is canonical.

## Conventions

- Components: `src/components/ui/`, shadcn **base** pattern (Base UI `useRender` + `cva`).
  Compose classes with `cn()` from `@/lib/utils`.
- **Icons:** Phosphor only (`@phosphor-icons/react`). **Never use emojis.** Brand marks live
  in `@/components/brand-logos`.
- Font is **Geist**. Tokens are CSS variables in `globals.css`, exposed via `@theme inline`.

## Guardrails (keep the system honest)

- **`npm run check:design-os`** — *blocking*, runs on `prebuild`. Every `src/components/ui/*.tsx`
  must be registered in **both** `design-os.ts` (`COMPONENTS`) and the gallery `REGISTRY`
  (`src/app/page.tsx`). Add a component → register it in both, or the build fails.
- **`npm run check:tokens`** — *report-only*. Flags raw `#hex` / arbitrary `shadow-[…]` that
  bypass tokens. Promote to a token / named shadow utility, or allow-list intentional one-offs.

## Design ↔ code round-trip (Figma Code Connect)

`*.figma.tsx` files map components to Figma nodes. Authored but **not yet published** —
needs a Figma **Org/Enterprise Dev seat**. See `CODE-CONNECT.md`. Once available:
`npm run figma:connect:dry` then `npm run figma:connect`.

## Adding a component (checklist)

1. Create `src/components/ui/<name>.tsx` (base pattern, tokens only).
2. Add a `COMPONENTS` entry in `src/lib/design-os.ts` (with intelligence).
3. Add a gallery `REGISTRY` entry + demo in `src/app/page.tsx`.
4. Document its API in `AGENTS.md`.
5. (Optional) add `<name>.figma.tsx` Code Connect mapping.
6. `npm run check && npm run build`.
