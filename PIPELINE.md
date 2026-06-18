# Design → Code Pipeline

How this repo turns **product intent → production screen** through specialized
agents, grounded in the design system. This is the concrete version of the
6-phase plan; most of it is already built.

## Where each phase lives

| Phase (plan)                          | In this repo                                                                 | Status |
| ------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| 1. Audit components                   | `src/lib/design-os.ts` `COMPONENTS` (27, with variants/states/intelligence)  | ✅ |
| 1. AI-readable registry               | `design-os.ts` + `AGENTS.md` + live gallery (`/`)                            | ✅ |
| 1. Clean Figma (naming, variables)    | node-IDs mapped in `*.figma.tsx` (see `CODE-CONNECT.md`)                      | ◑ (Figma-side) |
| 2. Export to GitHub                   | this repo — `components/`, tokens (`globals.css`), docs, examples (gallery)  | ✅ |
| 2. Claude agents                      | the **`design-to-code`** workflow (Design Lead · DS Guardian · Frontend · QA) | ✅ |
| 2. Design rules                       | `AGENTS.md` rules + **enforced** by `check:design-os` (blocking) / `check:tokens` | ✅ |
| 3–4. Specialized agents + pipeline    | `.claude/workflows/design-to-code.js`                                        | ✅ |
| 5. Design sync (single source)        | `design-os.ts` canonical → guardrail → agents → screen; Figma via Code Connect | ✅ |

Single source of truth: **`design-os.ts`**. `AGENTS.md`, the gallery, and Code
Connect are all views of it; the blocking guardrail keeps them from drifting.

## The pipeline (Phases 3–4)

```
intent ──► Design Lead ──► DS Guardian ──► Frontend ──► QA ──► screen
           (archetype +     (sections →     (tokens +    (validate +
            pattern +        real            frame +      auto-fix vs
            sections)        components)      a11y)        rules+intent)
```

Each stage is a focused agent reading `design-os.ts` / `AGENTS.md` / real
component files — so output is component-accurate and token-clean, not
free-form HTML.

## Run it

```
# via the Workflow tool / design-to-code skill:
Workflow({ name: "design-to-code", args: { intent: "<what to build>", route: "<url-segment>" } })
```

Returns `{ plan, mapping, qa, code }`. The main session then writes
`src/app/<route>/page.tsx`, runs `npm run check && npm run build`, screenshots,
and deploys. Generated routes are **additive** — they never touch existing screens.

**Example:** `{ intent: "Store Settings: edit store name, GST, pickup address,
COD toggle, Save", route: "settings" }` → produced `/settings`.

## Why this beats "prompt → HTML"

- **Reuse, not reinvention** — DS Guardian maps to existing components and
  refuses ones listed under another's `avoidWhen`; it flags genuinely missing
  components instead of inventing them.
- **Token-clean by construction** — Frontend is constrained to tokens + named
  shadow utilities; QA + `check:tokens` catch drift.
- **Self-correcting** — QA returns a corrected file when it finds blockers, then
  the build is the final gate.

## Extend it

- Add stages by editing `.claude/workflows/design-to-code.js` (e.g. an
  Accessibility pass, or a Figma-compare stage once Code Connect is published).
- Batch many screens: wrap the call in a `pipeline()` over a list of intents.
- The roadmap's "automate empty states / tables / forms / dashboards" = run this
  per screen type with the right `intent`.
