# Component Library — AI Design Operating System

A shadcn-style component library (**Next.js 16 · React 19 · Tailwind v4 · Base UI**),
synced 1:1 from Figma (Chat UX) and upgraded into an **AI Design Operating System** —
a design system an AI can *reason* with, not just render.

🔗 **Live:** https://design-system-ochre-ten.vercel.app
- `/` — full gallery (source of truth, includes the **AI Design OS** layer)
- `/components` — shareable gallery for the team (without AI Design OS)

## What's inside

- **24 components** in [`src/components/ui`](src/components/ui) — Button, Pill, RoundButton,
  SelectorPill, Dropdown, Switch, TextField/SelectField, BottomSheet, ArtifactCard,
  SectionTitle, ActionDeck, Card, CollapsibleCard, ListCard, ChatBar, ChatBubble,
  Header, BottomNav, UserThumbnail, StrategyCard, and more.
- **Design tokens** in [`src/app/globals.css`](src/app/globals.css) — colour, gradient,
  typography (`type-*`) and shadow utilities. Never hardcode values; use the tokens.
- **AI Design OS manifest** in [`src/lib/design-os.ts`](src/lib/design-os.ts) — the four
  intelligence layers:
  1. **Component Intelligence** — when to use / avoid each component, priority, emotional tone
  2. **Pattern Library** — proven compositions (which components, which layout)
  3. **Layout Rules Engine** — layout archetypes + explicit rules
  4. **Token System** — the only allowed spacing / radius / shadow / colour / type / gradient values
- **Screens:** `/home`, `/onboarding`, `/chat`, `/stories`, `/login`, `/artifacts`.

## Reasoning pipeline

> Product intent → pick a layout archetype → pick a pattern → assemble components
> (obeying their intelligence) → style only with tokens → production-ready UI.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Conventions and the full component reference live in [`AGENTS.md`](AGENTS.md) —
read it before building UI.

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
