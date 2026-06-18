export const meta = {
  name: 'design-to-code',
  description:
    'Design→code pipeline: Design Lead → Component Mapping → Frontend → QA, grounded in design-os.ts. args: { intent, route }',
  phases: [
    { title: 'Design Lead', detail: 'archetype + pattern + sections from product intent' },
    { title: 'Map', detail: 'map sections to real library components (obey intelligence)' },
    { title: 'Build', detail: 'generate the screen with library components + tokens only' },
    { title: 'QA', detail: 'validate vs design-system rules + intent; auto-fix' },
  ],
}

const intent =
  (args && args.intent) ||
  'A Store Settings screen where the seller edits store profile: store name, GST number, pickup address, a cash-on-delivery toggle, and a primary Save action.'
const route = (args && args.route) || 'settings'

const PLAN = {
  type: 'object',
  additionalProperties: false,
  required: ['archetype', 'patterns', 'sections', 'primaryCta'],
  properties: {
    archetype: { type: 'string' },
    patterns: { type: 'array', items: { type: 'string' } },
    primaryCta: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'purpose'],
        properties: { name: { type: 'string' }, purpose: { type: 'string' } },
      },
    },
    notes: { type: 'string' },
  },
}

const MAP = {
  type: 'object',
  additionalProperties: false,
  required: ['sections', 'missingComponents'],
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'components'],
        properties: {
          name: { type: 'string' },
          components: { type: 'array', items: { type: 'string' } },
          tokens: { type: 'array', items: { type: 'string' } },
          notes: { type: 'string' },
        },
      },
    },
    missingComponents: { type: 'array', items: { type: 'string' } },
  },
}

const CODE = {
  type: 'object',
  additionalProperties: false,
  required: ['code', 'componentsUsed'],
  properties: {
    code: { type: 'string' },
    componentsUsed: { type: 'array', items: { type: 'string' } },
  },
}

const QA = {
  type: 'object',
  additionalProperties: false,
  required: ['passed', 'issues'],
  properties: {
    passed: { type: 'boolean' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'detail'],
        properties: {
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          detail: { type: 'string' },
        },
      },
    },
    revisedCode: { type: 'string' },
  },
}

log(`Pipeline: "${intent}" → /${route}`)

// 1 — Design Lead: product intent → archetype + pattern + sections
phase('Design Lead')
const plan = await agent(
  `You are the DESIGN LEAD for the Shopdeck mobile design system (Next.js 16 + Tailwind v4 + Base UI).
Read src/lib/design-os.ts (LAYOUT_RULES, PATTERNS, COMPONENTS, GLOBAL_LAYOUT_RULES) and AGENTS.md.
Product intent: "${intent}"
Decide the best LAYOUT_RULES archetype, the most relevant PATTERN(s), and an ordered list of screen SECTIONS — each with a one-line purpose tied to the user need. Mobile-first (393×852 frame). Obey the global rules (px-4 gutters, 24px section spacing, exactly one primary gradient CTA, sticky header, safe-area insets). Return strictly via schema.`,
  { label: 'design-lead', phase: 'Design Lead', schema: PLAN }
)

// 2 — Design System Guardian: map each section to REAL components
phase('Map')
const mapping = await agent(
  `You are the DESIGN SYSTEM GUARDIAN. The component library + its intelligence live in src/lib/design-os.ts (COMPONENTS: purpose/useWhen/avoidWhen/pairsWith) and are documented in AGENTS.md. The real components are in src/components/ui/.
For intent "${intent}", map EACH of these sections to specific EXISTING components by name:
${JSON.stringify(plan.sections)}
Hard rules: never invent a component; never use a component listed under another component's avoidWhen; prefer a ready PATTERN; style only with tokens. For each section list the component names + key tokens/spacing. If a genuinely required component does not exist in the library, add it to missingComponents (do NOT invent it). Return via schema.`,
  { label: 'ds-guardian', phase: 'Map', schema: MAP }
)

// 3 — Frontend: generate the full screen file (library components + tokens only)
phase('Build')
const built = await agent(
  `You are the FRONTEND engineer. Generate a COMPLETE, production-ready Next.js client component for route /${route} (file src/app/${route}/page.tsx) implementing: "${intent}".
GROUND TRUTH — read these for the EXACT frame/header/nav pattern and conventions: src/app/ob/page.tsx and src/app/home/page.tsx. Read AGENTS.md for component APIs.
Constraints:
- "use client" + a default-exported component.
- Import ONLY from @/components/ui/* and icons from @phosphor-icons/react (Phosphor only, never emojis). Use cn() from @/lib/utils if needed.
- Use ONLY tokens/utilities: type-* typography, colour tokens (text-text-primary, bg-surface-app, brand-primary, border-divider, success/danger/warning…), gap-3, space-y-6, px-4, rounded-2xl, shadow-glass/card/lift/sheet/inset-glass. NEVER raw hex or arbitrary shadow-[…].
- Frame MUST match exactly: outer \`bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6\`; inner \`relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl\`; a sticky Header at top (pt-[env(safe-area-inset-top)]); a scrollable \`main\` (flex-1 space-y-6 overflow-y-auto px-4 py-4); BottomNav at the bottom (pb-[env(safe-area-inset-bottom)]).
- Use this component mapping: ${JSON.stringify(mapping.sections)}.
- CRITICAL: verify every prop against the real component signature — read the component file in src/components/ui/ if unsure. Do NOT use props that don't exist. Exactly one primary gradient CTA.
Return ONLY the full file contents in \`code\` via schema.`,
  { label: 'frontend', phase: 'Build', schema: CODE }
)

// 4 — QA: validate against the design system + intent; auto-fix
phase('QA')
const qa = await agent(
  `You are QA for the design system. Review this generated screen for route /${route} (intent: "${intent}").
\`\`\`tsx
${built.code}
\`\`\`
Verify, reading src/components/ui/* files as needed:
1. Only REAL components from src/components/ui/*, every prop valid (no invented props).
2. Tokens only — flag any raw #hex or arbitrary shadow-[…].
3. Layout rules — px-4 gutters, space-y-6 sections, gap-3 card gaps, exactly ONE primary gradient CTA, sticky Header, BottomNav, safe-area insets, correct frame dimensions.
4. Faithful to the intent; sensible UX.
5. No obvious TypeScript errors.
List concrete issues (severity blocker/major/minor). If ANY blocker/major exists, return the corrected FULL file in revisedCode (same constraints). Return via schema.`,
  { label: 'qa', phase: 'QA', schema: QA }
)

return {
  intent,
  route,
  plan,
  mapping,
  qa: { passed: qa.passed, issues: qa.issues },
  code: qa.revisedCode || built.code,
  componentsUsed: built.componentsUsed,
}
